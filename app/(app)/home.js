import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, stockRef } from "../../firebaseConfig";
import SelectDropdown from "react-native-select-dropdown";
import generateTestData from "../../utils/generateTestData";

export default function home() {
  const { logout, user } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedStockList, setSelectedStockList] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockDetail, setStockDetail] = useState([]);
  const quantityRef = useRef(0);
  const [stockTransactions, setStockTrasanctions] = useState([]);

  useEffect(() => {
    if (user?.uid) getStocks();
  }, []);

  useEffect(() => {
    setCategory(getCategory());
  }, [stocks]);

  useEffect(() => {
    filterStocksbyCategory();
  }, [selectedOption]);

  useEffect(() => {
    setStockDetail(stocks.filter((item) => item.name == selectedStock)[0]);
  }, [selectedStock]);

  const getStocks = async () => {
    const q = query(stockRef);

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setStocks(data);
  };

  const getCategory = () => {
    const uniqueValues = new Set(stocks.map((item) => item["category"]));
    return [...uniqueValues];
  };

  const handleSelectforCategory = (value, index) => {
    setSelectedOption(value);
  };

  const handleSelectforStock = (value, index) => {
    setSelectedStock(value);
  };

  const filterStocksbyCategory = () => {
    const filteredData = stocks.filter(
      (item) => item.category == selectedOption
    );
    const uniqueValues = new Set(filteredData.map((item) => item["name"]));
    setSelectedStockList([...uniqueValues]);
  };

  return (
    <>
      {stocks.length > 0 ? (
        <ScrollView className="flex-1 bg-white">
          <SelectDropdown
            data={category}
            onSelect={handleSelectforCategory}
            defaultButtonText="Select Category"
            buttonStyle={{
              backgroundColor: "#f1f5f9",
              marginHorizontal: 20,
              marginVertical: 10,
              width: wp("100%"),
              borderRadius: 10,
            }}
            dropdownStyle={{ backgroundColor: "#f1f5f9", borderRadius: 10 }}
          />
          <SelectDropdown
            data={selectedStockList}
            onSelect={handleSelectforStock}
            defaultButtonText="Select Stock"
            search={true}
            buttonStyle={{
              backgroundColor: "#f1f5f9",
              marginHorizontal: 20,
              marginVertical: 10,
              width: wp("100%"),
              borderRadius: 10,
            }}
            dropdownStyle={{ backgroundColor: "#f1f5f9", borderRadius: 10 }}
            searchInputStyle={{ backgroundColor: "#f1f5f9", borderRadius: 10 }}
          />
          {stockDetail && (
            <>
              <View style={{ marginEnd: 20 }} className="items-end">
                <Text
                  className={`${
                    stockDetail.current <= stockDetail.threshold
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  Current Stock: {stockDetail.current}
                </Text>
              </View>
              <View style={{ height: hp(9) }}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numeric"
                  onChangeText={(value) => (quantityRef.current = { value })}
                  style={{
                    fontSize: hp(2),
                    paddingStart: 30,
                    marginHorizontal: 20,
                    marginVertical: 10,
                    borderRadius: 10,
                  }}
                  className="font-semibold flex-1 text-neutral-700 bg-slate-100"
                  placeholder="Quantity"
                  placeholderTextColor={"gray"}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: hp(9),
                  marginHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    setStockTrasanctions((stockTransactions) => [
                      ...stockTransactions,
                      {
                        name: stockDetail.name,
                        quantity: quantityRef.current.value,
                        add: true,
                      },
                    ])
                  }
                  style={{ height: hp(6.5), marginEnd: 10, marginVertical: 10 }}
                  className="flex-1 bg-green-400 justify-center items-center "
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    ADD
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setStockTrasanctions((stockTransactions) => [
                      ...stockTransactions,
                      {
                        name: stockDetail.name,
                        quantity: quantityRef.current.value,
                        add: false,
                      },
                    ])
                  }
                  style={{ height: hp(6.5), marginVertical: 10 }}
                  className="flex-1 bg-red-400 justify-center items-center"
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    MINUS
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {stockTransactions.length !== 0 ? (
            <View
              style={{
                height: wp(80),
                marginHorizontal: 20,
                backgroundColor: "#f1f5f9",
                borderRadius: 10,
                padding: 10,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <FlatList
                numColumns={3}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={false}
                data={stockTransactions}
                renderItem={({ item }) => (
                  <View className="p-2">
                    <Text
                      className={`text-center ${
                        item.add ? "" : "text-red-600"
                      }`}
                    >
                      {item.name}
                    </Text>
                    <Divider item={item} />
                    <Text
                      className={`text-center ${
                        item.add ? "" : "text-red-600"
                      }`}
                    >
                      {item.quantity}
                    </Text>
                  </View>
                )}
                keyExtractor={(item) => Math.random()}
              />
            </View>
          ) : null}
          <TouchableOpacity
            onPress={() => console.log("commit")}
            style={{
              height: hp(6.5),
              marginVertical: 10,
              marginHorizontal: 20,
            }}
            className="flex-1 bg-neutral-500 justify-center items-center"
          >
            <Text
              style={{ fontSize: hp(2.7) }}
              className="text-white font-bold tracking-wider"
            >
              SAVE
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View className="flex item-center" style={{ top: hp(30) }}>
          <ActivityIndicator size="large" />
          <TouchableOpacity
            className="items-center pt-6"
            onPress={generateTestData}
          >
            <Text style={{ fontSize: hp(2) }}>Generate Test Data</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const Divider = ({ item }) => {
  return (
    <View
      className={`w-full p-[1px] ${
        item <= 10 ? "bg-red-600" : "bg-neutral-600"
      }`}
    />
  );
};
