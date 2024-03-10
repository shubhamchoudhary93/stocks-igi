import { View, Text, FlatList } from "react-native";
import React from "react";
import StockItem from "./StockItem";
import { useRouter } from "expo-router";

export default function StockList({ stocks }) {
  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={stocks}
        contentContainerSStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(items) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <StockItem
            noBorder={index + 1 == stocks.length}
            router={router}
            item={item}
            index={index}
          />
        )}
      />
    </View>
  );
}
