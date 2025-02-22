import { SignOut } from "@/src/app/components/sign-out";
import { auth } from "@/auth";
import React from "react";
import { Mountain } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const Header = async () => {
  const session = await auth();
  return (
    <header className="relative top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">

        <div className="flex items-center space-x-2">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="font-bold">Job Hunt Summit</span>
        </div>

        <span className="ml-2 text-sm text-muted-foreground hidden sm:inline-block">
          あなたのキャリアの頂上を目指して
        </span>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {session?.user ? (
              <SignOut />
            ) : (
              <Button asChild variant="default">
                <a href="/signin">ログイン</a>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
