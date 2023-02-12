import React, { useCallback, useEffect, useRef, useState } from "react";
import QrReader from "react-qr-reader";

const QrLogin = () => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const [uid, setUid] = useState();
  const [loginTime, setLoginTime] = useState();
  const [deviceId, setDeviceId] = useState("");
  const [devices, setDevices] = useState([]);

  const camRef = useRef(null);

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

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  const closeCam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    stream.getTracks().forEach(function (track) {
      track.stop();
      track.enabled = false;
    });
    camRef.current.stopCamera();
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    console.log(devices);
  }, [devices]);

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
    //console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(deviceId);
  }, [deviceId]);

  return (
    <div className="flex w-full h-full justify-start items-start flex-col">
      {!startScan ? (
        <div className="flex w-full h-full justify-center items-center p-20 box-border">
          <div className="flex w-3/4 h-3/4 rounded-lg border-4 border-dashed border-green-500 flex-col p-10 justify-center items-center gap-y-3">
            <p className=" text-lg font-semibold text-gray-500">안녕하세요!</p>
            <p className=" text-lg text-gray-500">
              현재 심사준비중인 종목은
              <span className="text-lg font-bold text-black mx-3">
                남자 일반부 -90Kg
              </span>
              입니다.
            </p>
            <p className=" text-lg text-gray-500">
              원활한 경기 진행을 위해 심판 로그인이 필요합니다.
            </p>
            <p className=" text-lg text-gray-500">
              QR로그인을 위해 아래 시작버튼을 눌러주세요
            </p>
            <div className="flex w-full justify-center items-center my-5">
              <button
                className="w-40 h-14 bg-green-500 text-white text-lg rounded-lg"
                onClick={() => setStartScan(true)}
              >
                시작하기
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full justify-center items-center p-1 box-border">
          <div className="flex w-3/5 h-3/5 rounded-lg  border-orange-500 flex-col p-5 justify-center items-center gap-y-3">
            <QrReader
              facingMode="user"
              delay={1000}
              onError={handleError}
              onScan={handleScan}
              // chooseDeviceId={()=>selected}
              className="w-full h-full border-4"
            />
            <button
              className="w-40 h-14 bg-green-600 text-white text-lg rounded-lg"
              onClick={() => {
                setStartScan(!startScan);
              }}
            >
              {startScan && "카메라 중지"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QrLogin;
