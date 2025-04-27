import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/firebase";


export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log(params)
    const { status } = await request.json();
    const docRef = doc(db, "bookings", params.id);
    
    await updateDoc(docRef, {
      status: status.toLowerCase(),
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ 
      message: "Booking status updated successfully" 
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Error updating booking" },
      { status: 500 }
    );
  }
}