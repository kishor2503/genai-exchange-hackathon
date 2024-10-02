import { Image, Text, View } from "react-native";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { capitalizeWords } from "~/lib/utils";

type Props = {
  title: string;
  imageUrl: string;
  nutritionValues: { [key: string]: string };
  time: Date;
  measurements: { [key: string]: string };
};

const FoodCard = ({
  title,
  imageUrl,
  nutritionValues,
  time,
  measurements,
}: Props) => {
  return (
    <Card className="p-4">
      <CardHeader className="bg-red-400 p-0 rounded-lg">
        <Image
          source={{ uri: imageUrl }}
          alt={title}
          className="w-full h-[200px] rounded-lg"
          resizeMode="cover"
          resizeMethod="scale"
        />
      </CardHeader>
      <CardTitle className="mt-3">{title}</CardTitle>
      <CardDescription className="mt-3">
        <View className="w-full flex-wrap flex-row gap-3">
          {Object.keys(nutritionValues).map((nutritionKey, idx) => (
            <View key={idx}>
              <Text className="text-lg">{capitalizeWords(nutritionKey)}</Text>
              <Text className="text-xl font-bold">
                {nutritionValues[nutritionKey]}
              </Text>
            </View>
          ))}
        </View>
      </CardDescription>
      <CardFooter className="p-0 mt-2">
        <Text className="text-muted-foreground">
          Added:{" "}
          {time.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
