"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Adventures } from "../components/PickYourHeroSection";

interface AppContextType {
  adventureId: string | null;
  setAdventureId: (id: string | null) => void;
  adventures: Adventures[];
  setAdventures: Dispatch<SetStateAction<Adventures[]>>;
  bookDetails: BookDetails;
  setBookDetails: Dispatch<SetStateAction<BookDetails>>;
}

interface Tourist {
  name: string,
  email: string
}
interface BookDetails {
  fullName: string, 
  email: string,
  phoneNumber: string,
  referral: string,
  experienceId: string,
  bookDate: string,
  tourist: Tourist[]
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [adventureId, setAdventureId] = useState<string | null>(null);
  const [adventures, setAdventures] = useState<Adventures[]>([]);
  const [bookDetails, setBookDetails] = useState<BookDetails>({
    fullName: '',
    email: '',
    phoneNumber: '',
    referral: '',
    experienceId: adventureId ? adventureId : '',
    bookDate: '',
    tourist: [
      {
        name: '',
        email: ''
      }
    ]
  })
  return (
    <AppContext.Provider value={{ adventureId, setAdventureId, adventures, setAdventures, bookDetails, setBookDetails }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AdventureProvider");
  }
  return context;
}
