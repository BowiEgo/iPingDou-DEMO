import React from 'react'

import { TabNavigator } from 'react-navigation'
import HomePage from '../pages/Home'
import DiscoverPage from '../pages/Discover'
import StorePage from '../pages/Store'
import UserPage from '../pages/User'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const myIcon = (iconName, color) => {
  return (<Icon name={iconName} size={30} color={color} />)
}

const TabNavConfig = (label, icon) => {
  return {
    tabBarLabel: label,
    tabBarIcon: ({tintColor}) => (
      myIcon(icon, tintColor)
    ),
  }
}

const TabNav = TabNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: TabNavConfig('首页', 'home')
    },
    Discover: {
      screen: DiscoverPage,
      navigationOptions: TabNavConfig('发现', 'looks')
    },
    Store: {
      screen: StorePage,
      navigationOptions: TabNavConfig('商店', 'store')
    },
    User: {
      screen: UserPage,
      navigationOptions: TabNavConfig('我的', 'account')
    },
  }, {
    tabBarPosition: 'bottom',
    lazy: true,
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#ff9999',
      inactiveTintColor: '#c0c0c0',
      style: { backgroundColor: '#ffffff' },
    },
  }
)

export default TabNav