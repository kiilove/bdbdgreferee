import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";

const QrLogin = () => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      // setPrecScan(scanData);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

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
              <select
                onChange={(e) => setSelected(e.target.value)}
                className="w-40 h-10 border-2 border-orange-500 flex justify-center items-center"
              >
                <option value={"user"}>정상</option>
                <option value={"environment"}>반전</option>
              </select>
            </div>
            <div className="flex w-full h-full flex-col justify-start items-center">
              <QrReader
                facingMode={selected}
                delay={1000}
                onError={handleError}
                onScan={handleScan}
                resolution={2000}
                style={{ width: "80%", height: "80%" }}
              />
            </div>
          </div>
        )}

        {data !== "" && <p>{data}</p>}
      </div>
    </div>
  );
};

export default QrLogin;
