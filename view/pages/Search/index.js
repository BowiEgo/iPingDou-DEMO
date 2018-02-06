import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { screen } from '../../common/utils'

import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'

import StatusBarWithBg from '../../components/StatusBarWithBg'

export default class SearchPage extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    this.searchBar.focus()
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBarWithBg backgroundColor="#fff" barStyle="dark-content"/>
        <View style={styles.headerContainer}>
          <View style={styles.backButton}>
            <Icon
              name="ios-arrow-back"
              size={30}
              color={"#ff9999"}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <SearchBar
            ref={searchBar => this.searchBar = searchBar}
            noIcon
            round
            lightTheme
            placeholder="搜索"
            placeholderTextColor="#c0c0c0"
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            selectionColor="#ff9999"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        paddingTop: 30
      }
    })
  },
  headerContainer: {
    // position: 'absolute',
    width: screen.width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    width: screen.width * 0.1,
    height: 48,
    // backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    width: screen.width * 0.86,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInput: {
    backgroundColor: '#F5F5FF',
    color: '#ff9999',
  }
})
