"use client";
import { Button } from "@/src/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const Header = () => {
  return (
    <div>
      <header>
        <Button onClick={() => signOut()}>ログアウト</Button>
      </header>
    </div>
  );
};

export default Header;
