import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MachineContext = createContext();

export const MachineContextProvider = ({ children }) => {
  const [machineNumber, setMachineNumber] = useState(null);

  useEffect(() => {
    localStorage.setItem("scoreMachineNumber", JSON.stringify(machineNumber));
  }, [machineNumber]);

  useMemo(() => {
    const getMachineNumber = localStorage.getItem("scoreMachineNumber");
    if (getMachineNumber) {
      const machineNumber = isNaN(parseInt(getMachineNumber))
        ? 0
        : parseInt(getMachineNumber);
      setMachineNumber(machineNumber);
    } else {
      setMachineNumber(0);
    }
  }, []);

  return (
    <MachineContext.Provider value={{ machineNumber, setMachineNumber }}>
      {children}
    </MachineContext.Provider>
  );
};
