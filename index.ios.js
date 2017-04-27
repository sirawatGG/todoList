import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  AppState,
  AsyncStorage,
  Image,
  StatusBar,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { persistStore } from 'redux-persist';
import createCompressor from 'redux-persist-transform-compress';
import { connect, Provider } from 'react-redux';

import { colors, fontFamilies } from './src/css';
import store from './src/redux/store';

import MainStack from './src/containers/MainStack';

// import { regTokenNotification } from './src/notification';
// regTokenNotification();

// @connect(
//   state => ({
//     currentUserData: state.currentUserData,
//   }), {
//     ...currentUserActions,
//   },
// )
// class Root extends Component {
//   static propTypes = {
//     currentUserData: PropTypes.object.isRequired,
//     fetchCurrentUser: PropTypes.func.isRequired,
//     fetchCurrentUserNotifications: PropTypes.func.isRequired,
//     markNotificationsAsSeen: PropTypes.func.isRequired,
//   };
//
//   componentWillMount() {
//     const { fetchCurrentUser, currentUserData } = this.props;
//     AsyncStorage.getItem('accessToken', (err, token) => {
//       if (token && !currentUserData.current_user) {
//         fetchCurrentUser();
//       }
//     });
//     this.checkApiVersion();
//   }
//
//   componentDidMount() {
//     NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
//   }
//
//   componentWillUnmount() {
//     NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
//   }
//
//
//   state = {
//     isNetworkConnected: true,
//   }
//
//   _handleConnectionChange = (isConnected) => {
//     this.setState({isNetworkConnected: isConnected });
//   };
//
//   async checkApiVersion() {
//     const resFetchApiVersion = await fetch(config.apiBaseUrl);
//     const result = await resFetchApiVersion.json();
//     const version = result.version.split('.');
//     if (Number(version[0]) > config.apiVersion) {
//       Alert.alert('แอปของคุณเป็นเวอร์ชันที่ไม่รองรับในปัจจุบันกรุณาอัพเดทเป็นเวอร์ชันปัจจุบัน');
//     }
//   }
//
//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <StatusBar barStyle="light-content" />
//         {this.props.currentUserData.current_user ? <MainStack onNavigationStateChange={(prevState, currentState) => {
//           if (currentState.index === 0 && currentState.routes[0].index === 2) {
//             this.props.fetchCurrentUserNotifications();
//             this.props.markNotificationsAsSeen();
//           } else if (currentState.index === 0 && currentState.routes[0].index === 3) {
//             this.props.fetchCurrentUser();
//           }
//         }} /> : <LoginStack />}
//         <AllModals />
//         {!this.state.isNetworkConnected && (this.props.currentUserData.current_user ?
//           <View style={styles.connectTop}>
//             <Text style={styles.connectText}>การเชื่อมต่อผิดพลาด</Text>
//           </View>
//           :
//           <View style={styles.connectFooter}>
//             <Text style={styles.connectText}>การเชื่อมต่อผิดพลาด</Text>
//           </View>
//         )}
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   connectText: {
//     fontSize: 12,
//     fontFamily: fontFamilies.bold,
//     color: '#fff',
//   },
//   connectTop: {
//     zIndex: 9999,
//     backgroundColor: 'rgba(255, 52, 52, 0.6)',
//     position: 'absolute',
//     top: 60,
//     left: 0,
//     right: 0,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   connectFooter: {
//     zIndex: 9999,
//     backgroundColor: 'rgba(255, 52, 52, 0.6)',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

class App extends Component {
  constructor() {
    super();

    this.state = {
      appState: AppState.currentState,
      rehydrated: false,
    };
  }

  componentDidMount() {
    const compressor = createCompressor();

    persistStore(store, {
      storage: AsyncStorage,
      transforms: [compressor],
      whitelist: ['todoList'],
    }, () => {
      this.setState({
        rehydrated: true,
      });
    });

    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log(`AppState changed from ${this.state.appState} to ${nextAppState}`);

    this.setState({ appState: nextAppState });
  }

  render() {
    if (!this.state.rehydrated) {
      return (
        <View style={{ backgroundColor: colors.yellowFictionlog, flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome</Text>
            {/* <Image style={{ width: 200, height: 42, resizeMode: 'contain' }} source={images.intro.fictionlogText} /> */}
          </View>
        </View>
      );
    }

    return (
      <Provider store={store}>
        <MainStack />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Todolist', () => App);
