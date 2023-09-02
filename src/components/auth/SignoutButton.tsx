"use client";
import { FC } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface SignoutProps {
  className?: string;
}

const Signout: FC<SignoutProps> = ({ className }) => {
  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start", className)}
      onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
    >
      Sign out
    </Button>
  );
};

export default Signout;
