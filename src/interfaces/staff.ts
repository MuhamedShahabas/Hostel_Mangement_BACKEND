import { Document } from "mongoose";

export interface IStaffAddress {
  building: string;
  city: string;
  pin: number;
  state: string;
  country: string;
}

export interface IStaff extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
  role: "warden" | "chef" | "maintenance";
  gender: "male" | "female";
  profilePic: string;
  address: IStaffAddress;
}

export type Department = "maintenance" | "chef" | "warden";

export interface IMealPlan extends Document {
  title: string;
  price: number;
  breakfast: string;
  lunch: string;
  evening: string;
  dinner: string;
  active?: boolean;
  subscribers?: number;
}
