import { NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../lib/firebase";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const newParams = await params;
    console.log(newParams)
    const body = await request.json();
    const docRef = doc(db, "adventures", newParams.id);
   
    await updateDoc(docRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      message: "Booking updated successfully",
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Error updating booking" },
      { status: 500 }
    );
  }
}
