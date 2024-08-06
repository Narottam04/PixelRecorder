import { createContext, useContext, useState } from "react";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av"; // If you are going to play audio

const RecContext = createContext();

export const useRecContext = () => useContext(RecContext);

export default function RecordingProvider({ children }) {
  const [recordings, setRecordings] = useState([]);

  const RECORDINGS_DIRECTORY = FileSystem.documentDirectory + "pixelRecording/";

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    return `${minutesDisplay}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  async function loadRecordings() {
    const files = await FileSystem.readDirectoryAsync(RECORDINGS_DIRECTORY);
    const recordingsArray = await Promise.all(
      files.map(async (file) => {
        const fileUri = RECORDINGS_DIRECTORY + file;
        const { sound, status } = await Audio.Sound.createAsync({
          uri: fileUri,
        });
        return {
          sound: sound,
          duration: getDurationFormatted(status.durationMillis),
          file: fileUri,
        };
      })
    );
    setRecordings(recordingsArray);
  }

  value = {
    recordings,
    setRecordings,
    getDurationFormatted,
    loadRecordings,
  };

  return <RecContext.Provider value={value}>{children}</RecContext.Provider>;
}
