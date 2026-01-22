"use server";
import { cookies } from "next/headers";
import { getMockAuthToken } from "../mock-data/users";

const DEMO_MODE = true;

export async function getAuthToken() {
  if (DEMO_MODE) {
    // In demo mode, try to get token from mock storage
    // This won't work server-side, so return a demo token
    return "demo-jwt-token";
  }

  const authToken = (await cookies()).get("jwt")?.value;
  return authToken;
}
