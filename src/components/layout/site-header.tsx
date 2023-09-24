import { FC } from "react";
import MainNav from "./main-nav";
import MiniNavbar from "./mini-navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Icons } from "../icons";
import { Separator } from "../ui/separator";
import Logout from "../auth/LogoutButton";
import LoginButton from "../auth/LoginButton";
import CartSheet from "../sheets/cart-sheet";

interface siteHeaderProps { }

const SiteHeader: FC<siteHeaderProps> = async ({ }) => {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-40 w-full px-4 border-b bg-background">
      <div className="flex h-16 space-x-2 items-center">
        <MainNav session={session} />
        <MiniNavbar />
        <CartSheet />
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className=" h-8 w-8">
                <AvatarImage
                  src={session.user?.image ?? ""}
                  alt={session.user?.name ?? "joe@gmail.com"}
                />
                <AvatarFallback className="uppercase">
                  {session.user?.email?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session.user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <Separator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/account">
                  <Icons.user className="mr-2 h-4 w-4" aria-hidden="true" />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/stores">
                  <Icons.terminal className="mr-2 h-4 w-4" aria-hidden="true" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/upload">
                  <Icons.upload className="mr-2 h-4 w-4" aria-hidden="true" />
                  Upload Product
                </Link>
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem>
                <Logout />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginButton className="h-8" />
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
