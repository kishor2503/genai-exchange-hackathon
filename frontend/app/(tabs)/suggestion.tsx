import {
  CameraIcon,
  Dot,
  DotIcon,
  ListIcon,
  MousePointer,
  Pen,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import * as ImagePicker from "expo-image-picker";
import { CameraCapturedPicture } from "expo-camera";
import FormField from "~/components/FormField";
import { router } from "expo-router";

const backendSuggestion = [
  "Consider pairing the mutton briyani with additional protein sources such as grilled chicken or steamed fish and a side of vegetables.",
  "Other alternate food recommendations include: 1. Grilled chicken salad, 2. Quinoa bowl with chickpeas, 3. Steamed fish with brown rice.",
];

export default function ProfileScreen() {
  const [capturedImage, setCapturedImage] = useState<
    CameraCapturedPicture | undefined | ImagePicker.ImagePickerAsset
  >(undefined);
  const [question, setQuestion] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getSuggestion = () => {
    setLoading(true);
    setTimeout(() => {
      setSuggestions(backendSuggestion);
      setLoading(false);
    }, 2000);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setCapturedImage(result.assets[0]);
    } else {
      alert("You did not select any image.");
    }
  };

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setCapturedImage(result.assets[0]);
    } else {
      alert("You did not capture any image.");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          minHeight: Dimensions.get("screen").height,
        }}
      >
        <View className="px-3">
          <Text className="text-xl font-bold text-white mb-3">
            AI Suggestion
          </Text>
          {suggestions && (
            <Text className="text-lg font-semibold text-white mb-2">
              Your Query:
            </Text>
          )}
          {capturedImage ? (
            <View className="gap-2 items-center">
              <Image
                source={{ uri: capturedImage.uri }}
                className="w-full h-[200px]"
                resizeMode="contain"
              />
              {!suggestions && (
                <Button
                  variant={"link"}
                  onPress={() => setCapturedImage(undefined)}
                >
                  <View className="flex-row gap-2 items-center">
                    <Pen stroke={"white"} width={15} />
                    <Text className="text-white">Change Image</Text>
                  </View>
                </Button>
              )}
            </View>
          ) : (
            <View className="gap-3">
              <Button className="w-full py-3 mt-2" onPress={captureImage}>
                <View className="flex-row gap-x-3 items-center">
                  <CameraIcon stroke={"white"} />
                  <Text className="text-white text-lg">Capture an image</Text>
                </View>
              </Button>
              <Button
                className="w-full py-3 mt-2"
                onPress={pickImage}
                variant={"secondary"}
              >
                <View className="flex-row gap-x-3 items-center">
                  <MousePointer stroke={"black"} />
                  <Text className="text-black text-lg">Pick an Image</Text>
                </View>
              </Button>
            </View>
          )}
          <FormField
            nativeID="question"
            title="Your Question?"
            value={question}
            handleTextChange={setQuestion}
            placeholder="Eg., Can I eat this now??"
            fieldClassNames="text-white"
            labelClassNames="text-white"
            classNames="mt-4"
          />
          {!suggestions && (
            <Button
              className="mt-3"
              disabled={!capturedImage || question === "" || loading}
              onPress={getSuggestion}
            >
              <View className="flex-row gap-x-3 items-center">
                <Text className="text-white font-bold text-xl">
                  Get Suggestion
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
          )}
          {suggestions && (
            <View>
              <Text className="text-lg font-semibold text-white mb-2">
                Suggestions:
              </Text>
              {suggestions.map((suggestion, idx) => (
                <View
                  className="flex-row items-start gap-2 mb-1 px-3"
                  key={idx}
                >
                  <DotIcon stroke={"white"} />
                  <Text className="text-white text-xl font-semibold">
                    {suggestion}
                  </Text>
                </View>
              ))}
              <View className="flex-row gap-3 items-center mt-3">
                <TouchableOpacity
                  onPress={() => {
                    alert("Thank you for your feedback.");
                    router.push("/home");
                  }}
                >
                  <ThumbsUp stroke={"green"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.prompt(
                      "Feedback",
                      "We are very sorry, we will continue to improve your experience",
                      [
                        {
                          text: "Cancel",
                          style: "destructive",
                          onPress: () => {
                            alert("Thank you for your feedback.");
                            router.push("/home");
                          },
                        },
                        {
                          text: "Confirm",
                          onPress: (value) => {
                            alert("Thank you for your feedback. " + value);
                            router.push("/home");
                          },
                        },
                      ]
                    );
                  }}
                >
                  <ThumbsDown stroke={"red"} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
