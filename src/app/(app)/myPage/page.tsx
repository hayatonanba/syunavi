import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Building2, Clock } from "lucide-react";
import { Calendar } from "lucide-react";
import PostButton from "../../components/postbutton/postButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export type UserData = {
    id? : string
    name? : string | null
};

export default async function Page() {
  await createSenkou()
  const userData = await getSenkou("uuid-4649")
  const companies = userData.flows.map(flow => flow.companies).flat();
  console.log(companies);
  const session = await auth()
  if(!session?.user){
    redirect("/")
  }
  // console.log(session?.user)

  return (
    <div>
      <div className="p-5"><PostButton userData={session?.user}/></div>
      
      <div className="flex justyfy-between gap-5">    
        {companies.map((company) => (
          <Card key={company.companyId} className="w-1/4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <Building2 />
                  <h1 className="font-bold text-lg">{company.companyName}</h1>
                </div>
                <button>編集</button>
              </div>
              <div className="rounded-2xl px-2 bg-blue-100 text-blue-700 w-fit">
                <span>選考中</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Calendar />
                <span>〇〇/〇〇/〇〇</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock />
                <span>〇〇:〇〇</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function createSenkou() {
    const response = await fetch("https://8s6eohdua5.execute-api.us-east-1.amazonaws.com/prod/senkous", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: "uuid-4649",
        userName: "potekiti",
        flows: [
          {
            flowId: "uuid_hoge",
            flowOrder: 1,
            flowName: "一次面接",
            companies: [
              { companyId: "uuid_fuga", companyName: "IIJ" },
              { companyId: "uuid_piyo", companyName: "さくらインターネット" }
            ]
          },
          {
            flowId: "uuid_hoge_fuga",
            flowOrder: 2,
            flowName: "最終面接",
            companies: [
              { companyId: "uuid_hoge_piyo", companyName: "NTTドコモ" }
            ]
          }
        ]
      })
    });
  
    const data = await response.json();
    console.log("Created:", data);
}

async function getSenkou(userId) {
    const response = await fetch(`https://8s6eohdua5.execute-api.us-east-1.amazonaws.com/prod/senkous/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  
    const data = await response.json();
    return data;
}