import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

interface Result {
  label: string;
  value: string | number;
}

interface StatsContextProps {
  inputMethod: string;
  setInputMethod: React.Dispatch<React.SetStateAction<string>>;
  tableData: { xi: number; fi: number }[];
  setTableData: React.Dispatch<React.SetStateAction<{ xi: number; fi: number }[]>>;
  textData: string;
  setTextData: React.Dispatch<React.SetStateAction<string>>;
  classData: { li: number, ls: number, fi: number }[];
  setClassData: React.Dispatch<React.SetStateAction<{ li: number, ls: number, fi: number }[]>>;
  unitMeasure: string;
  setUnitMeasure: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  results: Result[] | null;
  setResults: React.Dispatch<React.SetStateAction<Result[] | null>>;
  selectedMeasures: string[];
  setSelectedMeasures: React.Dispatch<React.SetStateAction<string[]>>;
}

export const StatsContext = createContext<StatsContextProps>({} as StatsContextProps);

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [inputMethod, setInputMethod] = useState("table");
  const [tableData, setTableData] = useState([{ xi: 0, fi: 0 }]);
  const [textData, setTextData] = useState("");
  const [classData, setClassData] = useState([{ li: 0, ls: 0, fi: 0 }]);
  const [unitMeasure, setUnitMeasure] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const [selectedMeasures, setSelectedMeasures] = useState<string[]>([]);

  return (
    <StatsContext.Provider
      value={{
        inputMethod, setInputMethod,
        tableData, setTableData,
        textData, setTextData,
        classData, setClassData,
        unitMeasure, setUnitMeasure,
        loading, setLoading,
        results, setResults,
        selectedMeasures, setSelectedMeasures
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};
