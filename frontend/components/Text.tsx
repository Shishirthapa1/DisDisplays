"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/configUser";

export default function TestDispatch() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setUser({ name: "DevTools Test User" }));
    }, []);

    return null;
}
