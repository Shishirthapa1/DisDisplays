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
        <div className="flex h-screen">
            {/* Sidebar - fixed width */}
            <aside
                className={`transition-all duration-300 ease-in-out ${open ? "w-[16%]" : "w-[8%]"
                    } bg-gray-100 h-full p-4 shadow-lg`}
            >
                <SideBar open={open} setOpen={setOpen} />
            </aside>

            {/* Main content */}
            <section className={` ${open ? "w-[84%]" : "w-[92%]"} h-full overflow-y-auto p-6`}>
                {children}
            </section>
        </div>
    </PageLayout>;
}
