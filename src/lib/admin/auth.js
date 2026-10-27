import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

function phoneToEmail(phone) {
  const clean = String(phone).replace(/\D/g, "");
  return `${clean}@admin.shapnochura.local`;
}

// ---- ADMIN LOGIN (auto-creates first super admin) ----
export async function loginAdmin(phone, password) {
  try {
    const email = phoneToEmail(phone);
    const cred = await signInWithEmailAndPassword(auth, email, password);

    const adminRef = doc(db, "admins", cred.user.uid);
    const adminSnap = await getDoc(adminRef);

    // If admin doc exists → normal path
    if (adminSnap.exists()) {
      const admin = adminSnap.data();
      if (admin.status !== "active") {
        await signOut(auth);
        return { success: false, message: "This admin account is inactive." };
      }
      return { success: true, user: cred.user, admin };
    }

    // Admin doc missing → check if bootstrap has already been used
    const bootstrapRef = doc(db, "config", "bootstrap");
    const bootstrapSnap = await getDoc(bootstrapRef);

    if (bootstrapSnap.exists()) {
      // Bootstrap already taken — this account is NOT an admin
      await signOut(auth);
      return {
        success: false,
        message:
          "This account is not registered as an admin. Ask a super admin to add you.",
      };
    }

    // Bootstrap available → create the first super admin + marker atomically
    const batch = writeBatch(db);
    const adminDoc = {
      name: cred.user.displayName || "Super Admin",
      phone,
      role: "super_admin",
      status: "active",
      createdAt: serverTimestamp(),
    };
    batch.set(adminRef, adminDoc);
    batch.set(bootstrapRef, {
      bootstrappedAt: serverTimestamp(),
      bootstrappedBy: cred.user.uid,
    });
    await batch.commit();

    return { success: true, user: cred.user, admin: adminDoc, bootstrapped: true };
  } catch (error) {
    let message = error.message;
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      message = "Phone number or password is incorrect.";
    }
    return { success: false, message };
  }
}

// ---- ADMIN REGISTER (used by super_admin in the panel — unchanged logic) ----
export async function registerAdmin(name, phone, password, role = "admin", extra = {}) {
  try {
    const email = phoneToEmail(phone);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    await updateProfile(user, { displayName: name });

    await setDoc(doc(db, "admins", user.uid), {
      name,
      phone,
      role,
      status: "active",
      email: extra.email || "",
      address: extra.address || "",
      notes: extra.notes || "",
      createdAt: serverTimestamp(),
    });

    return { success: true, user };
  } catch (error) {
    let message = error.message;
    if (error.code === "auth/email-already-in-use") {
      message = "This phone number is already registered as an admin.";
    } else if (error.code === "auth/weak-password") {
      message = "Password must be at least 6 characters.";
    }
    return { success: false, message };
  }
}

export async function logoutAdmin() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getAdminData(uid) {
  try {
    const snap = await getDoc(doc(db, "admins", uid));
    if (snap.exists()) {
      return { success: true, data: { id: snap.id, ...snap.data() } };
    }
    return { success: false, message: "Admin not found" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function updateAdmin(uid, data) {
  try {
    await setDoc(
      doc(db, "admins", uid),
      { ...data, updatedAt: serverTimestamp() },
      { merge: true }
    );
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}