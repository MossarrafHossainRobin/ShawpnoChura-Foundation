import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

// Generate simple receipt number
function generateReceiptNo() {
  const year = new Date().getFullYear();
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `DON-${year}-${randomNumber}`;
}

// Add new donation
export async function addDonation(donationData) {
  try {
    const docRef = await addDoc(collection(db, "donations"), {
      donorName: donationData.donorName,
      donorPhone: donationData.donorPhone,
      amount: Number(donationData.amount),
      donationType: donationData.donationType,
      fundId: donationData.fundId,
      paymentMethod: donationData.paymentMethod,
      transactionId: donationData.transactionId || "",
      status: donationData.status || "verified",
      receiptNo: generateReceiptNo(),
      date: donationData.date || new Date().toISOString().split("T")[0],
      note: donationData.note || "",
      addedBy: donationData.addedBy || "",
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
      message: "Donation added successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// Get all donations
export async function getDonations() {
  try {
    const q = query(collection(db, "donations"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const donations = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return {
      success: true,
      data: donations,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
}

// Update donation
export async function updateDonation(donationId, donationData) {
  try {
    const donationRef = doc(db, "donations", donationId);

    await updateDoc(donationRef, {
      ...donationData,
      amount: Number(donationData.amount),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Donation updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// Update donation status
export async function updateDonationStatus(donationId, status) {
  try {
    const donationRef = doc(db, "donations", donationId);

    await updateDoc(donationRef, {
      status,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Donation status updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// Delete donation
export async function deleteDonation(donationId) {
  try {
    await deleteDoc(doc(db, "donations", donationId));

    return {
      success: true,
      message: "Donation deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// Calculate total donation amount
export function calculateTotalDonations(donations = []) {
  return donations.reduce((total, donation) => {
    if (donation.status === "verified") {
      return total + Number(donation.amount || 0);
    }

    return total;
  }, 0);
}