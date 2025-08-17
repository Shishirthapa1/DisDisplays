"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useUserToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cookieToken = Cookies.get("userToken");
    setToken(cookieToken ?? null);
  }, []);

  return token;
};
