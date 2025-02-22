import { auth } from "@/auth";
import SignIn from "../components/sign-in";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/myPage");
  }
  return (
      <div className="grid h-screen place-content-center">
        <div className="mb-[160px]">
          <div className="mb-[15px] flex justify-center gap-8">
            <Image
              src="/landscape_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="?"
              width={209}
              height={150}
              className="fill-white"
            />
            <h1 className="shippori-mincho-regular text-8xl">
              Job Hunt <br /> Summit
            </h1>
          </div>
          <div className="text-center">
            <SignIn />
          </div>
        </div>
      </div>
  );
}
