import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import LottieView from "lottie-react-native";
import { ThinkAnimation } from "~/assets/animations";
import { router } from "expo-router";

const TopScreen = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="h-full flex flex-col items-center justify-center gap-4 px-8">
        <View className="flex flex-col items-center gap-1">
          <LottieView
            source={ThinkAnimation}
            autoPlay
            loop={false}
            style={{
              width: 300,
              height: 200,
              backgroundColor: "transparent",
            }}
            speed={0.8}
          />
          <Text className="text-white text-3xl">Welcome to</Text>
          <Text className="text-5xl font-bold text-primary">Suggestly</Text>
        </View>
        <Button className="w-full" onPress={() => router.push("/login")}>
          <Text className="text-white text-xl font-semibold uppercase">
            Login with Mobile
          </Text>
        </Button>
        <Button
          className="w-full grid place-items-center"
          variant={"link"}
          onPress={() => router.push("/home")}
        >
          <Text className="text-white text-xl font-semibold uppercase">
            Go to Home
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default TopScreen;
