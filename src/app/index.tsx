import { Link, useNavigation } from "expo-router";
import React from "react";
import { Text, View, TextInput, ScrollView, Pressable } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Page() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: top, flex: 1 }}>
      <View className="bg-[#131313] w-full h-full">
        {/* input header */}
        <View className="mt-[30px] mb-[22px] flex-row items-center bg-[#1f1f1f] rounded-lg p-3 mx-[20px]">
          <AntDesign
            name="search1"
            size={20}
            color="white"
            style={{ marginRight: 10 }}
          />
          <TextInput
            className="flex-1 text-[15px] text-white"
            placeholder="Search your recordings"
            placeholderTextColor="gray"
            style={{ color: "white" }}
          />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {/* month */}
          <View className="mb-[22px] mx-[20px]">
            <Text className="text-[#DEDEDE] text-[20px] font-medium ">
              June
            </Text>
          </View>
          {/* cards */}
          {Array.from({ length: 10 }).map((_, index) => (
            <Link href="/audioPlayerPage" asChild className=" ">
              <Pressable>
                <View className=" my-2 mx-[20px] flex flex-col justify-center items-start gap-4 self-stretch p-5 bg-[#1F1F1F] rounded-2xl">
                  <View className="flex flex-row justify-between items-center w-full">
                    <Text className="text-[#DEDEDE] font-medium">
                      Valeria- Tuesday at 7:31 PM
                    </Text>
                    <AntDesign name="play" size={16} color="white" />
                  </View>
                  <View className="flex flex-row justify-between items-center w-full">
                    <Text className="text-[#c9c9c9]">Jun 25</Text>
                    <Text className="text-[#c9c9c9]">21:18</Text>
                  </View>
                  <View className="w-full h-1 bg-blue-500 rounded-full"></View>
                </View>
              </Pressable>
            </Link>
          ))}
        </ScrollView>
        {/* Recording button */}
        <View className="flex-1 bg-[#131313]">
          <View className="absolute left-0 right-0 bottom-[50px] items-center">
            <View className="w-[85px] h-[85px] bg-[#EF665C] rounded-full justify-center items-center">
              <View className="w-[23px] h-[23px] bg-[#601510] rounded-full" />
            </View>
          </View>
        </View>
        {/*  */}
      </View>
    </View>
  );
}
