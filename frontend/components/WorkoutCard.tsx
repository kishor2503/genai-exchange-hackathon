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
  workouts: { [key: string]: string };
  duration: string;
  time: Date;
  healthData: { [key: string]: string };
};

const WorkoutCard = ({
  title,
  imageUrl,
  workouts,
  duration,
  time,
  healthData,
}: Props) => {
  return (
    <Card className="p-4">
      {imageUrl && imageUrl !== "" && (
        <CardHeader className="bg-red-400 p-0 rounded-lg">
          <Image
            source={{ uri: imageUrl }}
            alt={title}
            className="w-full h-[200px] rounded-lg"
            resizeMode="cover"
            resizeMethod="scale"
          />
        </CardHeader>
      )}
      <CardTitle className="mt-3">{title}</CardTitle>
      <CardDescription className="mt-3">
        <View>
          <View className="w-full flex-wrap flex-row gap-3">
            {Object.keys(healthData).map((healthKey, idx) => (
              <View key={idx}>
                <Text className="text-lg">{capitalizeWords(healthKey)}</Text>
                <Text className="text-xl font-bold">
                  {healthData[healthKey]}
                </Text>
              </View>
            ))}
          </View>
          <View className="w-full flex-wrap flex-row gap-3">
            {Object.keys(workouts).map((workoutKey, idx) => (
              <View key={idx}>
                <Text className="text-lg">{capitalizeWords(workoutKey)}</Text>
                <Text className="text-xl font-bold">
                  {workouts[workoutKey]}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </CardDescription>
      <CardFooter className="p-0 mt-2 flex-col items-start">
        <Text className="text-muted-foreground">Duration: {duration} </Text>
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

export default WorkoutCard;
