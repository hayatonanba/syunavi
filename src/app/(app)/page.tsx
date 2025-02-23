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
    <div className="h-[calc(100vh-4rem)] bg-[url('/bg0.png')] bg-center bg-cover bg-no-repeat">
      <div className="h-full bg-slate-800/40">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center">
            <Image
              src="/landscape_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="?"
              width={150}
              height={150}
              className="fill-white"
            />
            <h1 className="shippori-mincho-regular font-bold text-8xl text-white">
              ShuClimb
            </h1>
          </div>
          <h2 className="mb-20 text-2xl text-white">
            ーあなたのキャリアの頂点を目指してー
          </h2>
          <div className="text-center">
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
