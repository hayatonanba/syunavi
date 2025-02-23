import { auth } from "@/auth"
import { redirect } from "next/navigation"
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


type SenkouData = {
  senkouId: string
  companyName: string
  senkouName: string
  status: number
  flowStatus: string
}

type PageProps = {
  params: {
    id: string 
  }
}

export default async function SenkouDetailPage({ params }: PageProps) {
  const session = await auth()
  if (!session?.user) {
    redirect("/")  
  }

  const senkou = await getSenkouById(params.id)

  if (!senkou) {
    return <div>データが見つかりませんでした</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-5">
            <Building2 className="w-7 h-7" />
            <CardTitle className="text-2xl font-bold">{senkou.companyName}</CardTitle>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue={senkou.flowStatus[0].flowId} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid w-full grid-cols-4">
            {senkou.flowStatus.map((flow) => (
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
                <div className="flex items-center mb-4 gap-5">
                  <div className="flex items-center gap-2">
                    <Calendar />
                    <span>〇〇/〇〇/〇〇</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock />
                    <span>〇〇:〇〇</span>
                  </div>
                </div>
                <div className="flex flex-col gap-5 ">
                  <div>
                    {flow.questions?.map((question) => (
                      <div key={question.questionId}>
                        <h3 className="font-bold">{question.question}</h3>
                        <p>{question.answer}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold">メモ</h3>
                    {flow.memos?.map((memo) => (
                      <p key={memo.memoId}>{memo.memo}</p>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold">リンク集</h3>
                    {flow.links?.map((link) => (
                      <Link
                        href={link.url}
                        key={link.linkId}
                        className="text-blue-700"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

async function getSenkouById(senkouId: string): Promise<SenkouData | null> {
  try {
    const res = await fetch(
      `https://yq0fype0f5.execute-api.us-east-1.amazonaws.com/prod/senkous/${senkouId}`,
      {
        method: "GET",
      }
    )
    if (!res.ok) {
      return null
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
