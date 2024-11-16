"use server";
import { cookies } from "next/headers";

export async function getHidePopupCookie() {
  const cookie = (await cookies()).get("hideKbarPopup")?.value;
  return cookie === "true";
}

export async function setHidePopupCookie(value: boolean) {
  const jar = await cookies();
  jar.set("hideKbarPopup", value.toString());
}
