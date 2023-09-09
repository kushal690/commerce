import { FC } from "react";
import MainNav from "./main-nav";
import MiniNavbar from "./mini-navbar";

interface siteHeaderProps { }

const SiteHeader: FC<siteHeaderProps> = ({ }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center">
        <MainNav />
        <MiniNavbar />
      </div>
    </header>
  );
};

export default SiteHeader;
