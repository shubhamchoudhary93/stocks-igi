import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function index() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}
