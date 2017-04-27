import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import CheckBox from 'react-native-checkbox';
import { todoListActions } from '../../redux/modules';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import { colors } from '../../css';

@connect(
  state => ({
    todoList: state.todoList,
  }), {
    ...todoListActions,
  },
)
export default class Todolist extends Component {
  static propTypes = {
    todoList: PropTypes.object.isRequired,
    toggleFinishTask: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };
  static navigationOptions = ({navigation }) => ({
    headerLeft: <Text style={{color: 'red', textAlign: 'left'}}>Reminders</Text>,
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('TaskDetail', {taskTitle: 'New Task'})} style={{right: Platform.OS === 'ios' ? 5 : 0}}>
        <IconMaterial name="plus-circle-outline" size={25} color={colors.grey30} />
      </TouchableOpacity>
    ),
  });

  toggleFinishTask = (taskIndex, completed) => {
    this.props.toggleFinishTask(taskIndex, !completed);
  }

  taskDetail = (taskIndex, taskTitle) => {
    this.props.navigation.navigate('TaskDetail', {taskIndex, taskTitle});
  }

  completedTasks = () => {
    this.props.navigation.navigate('CompletedTasks', {});
  }

  renderDrawLine() {
    return (
      <View style={styles.line} />
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderDrawLine()}
        <ScrollView>
          <TouchableHighlight onPress={this.completedTasks} underlayColor={colors.grey20}>
            <View style={[styles.eachCard, {justifyContent: 'space-between', paddingVertical: 10}]}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: 30}}>
                  <Text style={{marginLeft: 14, color: '#776ed4'}}>{this.props.todoList.completedTasks}</Text>
                </View>
                <View style={{marginHorizontal: 25}}>
                  <Text style={{color: '#776ed4'}}>completed</Text>
                </View>
              </View>
              <View style={{right: 5}}>
                <IconAwesome name="chevron-right" size={15} color={colors.grey30} />
              </View>
            </View>
          </TouchableHighlight>

          {this.props.todoList.allTasks.map((data, taskIndex) =>
            <View style={styles.eachCard} key={taskIndex}>
              <View style={{width: 40, justifyContent: 'center'}}>
                <CheckBox
                  label=""
                  containerStyle={{marginLeft: 7}}
                  underlayColor={'transparent'}
                  checked={data.completed}
                  onChange={() => this.toggleFinishTask(taskIndex, data.completed)}
                />
              </View>
              <View style={{flex: 1, paddingLeft: 0, justifyContent: 'center'}}>
                <TouchableHighlight onPress={() => this.taskDetail(taskIndex, data.title)} underlayColor={colors.grey20} style={{ paddingVertical: 10}}>
                  <View>
                    <Text style={[styles.title, {textDecorationLine: data.completed ? 'line-through' : 'none'}]}>
                      {data.title}
                    </Text>
                    <Text style={styles.time}>
                      {moment(data.time).format('DD/MM/YYYY h:mm:ss')}
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>

            </View>
          )}
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 40,
    right: 0,
    borderLeftWidth: 4,
    borderColor: '#cc949f',
  },
  eachCard: {
    flexDirection: 'row',
    borderColor: colors.grey30,
    borderBottomWidth: 1,
  },
  title: {
    paddingHorizontal: 10,
    color: '#776ed4',
  },
  time: {
    paddingHorizontal: 10,
    paddingTop: 3,
    color: colors.grey40,
    fontSize: 10,
  },
});
