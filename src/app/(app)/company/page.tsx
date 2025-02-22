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

// 企業情報の型
type Company = {
  companyId: string;
  companyName: string;
};

// 面接のフロー情報の型
type Flow = {
  flowId: string;
  flowOrder: number;
  flowName: string;
  companies: Company[]; // 企業は任意の数
};

// ユーザーデータの型
type UserData = {
  userId: string;
  userName: string;
  flows: Flow[]; // フローは任意の数
};

const userData: UserData = {
  userId: "uuid",
  userName: "ぽてきち",
  flows: [
    {
      flowId: "uuid_hoge",
      flowOrder: 1,
      flowName: "一次面接",
      companies: [
        {
          companyId: "uuid_fuga",
          companyName: "IIJ",
        },
        {
          companyId: "uuid_piyo",
          companyName: "さくらインターネット",
        },
      ],
    },
    {
      flowId: "uuid_hoge_fuga",
      flowOrder: 2,
      flowName: "最終面接",
      companies: [
        {
          companyId: "uuid_hoge_piyo",
          companyName: "ntt",
        },
      ],
    },
  ],
};

const page = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-5">
            <Building2 className="w-7 h-7" />
            <CardTitle className="text-2xl font-bold">サンプル</CardTitle>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="es" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="es" className="flex items-center gap-2">
            ES
          </TabsTrigger>
          <TabsTrigger value="interviews" className="flex items-center gap-2">
            一次面接
          </TabsTrigger>
          <TabsTrigger value="links" className="flex items-center gap-2">
            二次面接
          </TabsTrigger>
          <TabsTrigger value="memo" className="flex items-center gap-2">
            最終面接
          </TabsTrigger>
        </TabsList>

        <TabsContent value="es">
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
              <div className="mb-4">
                <ul>
                  <li></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
