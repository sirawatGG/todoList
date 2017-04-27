import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import { connect } from 'react-redux';
import { todoListActions } from '../../redux/modules';
import { colors } from '../../css';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

@connect(
  state => ({
    todoList: state.todoList,
  }), {
    ...todoListActions,
  },
)
export default class Todolist extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.taskTitle}`,
  });

  static propTypes = {
    todoList: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired,
    createNewTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    toggleFinishTask: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const taskIndex = props.navigation.state.params.taskIndex;
    this.state = {
      taskIndex,
      title: taskIndex !== undefined ? props.todoList.allTasks[taskIndex].title : '',
      content: taskIndex !== undefined ? props.todoList.allTasks[taskIndex].content : '',
      completed: taskIndex !== undefined ? props.todoList.allTasks[taskIndex].completed : false,
    };
  }

  createNewTask = () => {
    const {taskIndex, title, content} = this.state;
    if (title === '') {
      Alert.alert('Error', 'Title must not empty');
    } else {
      if (taskIndex) {
        this.props.updateTask(taskIndex, title, content);
      } else {
        this.props.createNewTask(title, content);
      }
      this.props.navigation.goBack();
    }
  }

  toggleFinishTask = (taskIndex, completed) => {
    this.props.toggleFinishTask(taskIndex, !completed);
    this.setState({completed: !completed});
  }

  removeTask = () => {
    Alert.alert(
      'Are you sure to remove this task?',
      'this will remove the task forever',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'OK',
          onPress: () => {
            this.props.navigation.goBack();
            this.props.removeTask(this.state.taskIndex);
          },
        },
      ],
    );
  }

  render() {
    console.log(this.state.taskIndex);
    console.log(this.state);
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Text style={{paddingVertical: 10}}>Title:</Text>
              <TextInput
                style={{height: 40, borderColor: colors.grey30, borderWidth: 1}}
                autoCapitalize="none"
                autoCorrect={true}
                underlineColorAndroid="transparent"
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
              />

              <Text style={{paddingVertical: 10}}>Content:</Text>

              <TextInput
                style={{height: Dimensions.get('window').height, borderColor: colors.grey30, borderWidth: 1, textAlignVertical: 'top'}}
                multiline={true}
                autoCapitalize="none"
                autoCorrect={true}
                underlineColorAndroid="transparent"
                onChangeText={(content) => this.setState({content})}
                value={this.state.content}
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 5, borderTopWidth: 1, borderColor: colors.grey30}}>
          <TouchableOpacity onPress={this.createNewTask} style={{justifyContent: 'center'}}>
            <Text style={{color: colors.grey50}}>Save</Text>
          </TouchableOpacity>
          {(this.state.taskIndex !== undefined) && <TouchableOpacity onPress={this.removeTask} style={{justifyContent: 'center'}}>
            <CheckBox
              label=""
              containerStyle={{marginLeft: 7}}
              underlayColor={'transparent'}
              checked={this.state.completed}
              onChange={() => this.toggleFinishTask(this.state.taskIndex, this.state.completed)}
            />
          </TouchableOpacity>}
          {(this.state.taskIndex !== undefined) && <TouchableOpacity onPress={this.removeTask} style={{justifyContent: 'center'}}>
            <IconAwesome name="trash-o" size={25} color={colors.grey40} />
          </TouchableOpacity>}
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});
