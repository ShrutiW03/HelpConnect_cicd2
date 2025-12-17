import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  isLoggedIn?: boolean;
  userName?: string;
}

const Layout = ({ children, isLoggedIn = false, userName = "User" }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={isLoggedIn} userName={userName} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
