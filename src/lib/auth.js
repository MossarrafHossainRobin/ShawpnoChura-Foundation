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
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

// phone -> fake email
function phoneToEmail(phone) {
  const clean = String(phone).replace(/\D/g, "");
  return `${clean}@shapnochura.local`;
}

// ---- LOGIN ----
export async function loginUser(phone, password) {
  try {
    const email = phoneToEmail(phone);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: cred.user };
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

// ---- REGISTER (admin creates user with full profile) ----
export async function registerUser(name, phone, password, role = "user", extra = {}) {
  try {
    const email = phoneToEmail(phone);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    await updateProfile(user, { displayName: name });

    const profile = {
      name,
      phone,
      role,
      status: "active",
      // extra profile fields from the admin form
      fatherName: extra.fatherName || "",
      motherName: extra.motherName || "",
      dateOfBirth: extra.dateOfBirth || "",
      gender: extra.gender || "",
      bloodGroup: extra.bloodGroup || "",
      nid: extra.nid || "",
      occupation: extra.occupation || "",
      address: extra.address || "",
      district: extra.district || "",
      emergencyContact: extra.emergencyContact || "",
      joiningDate: extra.joiningDate || "",
      notes: extra.notes || "",
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.uid), profile);

    return { success: true, user };
  } catch (error) {
    let message = error.message;
    if (error.code === "auth/email-already-in-use") {
      message = "This phone number is already registered.";
    } else if (error.code === "auth/weak-password") {
      message = "Password must be at least 6 characters.";
    }
    return { success: false, message };
  }
}
// ---- LOGOUT ----
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// ---- GET USER DATA ----
export async function getUserData(uid) {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    if (snap.exists()) {
      return { success: true, data: { id: snap.id, ...snap.data() } };
    }
    return { success: false, message: "User not found" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// ---- GET CURRENT USER ROLE ----
export async function getCurrentUserRole() {
  try {
    const current = auth.currentUser;
    if (!current) return { success: false, message: "Not signed in" };
    const res = await getUserData(current.uid);
    if (!res.success) return res;
    return { success: true, role: res.data.role };
  } catch (error) {
    return { success: false, message: error.message };
  }
}