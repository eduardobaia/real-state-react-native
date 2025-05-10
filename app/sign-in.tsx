import {
  View,
  Text,
  ScrollView,
  Image,
//   SafeAreaView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import images from "@/constants/images";
import icons from "@/constants/icons";
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const handleSignIn = () => {
    console.log("Sign in with Google");
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="flex-grow">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
        //   style={{ width: '100%', height: 600 }}
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-500">
            Welcome to ReState
          </Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's get you closer to {"\n"}
            <Text className="text-primary-300">your ideal Home</Text>
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Sign in to your account Login to ReState with google
          </Text>

          <TouchableOpacity
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
            onPress={handleSignIn}
          >
            <View className="flex flex-row items-center justify-center">
            <Image
              source={icons.google}
              className="w-5 h-5 "
              resizeMode="contain"
            />
            <Text className="tezt-lg font-rubik-medium text-black-300 ml-2">Continue with Google</Text>
                </View>
        
        
          </TouchableOpacity>

          
          
        </View>
      
        <View className="px-10">
            <Text className="text-lg font-rubik text-black-200 text-center mt-12">
                Don't have an account?{" "}
                <Text className="text-primary-300">Sign up</Text>
            </Text>
        </View>
        
  
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
