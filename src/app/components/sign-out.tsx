import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit">
        <LogOut type="submit" />
      </button>
    </form>
  );
}
