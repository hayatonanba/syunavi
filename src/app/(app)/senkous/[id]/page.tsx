// app/senkous/[id]/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Building2, Calendar, Clock, Dice1, Pencil } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

import FlowDialog from "../../../components/company/flow-dialog";
import NextSenkouButton from "@/src/app/components/company/change-senkou-button";
import FlowEditButton from "@/src/app/components/editButton/editButton";
import { getStatusText } from "../../myPage/page";

type FlowData = {
  flowId: string;
  flowName: string;
  date?: string;
  content?: string;
  memo?: string;
  link?: string;
  flowOrder: number;
};

type SenkouData = {
  senkouId: string;
  companyName: string;
  senkouName: string;
  userId?: string;
  status: number;
  flowStatus: number;
  flows: FlowData[];
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function SenkouDetailPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const id = params?.id;

  if (!id) {
    return <div>パラメータがありません</div>;
  }

  const senkou = await getSenkouById(id);
  if (!senkou) {
    return <div>データが見つかりませんでした</div>;
  }

  const defaultFlowId = senkou.flows.find(
    (flow) => flow.flowOrder === senkou.flowStatus
  )?.flowId;

  senkou.flows.sort((a, b) => (a.flowOrder || 0) - (b.flowOrder || 0));

  // flowOrder の最大値を取得
  const maxStatus = Math.max(
    ...senkou.flows.map((flow) => flow.flowOrder || 0)
  );

  return (
    <div className="h-[calc(100vh-4rem)] bg-[url('/bg2.png')] bg-center bg-cover bg-no-repeat">
      <div className="h-full bg-slate-800/40 p-8">
        <h1 className="font-bold text-5xl text-white">
          Attack <span className="text-2xl">-選考情報詳細-</span>
        </h1>
        <div className="mx-auto max-w-4xl p-4">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <Building2 className="h-7 w-7" />
                  <CardTitle className="font-bold text-2xl">
                    {senkou.companyName}
                  </CardTitle>
                  <div>{senkou.senkouName}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-fit rounded-2xl px-3 py-1 ${
                      senkou.status == 1
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    <span>
                      {getStatusText(Number(senkou.status))}
                      {senkou.status === 0 &&
                        ": " +
                          senkou.flows.find(
                            (flow) => flow.flowOrder === senkou.flowStatus
                          )?.flowName}
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <NextSenkouButton
                      senkouId={senkou.senkouId}
                      flowStatus={senkou.flowStatus}
                      maxStatus={maxStatus}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
          <Tabs defaultValue={defaultFlowId} className="w-full">
            <div className="mb-6 flex items-center justify-between">
              <TabsList className="w-full flex gap-2 justify-between px-10 bg-slate-700">
                {senkou.flows.map((flow) => (
                  <TabsTrigger
                    key={flow.flowId}
                    value={flow.flowId}
                    className="flex items-center gap-2 bg-slate-200 text-slate-800 min-w-24"
                  >
                    {flow.flowName}
                  </TabsTrigger>
                ))}
              </TabsList>
              <FlowDialog />
            </div>
            {senkou.flows.map((flow) => (
              <TabsContent key={flow.flowOrder} value={flow.flowId}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-5 min-h-[400px]">
                      {flow.content && (
                        <div>
                          <div className="flex items-center justify-between gap-5">
                            {flow.date && (
                              <div className="flex gap-2 items-center">
                                <Calendar />
                                <span>{flow.date}</span>
                              </div>
                            )
                            }
                            <div className="bg-slate-700 text-white flex items-center px-3 py-2 rounded gap-2">

                            編集する
                            <FlowEditButton
                              senkouId={senkou.senkouId}
                              flowId={flow.flowId}
                              initialContent={flow.content}
                              initialDate={flow.date}
                              flowOrder={flow.flowOrder}
                            />
                            </div>
                          </div>
                          <div className="mt-5">
                            <p>{flow.content}</p>
                          </div>
                        </div>
                      )}
                      {flow.memo && <p>{flow.memo}</p>}
                      {flow.link && (
                        <Link href={flow.link} className="text-blue-700">
                          {flow.link}
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

async function getSenkouById(senkouId: string): Promise<SenkouData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${senkouId}`, {
      method: "GET",
    });
    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    console.log("data", data);

    const raw = data.body ? JSON.parse(data.body) : data;

    return transformToSenkouData(raw);
  } catch (error) {
    console.error(error);
    return null;
  }
}

function transformToSenkouData(raw: any): SenkouData {
  const {
    senkouId = "",
    companyName = "",
    senkouName = "",
    userId = "",
    status = 0,
    flowStatus = 0,
    ...rest
  } = raw;

  const flows: FlowData[] = Object.keys(rest).map((key) => {
    const flowObj = rest[key] || {};
    if (key === "memo") {
      return {
        flowId: key,
        flowName: "メモ",
        memo: flowObj,
        flowOrder: 100, // memo 用の固定順番
      };
    } else if (key === "link") {
      return {
        flowId: key,
        flowName: "リンク集",
        link: flowObj,
        flowOrder: 101, // link 用の固定順番
      };
    } else {
      return {
        flowId: key,
        flowName: key,
        date: flowObj.date,
        content: flowObj.content,
        flowOrder: flowObj.flowOrder,
      };
    }
  });

  return {
    senkouId,
    companyName,
    senkouName,
    userId,
    status,
    flowStatus,
    flows,
  };
}
