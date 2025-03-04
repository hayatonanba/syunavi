import { signIn } from "../../../auth";
import Image from "next/image";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/myPage" });
      }}
      className="flex flex-col items-center space-y-4"
    >
      <button
        className="flex scale-110 rounded-3xl bg-[#F2F2F2] px-3 py-1"
        type="submit"
      >
        <Image
          src={"/google-logo.svg"}
          alt="Google Logo"
          width="24"
          height="24"
        />
        <span className="text">Sign in with Google</span>
      </button>
    </form>
  );
}
