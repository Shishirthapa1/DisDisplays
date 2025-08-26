import Link from "next/link";
import { usePathname } from "next/navigation";

// ui
import NavDropdown from "@/ui/navbar/navDropdown";
import { NavLinkProps } from "@/ui/navbar/definition";

// lib
import { cn } from "@/lib/utils";
import { useGetAllCategoriesQuery } from "@/redux/api/rest/query/queryApi";

export default function NavLinks() {
  const pathname = usePathname();
  const { data: categories } = useGetAllCategoriesQuery();
  const categoriesData = categories?.categories || [];

  // Build dynamic subLinks for "Shop" using categories
  const shopSubLinks: NavLinkProps[] = [
    {
      id: "all-categories",
      path: "/shop",
      name: "All Categories",
    },
    ...categoriesData.map((cat: any) => ({
      id: cat._id,
      path: `/shop?category=${encodeURIComponent(cat.name)}&id=${cat._id}`,
      name: cat.name,
    })),
  ];

  const links: NavLinkProps[] = [
    {
      id: "home",
      path: "/",
      name: "Home",
    },
    {
      id: "shop",
      path: "/shop",
      name: "Shop",
      subLinks: shopSubLinks,
    },
    {
      id: "contact-us",
      path: "/contact-us",
      name: "Contact Us",
    },
  ];

  return (
    <ul className="flex lg:justify-center lg:gap-10">
      {links.map((link) => (
        <li
          key={link.id}
          className={cn(
            "font-inter text-sm font-medium text-[#141718] hover:opacity-100",
            pathname !== link.path && "opacity-70"
          )}
        >
          {link.subLinks ? (
            <NavDropdown link={link} />
          ) : (
            <Link href={link.path}>{link.name}</Link>
          )}
        </li>
      ))}
    </ul>
  );
}
