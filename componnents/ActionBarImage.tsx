import React from 'react';

import {View, Image} from 'react-native';

const ActionBarImage = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={require('../assets/icon2.png')}
        style={{
          width: 170,
          height: 60,
          marginLeft: 5,
          marginRight:5,          
        }}
      />
    </View>
  );
};

export default ActionBarImage;