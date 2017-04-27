import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { todoListActions } from '../../redux/modules';
import { colors, fontFamilies, sizes } from '../../css';

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
  // static navigationOptions = ({navigation }) => ({
  //   headerRight: <TouchableOpacity onPress={() => this.createNewTask()}><Text style={{color: 'red', textAlign: 'left'}}>Save</Text></TouchableOpacity>,
  //
  // });
  CheckBox = () => {

  }

  openCreateTask = () => {
    this.state.list.push(1);
    this.setState({list: this.state.list});
  }

  createNewTask = () => {
    this.props.createNewTask(this.state.title, this.state.content);
    this.props.navigation.goBack();
  }

  finishTask = () => {

  }

  constructor(props) {
    super(props);
    const taskIndex = props.navigation.state.params.taskIndex;
    this.state = {
      title: taskIndex ? props.todoList.allTasks[taskIndex].title : '',
      content: taskIndex ? props.todoList.allTasks[taskIndex].content : '',
    }
  }
  renderHeader() {
    return (
      <View style={{paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text> Back </Text>

        </TouchableOpacity>
        <TouchableOpacity>
          <Text> Task </Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={this.createNewTask}>
          <Text> Save </Text>

        </TouchableOpacity>

      </View>
    );
  }
  render() {
    return (
      <View style={{flex: 1}}>
        {/* {this.renderHeader()} */}
        <ScrollView style={styles.container}>
          <Text>Title:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />
          <Text>Content:</Text>
          <View style={{ backgroundColor: 'red'}}>
            <TextInput
              style={{height: Dimensions.get('window').height, borderColor: 'gray'}}
              multiline={true}
              onChangeText={(content) => this.setState({content})}
              value={this.state.content}
            />
          </View>


        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.createNewTask} style={{borderWidth: 2}}>
            <Text> Save </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.createNewTask} style={{borderWidth: 2}}>
            <Text> Remove </Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={this.createNewTask} style={{borderWidth: 2}}>
            <Text>set as completed</Text>

          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
