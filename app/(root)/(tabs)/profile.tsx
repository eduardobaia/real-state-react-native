import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { Image } from "react-native";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

interface SettingsItemProps {
  icon: any;
  title: string;
  onPress?: () => void;
  textSyle?: any;
  showArrow?: boolean;
}


const SettingsItem = ({icon, title, onPress, textStyle, showArrow =true }: SettingsItemProps ) => (
  // border-b border-gray-200 

  <TouchableOpacity className="flex flex-row items-center justify-between py-3 " onPress={onPress}>
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-5" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
       {title} 
      </Text>
    </View>
    {showArrow && (
      <Image source={icons.rightArrow} className="size-5" />
    )}
  </TouchableOpacity>
)


const Profile = () => {
  const {user, refetch} = useGlobalContext();
  const handleLogout = async () => {
    console.log("Entrou no logout function");

    const result = await logout();
    if(result) {
      console.log("Logout successful");
      refetch();
    } else {
      console.log("Logout failed");
      Alert.alert("Error", "Logout failed. Please try again.");
    }

    console.log("Logout clicked");
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" resizeMode="cover" />
        </View>
        <View className="flex flex-row items-center justify-center mt-5">
          <View className="flex flex-col items-center">
            <Image
              source={{uri: user?.avatar}} // Replace with actual user image
              className="size-44 relative rounded-full"
              resizeMode="cover"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9"></Image>
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>
        <View className="flex flex-col mt-10"> 
        <SettingsItem icon={icons.calendar} title="My bookings"  />
        <SettingsItem icon={icons.wallet} title="Payments"  />
        </View>
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
        {settings.map((item,index) => (
          <SettingsItem key={index} {...item} />
        ))}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
        <SettingsItem icon={icons.logout} title="Logout"  textSyle="text-danger" showArrow={false} onPress={handleLogout} />
        </View>
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
        <SettingsItem icon={icons.logout} title="Logout"  textSyle="text-danger" showArrow={false} onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
