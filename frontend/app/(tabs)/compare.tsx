import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { capitalizeWords } from "~/lib/utils";

const food1ApiData: any = {
  calories: "1200kcal",
  micronutrients: {
    fiber: "5g",
    sodium: "200mg",
    vitamina: "10g",
  },
  macronutrients: {
    protein: "40g",
    carbohydrates: "30g",
    fat: "20g",
  },
};

const food2ApiData: any = {
  calories: "1000kcal",
  micronutrients: {
    fiber: "0g",
    sodium: "200mg",
    "vitamin b12": "10g",
  },
  macronutrients: {
    protein: "40g",
    carbohydrates: "30g",
    fat: "20g",
  },
};

const compare = () => {
  const [food1, setFood1] = useState<string>("");
  const [food2, setFood2] = useState<string>("");
  const [food1Data, setFood1Data] = useState<any | null>(null);
  const [food2Data, setFood2Data] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const compareFoods = () => {
    setLoading(true);
    setTimeout(() => {
      setFood1Data(food1ApiData);
      setFood2Data(food2ApiData);
      setLoading(false);
    }, 3000);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          minHeight: Dimensions.get("screen").height,
        }}
      >
        <View className="gap-3 px-3">
          <View className="w-full h-[400px] flex-row items-start gap-3">
            <View className="h-full bg-gray-200 flex-1 px-3">
              <Input
                placeholder="Enter food 1"
                value={food1}
                onChangeText={setFood1}
                className="my-3"
              />
              {food1Data && (
                <React.Fragment>
                  <Text className="text-muted-foreground text-md">
                    * Per 100gms
                  </Text>
                  <Text className="text-lg">
                    Calories: {food1Data.calories}
                  </Text>
                  <Text className="text-xl font-bold">Micronutrients: </Text>
                  <View className="ml-2">
                    {Object.keys(food1Data.micronutrients).map(
                      (microkey, idx) => (
                        <Text className="text-lg" key={idx}>
                          {capitalizeWords(microkey)} :{" "}
                          {food1Data.micronutrients[microkey]}
                        </Text>
                      )
                    )}
                  </View>
                  <Text className="text-lg font-bold">Macronutrients: </Text>
                  <View className="ml-2">
                    {Object.keys(food1Data.macronutrients).map(
                      (macrokey, idx) => (
                        <Text className="text-lg" key={idx}>
                          {capitalizeWords(macrokey)} :{" "}
                          {food1Data.macronutrients[macrokey]}
                        </Text>
                      )
                    )}
                  </View>
                </React.Fragment>
              )}
            </View>
            <View className="h-full bg-gray-200 flex-1 px-3">
              <Input
                placeholder="Enter food 2"
                value={food2}
                onChangeText={setFood2}
                className="my-3"
              />
              {food2Data && (
                <React.Fragment>
                  <Text className="text-muted-foreground text-md">
                    * Per 100gms
                  </Text>
                  <Text className="text-lg">
                    Calories: {food2Data.calories}
                  </Text>
                  <Text className="text-xl font-bold">Micronutrients: </Text>
                  <View className="ml-2">
                    {Object.keys(food2Data.micronutrients).map(
                      (microkey, idx) => (
                        <Text className="text-lg" key={idx}>
                          {capitalizeWords(microkey)} :{" "}
                          {food2Data.micronutrients[microkey]}
                        </Text>
                      )
                    )}
                  </View>
                  <Text className="text-lg font-bold">Macronutrients: </Text>
                  <View className="ml-2">
                    {Object.keys(food2Data.macronutrients).map(
                      (macrokey, idx) => (
                        <Text className="text-lg" key={idx}>
                          {capitalizeWords(macrokey)} :{" "}
                          {food2Data.macronutrients[macrokey]}
                        </Text>
                      )
                    )}
                  </View>
                </React.Fragment>
              )}
            </View>
          </View>
          <Button
            className="w-full py-3 mt-2"
            disabled={food1 === "" || food2 === "" || loading}
            onPress={compareFoods}
          >
            <View className="flex-row gap-x-3 items-center">
              <Text className="text-white text-lg">Compare Foods</Text>
              {loading && (
                <ActivityIndicator
                  animating={loading}
                  color={"#FFFFFF"}
                  size={Platform.OS === "ios" ? "small" : 50}
                />
              )}
            </View>
          </Button>
          {food1Data && food2Data && (
            <View className="p-4">
              <Text className="text-white text-2xl font-bold">
                Recommendation:
              </Text>
              <Text className="text-white text-xl text-start">
                Comparing the nutritional value of these two products and
                considering your health status, you are strongly recommended to
                have Chicken over paneer
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default compare;
