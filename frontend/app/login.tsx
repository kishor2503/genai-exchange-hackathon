import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "../components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";

const LoginScreen = () => {
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            height: Dimensions.get("screen").height,
          }}
        >
          <View className="h-full lex flex-col items-center justify-center px-4">
            <View className="w-full flex flex-col items-center justify-center bg-secondary-foreground py-10 rounded-lg">
              <Text className="text-white text-3xl font-bold">Login</Text>
              <View className="w-full px-6">
                <Label nativeID="mobile-number" className="text-white">
                  Mobile Number:
                </Label>
                <Input
                  keyboardType="phone-pad"
                  inputMode={"tel"}
                  placeholder="Enter your mobile number"
                  className="bg-transparent text-white border-muted-foreground focus:border-primary mt-3"
                  value={mobile}
                  onChangeText={setMobile}
                  maxLength={10}
                />
                <Label nativeID="mobile-number" className="text-white mt-4">
                  Password:
                </Label>
                <Input
                  placeholder="Enter your password"
                  className="bg-transparent text-white border-muted-foreground focus:border-primary mt-3"
                  value={password}
                  inputMode={"text"}
                  onChangeText={setPassword}
                  secureTextEntry={isShow ? false : true}
                />
                <View className="mt-3 flex flex-row gap-x-3 items-center">
                  <Checkbox
                    checked={isShow}
                    onCheckedChange={setIsShow}
                    className="border-muted-foreground"
                  />
                  <Text className={cn("text-xl text-white")}>
                    {isShow ? "Hide" : "Show"} Password
                  </Text>
                </View>
                <Button className="mt-6">
                  <Text className="text-white font-bold text-xl">Login</Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
