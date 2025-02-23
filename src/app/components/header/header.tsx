import SignOut from "@/src/app/components/sign-out";
import { auth } from "@/auth";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

const Header = async () => {
  const session = await auth();
  return (
    <header className="relative top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <div className="flex items-center ">
          <Image
            src="/landscape_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
            alt="?"
            width={30}
            height={25}
          />
          <span className="font-bold text-2xl">ShuClimb</span>
        </div>

        <span className="ml-3 hidden text-muted-foreground text-sm sm:inline-block">
          あなたのキャリアの頂上を目指して
        </span>

        <div className="flex flex-1 items-end justify-end space-x-4">
          {session?.user?.image && (
            <Avatar>
              <AvatarImage src={session?.user?.image ?? undefined} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
          <nav className="flex items-center space-x-2">
            {session?.user && <SignOut />}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
