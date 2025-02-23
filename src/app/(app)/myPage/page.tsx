import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Building2, Clock } from "lucide-react";
import { Calendar } from "lucide-react";
import PostButton from "../../components/postbutton/postButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteButton from "../../components/deleteButton.tsx/deleteButton";

export type UserAuthData = {
  id?: string;
  name?: string | null;
};

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  // console.log(session?.user)

  const allData = await getAllSenkou(session.user.id);
  const Data = Array.isArray(allData) ? allData : [];

  return (
    <div>
      <div className="p-5">
        <PostButton userData={session?.user} />
      </div>

      <div className="justyfy-between flex gap-5">
        {Data.map((userData) => (
          <Link
            href={`/senkous/${userData.senkouId}`}
            key={userData.senkouId}
            className="w-1/4"
          >
            <Card key={userData.senkouId}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <Building2 />
                    <h1 className="font-bold text-lg">
                      {userData.companyName}
                    </h1>
                  </div>
                  <button type="button">編集</button>
                  
                  <DeleteButton senkouId={userData.senkouId} />
                </div>
                <div className="w-fit rounded-2xl bg-blue-100 px-2 text-blue-700">
                  <span>{getStatusText(Number(userData.status))}</span>
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
          </Link>
        ))}
      </div>
    </div>
  );
}

const getStatusText = (status: number | null) => {
  switch (status) {
    case 0:
      return "選考中";
    case 1:
      return "内定";
    case 2:
      return "不合格";
    case 3:
      return "お見送り";
    default:
      return "----";
  }
};

async function getAllSenkou(userId: any) {
  const response = await fetch(
    `https://yq0fype0f5.execute-api.us-east-1.amazonaws.com/prod/senkous?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
  // console.log("Get", data);
  return data;
}
