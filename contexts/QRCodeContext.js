import { createContext, useContext, useState } from "react";

const QRCodeContext = createContext();

export const QRCodeProvider = ({ children }) => {
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <QRCodeContext.Provider
      value={{ section, setSection, subject, setSubject }}
    >
      {children}
    </QRCodeContext.Provider>
  );
};

export const useQRCodeContext = () => {
  return useContext(QRCodeContext);
};
