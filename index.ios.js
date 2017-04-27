import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  AsyncStorage,
  StatusBar,
  View,
  Text,
} from 'react-native';
import { persistStore } from 'redux-persist';
import createCompressor from 'redux-persist-transform-compress';
import { Provider } from 'react-redux';
import store from './src/redux/store';

import MainStack from './src/containers/MainStack';

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
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>My TodoList</Text>
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
