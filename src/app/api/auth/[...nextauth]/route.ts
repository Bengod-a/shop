// import NextAuth, { AuthOptions } from "next-auth";
// import bcrypt from "bcrypt";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "@/lib/db";

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials): Promise<any> {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password are required");
//         }

//         try {
//           const user: any = await prisma.user.findUnique({
//             where: { email: credentials.email.toLowerCase() },
//             include: { carts: true, addresses: true, orders: true }, 
//           });

//           if (!user) {
//             throw new Error("ไม่พบผู้ใช้");
//           }

//           const enabled = user.enabled.toString() === "false";

//           if (enabled) {
//             throw new Error("บัญชีของคุณถูกปิดใช้งาน");
//           }

//           const isPasswordValid = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );

//           if (!isPasswordValid) {
//             throw new Error("รหัสผ่านไม่ถูกต้อง");
//           }

//           return {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//             role: user.role,
//             image: user.image,
//             enabled: user.enabled,
//             carts: user.carts ?? [], 
//             addresses: user.addresses ?? [], 
//             orders: user.orders ?? [], 
//             favorite: user.favorite ?? [], 
//           };
//         } catch (error: any) {
//           console.error("Auth error:", error);
//           throw new Error(error.message || "Authentication failed");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: any) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.name = user.name;
//         token.role = user.role;
//         token.image = user.image;
//         token.enabled = user.enabled;
//         token.carts = user.carts ?? [];
//         token.addresses = user.addresses ?? [];
//         token.orders = user.orders ?? [];
//         token.favorite = user.favorite ?? [];
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       const user: any = await prisma.user.findUnique({
//         where: { id: token.id },
//         include: { carts: true, addresses: true, orders: true, favorite: {
//           include: { product: { include: { images: true } } }, 
//         }, }, 
//       });

//       if (session.user) {
//         session.user.id = user.id;
//         session.user.email = user.email;
//         session.user.name = user.name;
//         session.user.role = user.role;
//         session.user.image = user.image;
//         session.user.enabled = user.enabled;
//         session.user.carts = user.carts ?? [];
//         session.user.addresses = user.addresses ?? [];
//         session.user.orders = user.orders ?? [];
//         session.user.favorite = user.favorite.map((fav:any) => ({
//           id: fav.id,
//           productId: fav.productId,
//           userId: fav.userId,
//           createdAt: fav.createdAt,
//           updatedAt: fav.updatedAt,
//           product: fav.product,
//         })) ?? [];
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/api/auth/login",
//     signOut: "/",
//     error: "/api/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60,
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };