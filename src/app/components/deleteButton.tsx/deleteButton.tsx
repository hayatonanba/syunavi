"use client";

import { useRouter } from "next/navigation";
import React from "react";

type DeleteButtonProps = {
  senkouId: string;
};

export default function DeleteButton({ senkouId }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!confirm("本当に削除しますか？")) {
      return;
    }
    try {
      const res = await fetch(
        `https://yq0fype0f5.execute-api.us-east-1.amazonaws.com/prod/senkous/${senkouId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        alert("削除に失敗しました。");
        return;
      }
      router.refresh();
    } catch (error) {
      console.error("削除エラー:", error);
      alert("エラーが発生しました。");
    }
  };

  return (
    <button type="button" onClick={handleDelete}>
      削除
    </button>
  );
}
