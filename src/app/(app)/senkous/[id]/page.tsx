// app/senkous/[id]/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Building2, Calendar, Clock } from "lucide-react";
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

type FlowData = {
  flowId: string;
  flowName: string;
  date?: string;
  content?: string;
  memo?: string;
  link?: string;
  flowOrder?: number;
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

  const senkou = await getSenkouById(params.id);
  if (!senkou) {
    return <div>データが見つかりませんでした</div>;
  }

  if (!senkou.flows || senkou.flows.length === 0) {
    return (
      <div className="p-4">
        <h1 className="mb-2 font-bold text-xl">{senkou.companyName}</h1>
        <p>フロー情報がありません</p>
      </div>
    );
  }

  senkou.flows.sort((a, b) => (a.flowOrder || 0) - (b.flowOrder || 0));

  return (
    <div className="h-[calc(100vh-4rem)] bg-[url('/bg2.png')] bg-center bg-cover bg-no-repeat">
      <div className="h-full bg-slate-800/40 p-8">
        <h1 className="font-bold text-5xl text-white">
          Attack <span className="text-2xl">-選考情報詳細-</span>
        </h1>
        <div className="mx-auto max-w-4xl p-4">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-5">
                <Building2 className="h-7 w-7" />
                <CardTitle className="font-bold text-2xl">
                  {senkou.companyName}
                </CardTitle>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue={senkou.flows[0].flowId} className="w-full">
            <div className="mb-6 flex items-center justify-between">
              <TabsList className="grid w-full grid-cols-4">
                {senkou.flows.map((flow) => (
                  <TabsTrigger
                    key={flow.flowId}
                    value={flow.flowId}
                    className="flex items-center gap-2"
                  >
                    {flow.flowName}
                  </TabsTrigger>
                ))}
              </TabsList>
              <FlowDialog />
            </div>

            {senkou.flows.map((flow) => (
              <TabsContent key={flow.flowId} value={flow.flowId}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-5">
                      {flow.content && (
                        <div >
                          <div className="flex items-center gap-5">
                            <Calendar />
                            <span>{flow.date || "日付なし"}</span>
                          </div>
                          <div className="mt-5">
                            <p>{flow.content}</p>
                          </div>
                        </div>
                      )}
                      {flow.memo && (
                        <div>
                          <p>{flow.memo}</p>
                        </div>
                      )}
                      {flow.link && (
                        <div>
                          <Link href={flow.link} className="text-blue-700">
                            {flow.link}
                          </Link>
                        </div>
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
    const res = await fetch(
      `https://omdcxdim5h.execute-api.us-east-1.amazonaws.com/prod/senkous/${senkouId}`,
      { method: "GET" },
    );
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
    } else{
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
