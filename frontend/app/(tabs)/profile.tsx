import React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard from "~/components/UserCard";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            minHeight: Dimensions.get("screen").height,
          }}
        >
          <UserCard />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
