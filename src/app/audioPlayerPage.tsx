import React from "react";
import { View, Text, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Audio } from "expo-av"; // If you are going to play audio
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const AudioPlayerScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView className="bg-black">
      <View style={{ paddingTop: top }} className="px-5">
        <View className="mt-7 flex-row justify-between items-center">
          <Link href="/">
            <AntDesign name="arrowleft" size={24} color="white" />
          </Link>
          <View className="flex-row items-center gap-5">
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

        {/*  */}
      </View>
    </ScrollView>
  );
};

export default AudioPlayerScreen;
