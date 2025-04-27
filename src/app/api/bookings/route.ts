import { NextResponse } from "next/server";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../../../../lib/firebase';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    const bookings = querySnapshot.docs.map((doc) => ({
      referenceId: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Error fetching bookings" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Add timestamp and UUID
    const bookingWithTimestamp = {
      ...body,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, "bookings"), bookingWithTimestamp);

    return NextResponse.json({ 
      message: "Booking created successfully", 
      bookingId: docRef.id,
      bookingUUID: bookingWithTimestamp.id 
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Error creating booking" },
      { status: 500 }
    );
  }
}