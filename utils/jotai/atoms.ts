import { User } from "@supabase/supabase-js";
import { atom } from "jotai";

export const userAtom = atom<User | null>(null);
export const selectedUserIdAtom = atom<string>("");
export const selectedUserIndexAtom = atom<number>(0);

export const presenceStateAtom = atom<string>("");
