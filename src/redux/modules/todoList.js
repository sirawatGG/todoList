const CREATE_NEW_TASK = 'CREATE_NEW_TASK';
const EDIT_TASK = 'EDIT_TASK';
const FINISH_TASK = 'FINISH_TASK';
const REMOVE_TASK = 'REMOVE_TASK';

const initialState = {
  allTasks: [],
  completedTasks: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_NEW_TASK: {
      state.allTasks.push({completed: false, title: action.title, content: action.content, time: new Date()});
      return {...state, allTasks: state.allTasks};
    }
    case EDIT_TASK:
      return {...state, ...action.data};
    case FINISH_TASK: {
      const newData = state.allTasks;
      newData[action.index] = {completed: action.completed, title: state.allTasks[action.index].title, content: state.allTasks[action.index].content};
      return { ...state, allTasks: newData, completedTasks: action.completed ? state.completedTasks + 1 : state.completedTasks - 1};
    }
    case REMOVE_TASK:
      return {...state, ...action.data};
    default:
      return state;
  }
}

export function createNewTask(title, content) {
  return {
    type: CREATE_NEW_TASK,
    title,
    content,
  };
}

export function editTask(data) {
  return {
    type: EDIT_TASK,
    data,
  };
}

export function finishTask(index, completed) {
  return {
    type: FINISH_TASK,
    index,
    completed,
  };
}

export function removeTask(data) {
  return {
    type: REMOVE_TASK,
    data,
  };
}
