const CREATE_NEW_TASK = 'CREATE_NEW_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const EDIT_TASK = 'EDIT_TASK';
const TOGGLE_FINISH_TASK = 'TOGGLE_FINISH_TASK';
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
    case UPDATE_TASK: {
      const newData = state.allTasks;
      newData[action.index] = {
        completed: state.allTasks[action.index].completed,
        title: action.title,
        content: action.content,
        time: new Date(),
      };
      return { ...state, allTasks: newData};
    }
    case EDIT_TASK:
      return {...state, ...action.data};
    case TOGGLE_FINISH_TASK: {
      const newData = state.allTasks;
      newData[action.index] = {
        completed: action.completed,
        title: state.allTasks[action.index].title,
        content: state.allTasks[action.index].content,
        time: state.allTasks[action.index].time,
      };
      return { ...state, allTasks: newData, completedTasks: action.completed ? state.completedTasks + 1 : state.completedTasks - 1};
    }
    case REMOVE_TASK: {
      let newCompletedTasks = state.completedTasks;
      if (state.allTasks[action.index].completed) {
        newCompletedTasks -= 1;
      }
      state.allTasks.splice(action.index, 1);
      return {...state, allTasks: state.allTasks, completedTasks: newCompletedTasks};
    }
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

export function updateTask(index, title, content) {
  return {
    type: UPDATE_TASK,
    index,
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

export function toggleFinishTask(index, completed) {
  return {
    type: TOGGLE_FINISH_TASK,
    index,
    completed,
  };
}

export function removeTask(index) {
  return {
    type: REMOVE_TASK,
    index,
  };
}
