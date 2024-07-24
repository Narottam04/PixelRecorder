import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Audio } from "expo-av"; // If you are going to play audio
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Feather } from "@expo/vector-icons";
const AudioPlayerScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top, flex: 1 }} className="flex-1 bg-black px-5">
      <View className="mt-7 flex flex-1 flex-row justify-between">
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />

        <View className="flex flex-1 flex-row justify-end gap-4">
          <AntDesign
            name="staro"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <AntDesign
            name="sharealt"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Feather
            name="scissors"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <AntDesign
            name="search1"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Feather
            name="more-vertical"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
        </View>
      </View>

      <Text className="text-white text-3xl">Hello World</Text>
    </View>
  );
};

export default AudioPlayerScreen;
