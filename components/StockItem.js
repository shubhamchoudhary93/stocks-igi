import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function StockItem({ item, noBorder, router }) {
  const openStockDetail = () => {
    router.push({
      pathname: "/detail",
      params: { stock: JSON.stringify(item) },
    });
  };
  return (
    <View>
      <TouchableOpacity
        onPress={openStockDetail}
        className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${
          noBorder ? "" : "border-b border-b-neutral-200"
        }`}
      >
        <Text style={{ fontSize: hp(3.3) }}>{item?.name}</Text>
      </TouchableOpacity>
    </View>
  );
}
