import { getAllByPlaceholderText } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

const QrLogin = () => {
  const [selected, setSelected] = useState(true);
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("No result");
  const [uid, setUid] = useState();
  const [loginTime, setLoginTime] = useState();

  useEffect(() => {
    if (!!data) {
      //setUid((prev) => (prev = data?.text));
      const tryTime = new Date(data.timestamp);

      const calDate =
        tryTime.getFullYear().toString() +
        "-" +
        (tryTime.getMonth() + 1) +
        "-" +
        tryTime.getDate().toString() +
        " " +
        tryTime.getHours().toString() +
        ":" +
        tryTime.getMinutes().toString() +
        ":" +
        tryTime.getSeconds().toString();
      //console.log(calDate);
      setLoginTime(
        (prev) => (prev = { timestamp: data.timestamp, calDate: calDate })
      );
    }
  }, [data]);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex w-full h-full p-20 flex-col justify-start items-center">
        <div className="flex">
          <button
            className="w-40 h-10 bg-orange-500 text-white"
            onClick={() => {
              setStartScan(!startScan);
            }}
          >
            {startScan ? "카메라 중지" : "카메라 작동"}
          </button>
        </div>

        {startScan && (
          <div className="flex flex-col w-full h-full gap-y-2 justify-center items-center mt-2">
            <div className="flex">
              <button onClick={() => setSelected(!selected)}>전환</button>
            </div>
            <div className="flex w-full h-full justify-center items-top">
              <QrReader
                onResult={(result, error) => {
                  if (!!result) {
                    //setData(result?.text);
                    setData(result);
                  }
                }}
                className="w-3/4 h-3/4"
                constraints={{ facingMode: selected ? "user" : "environment" }}
              />
            </div>
          </div>
        )}
        {data && (
          <div>
            <p>{data.text && loginTime && data.text}</p>
            <p>로그인시간 : {loginTime && loginTime?.calDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrLogin;
