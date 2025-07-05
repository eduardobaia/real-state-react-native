import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { categories } from '@/constants/data';

const Filters = () => {

    const params = useLocalSearchParams<{filter?: string}>();

    const [selectedCategory, setSelectedCategory] = useState(params.filter || 'all');   


    const handleCategoryPress = (category: string) => {
        
        if (selectedCategory === category) {
            setSelectedCategory('All'); // Reset to 'all' if the same category 
            router.setParams({ filter: 'All' }); // Reset filter
            return;
        }

        setSelectedCategory(category);
         router.setParams({ filter: category }); // Update filter with the selected category
        };

        console.log(params.filter);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 mb-2">
        {categories.map((item, index) => (
        <TouchableOpacity
            key={index}
            className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full
                 ${selectedCategory === item.category ? 'bg-primary-300' : 'bg-primary-100 border border-primary-200'}
            `} 
             onPress={() => handleCategoryPress(item.category)}
             >

                <Text className={`text-sm ${selectedCategory === item.category ? 'text-white font-rubik-bold mt-0.5 ' : 'text-black -300 font-rubik'}`}> {item.title}</Text>
             </TouchableOpacity>
        ))}
    </ScrollView>
  )
}

export default Filters