import { Card, FeatureCard } from "@/components/Card";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useGlobalContext } from "@/lib/global-provider";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import seed from "@/lib/seed";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";



export default function Index() {

  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{query?: string; filter?: string}>();

  const {data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({fn: getLatestProperties})


  const { data: properties, loading, refetch} = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter || "All",
      query: params.query || "",
      limit: 6,
    },
    skip: true
  
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  
  const handleCardPress = (propertyId: string) => {
    // Navigate to the property details page
    console.log("Navigating to property:", propertyId);
    router.push(`/property/${propertyId}`); 
  };


  // console.log("User:", user);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
             ListEmptyComponent={
                  loading ? (
                    <ActivityIndicator size="large" className="text-primary-300 mt-5" />
                  ) : <NoResults />
                 }
        renderItem={({ item }) => <Card  item={item}  onPress={() => handleCardPress(item.$id)} />}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        keyExtractor={(item, index) => item.$id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={{uri: user?.avatar}}
                  className="size-16 rounded-full"
                />
                {/* <Button title="SEED"  onPress={seed}/> */}
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-sm font-rubik text-black-100">
                    Good morning
                  </Text>
                  <Text className="text-base text-black-300">{user?.name }</Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-8" />
            </View>

            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>

                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300 mt-5" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : 
              
           
              <FlatList
                data={latestProperties}
                keyExtractor={(item, index) => item.$id}
                horizontal
                bounces={false} // Prevents bouncing effect on horizontal scroll
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex  mt-3 gap-5"
                renderItem={({ item }) => <FeatureCard  item={item}  onPress={() => handleCardPress(item.$id)} />}
              />

                 }
              {/* 
          <View className="flex flex-row gap-5 mt-5">
            <FeatureCard /> 
          </View> */}
              {/* <Card />  */}
            </View>

            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">
                Our Recomendation
              </Text>

              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />

            {/* <View className="flex flex-row gap-5 mt-5">
          <Card />
          <Card /> 
        </View> */}
          </View>
        }
      />
    </SafeAreaView>
  );
}
