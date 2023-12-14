import React from 'react';
import { View, Text } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';

const SkeletonComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SkeletonContent
        containerStyle={{ flex: 1, width: 300 }}
        isLoading={true}
        layout={[
          // Define your skeleton content layout here
          { key: 'someId', width: 200, height: 20, marginBottom: 12 },
          { key: 'anotherId', width: 150, height: 20, marginBottom: 12 },
          // Add more skeleton elements as needed
        ]}
      >
        {/* Your actual content goes here */}
        <Text>Loaded Content</Text>
      </SkeletonContent>
    </View>
  );
};

export default SkeletonComponent;
