import { DefaultSession } from "next-auth";

export interface Address {
  id: number;
  userId: string;
  name: string;
  phonenumber: string;
  address: string;
  province: string;
  amphure: string;
  tambon: string;
  zipcode: number;
}

export interface CartItem {
  id: number;
  title: string;
  description?: string;
  price: number;
  quantity: number;
  category: {name: string };
  categoryId: number;
  images: { url: string }[];
}

export interface Order {
  id: number;
  orderbyId: number; 
  amount: number; 
  cartTotal: number; 
  currency: string; 
  status: string; 
  orderStatus: string; 
  createdAt: string;
  updatedAt: string; 
}

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    image?: string;
    enabled: boolean;
    carts: CartItem[];
    addresses: Address[];
    orders: Order[];
    favorite: Favorite[];
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

interface Favorite {
  id: number;
  productId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}