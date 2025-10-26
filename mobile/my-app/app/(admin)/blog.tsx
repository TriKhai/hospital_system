import { View, Text } from 'react-native'
import React from 'react'
import AddBlogScreen from '@/components/Blog/AddBlog'

const blog = () => {
  return (
    <View className='h-full'>
      <AddBlogScreen />
    </View>
  )
}

export default blog