"use client";

import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import type { UserAuthData } from "../../(app)/myPage/page";

export default function PostButton(userData: { userData: UserAuthData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [senkou, setSenkou] = useState("");
  const [status, setStatus] = useState<number | null>(0);
  const [flows, setFlows] = useState([
    { flowname: "", content: "", date: "", floworder: 1 },
  ]);

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
    setFlows([{ flowname: "", content: "", date: "", floworder: 1 }]);
    setIsModalOpen(false);
  };

  const handleChange = (index, field, value) => {
    const updatedFlows = flows.map((flow, i) =>
      i === index ? { ...flow, [field]: value } : flow,
    );
    setFlows(updatedFlows);
  };

  const handleSubmit = async () => {
    const jsondata = JSON.stringify({
      userId: userData.userData.id,
      companyName: company,
      senkouName: senkou,
      status: status,
      flowStatus: 1,
      flows: flows.reduce((acc, flow) => {
        const { flowname, content, date, floworder } = flow;
        acc[flowname] = {
          content,
          ...(date && date !== "" ? { date } : {}),
          flowOrder: floworder,
        };
        return acc;
      }, {}),
    });

    console.log(jsondata);

    try {
      const response = await fetch(
        "https://yq0fype0f5.execute-api.us-east-1.amazonaws.com/prod/senkous",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userData.userData.id,
            companyName: company,
            senkouName: senkou,
            status: status,
            flowStatus: 1,
            flows: flows.reduce((acc, flow) => {
              const { flowname, content, date, floworder } = flow;
              acc[flowname] = {
                content,
                ...(date && date !== "" ? { date } : {}),
                flowOrder: floworder,
              };
              return acc;
            }, {}),
          }),
        },
      );

      if (response.ok) {
        console.log("success:", await response.json());
      } else {
        console.error("fail");
      }
    } catch (error) {
      console.error("error", error);
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
          <div className="w-80 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 font-bold text-xl">企業情報を追加</h2>
            <form>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-700 text-sm">
                    企業名
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 text-sm">
                    選考名
                  </label>
                  <input
                    type="text"
                    value={senkou}
                    onChange={(e) => setSenkou(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 text-sm">
                    状況
                  </label>
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
                <button type="button" onClick={handleAddFlow}>
                  Add Flow
                </button>

                {flows.map((flow, index) => (
                  <div key={index} className="flow-group">
                    <label className="block font-medium text-gray-700 text-sm">
                      フロー
                    </label>
                    <input
                      type="text"
                      value={flow.flowname}
                      onChange={(e) =>
                        handleChange(index, "flowname", e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />

                    <label className="block font-medium text-gray-700 text-sm">
                      内容
                    </label>
                    <input
                      type="text"
                      value={flow.content}
                      onChange={(e) =>
                        handleChange(index, "content", e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />

                    <label className="block font-medium text-gray-700 text-sm">
                      日付
                    </label>
                    <input
                      type="date"
                      value={flow.date}
                      onChange={(e) =>
                        handleChange(index, "date", e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />

                    <label className="block font-medium text-gray-700 text-sm">
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
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleSubmit}
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
