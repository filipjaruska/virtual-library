"use server";
import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";
import { getMockAuthUser } from "../mock-data/users";

const query = qs.stringify({
  populate: { image: { fields: ["url", "alternativeText"] } },
});

const DEMO_MODE = true;

export async function getUserMeLoader() {
  if (DEMO_MODE) {
    // Simulate async delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Try to get mock user - in demo mode, we'll return a demo user
    const demoUser = {
      id: 1,
      username: "demo_user",
      email: "demo@example.com",
      favoriteBooks: [],
    };

    return { ok: true, data: demoUser, error: null };
  }

  const baseUrl = getStrapiURL();

  const url = new URL("/api/users/me", baseUrl);
  url.search = query;

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
