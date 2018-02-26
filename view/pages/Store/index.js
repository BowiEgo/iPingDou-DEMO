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

import { screen, sleep } from '../../common/utils'
import colors from '../../common/colors'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'

import StatusBarWithBg from '../../components/StatusBarWithBg'
import PageHeader from '../../components/PageHeader'
import HomeGridItem from '../Home/HomeGridItem'
import PullList from '../../plugins/pullList'

type State = {
  cardData: Array<any>,
  imageMap: Object
}

type Props = {
  navigation: Object
}

export default class StorePage extends Component<State, Props> {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  constructor(props) {
    super(props)
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

  componentDidMount() {
    // this._navListener = this.props.navigation.addListener('didFocus', () => {
    //   StatusBar.setBarStyle('light-content')
    //   Platform.os === 'android' && StatusBar.setBackgroundColor(colors.mainThemeColor)
    // })

    // console.log(store.getState())
  }
  
  // componentWillUnmount() {
  //   this._navListener.remove()
  // }

  onFetch = async (page = 1, startFetch, abortFetch) => {
    console.log(`onFecth(${page})`)
    try {
      let pageLimit = 6
      // if (this.state.layout === 'grid') pageLimit = 60
      const skip = (page - 1) * pageLimit

      let rowData = Array.from({ length: pageLimit }, (value, index) => index + skip)
      console.log(rowData)
      if (page === 10) {
        rowData = []
      }

      await sleep(2000)
      startFetch(rowData, pageLimit)
    } catch (err) {
      abortFetch()
      console.warn(err)
    }
  }

  renderItem = (item, index, seperator) => {
    return (
      <HomeGridItem
        title="All work and no play makes John..."
        author="pappasparlor"
        time="2018-2-1"
        isLike={Number(index) % 2 === 0}
        imageSource={this.state.imageMap[`img${index+1}`]}
        containerStyle={styles.cardContainer}
        imageStyle={styles.cardImageStyle}
      />
    )
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <StatusBarWithBg backgroundColor="#fff" barStyle="dark-content"/>
        <PageHeader
          title="iPingDou"
          titleStyle={styles.headerTitle}
          headerRight={(
            <Icon.Button
              name="ios-search"
              color={colors.mainThemeColor}
              size={24}
              backgroundColor="transparent"
              onPress={() => navigate('Search')}>
            </Icon.Button>
          )}
        />
        <PullList
          ref={ref => this.listView = ref}
          key={this.state.layout}
          numColumns={2}
          onFetch={this.onFetch}
          keyExtractor={(item, index) => `${index} - ${item}`} 
          refreshableMode="advanced" // basic or advanced
          item={this.renderItem} // this takes three params (item, index, separator)       
          displayDate
          arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
        />
        {/* <ListView 
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
        /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: screen.width,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'grey',
    // backgroundColor: colors.mainThemeColor,
    paddingTop: 30
  },
  headerTitle: {
    color: colors.mainThemeColor,
    fontSize: 18,
    fontWeight: '500',
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
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden'
  }
})
