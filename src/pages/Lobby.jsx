import React from "react";

const dummyGames = [
  { id: 1, title: "학생부", state: "end" },
  { id: 2, title: "장년부", state: "end" },
  { id: 3, title: "여자피지크", state: "end" },
  { id: 4, title: "비키니 휘트니스", state: "end" },
  { id: 5, title: "남자 피지크", state: "end" },
  { id: 6, title: "여자 청바지핏 모델", state: "end" },
  { id: 7, title: "남자 청바지핏 모델", state: "end" },
  { id: 8, title: "클래식 보디빌딩", state: "end" },
];

const Lobby = () => {
  return (
    <div className="flex w-full justify-center items-center h-full ">
      <div
        className="flex justify-center mt-10 flex-col gap-y-3 p-4 w-full rounded-md border"
        style={{ maxWidth: "1000px" }}
      >
        <div className="flex w-full h-full justify-center items-center flex-col">
          <div className="flex">
            <h1>
              안녕하세요!<span>김진배</span> 심판님
            </h1>
          </div>
          <div className="flex">
            <h2>
              현재 <span>경기용인시보디빌딩대회 13회</span>에 배정되셨습니다.
            </h2>
          </div>
          <div className="flex">
            <h2>오늘 배정된 종목의 목록은 아래와 같습니다.</h2>
          </div>

          <div className="flex w-full h-full justify-evenly items-start flex-wrap">
            {dummyGames.map((item, idx) => (
              <div className="flex w-28 h-40 rounded-lg shadow-md border border-green-700 flex-col">
                <div className="flex w-full">{item.title}</div>
                <div className="flex w-full">{item.state}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
