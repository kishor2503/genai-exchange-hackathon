import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { PlusIcon, Trash2 } from "lucide-react-native";
import FormField from "~/components/FormField";

type AddWorkoutType = {
  title: string;
  description: string;
  totalDuationInMins: string;
  workouts: { workoutName: string; reps: string }[];
};

const AddWorkoutScreen = () => {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="bg-white h-full"
      >
        <View className="w-full gap-3 px-6">
          <Text className="text-3xl font-bold my-3">Add Workout</Text>
          <FormField
            nativeID="workouttitle"
            title="Workout Title"
            value={workoutDetails.title}
            handleTextChange={(value) =>
              setWorkoutDetils((prevValue) => ({ ...prevValue, title: value }))
            }
            placeholder="Eg., Morning HIIT"
          />
          <FormField
            nativeID="workoutdescription"
            title="Workout Description (Optional)"
            value={workoutDetails.description}
            handleTextChange={(value) =>
              setWorkoutDetils((prevValue) => ({
                ...prevValue,
                description: value,
              }))
            }
            placeholder="Eg., Describe your workout"
          />
          {workoutDetails.workouts.map((currentWorkout, idx) => (
            <View key={idx} className="gap-2">
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
              <FormField
                value={currentWorkout.workoutName}
                handleTextChange={(value) =>
                  setWorkoutDetils((prevValue) => {
                    const updatedWorkouts = [...prevValue.workouts];
                    updatedWorkouts[idx] = {
                      ...currentWorkout,
                      workoutName: value,
                    };
                    return { ...prevValue, workouts: updatedWorkouts };
                  })
                }
                placeholder="Eg., Running"
              />
              <FormField
                value={currentWorkout.reps}
                handleTextChange={(value) =>
                  setWorkoutDetils((prevValue) => {
                    const updatedWorkouts = [...prevValue.workouts];
                    updatedWorkouts[idx] = {
                      ...currentWorkout,
                      reps: value,
                    };
                    return { ...prevValue, workouts: updatedWorkouts };
                  })
                }
                placeholder="Eg., 40 mins"
              />
            </View>
          ))}
          <Button
            className="w-max"
            variant={"link"}
            onPress={() =>
              setWorkoutDetils((prevValue) => ({
                ...prevValue,
                workouts: [
                  ...prevValue.workouts,
                  { workoutName: "", reps: "" },
                ],
              }))
            }
          >
            <View className="flex-row items-center gap-x-2">
              <PlusIcon stroke={"black"} />
              <Text className="text-black text-lg">Add More Workout</Text>
            </View>
          </Button>
          <Button>
            <Text className="text-white font-bold text-xl">Submit Food</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddWorkoutScreen;
