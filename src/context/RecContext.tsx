import { createContext, useContext, useState } from "react";

const RecContext = createContext();

export const useRecContext = () => useContext(RecContext);

export default function RecordingProvider({ children }) {
  const [recordings, setRecordings] = useState([]);

  value = {
    recordings,
    setRecordings,
  };

  return <RecContext.Provider value={value}>{children}</RecContext.Provider>;
}
