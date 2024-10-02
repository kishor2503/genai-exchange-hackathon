import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { CameraIcon, MousePointer, Pen } from "lucide-react-native";
import FormField from "~/components/FormField";
import * as ImagePicker from "expo-image-picker";
import { CameraCapturedPicture } from "expo-camera";

type AddFoodType = {
  capturedImage:
    | CameraCapturedPicture
    | undefined
    | ImagePicker.ImagePickerAsset;
  title: string;
  description: string;
  measurements: {
    servings: string;
    weight: string;
  };
};

const AddFoodScreen = () => {
  const [foodDetails, setFoodDetils] = useState<AddFoodType>({
    capturedImage: undefined,
    title: "",
    description: "",
    measurements: {
      servings: "",
      weight: "",
    },
  } as AddFoodType);

  const handleImageChange = (image: CameraCapturedPicture | undefined) => {
    image &&
      setFoodDetils((prevValue) => ({ ...prevValue, capturedImage: image }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setFoodDetils((prevValue) => ({
        ...prevValue,
        capturedImage: result.assets[0],
      }));
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
      setFoodDetils((prevValue) => ({
        ...prevValue,
        capturedImage: result.assets[0],
      }));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="bg-white h-full"
      >
        <View className="w-full gap-3 px-6">
          <Text className="text-3xl font-bold my-3">Add Food</Text>
          <View>
            <Label nativeID="image">Food Image</Label>
            {foodDetails.capturedImage ? (
              <View className="gap-2 items-center">
                <Image
                  source={{ uri: foodDetails.capturedImage.uri }}
                  className="w-full h-[200px]"
                  resizeMode="contain"
                />
                <Button
                  variant={"link"}
                  onPress={() =>
                    setFoodDetils((prevValue) => ({
                      ...prevValue,
                      capturedImage: undefined,
                    }))
                  }
                >
                  <View className="flex-row gap-2 items-center">
                    <Pen stroke={"black"} width={15} />
                    <Text>Change Image</Text>
                  </View>
                </Button>
              </View>
            ) : (
              <React.Fragment>
                <Button className="w-full py-3 mt-2" onPress={captureImage}>
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
          <FormField
            nativeID="foodtitle"
            title="Food Title"
            value={foodDetails.title}
            handleTextChange={(value) =>
              setFoodDetils((prevValue) => ({ ...prevValue, title: value }))
            }
            placeholder="Eg., Chicken Tikka"
          />
          <FormField
            nativeID="fooddescription"
            title="Food Description (Optional)"
            value={foodDetails.description}
            handleTextChange={(value) =>
              setFoodDetils((prevValue) => ({
                ...prevValue,
                description: value,
              }))
            }
            placeholder="Eg., Describe your food"
          />
          <FormField
            nativeID="servings"
            title="Number of Servings"
            value={foodDetails.measurements.servings}
            handleTextChange={(value) =>
              setFoodDetils((prevValue) => ({
                ...prevValue,
                measurements: {
                  ...prevValue.measurements,
                  servings: value,
                },
              }))
            }
            placeholder="Eg., 2"
            inputMode="numeric"
            keyboardType="decimal-pad"
          />
          <FormField
            nativeID="weight"
            title="Weight Per Serving (in gms)"
            value={foodDetails.measurements.weight}
            handleTextChange={(value) =>
              setFoodDetils((prevValue) => ({
                ...prevValue,
                measurements: {
                  ...prevValue.measurements,
                  weight: value,
                },
              }))
            }
            placeholder="Eg., 2"
            inputMode="numeric"
            keyboardType="decimal-pad"
          />
          <Button>
            <Text className="text-white font-bold text-xl">Submit Food</Text>
          </Button>
        </View>
        {/* {open && (
          <CaptureImage
            onCapture={(image) =>
              setFoodDetils((prevValue) => ({
                ...prevValue,
                capturedImage: image,
              }))
            }
            closeCapture={() => setOpen(false)}
          />
        )} */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddFoodScreen;
