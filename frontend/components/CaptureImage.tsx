import { Dimensions, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Button } from "./ui/button";
import { Aperture, CircleX, SwitchCamera } from "lucide-react-native";

type Props = {
  onCapture: (photo: CameraCapturedPicture | undefined) => void;
  closeCapture: () => void;
};

const CaptureImage = ({ onCapture, closeCapture }: Props) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  //   if (!permission) {
  //     closeCapture();
  //   }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onCapture(photo);
      // Handle the photo (e.g., save, upload, etc.)
    }
  };

  if (!permission?.granted) {
    return (
      <View className="">
        <Text className="mt-2 text-xl">
          We need your permission to show the camera
        </Text>
        <Text className="text-muted-foreground">
          Please go to you device settings and allow camera for Suggestly
        </Text>
        <Text className="w-full text-center my-2">Or</Text>
        <Button onPress={requestPermission}>
          <Text className="text-white font-semibold">
            Request Permission Again
          </Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="justify-center fixed top-0 left-0 bottom-0 right-0">
      <CameraView
        facing={facing}
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
        }}
        ref={cameraRef}
      >
        <View className="my-[80px] left-0 flex-row gap-x-3 bg-black mt-2 py-3 px-3">
          <Button
            onPress={toggleCameraFacing}
            variant={"outline"}
            className="flex-1"
          >
            <View className="flex-row items-center gap-x-2">
              <SwitchCamera stroke={"orange"} />
              <Text className="text-black text-lg">Flip</Text>
            </View>
          </Button>
          <Button onPress={closeCapture} variant={"outline"} className="flex-1">
            <View className="flex-row items-center gap-x-2">
              <CircleX stroke={"red"} />
              <Text className="text-black text-lg">Close</Text>
            </View>
          </Button>
          <Button onPress={takePicture} className="flex-1">
            <View className="flex-row items-center gap-x-2">
              <Aperture stroke={"white"} />
              <Text className="text-white text-lg">Capture</Text>
            </View>
          </Button>
        </View>
      </CameraView>
    </View>
  );
};

export default CaptureImage;
