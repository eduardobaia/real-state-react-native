import { Link } from "expo-router";
import { Text, View } from "react-native"; 


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
 

   <View className="flex-1 justify-center items-center bg-gray-200">
   <Link href="/sign-up">Sign up</Link>
   <Link href="/sign-in">Sign in </Link>
   <Link href="/explore">Explore</Link>
   <Link href="/profile">Profile </Link>
   <Link href="/properties/1">Propertie </Link>

   
      <Text className="text-red-500 text-lg font-bold">
        Welcome to NativeWind in Expo!
      </Text>
    </View>


    </View>
  );
}
