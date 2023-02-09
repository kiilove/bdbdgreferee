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
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex w-full h-full p-10 border-2 border-orange-500 flex-col justify-start items-center">
        <button
          className="w-40 h-10 bg-orange-500 text-white"
          onClick={() => {
            setStartScan(!startScan);
          }}
        >
          {startScan ? "카메라 중지" : "카메라 작동"}
        </button>
        {startScan && (
          <div className="flex w-full h-full flex-col">
            <select onChange={(e) => setSelected(e.target.value)}>
              <option value={"user"}>Front Camera</option>
              <option value={"environment"}>Back Camera</option>
            </select>
            <div className="flex w-full h-full p-20 justify-center items-center">
              <QrReader
                facingMode={selected}
                delay={1000}
                onError={handleError}
                onScan={handleScan}
                className="w-3/4 h-3/4"
              />
            </div>
          </div>
        )}
        {loadingScan && <p>Loading</p>}
        {data !== "" && <p>{data}</p>}
      </div>
    </div>
  );
};

export default QrLogin;
