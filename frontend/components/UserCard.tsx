import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { CameraIcon, Edit, LogOut } from "lucide-react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { Progress } from "./ui/progress";
import { router } from "expo-router";
import FormField from "./FormField";
import { Platform } from "react-native";
import { cn } from "~/lib/utils";

const userData = {
  name: "Abul Hassan Sathuli",
  shortName: "AH",
  occupation: "Fitness Freak",
  bio: "Abul Hassan is a renowned physicist and chemist. He has made significant contributions to our understanding of the universe.",
  avatarUrl:
    "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg",
  phone: "7449220754",
  weight: 80,
  height: 170,
  age: 23,
  goal: 78,
};

const UserCard = () => {
  const [userDetails, setUserDetails] = useState(userData);
  const [isKg, setIsKg] = useState<boolean>(true);
  const [isCm, setIsCm] = useState<boolean>(true);
  const [isFullBio, setIsFullBio] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const userDataCopy = useRef(userDetails);
  const [loading, setLoading] = useState<boolean>(false);

  const saveChanges = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEdit(false);
    }, 2000);
  };

  return (
    <View className="w-full h-full flex-1 justify-start items-center gap-5 p-3 relative">
      <Card className="w-full p-6 rounded-2xl">
        <CardHeader className="items-center">
          <Avatar alt={userData.name} className="w-24 h-24 relative">
            <AvatarImage source={{ uri: userData.avatarUrl }} />
            <AvatarFallback>
              <Text>{userData.shortName}</Text>
            </AvatarFallback>
            {/* <View
              className="w-full h-full absolute inset-0 justify-center items-center bg-black/50"
              style={{
                zIndex: 9999,
              }}
            >
              <CameraIcon stroke="black" fill={"#f97215"} />
            </View> */}
          </Avatar>
          {!isEdit && (
            <Button
              variant={"ghost"}
              className="absolute top-0 left-0 rounded-full"
              onPress={() => router.push("/login")}
            >
              <LogOut stroke={"red"} width={17} />
            </Button>
          )}
          {!isEdit && (
            <Button
              variant={"ghost"}
              className="absolute top-0 right-0 rounded-full"
              onPress={() => {
                userDataCopy.current = userDetails;
                setIsEdit(true);
              }}
            >
              <Edit stroke={"blue"} width={17} />
            </Button>
          )}
          <View className="p-3" />
          <CardTitle className="pb-2 text-center">
            {isEdit ? (
              <FormField
                nativeID="name"
                title="Display Name"
                value={userDetails.name}
                handleTextChange={(value) =>
                  setUserDetails((prevValue) => ({ ...prevValue, name: value }))
                }
                placeholder="Eg., John Doe"
              />
            ) : (
              userData.name
            )}
          </CardTitle>
          <View className="flex-row">
            <CardDescription className="text-base font-semibold">
              {isEdit ? (
                <FormField
                  nativeID="occupation"
                  title="Type"
                  value={userDetails.occupation}
                  handleTextChange={(value) =>
                    setUserDetails((prevValue) => ({
                      ...prevValue,
                      occupation: value,
                    }))
                  }
                  placeholder="Eg., Fitness Freak"
                />
              ) : (
                userData.occupation
              )}
            </CardDescription>
          </View>
          <TouchableOpacity
            onPress={() => setIsFullBio((prevValue) => !prevValue)}
            activeOpacity={1}
            className="mt-2"
          >
            <View className="flex-row">
              {isEdit ? (
                <FormField
                  nativeID="bio"
                  title="Bio"
                  value={userDetails.bio}
                  handleTextChange={(value) =>
                    setUserDetails((prevValue) => ({
                      ...prevValue,
                      bio: value,
                    }))
                  }
                  placeholder="Eg., Tell us about you"
                />
              ) : (
                <Text
                  className="text-base text-center text-gray-500"
                  numberOfLines={isFullBio ? 5 : 2}
                >
                  {userData.bio}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </CardHeader>
        <CardContent>
          <View
            className={cn("justify-around gap-3", isEdit ? "" : "flex-row")}
          >
            <TouchableOpacity
              onPress={() => setIsKg((prevValue) => !prevValue)}
              activeOpacity={1}
            >
              <View className={"items-center"}>
                {!isEdit && (
                  <Text className="text-sm text-muted-foreground">Weight</Text>
                )}
                {isEdit ? (
                  <FormField
                    nativeID="weight"
                    title="Weight (in kg)"
                    value={String(userDetails.weight)}
                    handleTextChange={(value) =>
                      setUserDetails((prevValue) => ({
                        ...prevValue,
                        weight: Number(value),
                      }))
                    }
                    placeholder="Eg., 80"
                    inputMode="numeric"
                    keyboardType="decimal-pad"
                  />
                ) : (
                  <Text className="text-xl font-semibold">
                    {userData.weight
                      ? isKg
                        ? userData.weight
                        : userData.weight * 2.2
                      : "-"}{" "}
                    {isKg ? "kg" : "lbs"}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsCm((prevValue) => !prevValue)}
              activeOpacity={1}
            >
              <View className={"items-center"}>
                {!isEdit && (
                  <Text className="text-sm text-muted-foreground">Height</Text>
                )}
                {isEdit ? (
                  <FormField
                    nativeID="height"
                    title="Height (in cm)"
                    value={String(userDetails.height)}
                    handleTextChange={(value) =>
                      setUserDetails((prevValue) => ({
                        ...prevValue,
                        height: Number(value),
                      }))
                    }
                    placeholder="Eg., 172"
                    inputMode="numeric"
                    keyboardType="decimal-pad"
                  />
                ) : (
                  <Text className="text-xl font-semibold">
                    {userData.height
                      ? isCm
                        ? userData.height
                        : userData.height * 0.033
                      : "-"}{" "}
                    {isCm ? "cm" : "ft"}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <View className={"items-center"}>
              {!isEdit && (
                <Text className="text-sm text-muted-foreground">Age</Text>
              )}
              {isEdit ? (
                <FormField
                  nativeID="age"
                  title="Age"
                  value={String(userDetails.age)}
                  handleTextChange={(value) =>
                    setUserDetails((prevValue) => ({
                      ...prevValue,
                      age: parseInt(value),
                    }))
                  }
                  placeholder="Eg., 24"
                  inputMode="numeric"
                  keyboardType="decimal-pad"
                />
              ) : (
                <Text className="text-xl font-semibold">{userData.age}</Text>
              )}
            </View>
          </View>
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          {isEdit ? (
            <View className="flex-row items-center gap-x-3">
              <Button
                onPress={() => {
                  setIsEdit(false);
                  setUserDetails(userDataCopy.current);
                }}
                disabled={loading}
                className="flex-1"
                variant={"secondary"}
              >
                <View className="flex-row gap-x-3 items-center">
                  <Text className="text-black font-bold text-xl">Cancel</Text>
                  {loading && (
                    <ActivityIndicator
                      animating={loading}
                      color={"#FFFFFF"}
                      size={Platform.OS === "ios" ? "small" : 50}
                    />
                  )}
                </View>
              </Button>
              <Button
                onPress={saveChanges}
                disabled={loading}
                className="flex-1"
              >
                <View className="flex-row gap-x-3 items-center">
                  <Text className="text-white font-bold text-xl">
                    Save Changes
                  </Text>
                  {loading && (
                    <ActivityIndicator
                      animating={loading}
                      color={"#FFFFFF"}
                      size={Platform.OS === "ios" ? "small" : 50}
                    />
                  )}
                </View>
              </Button>
            </View>
          ) : (
            <React.Fragment>
              <View className="flex-row items-center overflow-hidden">
                <Text className="text-sm text-muted-foreground">
                  Daily Goal:
                </Text>
                <LayoutAnimationConfig skipEntering>
                  <Animated.View
                    key={userData.goal}
                    entering={FadeInUp}
                    exiting={FadeOutDown}
                    className="w-11 items-center"
                  >
                    <Text className="text-sm font-bold text-sky-600">
                      {userData.goal}%
                    </Text>
                  </Animated.View>
                </LayoutAnimationConfig>
              </View>
              <Progress
                value={userData.goal}
                className="h-2"
                indicatorClassName="bg-sky-600"
              />
            </React.Fragment>
          )}
        </CardFooter>
      </Card>
    </View>
  );
};

export default UserCard;
