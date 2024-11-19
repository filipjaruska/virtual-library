"use server";
import { cookies } from "next/headers";

export async function getAuthToken() {
  const authToken = (await cookies()).get("jwt")?.value;
  console.log("Auth Token:", authToken); //TODO remove
  return authToken;
}
