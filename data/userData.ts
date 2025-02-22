export const userData: UserData = {
  userId: "uuid",
  userName: "ぽてきち",
  companies: [
    {
      companyId: "uuid_fuga",
      companyName: "IIJ",
      //   currentflowid
      flows: [
        {
          flowId: "uuid_hoge",
          flowOrder: 1,
          flowName: "一次面接",
          questions: [
            {
              questionId: "q1",
              question: "志望動機",
              answer:
                "テクノロジーを活用して社会課題を解決したいと考えています。",
            },
            {
              questionId: "q2",
              question: "自己PR",
              answer: "大学時代にチームリーダーとして...",
            },
          ],
          memos: [
            {
              memoId: "memo1",
              memo: "簡単なテストあります",
            },
          ],
          links: [
            {
              linkId: "link1",
              title: "zoomリンク",
              url: "https://www.zoom.com/ja",
            },
          ],
        },
        {
          flowId: "uuid_piyo",
          flowOrder: 2,
          flowName: "最終面接",
        },
      ],
    },
    {
      companyId: "uuid_piyo",
      companyName: "さくらインターネット",
      flows: [
        {
          flowId: "uuid_hoge",
          flowOrder: 1,
          flowName: "ES面接",
        },
        {
          flowId: "uuid_fuga",
          flowOrder: 2,
          flowName: "一次面接",
        },
        {
          flowId: "uuid_piyo",
          flowOrder: 3,
          flowName: "最終面接",
        },
      ],
    },
    {
      companyId: "uuid_hoge_piyo",
      companyName: "ntt",
      flows: [
        {
          flowId: "uuid_hoge",
          flowOrder: 1,
          flowName: "ES面接",
        },
        {
          flowId: "uuid_fuga",
          flowOrder: 2,
          flowName: "一次面接",
        },
        {
          flowId: "uuid_fuga",
          flowOrder: 3,
          flowName: "グループディスカッション",
        },
        {
          flowId: "uuid_piyo",
          flowOrder: 4,
          flowName: "最終面接",
        },
      ],
    },
  ],
};

// 各フロー（面接プロセス）の型
type Flow = {
  flowId: string;
  flowOrder: number;
  flowName: string;
  questions?: {
    questionId: string;
    question: string;
    answer?: string;
  }[];
  memos?: {
    memoId: string;
    memo: string;
  }[];
  links?: {
    linkId: string;
    title: string;
    url: string;
  }[];
};

// 企業の型
type Company = {
  companyId: string;
  companyName: string;
  flows: Flow[]; // 各企業ごとにフローが複数ある
};

// ユーザーデータの型
type UserData = {
  userId: string;
  userName: string;
  companies: Company[]; // ユーザーが関わる企業のリスト
};
