import { SignOut } from "@/src/app/components/sign-out";
import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const Header = async () => {
  const session = await auth();
  if (!session) {
      redirect("/");
    }
  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <div className="flex items-center space-x-2">
          <Image
            src="/landscape_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
            alt="?"
            width={30}
            height={25}
          />
          <span className="font-bold">Job Hunt Summit</span>
        </div>

        <span className="ml-2 text-sm text-muted-foreground hidden sm:inline-block">
          あなたのキャリアの頂上を目指して
        </span>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <SignOut />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
