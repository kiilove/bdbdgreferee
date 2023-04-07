import React from "react";
import Winner from "../../assets/playerProfile/demo1.jpg";

const ScreenReport = () => {
  const backgroundStyle = {
    backgroundImage: `url(${Winner})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
  };
  return (
    <div className="flex w-full h-screen" style={backgroundStyle}>
      <div className="flex w-full h-full flex-col"></div>
    </div>
  );
};

export default ScreenReport;
