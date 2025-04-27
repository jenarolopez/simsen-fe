import { NextResponse } from "next/server";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../../../lib/firebase';

export async function POST(request: Request) {
  try {
    const { adventureId, userId = "default" } = await request.json();
    
    // Check if already favorited
    const favoritesRef = collection(db, "favorites");
    const q = query(
      favoritesRef, 
      where("adventureId", "==", adventureId),
      where("userId", "==", userId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Remove favorite if it exists
      const docId = querySnapshot.docs[0].id;
      await deleteDoc(doc(db, "favorites", docId));
      return NextResponse.json({ favorited: false });
    }

    // Add new favorite
    await addDoc(favoritesRef, {
      adventureId,
      userId,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ favorited: true });
  } catch (error) {
    console.error("Error managing favorite:", error);
    return NextResponse.json(
      { error: "Error managing favorite" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default';
    
    const favoritesRef = collection(db, "favorites");
    const querySnapshot = await getDocs(favoritesRef);

    // Find document that matches the userId and return its hearts array
    const userDoc = querySnapshot.docs.find(doc => doc.id === userId);
    const favorites = userDoc ? userDoc.data().heart || [] : [];

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Error fetching favorites" },
      { status: 500 }
    );
  }
}