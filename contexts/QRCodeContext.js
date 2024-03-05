import { createContext, useContext, useState } from "react";

const QRCodeContext = createContext();

export const QRCodeProvider = ({ children }) => {
  const [qrValue, setQrValue] = useState({
    sectionCode: "CCIS4A",
    subjectCode: "PROG1L",
  });

  return (
    <QRCodeContext.Provider value={{ qrValue, setQrValue }}>
      {children}
    </QRCodeContext.Provider>
  );
};

export const useQRCodeContext = () => {
  return useContext(QRCodeContext);
};
