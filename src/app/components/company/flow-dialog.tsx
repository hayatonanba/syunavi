"use client";
import React from "react";
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
          className="text-white absolute right-20 hover:cursor-pointer"
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
                className="block text-sm font-medium text-gray-700"
              >
                フロー名
              </label>
              <input
                type="text"
                id="flowName"
                name="flowName"
                value={newFlowName}
                onChange={(e) => setNewFlowName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
