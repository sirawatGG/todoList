import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { colors, fontFamilies } from '../css';
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
  cardStyle: {
    // backgroundColor: colors.grey5,
  },
  headerMode: 'screen',

  navigationOptions: {
    // header: (navigation) => ({
  //     // ...navigationHeader,
  //     style: {
  //       backgroundColor: colors.yellowFictionlog,
  //       height: 60,
  //       elevation: 0,
  //     },
      // left: (
      //   <TouchableOpacity onPress={() => navigation.goBack()}>
      //     <Text style={{ fontSize: 30, color: 'white', marginLeft: 10}}>gdsgas</Text>
      //   </TouchableOpacity>
  //       <TouchableOpacity>
  //         <Text style={{color: 'red'}}>Reminders</Text>
  //       </TouchableOpacity>
  //
    //   ),
    // }),
  },
});
