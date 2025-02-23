'use client'

import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { UserAuthData } from "../../(app)/myPage/page";


export default function PostButton(userData : {userData : UserAuthData}) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [senkou, setSenkou] = useState("");
  const [status, setStatus] = useState<number | null>(0);
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async () => {

    const jsondata = JSON.stringify({
      "userId": userData.userData.id,
      "companyName": company,
      "senkouName": senkou,
      "status": status,
      "flowStatus": 1,
      "flows": {
        "ES": { "content": content, ...(date && date !== "" ? { date } : {}), "flowOrder": 1 },
      }
    })

    console.log(jsondata)

    try {
      const response = await fetch("https://yq0fype0f5.execute-api.us-east-1.amazonaws.com/prod/senkous", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "userId": userData.userData.id,
          "companyName": company,
          "senkouName": senkou,
          "status": status,
          "flowStatus": 1,
          "flows": {
            "ES": { "content": content, "flowOrder": 1 },
          }
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
                  <label className="block text-sm font-medium text-gray-700">選考名</label>
                  <input
                    type="text"
                    value={senkou}
                    onChange={(e) => setSenkou(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">状況</label>
                  <select
                    onChange={(e) => setStatus(Number(e.target.value))}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value={0}>選考中</option>
                    <option value={1}>内定</option>
                    <option value={2}>不合格</option>
                    <option value={3}>お見送り</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">内容</label>
                  <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
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
