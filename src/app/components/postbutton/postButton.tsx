'use client'

import { Button } from "@/src/components/ui/button";
import { useState } from "react";

export default function PostButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">職種</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">状況</label>
                  <select
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
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
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
