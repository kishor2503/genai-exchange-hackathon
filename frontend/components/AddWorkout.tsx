import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PlusIcon, Trash2 } from "lucide-react-native";

type AddWorkoutType = {
  title: string;
  description: string;
  totalDuationInMins: string;
  workouts: { workoutName: string; reps: string }[];
};

const AddWorkout = () => {
  const [workoutDetails, setWorkoutDetils] = useState<AddWorkoutType>({
    title: "",
    description: "",
    totalDuationInMins: "",
    workouts: [
      {
        workoutName: "",
        reps: "",
      },
    ],
  } as AddWorkoutType);
  return (
    <View className="w-[300px] gap-3">
      <View>
        <Label nativeID="title">Workout Title</Label>
        <Input
          placeholder="Eg., Morning HIIT"
          value={workoutDetails.title}
          onChangeText={(value) =>
            setWorkoutDetils((prevValue) => ({ ...prevValue, title: value }))
          }
        />
      </View>
      <View>
        <Label nativeID="description">Workout Description (Optional)</Label>
        <Input
          placeholder="Describe your food"
          value={workoutDetails.description}
          inputMode="search"
          onChangeText={(value) =>
            setWorkoutDetils((prevValue) => ({
              ...prevValue,
              description: value,
            }))
          }
        />
      </View>
      {workoutDetails.workouts.map((currentWorkout, idx) => (
        <View key={idx}>
          <View className="w-full flex-row justify-between items-center">
            <Label nativeID={`workout-${idx + 1}`}>
              Workout {idx + 1} & Reps
            </Label>
            {idx > 0 && (
              <TouchableOpacity
                className="px-3"
                onPress={() => {
                  setWorkoutDetils((prevValue) => {
                    const updatedWorkouts = [...prevValue.workouts];
                    updatedWorkouts.splice(idx, 1);
                    return { ...prevValue, workouts: updatedWorkouts };
                  });
                }}
              >
                <Trash2 stroke={"red"} width={15} />
              </TouchableOpacity>
            )}
          </View>
          <Input
            placeholder="Eg., Running"
            value={currentWorkout.workoutName}
            onChangeText={(value) =>
              setWorkoutDetils((prevValue) => {
                const updatedWorkouts = [...prevValue.workouts];
                updatedWorkouts[idx] = {
                  ...currentWorkout,
                  workoutName: value,
                };
                return { ...prevValue, workouts: updatedWorkouts };
              })
            }
          />
          <Input
            placeholder="Eg., 40 mins"
            value={currentWorkout.reps}
            onChangeText={(value) =>
              setWorkoutDetils((prevValue) => {
                const updatedWorkouts = [...prevValue.workouts];
                updatedWorkouts[idx] = {
                  ...currentWorkout,
                  reps: value,
                };
                return { ...prevValue, workouts: updatedWorkouts };
              })
            }
            className="mt-2"
          />
        </View>
      ))}
      <Button
        className="w-max"
        variant={"link"}
        onPress={() =>
          setWorkoutDetils((prevValue) => ({
            ...prevValue,
            workouts: [...prevValue.workouts, { workoutName: "", reps: "" }],
          }))
        }
      >
        <View className="flex-row items-center gap-x-2">
          <PlusIcon stroke={"black"} />
          <Text className="text-black text-lg">Add More Workout</Text>
        </View>
      </Button>
      <View>
        <Label nativeID="duration">Total Duration (in minutes)</Label>
        <Input
          placeholder="Eg., 40"
          value={workoutDetails.totalDuationInMins}
          inputMode="numeric"
          keyboardType="decimal-pad"
          onChangeText={(value) =>
            setWorkoutDetils((prevValue) => ({
              ...prevValue,
              totalDuationInMins: value,
            }))
          }
        />
      </View>
      <Button>
        <Text className="text-white font-bold text-xl">Submit Workout</Text>
      </Button>
    </View>
  );
};

export default AddWorkout;
