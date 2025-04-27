// app/api/adventures/route.ts
import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../../lib/firebase'

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "testimonials"));
    const adventures = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
   
    return NextResponse.json(adventures);
  } catch (error: unknown) {
    console.error("Error fetching adventures:", error);
    return NextResponse.json(
      { error: "Error fetching adventures" },
      { status: 500 }
    );
  }
}