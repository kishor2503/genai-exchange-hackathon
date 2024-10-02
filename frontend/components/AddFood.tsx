import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Button, type } from "./ui/button";
import { CameraIcon, MousePointer, Pen } from "lucide-react-native";
import { Input } from "./ui/input";
import { CameraCapturedPicture } from "expo-camera";
import CaptureImage from "./CaptureImage";
import * as ImagePicker from "expo-image-picker";
import FormField from "./FormField";

type Props = {
  open: boolean;
  handleOpen: (value: boolean) => void;
};

type AddFoodType = {
  image: File;
  title: string;
  description: string;
  measurements: {
    servings: string;
    weight: string;
  };
};

const AddFood = ({ open, handleOpen }: Props) => {
  const [capturedImage, setCapturedImage] = useState<
    CameraCapturedPicture | undefined | ImagePicker.ImagePickerAsset
  >(undefined);
  const [foodDetails, setFoodDetils] = useState<AddFoodType>({} as AddFoodType);

  const handleImageChange = (image: CameraCapturedPicture | undefined) => {
    image && setCapturedImage(image);
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="w-[300px] gap-3">
          <View>
            <Label nativeID="image">Food Image</Label>
            {capturedImage ? (
              <View className="gap-2 items-center">
                <Image
                  source={{ uri: capturedImage.uri }}
                  className="w-full h-[200px]"
                  resizeMode="contain"
                />
                <Button
                  variant={"link"}
                  onPress={() => setCapturedImage(undefined)}
                >
                  <View className="flex-row gap-2 items-center">
                    <Pen stroke={"black"} width={15} />
                    <Text>Change Image</Text>
                  </View>
                </Button>
              </View>
            ) : (
              <React.Fragment>
                <Button
                  className="w-full py-3 mt-2"
                  onPress={() => handleOpen(true)}
                >
                  <View className="flex-row gap-x-3 items-center">
                    <CameraIcon stroke={"white"} />
                    <Text className="text-white text-lg">
                      Capture Your food
                    </Text>
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
              </React.Fragment>
            )}
          </View>
          {/* <View>
            <Label nativeID="title">Food title</Label>
            <Input
              placeholder="Eg., Chicken Tikka"
              value={foodDetails.title}
              onChangeText={(value) =>
                setFoodDetils((prevValue) => ({ ...prevValue, title: value }))
              }
            />
          </View> */}
          <FormField
            title="Food Title"
            value={foodDetails.title}
            handleTextChange={(value) =>
              setFoodDetils((prevValue) => ({ ...prevValue, title: value }))
            }
            placeholder="Eg., Chicken Tikka"
            type="text"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <View>
            <Label nativeID="description">Food Description (Optional)</Label>
            <Input
              placeholder="Describe your food"
              value={foodDetails.description}
              inputMode="search"
              onChangeText={(value) =>
                setFoodDetils((prevValue) => ({
                  ...prevValue,
                  description: value,
                }))
              }
            />
          </View>
          <View>
            <Label nativeID="servings">Number of Servings</Label>
            <Input
              placeholder="Eg., 2"
              value={foodDetails.title}
              onChangeText={(value) =>
                setFoodDetils((prevValue) => ({ ...prevValue, title: value }))
              }
            />
          </View>
          <View>
            <Label nativeID="weight">Weight Per Serving</Label>
            <Input
              placeholder="Eg., 250gm"
              value={foodDetails.title}
              onChangeText={(value) =>
                setFoodDetils((prevValue) => ({ ...prevValue, title: value }))
              }
            />
          </View>
          <Button>
            <Text className="text-white font-bold text-xl">Submit Food</Text>
          </Button>
        </View>
        {open && (
          <CaptureImage
            onCapture={(image) => setCapturedImage(image)}
            closeCapture={() => handleOpen(false)}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddFood;
