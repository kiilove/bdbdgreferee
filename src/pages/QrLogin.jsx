import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";

const QrLogin = () => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = (scanData) => {
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
        <div className="flex w-full h-full flex-col justify-start items-center">
          <QrReader style={{ width: "80%", height: "80%" }} />
        </div>
      </div>
    </div>
  );
};

export default QrLogin;
