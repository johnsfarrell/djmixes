"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Logs the user out by deleting the auth token cookie and redirecting to the login page.
 */
export async function logout() {
  (await cookies()).delete("auth-token"); // Delete the auth token cookie
  redirect("/login");
}
