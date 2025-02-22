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
import { Building2, Calendar, Clock } from "lucide-react";
import Link from "next/link";

import { userData } from "@/data/userData";

const page = () => {
  const companyId = "uuid_fuga";
  const companyData = userData.companies.find(
    (company) => company.companyId === companyId
  );
  const { companyName, flows } = companyData!;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-5">
            <Building2 className="w-7 h-7" />
            <CardTitle className="text-2xl font-bold">{companyName}</CardTitle>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue={flows[0].flowId} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {flows.map((flow) => (
            <TabsTrigger
              key={flow.flowId}
              value={flow.flowId}
              className="flex items-center gap-2"
            >
              {flow.flowName}
            </TabsTrigger>
          ))}
        </TabsList>

        {flows.map((flow) => (
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
};

export default page;
