"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, SidebarToggleButton } from "../../components/ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import LogoutDialog from "@/components/LogoutDialog";

interface SideBarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SideBar({
    open, setOpen }: SideBarProps) {
    const [logoutOpen, setLogoutOpen] = useState(false);


    const handleLogout = () => {
        Cookies.remove("userToken");
        localStorage.removeItem("user");
        toast.success("Logged out successfully")
        window.location.href = "/sign-in";
    };
    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: (
                <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Category",
            href: "/dashboard/category",
            icon: (
                <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Products",
            href: "/dashboard/products",
            icon: (
                <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Orders",
            href: "/dashboard/orders",
            icon: (
                <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Logout",
            icon: (
                <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
            onClick: () => setLogoutOpen(true),
        },
    ];

    return (
        <div
            className={cn(
                "flex w-full flex-1 flex-col overflow-hidden rounded-md bg-gray-100 md:flex-row",
                "h-screen",
            )}
        >
            <LogoutDialog
                isOpen={logoutOpen}
                onClose={() => setLogoutOpen(false)}
                onClick={handleLogout}
            />
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="w-full justify-between gap-10">
                    <div className="flex w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {/* Logo and Toggle Button Container */}
                        <div className="flex items-center w-full justify-between mb-4">
                            <Logo open={open} />
                            <SidebarToggleButton />
                        </div>

                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    {/* <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <img
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div> */}
                </SidebarBody>
            </Sidebar>
        </div>
    );
}

export const Logo = ({ open }: { open: boolean }) => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >

            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
            {open && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium whitespace-pre text-black dark:text-white"
                >
                    Dis Displays
                </motion.span>
            )}

        </a>
    );
};