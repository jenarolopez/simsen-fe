// app/api/adventures/route.ts
import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../../lib/firebase'

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "offers"));
    const offers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
   
    return NextResponse.json(offers);
  } catch (error: unknown) {
    console.error("Error fetching offers:", error);
    return NextResponse.json(
      { error: "Error fetching offers" },
      { status: 500 }
    );
  }
}