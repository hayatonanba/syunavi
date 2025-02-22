// import { SignOut } from "@/src/app/components/sign-out";
// import { auth } from "@/auth";
import React from "react";
import { Mountain } from "lucide-react";

const Header = async () => {
  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="font-bold">Job Hunt Summit</span>
        </div>

        <span className="ml-2 text-sm text-muted-foreground hidden sm:inline-block">
          あなたのキャリアの頂上を目指して
        </span>
      </div>
    </header>
  );
};

export default Header;
