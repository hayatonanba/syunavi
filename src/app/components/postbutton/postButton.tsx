'use client'

import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { UserData } from "../../(app)/myPage/page";


export default function PostButton(userData : {userData : UserData}) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [job, setJob] = useState("");
  const [situation, setSituation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async () => {

    try {
      const response = await fetch("https://8s6eohdua5.execute-api.us-east-1.amazonaws.com/prod/senkous", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userData.userData.id,
          userName: userData.userData.name,
          flows: [
            {
              flowId: "uuid_h",
              flowOrder: 1,
              flowName: "一次面接",
              companies: [
                { companyId: "uuid_f", companyName: company },
              ]
            }
          ]
        })
      });

      if (response.ok) {
        console.log("success:", await response.json());
      } else {
        console.error("fail");
      }
    } catch (error) {
      console.error("error", error);
    }

    setIsModalOpen(false);
  };

    return (
      <div>
        <Button onClick={() => setIsModalOpen(true)}>企業情報を追加する</Button>
        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">企業情報を追加</h2>
            <form>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">企業名</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">職種</label>
                  <input
                    type="text"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">状況</label>
                  <select
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option>選考中</option>
                    <option>内定</option>
                    <option>不合格</option>
                    <option>お見送り</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">日付</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}                    
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button onClick={handleSubmit}
                  type="submit"
                  className="px-4 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  保存
                </button>
                <button type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                  onClick={() => setIsModalOpen(false)}
                >
                  閉じる
            </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    );
}
