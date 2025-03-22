"use server";

import { revalidatePath } from "next/cache";
import { getUserMeLoader } from "@/lib/services/get-user-me-loader";
import { mutateData } from "@/lib/services/mutate-data";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";
import { getAuthToken } from "../services/get-token";

export async function getFavoriteBooks() {
  const query = qs.stringify({
    populate: {
      favoriteBooks: {
        populate: {
          image: {
            fields: ["url", "alternativeText", "formats"],
          },
          tags: {
            fields: ["name"],
          },
        },
      },
    },
  });

  try {
    const response = await fetch(`${getStrapiURL()}/api/users/me?${query}`, {
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    });

    const data = await response.json();
    return { ok: true, data: data.favoriteBooks, error: null };
  } catch (error) {
    return { ok: false, data: null, error: "Failed to fetch favorite books" };
  }
}

export async function addToFavorites(bookId: number) {
  const user = await getUserMeLoader();

  if (!user.ok) {
    return { ok: false, error: "User not authenticated" };
  }

  const userId = user.data.id;
  const query = qs.stringify({ populate: ["favoriteBooks"] });

  try {
    const currentUserData = await fetch(
      `${getStrapiURL()}/api/users/${userId}?${query}`,
      {
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      }
    ).then((res) => res.json());

    const currentFavorites =
      currentUserData.favoriteBooks?.map((book: any) => book.id) || [];

    if (!currentFavorites.includes(bookId)) {
      await mutateData("PUT", `/api/users/${userId}`, {
        favoriteBooks: [...currentFavorites, bookId],
      });

      revalidatePath("/dashboard/favorites");
      revalidatePath(`/books/${bookId}`);

      return { ok: true, error: null };
    }

    return { ok: true, error: null, message: "Book already in favorites" };
  } catch (error) {
    return { ok: false, error: "Failed to add book to favorites" };
  }
}

export async function removeFromFavorites(bookId: number) {
  const user = await getUserMeLoader();

  if (!user.ok) {
    return { ok: false, error: "User not authenticated" };
  }

  const userId = user.data.id;
  const query = qs.stringify({ populate: ["favoriteBooks"] });

  try {
    const currentUserData = await fetch(
      `${getStrapiURL()}/api/users/${userId}?${query}`,
      {
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      }
    ).then((res) => res.json());

    const currentFavorites =
      currentUserData.favoriteBooks?.map((book: any) => book.id) || [];

    const newFavorites = currentFavorites.filter((id: number) => id !== bookId);

    await mutateData("PUT", `/api/users/${userId}`, {
      favoriteBooks: newFavorites,
    });

    revalidatePath("/dashboard/favorites");
    revalidatePath(`/books/${bookId}`);

    return { ok: true, error: null };
  } catch (error) {
    return { ok: false, error: "Failed to remove book from favorites" };
  }
}

export async function isBookFavorited(bookId: number) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { ok: false, isFavorited: false, error: "User not authenticated" };
    }

    const query = qs.stringify({
      populate: {
        favoriteBooks: true,
      },
    });

    const response = await fetch(`${getStrapiURL()}/api/users/me?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        ok: false,
        isFavorited: false,
        error: "Failed to fetch user data",
      };
    }

    const userData = await response.json();
    const favoriteBooks =
      userData.favoriteBooks?.data || Array.isArray(userData.favoriteBooks)
        ? userData.favoriteBooks
        : [];

    const isFavorited = favoriteBooks.some(
      (book: any) => String(book.id) === String(bookId)
    );

    return { ok: true, isFavorited, error: null };
  } catch (error) {
    return {
      ok: false,
      isFavorited: false,
      error: "Failed to check favorites",
    };
  }
}
