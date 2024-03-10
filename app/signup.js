import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";

export default function Signun() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      setErrorMessage(`Sign Up : Please enter all fields`);
      return;
    }
    setLoading(true);

    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current
    );
    setLoading(false);

    console.log("got result:", response);
    if (!response.success) {
      setErrorMessage(`Sign Up : ${response.msg}`);
      return;
    }
  };
  return (
    <View
      style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
      className=" gap-12"
    >
      <View className="gap-10">
        <Text
          style={{ fontSize: hp(4) }}
          className="font-bold tracking-wider text-center text-neutral-800"
        >
          Sign Up
        </Text>
        <View className="gap-4">
          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value) => (usernameRef.current = { value })}
              style={{ fontSize: hp(2) }}
              className="font-semibold flex-1 text-neutral-700"
              placeholder="Username"
              placeholderTextColor={"gray"}
            />
          </View>
          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value) => (emailRef.current = { value })}
              style={{ fontSize: hp(2) }}
              className="font-semibold flex-1 text-neutral-700"
              placeholder="Email Address"
              placeholderTextColor={"gray"}
            />
          </View>

          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
          >
            <TextInput
              secureTextEntry
              onChangeText={(value) => (passwordRef.current = { value })}
              style={{ fontSize: hp(2) }}
              className="font-semibold flex-1 text-neutral-700"
              placeholder="Password"
              placeholderTextColor={"gray"}
            />
          </View>

          <View>
            {loading ? (
              <View className="flex-row justify-center">
                <Text>Loading</Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleRegister}
                style={{ height: hp(6.5) }}
                className="bg-indigo-500 justify-center items-center"
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="text-white font-bold tracking-wider"
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-row justify-center">
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-indigo-500"
            >
              Already have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("signin")}>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-bold text-indigo-500"
              >
                Sign In!
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {errorMessage == "" ? null : <Text>Error: {errorMessage}</Text>}
    </View>
  );
}
