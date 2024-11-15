import { cookies } from "next/headers";

export async function getAuthToken() {
  const authToken = (await cookies()).get("jwt")?.value;
  return authToken;
}
