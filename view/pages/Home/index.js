import React, { Component } from 'react'
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  Platform
} from 'react-native'
// import GridRow from '@shoutem/ui'

import { screen } from '../../common/utils'

import { SearchBar } from 'react-native-elements'

import HomeGridItem from './HomeGridItem'

export default class HomePage extends Component {
  
  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      cardData: ds.cloneWithRows(['1', '2', '3', '4', '5', '6']),
      imageMap: {
        img1: require('../../assets/img/thumb1.png'),
        img2: require('../../assets/img/thumb2.png'),
        img3: require('../../assets/img/thumb3.png'),
        img4: require('../../assets/img/thumb4.png'),
        img5: require('../../assets/img/thumb5.png'),
        img6: require('../../assets/img/thumb6.png'),
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#ff9999'} barStyle='dark-content' />
        
        <SearchBar
          showLoading
          round
          lightTheme
          containerStyle={styles.searchBarContainer}
          inputStyle={styles.searchBarInput}
          placeholder='搜索' />
        
        <ListView 
          contentContainerStyle={styles.listContainer}
          initialListSize={4}
          dataSource={this.state.cardData}
          renderRow={(rowData) =>
            <HomeGridItem
              title="All work and no play makes John..."
              author="pappasparlor"
              time="2018-2-1"
              isLike={Number(rowData) % 2 === 0}
              imageSource={this.state.imageMap[`img${rowData}`]}
              containerStyle={styles.cardContainer}
              imageStyle={styles.cardImageStyle}
            />
          }
        />
        <Text></Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: screen.width,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ff9999',
    marginBottom: -14,
    ...Platform.select({
      ios: {
        paddingTop: 30
      }
    })
  },
  searchBarContainer: {
    width: screen.width,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: '#ff9999',
  },
  searchBarInput: {
    backgroundColor: '#fff'
  },
  listContainer: {
    backgroundColor: '#f6f6f6',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    width: screen.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardContainer: {
    width: screen.width / 2 - 14,
    ...Platform.select({
      ios: {
        height: screen.width / 2 * 1.3,
      },
      android: {
        height: screen.width / 2 * 1.4,
      }
    }),
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden'
  }
})
