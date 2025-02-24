"use client";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

type NextSenkouButtonProps = {
  senkouId: string;
  flowStatus: number;
  maxStatus: number;
};

const NextSenkouButton = ({ senkouId, flowStatus, maxStatus }: NextSenkouButtonProps) => {
  const router = useRouter();

  const forwardSenkouFlow = async (senkouId: string, flowStatus: number) => {
    console.log(senkouId, flowStatus);

    const nextFlowStatus = flowStatus + 1;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${senkouId}`,
        {
          method: "PUT",
          body: JSON.stringify(
            nextFlowStatus > maxStatus
              ? { status: status + 1 } // maxStatus 超えたら status +1
              : { flowStatus: nextFlowStatus } // それ以外は flowStatus を増やす
          ),
        },
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

  return (
    <>
      <Button onClick={() => forwardSenkouFlow(senkouId, flowStatus)} className="bg-slate-700">
        次の選考へ進む
      </Button>
    </>
  );
};

export default NextSenkouButton;
