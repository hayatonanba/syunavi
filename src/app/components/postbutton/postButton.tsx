"use client";

import { Button } from "@/src/components/ui/button";
import { type FormEvent, useState } from "react";
import type { UserAuthData } from "../../(app)/myPage/page";
import { useRouter } from "next/navigation";

export default function PostButton(userData: { userData: UserAuthData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [senkou, setSenkou] = useState("");
  const [status, setStatus] = useState<number | null>(0);
  
  // 独立した state を追加
  const [companyMemo, setCompanyMemo] = useState("");
  const [linkMemo, setLinkMemo] = useState("");

  const [flows, setFlows] = useState([
    { flowname: "", content: "", date: "", floworder: 1 },
  ]);
  const router = useRouter();

  const handleAddFlow = () => {
    setFlows([
      ...flows,
      { flowname: "", content: "", date: "", floworder: flows.length + 1 },
    ]);
  };

  const handleCloseModal = () => {
    setCompany("");
    setSenkou("");
    setStatus(0);
    setCompanyMemo("");
    setLinkMemo("");
    setFlows([{ flowname: "", content: "", date: "", floworder: 1 }]);
    setIsModalOpen(false);
  };

  const handleChange = (index : number, field : string, value : string) => {
    const updatedFlows = flows.map((flow, i) =>
      i === index ? { ...flow, [field]: value } : flow
    );
    setFlows(updatedFlows);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // 既存の flows 配列からオブジェクトを作成
    const flowsData: Record<string, { content: string; date?: string; flowOrder: number }> = flows.reduce((acc, flow) => {
      const { flowname, content, date, floworder } = flow;
      if (flowname) {
        acc[flowname] = {
          content,
          ...(date && date !== "" ? { date } : {}),
          flowOrder: floworder,
        };
      }
      return acc;
    }, {} as Record<string, { content: string; date?: string; flowOrder: number }>);
    
    // 企業メモとリンク集を固定の flowOrder で追加
    flowsData["企業メモ"] = {
      content: companyMemo,
      flowOrder: 0,
    };
    
    flowsData["リンク集"] = {
      content: linkMemo,
      flowOrder: -1,
    };
    
    const jsondata = JSON.stringify({
      userId: userData.userData.id,
      companyName: company,
      senkouName: senkou,
      status: status,
      flowStatus: 1,
      flows: flowsData,
    });

    console.log(jsondata);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsondata,
      });

      if (response.ok) {
        console.log("success:", await response.json());
      } else {
        console.error("fail");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      router.push("/myPage");
      router.refresh();
    }
    handleCloseModal();
  };

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)} className="border-[1px]">
        企業情報を追加する
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[500px] rounded-lg bg-slate-600 p-6 shadow-lg">
            <h2 className="mb-4 font-bold text-xl text-white">
              企業情報を追加
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="max-h-[400px] space-y-4 overflow-y-scroll px-6">
                <div>
                  <label className="block mb-1 font-medium text-white text-sm">
                    企業名
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="block w-full pl-2 h-8 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-white text-sm">
                    選考名
                  </label>
                  <input
                    type="text"
                    value={senkou}
                    onChange={(e) => setSenkou(e.target.value)}
                    className="block w-full pl-2 h-8 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-white text-sm">
                    状況
                  </label>
                  <select
                    onChange={(e) => setStatus(Number(e.target.value))}
                    className="block w-full h-8 pl-2 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value={0}>選考中</option>
                    <option value={1}>内定</option>
                    <option value={2}>不合格</option>
                    <option value={3}>お見送り</option>
                  </select>
                </div>
                {/** 企業メモ（独立した入力フィールド） */}
                <div>
                  <label className="block mb-1 font-medium text-white text-sm">
                    企業メモ
                  </label>
                  <textarea
                    value={companyMemo}
                    onChange={(e) => setCompanyMemo(e.target.value)}
                    className="block w-full px-2 py-2 h-32 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                {/** リンク集（独立した入力フィールド） */}
                <div>
                  <label className="block mb-1 font-medium text-white text-sm">
                    リンク集
                  </label>
                  <textarea
                    value={linkMemo}
                    onChange={(e) => setLinkMemo(e.target.value)}
                    className="block w-full px-2 py-2 h-32 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <hr />
                {/** 既存の動的なフロー入力 */}
                {flows.map((flow, index) => (
                  <div key={index} className="flow-group space-y-4">
                    <div>
                      <label className="block mb-1 font-medium text-white text-sm">
                        フロー
                      </label>
                      <input
                        type="text"
                        value={flow.flowname}
                        onChange={(e) =>
                          handleChange(index, "flowname", e.target.value)
                        }
                        className="block w-full pl-2 h-8 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-white text-sm">
                        選考メモ
                      </label>
                      <textarea
                        value={flow.content}
                        onChange={(e) =>
                          handleChange(index, "content", e.target.value)
                        }
                        className="block w-full px-2 py-2 h-32 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-white text-sm">
                        日付
                      </label>
                      <input
                        type="date"
                        value={flow.date}
                        onChange={(e) =>
                          handleChange(index, "date", e.target.value)
                        }
                        className="block h-8 pl-2 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-white text-sm">
                        フロー順
                      </label>
                      <input
                        type="number"
                        placeholder="Flow Order"
                        min={1}
                        max={10}
                        step={1}
                        value={flow.floworder}
                        onChange={(e) =>
                          handleChange(index, "floworder", e.target.value)
                        }
                        className="block pl-2 h-8 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <hr />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddFlow}
                  className="text-white bg-stone-800 py-2 px-3 rounded "
                >
                  フローを追加
                </button>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="submit"
                  className="rounded bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
                >
                  保存
                </button>
                <button
                  type="button"
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none"
                  onClick={handleCloseModal}
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
