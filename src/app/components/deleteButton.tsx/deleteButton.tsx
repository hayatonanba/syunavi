"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { handleDelete } from "../../(app)/myPage/page";

type DeleteButtonProps = {
  senkouId: string;
};

export default function DeleteButton({ senkouId }: DeleteButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    await handleDelete(senkouId).catch(() => {});
    router.push(`myPage`);
    router.refresh();
  };

  return (
    <button type="button" onClick={handleClick}>
      <Trash2 size={18} />
    </button>
  );
}
