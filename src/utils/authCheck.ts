import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export async function authCheck() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session?.user.role !== "admin") {
    return null;
  }

  return session.user;
}
