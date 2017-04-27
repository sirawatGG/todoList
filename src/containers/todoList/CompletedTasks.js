import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { todoListActions } from '../../redux/modules';
import { colors } from '../../css';
import moment from 'moment';

@connect(
  state => ({
    todoList: state.todoList,
  }), {
    ...todoListActions,
  },
)
export default class CompletedTasks extends Component {
  static propTypes = {
    todoList: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  taskDetail = (taskIndex, taskTitle) => {
    this.props.navigation.navigate('TaskDetail', {taskIndex, taskTitle});
  }

  render() {
    console.log('come');
    return (
      <View>
        <ScrollView>
          {this.props.todoList.allTasks.map((data, taskIndex) => {
            if (data.completed) {
              return (
                <View style={styles.eachCard} key={taskIndex}>
                  <View style={{flex: 1, marginLeft: 14, justifyContent: 'center'}}>
                    <TouchableHighlight onPress={() => this.taskDetail(taskIndex, data.title)} underlayColor={colors.grey20} style={{ paddingVertical: 10}}>
                      <View>
                        <Text style={[styles.title, {textDecorationLine: data.completed ? 'line-through' : 'none'}]}>
                          {data.title}
                        </Text>
                        <Text style={styles.time}>
                          {moment(data.time).format('Do/MM/YYYY h:mm:ss')}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              );
            }
            return null;
          })}
        </ScrollView>

      </View>

    );
  }
}

const styles = StyleSheet.create({
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
