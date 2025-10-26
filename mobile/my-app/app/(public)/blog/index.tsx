import { View, Text } from 'react-native'
import React from 'react'
import BlogList from '@/components/Blog/BlogList'

const blog = () => {
  return (
    <View className='mt-12'>
      <BlogList />
    </View>
  )
}

export default blog;