"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, SidebarToggleButton } from "../../components/ui/sidebar";
import {
    IconBox,
    IconBrandTabler,
    IconLayoutDashboard,
    IconLogout,
    IconShoppingCart,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import LogoutDialog from "@/components/LogoutDialog";
import { useRouter } from "next/navigation";
import { set } from "zod";

interface SideBarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SideBar({
    open, setOpen }: SideBarProps) {
    const [logoutOpen, setLogoutOpen] = useState(false);

    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("userToken");
        localStorage.removeItem("user");
        toast.success("Logged out successfully")
        router.push("/sign-in");
    };
    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: (
                <IconLayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Category",
            href: "/dashboard/category",
            icon: (
                <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Products",
            href: "/dashboard/products",
            icon: (
                <IconBox className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Orders",
            href: "/dashboard/orders",
            icon: (
                <IconShoppingCart className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Logout",
            icon: (
                <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
            onClick: () => setLogoutOpen(true),
        },
    ];

    return (
        <div
            className={cn(
                "flex w-full flex-1 flex-col overflow-hidden rounded-md bg-gray-100 md:flex-row md:h-screen",
            )}
        >
            <LogoutDialog
                isOpen={logoutOpen}
                onClose={() => setLogoutOpen(false)}
                onClick={handleLogout}
            />
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {/* Logo and Toggle Button Container */}
                        <div className="flex items-center w-full justify-between mb-4">
                            <Logo open={open} setOpen={setOpen} />
                            <div className="md:flex hidden">
                                {/* <SidebarToggleButton /> */}
                            </div>


                        </div>

                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    );
}

export const Logo = ({ open, setOpen }: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}) => {
    return (
        <div
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal cursor-pointer text-black"
            onClick={() => setOpen(!open)}
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
            {open && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium whitespace-pre text-black dark:text-white lg:text-base md:text-sm text-sm"
                >
                    Dis Displays
                </motion.span>
            )}

        </div>
    );
};