// ui
import Navbar from "@/ui/navbar";
import Footer from "@/ui/footer";

// hooks
import { RootContextProvider } from "@/hooks/rootContext";
import { ReduxProvider } from "@/app/provider";

interface PageLayoutProps {
  root: boolean;
  children: React.ReactNode;
  showNavbarFooter?: boolean;
}

export default function PageLayout({ root, children, showNavbarFooter = true }: PageLayoutProps) {
  return (
    <>
      <RootContextProvider root={root}>
        {showNavbarFooter && (
          <Navbar />
        )}
        <main>{children}</main>
        {showNavbarFooter && (
          <Footer />
        )}
      </RootContextProvider>
    </>
  );
}
