"use client";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

type NextSenkouButtonProps = {
  senkouId: string;
  flowStatus: number;
};

const NextSenkouButton = ({ senkouId, flowStatus }: NextSenkouButtonProps) => {
  const router = useRouter();

  const reverseSenkouFlow = async (senkouId: string, flowStatus: number) => {
    console.log(senkouId, flowStatus);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${senkouId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            flowStatus: flowStatus,
          }),
        }
      );
      if (!response.ok) {
        console.log("おめでとう");
        return null;
      }
    } catch (e) {
      console.log(e);
    } finally {
      router.push(`${senkouId}`);
      router.refresh();
    }
  };
  const forwardSenkouFlow = async (senkouId: string, flowStatus: number) => {
    console.log(senkouId, flowStatus);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${senkouId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            flowStatus: flowStatus,
          }),
        }
      );
      if (!response.ok) {
        console.log("おめでとう");
        return null;
      }
    } catch (e) {
      console.log(e);
    } finally {
      router.push(`${senkouId}`);
      router.refresh();
    }
  };

  const nextFlowStatus = flowStatus + 1;
  const reverseFlowStatus = flowStatus - 1;
  return (
    <>
      {flowStatus > 1 && (
        <Button onClick={() => reverseSenkouFlow(senkouId, reverseFlowStatus)}>
          前の選考に戻る
        </Button>
      )}
      <Button onClick={() => forwardSenkouFlow(senkouId, nextFlowStatus)}>
        次の選考へ進む
      </Button>
    </>
  );
};

export default NextSenkouButton;
