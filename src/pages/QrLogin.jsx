import React, { useState } from "react";
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
      <div className="flex w-full h-full p-10 border-2 border-orange-500 flex-col">
        <button
          onClick={() => {
            setStartScan(!startScan);
          }}
        >
          {startScan ? "카메라 중지" : "카메라 작동"}
        </button>
        {startScan && (
          <>
            <select onChange={(e) => setSelected(e.target.value)}>
              <option value={"environment"}>Back Camera</option>
              <option value={"user"}>Front Camera</option>
            </select>
            <QrReader
              facingMode={selected}
              delay={1000}
              onError={handleError}
              onScan={handleScan}
              // chooseDeviceId={()=>selected}
              style={{ width: "300px" }}
            />
          </>
        )}
        {loadingScan && <p>Loading</p>}
        {data !== "" && <p>{data}</p>}
      </div>
    </div>
  );
};

export default QrLogin;
