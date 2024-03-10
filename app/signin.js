import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";

export default function signin() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      setErrorMessage(`Sign In : Please enter your email and password`);
      return;
    }

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (!response.success) {
      setErrorMessage(`Sign In : ${response.msg}`);
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
          Sign In
        </Text>
        <View className="gap-4">
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
          <View className="gap-3">
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
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-right text-neutral-500"
            >
              Forgot Password?
            </Text>
          </View>

          <View>
            {loading ? (
              <View className="flex-row justify-center">
                <Text>Loding</Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleLogin}
                style={{ height: hp(6.5) }}
                className="bg-indigo-500 justify-center items-center"
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="text-white font-bold tracking-wider"
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-row justify-center">
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-indigo-500"
            >
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("signup")}>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-bold text-indigo-500"
              >
                Sign Up!
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {errorMessage == "" ? null : <Text>Error: {errorMessage}</Text>}
    </View>
  );
}
