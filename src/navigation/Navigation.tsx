import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Search from '../components/Search';
import DisplayMovie from '../components/DisplayMovie';

const SearchNavigation = createStackNavigator();

function RootStack() {
  return (
    <SearchNavigation.Navigator
      initialRouteName="ViewSearch"
    >
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Search}
        options={{ title: 'Recherche' }}
      />
      <SearchNavigation.Screen
        name="ViewMovie"
        component={DisplayMovie}
        options={{ title: 'Film' }}
      />
    </SearchNavigation.Navigator>
  );
}

export default RootStack;