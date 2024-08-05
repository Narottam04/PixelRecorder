import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Audio } from "expo-av"; // If you are going to play audio
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRecContext } from "@/context/RecContext";

const AudioPlayerScreen = () => {
  const { top } = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState("Audio");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const tabs = ["Audio", "Transcript", "Summary"];

  const [recording, setRecording] = useState();
  const { recordings, setRecordings } = useRecContext();
  const [message, setMessage] = useState("");

  console.log(recordings);

  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();

    const fileName = `recording-${Date.now()}.m4a`;
    const fileUri = FileSystem.documentDirectory + fileName;

    await FileSystem.moveAsync({
      from: recording.getURI(),
      to: fileUri,
    });

    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: fileUri,
    });

    setRecordings(updatedRecordings);
    setMessage("Recording stopped and saved.");
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    return `${minutesDisplay}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <View className="flex-1 bg-black">
      <ScrollView>
        <View style={{ paddingTop: top }} className="px-5">
          <View className="mt-7 flex-row justify-between items-center">
            <Link href="/">
              <AntDesign name="arrowleft" size={24} color="white" />
            </Link>
            <View className="flex-row items-center gap-4">
              <AntDesign name="staro" size={24} color="white" />
              <AntDesign name="sharealt" size={24} color="white" />
              <Feather name="scissors" size={24} color="white" />
              <AntDesign name="search1" size={24} color="white" />
              <Feather name="more-vertical" size={24} color="white" />
            </View>
          </View>
          {/* Visual Synthesizer  */}
          <View className="mt-8 bg-[#1F1F1F] rounded-[20px] px-5">
            <Text className="mt-5 font-medium  text-[#DEDEDE] text-[16px]">
              Sms - Wednesday at 12:19 PM
            </Text>
            <Text className="mt-5 font-medium  text-[#C9C9C9] text-[13px]">
              Wed, Apr 17 12:19 PM
            </Text>

            <View className="my-[60px] flex-1 flex-row gap-2 items-center justify-center">
              <Ionicons name="chatbox-sharp" size={16} color={"#76adff"} />
              <Text className=" font-semibold  text-[#76ADFF] text-[13px]">
                Speech
              </Text>
            </View>
            <View className="mb-[195px]"></View>
          </View>
          {/* tabs */}
          <View className="w-full my-5 flex-1">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
              <View className="flex-row">
                {tabs.map((tab, index) => (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setSelectedTab(tab)}
                    className={`
                      ${index === 0 ? "rounded-l-lg" : ""}
                      ${index === tabs.length - 1 ? "rounded-r-lg" : ""}
                      ${selectedTab === tab ? "bg-[#353535] " : "bg-[#1F1F1F]"}
                      ${
                        index !== tabs.length - 1
                          ? "border-r border-gray-700"
                          : ""
                      }
                    `}
                  >
                    <View className="px-4 py-[10px]">
                      <Text className="text-[15px] text-[#dedede] font-semibold">
                        {tab}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Fixed bottom controls */}
      <View className="absolute bottom-0 left-0 right-0 pb-5 px-5 bg-black">
        {/* slider button  */}
        <View className="w-full h-1 bg-blue-500 rounded-full mb-[50px]"></View>

        {/* buttons at the bottom */}
        <View className="flex-row justify-center gap-[7px]">
          <View className="items-center">
            <View className="w-[85px] h-[85px] bg-[#353535] rounded-full justify-center items-center">
              <MaterialCommunityIcons
                name="rewind-15"
                size={25}
                color="#DEDEDE"
              />
            </View>
          </View>
          <View className="items-center">
            <View className="w-[85px] h-[85px] bg-[#C6C6C6] rounded-full justify-center items-center">
              <Entypo name="controller-play" size={40} color="black" />
            </View>
          </View>
          <View className="items-center">
            <View className="w-[85px] h-[85px] bg-[#353535] rounded-full justify-center items-center">
              <MaterialCommunityIcons
                name="fast-forward-15"
                size={25}
                color="#DEDEDE"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AudioPlayerScreen;
