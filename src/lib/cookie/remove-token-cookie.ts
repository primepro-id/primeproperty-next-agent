"use server";
import { cookies } from "next/headers";

export const removeTokenCookie = async () => {
  const cookie = await cookies();
  const cookieAccessToken = cookie.delete("accessToken");
  const cookieRefreshToken = cookie.delete("refreshToken");
  return {
    accessToken: cookieAccessToken?.toString(),
    refreshToken: cookieRefreshToken?.toString(),
  };
};
