'use client';

import type { Metadata } from "next";

import PageLayout from "@/layouts/pageLayout";
import { SideBar } from "./SideBar";
import { useState } from "react";

// export const metadata: Metadata = {
//     title: "Dis Displays",
//     description: "A Ecommerce store for all your car accessories and car display needs.",
// };

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const [open, setOpen] = useState(true);
    return <PageLayout showNavbarFooter={false} root={false}>
        <div className="flex md:flex-row flex-col h-screen">
            {/* Sidebar */}
            <aside
                className={`transition-all duration-300 ease-in-out bg-gray-100  p-4 shadow-lg
      ${open ? "md:w-1/5 w-full" : "md:w-[80px] w-full"}
    `}
            >
                <SideBar open={open} setOpen={setOpen} />
            </aside>

            {/* Main content */}
            <section
                className={`flex-1 h-full overflow-y-auto p-6 transition-all duration-300`}
            >
                {children}
            </section>
        </div>

    </PageLayout>;
}
