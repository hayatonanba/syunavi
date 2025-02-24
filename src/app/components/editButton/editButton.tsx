"use client";

import { FormEvent, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function FlowEditButton({ senkouId, flowId, initialContent, initialDate }: { senkouId: string; flowId: string; initialContent?: string; initialDate?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(initialContent || "");
  const [date, setDate] = useState(initialDate || "");

  const router = useRouter();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      [flowId]: {
        ...(content && { content }),
        ...(date && { date }),
      },
    };

    console.log("body", body);
    console.log("PUTURL", `${process.env.NEXT_PUBLIC_BASE_URL}/${senkouId}`);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${senkouId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setIsOpen(false);

      if (!res.ok) {
        throw new Error(`HTTPエラー: ${res.status}`);
      }
      alert("保存しました。");
      
    } catch (error) {
      router.push(`/senkous/${senkouId}`)
      router.refresh();
    }finally{
      router.push(`/senkous/${senkouId}`)
      router.refresh();
    }
    setIsOpen(false)
  };

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        <Pencil size={18} />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{flowId}を編集</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {initialDate && (
              <div>
                <label className="font-bold">日付</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded border-gray-300"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            )}

            {initialContent !== undefined && (
              <div>
                <label className="font-bold">内容</label>
                <textarea
                  className="mt-1 block w-full rounded border-gray-300"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button onClick={handleSave}>保存</Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                キャンセル
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
