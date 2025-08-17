"use client";

// package
import { useEffect, useState } from "react";

// ui
import Logo from "@/ui/assets/logo";
import {
  CartIcon,
  HamburgerMenu,
  NotificationCount,
  SearchIcon,
  UserIcon,
} from "@/ui/assets/svg";
import NavLinks from "@/ui/navbar/navLinks";
import NavMobile from "@/ui/navbar/navMobile";
import PromoSection from "@/ui/promo";

// hooks
import { useRootContext } from "@/hooks/rootContext";

// lib
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useUserToken } from "@/hooks/useUserToken";
import { useRouter } from "next/navigation";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = () => {
  const isRootPage = useRootContext();
  const [open, setOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);
  const token = useUserToken();
  const router = useRouter();

  const handleNavigate = () => {
    if (token) router.push("/dashboard");
    else router.push("/sign-in");
  };

  const handleCartNavigate = () => {
    router.push("/cart");
  };

  const handleOnScroll = () => {
    window.scrollY >= 32 ? setScroll(true) : setScroll(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);

    return () => window.removeEventListener("scroll", handleOnScroll);
  }, []);

  return (
    <>
      {!open && <PromoSection />}
      <div
        className={cn(
          "sticky top-0 z-[100]",
          isRootPage ? "bg-[#ffc95c]" : "bg-white",
          scroll && "bg-white shadow transition-colors duration-200 ease-in",
        )}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4 lg:justify-normal">
          <div className="flex items-center gap-1 lg:basis-1/4">
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <HamburgerMenu className="w-6" />
            </button>

            <Logo />
          </div>

          <div className="hidden basis-2/4 lg:block">
            <NavLinks />
          </div>

          <div className="flex items-center gap-1 lg:basis-1/4 lg:justify-end lg:gap-4">
            {/* <SearchIcon className="hidden lg:block" /> */}
            <div onClick={handleNavigate} className="cursor-pointer" >
              <UserIcon className="" />
            </div>
            <div onClick={handleCartNavigate} className="cursor-pointer"
            >
              <CartIcon className="w-6" />
              {/* <NotificationCount
              count={2}
              className={cn(isRootPage ? "text-[#FFAB00]" : "text-white")}
            /> */}
            </div>
          </div>

          {/* mobile navbar  */}
          <NavMobile open={open} onClick={() => setOpen(false)} />
        </nav>
      </div>
    </>
  );
};

export default Navbar;
