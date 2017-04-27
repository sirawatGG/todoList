import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../css';
import {
  TodoList,
  TaskDetail,
  CompletedTasks,
} from './index';

export default StackNavigator({
  TodoList: {
    screen: TodoList,
    navigationOptions: {
      headerLeft: <Text style={{color: '#bf5656', fontSize: 30, marginLeft: 10}}>Reminders</Text>,
    },
  },
  TaskDetail: {
    screen: TaskDetail,
  },
  CompletedTasks: {
    screen: CompletedTasks,
    navigationOptions: {
      title: 'Completed Tasks',
    },
  },
}, {
  initialRouteName: 'TodoList',
  headerMode: 'screen',

  navigationOptions: ({navigation}) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal: 10}}>
        <IconAwesome name="chevron-left" size={20} color={colors.grey30} />
      </TouchableOpacity>
    ),
  }),
});
