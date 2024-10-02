import {
  Image,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";
import { Label } from "./ui/label";
import { cn } from "~/lib/utils";

type Props = {
  title?: string;
  value: string;
  placeholder?: string;
  type?: string;
  handleTextChange: (value: string) => void;
  fieldClassNames?: string;
  labelClassNames?: string;
  classNames?: string;
} & TextInputProps;

const FormField = ({
  title = "",
  value,
  placeholder = "",
  type = "text",
  handleTextChange,
  fieldClassNames = "",
  labelClassNames = "",
  classNames = "",
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <View className={cn("w-full gap-y-3", classNames)}>
      {title && title !== "" && (
        <Label
          nativeID={props.nativeID ?? title}
          className={cn("font-semibold text-black", labelClassNames)}
        >
          {title}
        </Label>
      )}
      <View className="w-full rounded-lg bg-black-100 border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7B7B8B"}
          secureTextEntry={type === "password" && !showPassword}
          className={`flex-1 px-4 h-[60px] font-semibold text-black ${fieldClassNames}`}
          onChangeText={handleTextChange}
          {...props}
        />

        {type === "password" && value.length > 0 && (
          <TouchableOpacity
            onPress={() => setShowPassword((prevValue) => !prevValue)}
            className="pr-4"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
