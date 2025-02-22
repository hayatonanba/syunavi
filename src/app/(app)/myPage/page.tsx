import { userData } from "@/data/userData";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Building2, Clock } from "lucide-react";
import { Calendar } from "lucide-react";
export default function Page() {
  const companyies = userData.companies;
  console.log(companyies);
  return (
    <div className="flex justyfy-between gap-5">
      {companyies.map((company) => (
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
  );
}
