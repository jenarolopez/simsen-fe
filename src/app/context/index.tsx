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
  stepsOpen: boolean;
  setStepsOpen: Dispatch<SetStateAction<boolean>>;
  bookDetails: BookDetails;
  setBookDetails: Dispatch<SetStateAction<BookDetails>>;
  resetForm: boolean, 
  setResetForm: Dispatch<SetStateAction<boolean>>;
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
  numberOfTourist: string,
  tourist: Tourist[]
}

export const defaultBooking = {
  fullName: '',
  email: '',
  phoneNumber: '',
  referral: '',
  experienceId: '',
  bookDate: '',
  numberOfTourist: '1',
  tourist: [
    {
      name: '',
      email: ''
    }
  ]
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [adventureId, setAdventureId] = useState<string | null>(null);
  const [resetForm, setResetForm] = useState<boolean>(false);
  const [adventures, setAdventures] = useState<Adventures[]>([]);
  const [bookDetails, setBookDetails] = useState<BookDetails>({
    ...defaultBooking,
    experienceId: adventureId ? adventureId : ""
  })
  const [stepsOpen, setStepsOpen] = useState(false)
  return (
    <AppContext.Provider value={{ adventureId, setAdventureId, adventures, setAdventures, bookDetails, setBookDetails, stepsOpen, setStepsOpen, resetForm, setResetForm }}>
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
