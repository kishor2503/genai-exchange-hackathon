import { Dimensions, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FoodCard from "~/components/FoodCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import WorkoutCard from "~/components/WorkoutCard";
import { PlusIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

type FoodType = {
  title: string;
  imageUrl: string;
  nutritionValues: { [key: string]: string };
  time: Date;
  measurements: { [key: string]: string };
};

type WorkoutType = {
  title: string;
  imageUrl: string;
  workouts: { [key: string]: string };
  duration: string;
  time: Date;
  healthData: { [key: string]: string };
};

const foodsData: FoodType[] = [
  {
    title: "Grilled Salmon",
    imageUrl:
      "https://media.istockphoto.com/id/1214416414/photo/barbecued-salmon-fried-potatoes-and-vegetables-on-wooden-background.jpg?s=612x612&w=0&k=20&c=Y8RYbZFcvec-FXMMuoU-qkprC3TUFNiw3Ysoe8Drn6g=",
    measurements: {
      servings: "1",
      weight: "200gm",
    },
    nutritionValues: {
      calories: "450g",
      fat: "15%",
      protein: "30g",
      carbohydrates: "5g",
    },
    time: new Date(),
  },
  {
    title: "Veggie Pizza",
    imageUrl:
      "https://j6e2i8c9.rocketcdn.me/wp-content/uploads/2016/02/veggie-pizza-3-1.jpg",
    measurements: {
      servings: "2",
      weight: "600gm",
    },
    nutritionValues: {
      calories: "900g",
      fat: "30%",
      protein: "25g",
      carbohydrates: "100g",
    },
    time: new Date(),
  },
  {
    title: "Caesar Salad",
    imageUrl:
      "https://media.istockphoto.com/id/534139231/photo/healthy-grilled-chicken-caesar-salad.jpg?s=612x612&w=0&k=20&c=TR_sE5S5ChmjFywg3dh_J5V_ha-BcwgTU26BvsgbsjY=",
    measurements: {
      servings: "1",
      weight: "250gm",
    },
    nutritionValues: {
      calories: "200g",
      fat: "10%",
      protein: "10g",
      carbohydrates: "15g",
    },
    time: new Date(),
  },
  {
    title: "Chicken Biryani",
    imageUrl:
      "https://st4.depositphotos.com/18645588/25027/i/450/depositphotos_250276362-stock-photo-delicious-spicy-chicken-biryani.jpg",
    measurements: {
      servings: "1",
      weight: "500gm",
    },
    nutritionValues: {
      calories: "800g",
      fat: "25%",
      protein: "35g",
      carbohydrates: "120g",
    },
    time: new Date(),
  },
  {
    title: "Beef Burger",
    imageUrl:
      "https://media.istockphoto.com/id/1309352410/photo/cheeseburger-with-tomato-and-lettuce-on-wooden-board.jpg?s=612x612&w=0&k=20&c=lfsA0dHDMQdam2M1yvva0_RXfjAyp4gyLtx4YUJmXgg=",
    measurements: {
      servings: "1",
      weight: "350gm",
    },
    nutritionValues: {
      calories: "700g",
      fat: "40%",
      protein: "25g",
      carbohydrates: "80g",
    },
    time: new Date(),
  },
];

const workoutsData: WorkoutType[] = [
  {
    title: "Morning HIIT",
    imageUrl: "",
    healthData: {
      calories: "400 kcal",
      "heart rate": "72 bpm",
      "oxygen level": "98%",
    },
    workouts: {
      running: "10 mins",
      skipping: "1200 reps",
      "jumping jacks": "300 reps",
      plank: "10 mins",
    },
    duration: "40 mins",
    time: new Date(),
  },
  {
    title: "Strength Training",
    imageUrl: "",
    healthData: {
      calories: "600 kcal",
      "heart rate": "80 bpm",
      "oxygen level": "99%",
    },
    workouts: {
      squats: "200 reps",
      deadlift: "50 reps",
      benchPress: "100 reps",
      burpees: "50 reps",
    },
    duration: "60 mins",
    time: new Date(),
  },
  {
    title: "Yoga Session",
    imageUrl: "",
    healthData: {
      calories: "300 kcal",
      "heart rate": "65 bpm",
      "oxygen level": "100%",
    },
    workouts: {
      "sun salutation": "15 mins",
      stretching: "20 mins",
      meditation: "15 mins",
      plank: "5 mins",
    },
    duration: "50 mins",
    time: new Date(),
  },
  {
    title: "Evening Cardio",
    imageUrl: "",
    healthData: {
      calories: "500 kcal",
      "heart rate": "78 bpm",
      "oxygen level": "97%",
    },
    workouts: {
      cycling: "30 mins",
      running: "15 mins",
      "jumping jacks": "200 reps",
      burpees: "100 reps",
    },
    duration: "45 mins",
    time: new Date(),
  },
];

const HomeScreen = () => {
  const [currTab, setCurrTab] = useState<string>("foods");

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          minHeight: Dimensions.get("screen").height,
        }}
      >
        <View className="px-3 relative">
          <Text className="text-white text-xl">Welcome Back,</Text>
          <Text className="text-primary text-4xl mt-2 font-bold">
            Abul Hassan
          </Text>
          <View className="mt-5">
            <Tabs value={currTab} onValueChange={setCurrTab}>
              <TabsList className="w-full flex-row mb-3">
                <TabsTrigger value="foods" className="flex-1">
                  <Text className="text-black text-2xl font-semibold">
                    Your Foods
                  </Text>
                </TabsTrigger>
                <TabsTrigger value="workouts" className="flex-1">
                  <Text className="text-black text-2xl font-semibold">
                    Your Workouts
                  </Text>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="foods">
                <View className="gap-3">
                  {foodsData.map((food, index) => (
                    <FoodCard
                      key={index}
                      title={food.title}
                      imageUrl={food.imageUrl}
                      nutritionValues={food.nutritionValues}
                      measurements={food.measurements}
                      time={food.time}
                    />
                  ))}
                </View>
              </TabsContent>
              <TabsContent value="workouts">
                <View className="gap-3">
                  {workoutsData.map((workout, idx) => (
                    <WorkoutCard
                      key={idx}
                      title={workout.title}
                      imageUrl={workout.imageUrl}
                      healthData={workout.healthData}
                      workouts={workout.workouts}
                      duration={workout.duration}
                      time={workout.time}
                    />
                  ))}
                </View>
              </TabsContent>
            </Tabs>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="bg-primary absolute px-3 py-4 rounded-full bottom-3 right-3 flex items-center justify-center z-50"
        onPress={() => {
          currTab === "foods"
            ? router.push("/addfood")
            : router.push("/addworkout");
        }}
      >
        <View className="flex-row items-center gap-x-2">
          <PlusIcon stroke={"white"} />
          <Text className="text-white text-xl">
            {currTab === "foods" ? "Food" : "Workout"}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
