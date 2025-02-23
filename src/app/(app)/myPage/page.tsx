import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Building2, Calendar, Pencil } from "lucide-react";
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

  if (!session.user.id) {
    redirect("/");
  }

  const allData = await getAllSenkou(session.user.id!);
  const Data = Array.isArray(allData) ? allData : [];

  return (
    <div className="h-[calc(100vh-4rem)] bg-[url('/bg.png')] bg-center bg-cover bg-no-repeat">
      <div className="h-full bg-slate-800/40 p-8">
        <h1 className="font-bold text-5xl text-white">
          BaseCamp <span className="text-2xl">-選考情報一覧-</span>
        </h1>
        <div>
          <div className="p-5">
            <PostButton userData={session?.user} />
          </div>

          <div className="grid grid-cols-4 gap-5">
            {Data.map((userData) => (
              <Card key={userData.senkouId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <Building2 />
                      <h1 className="font-bold text-lg">
                        {userData.companyName}
                      </h1>
                    </div>
                    <div className="flex gap-3">
                      <button type="button">
                        <Pencil size={18} />
                      </button>
                      <DeleteButton senkouId={userData.senkouId} />
                    </div>
                  </div>
                  <span>{userData.senkouName}</span>
                  <div className="w-fit rounded-2xl bg-blue-200 px-2 text-blue-800">
                    <span>
                      {getStatusText(Number(userData.status))}
                      {userData.status === 0 && userData.flowStatus?.key
                        ? `: ${userData.flowStatus.key}`
                        : ""}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Calendar />
                    <span>
                      {userData.flowStatus?.value?.date ?? "日付未定"}
                    </span>
                  </div>
                  <Link
                    href={`/senkous/${userData.senkouId}`}
                    key={userData.senkouId}
                    className="ml-auto flex w-fit justify-end"
                  >
                    <div className="">詳細</div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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

async function getAllSenkou(userId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}?userId=${userId}`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
  return data;
}

export async function handleDelete(senkouId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${senkouId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // 成功しても `fetch` の挙動によってエラー扱いされる可能性があるのでチェック
    if (!response.ok) {
      console.warn(`DELETE request returned status: ${response.status}`);
    }
  } catch {
    // 何もしない（エラーを握り潰す）
  }
}
