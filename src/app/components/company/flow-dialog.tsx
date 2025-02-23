"use client";
import type React from "react";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { redirect } from "next/navigation";

const FlowDialog = () => {
  const [newFlowName, setNewFlowName] = useState("");
  const [open, setOpen] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setOpen(false);
    setNewFlowName("");
    redirect("/company");
    return;
    // POSTリクエストを送信する
    // const response = await fetch("/api/flows", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ companyId, flowName: newFlowName }),
    // });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Plus
          className="absolute right-20 text-white hover:cursor-pointer"
          // onClick={handlePlusClick}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新しいフローを追加</DialogTitle>

          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="flowName"
                className="block font-medium text-gray-700 text-sm"
              >
                フロー名
              </label>
              <input
                type="text"
                id="flowName"
                name="flowName"
                value={newFlowName}
                onChange={(e) => setNewFlowName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 font-medium text-sm text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                追加
              </button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FlowDialog;
