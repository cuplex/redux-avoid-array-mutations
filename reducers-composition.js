// reducer composition into a single reducer function
// to handle actions for an individual item
todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return  {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
    if (state.id !== action.id) {
      return state
    } 
    return {
      ...state,
      completed: !state.completed
    }
    default:
      return state
  }
} 

todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
       todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return (
        state.map(t => todo(t, action))
      )
    default:
      return state
  }
}

visibilityFilter = (state = 'SHOW_ALL', action ) => {
  switch (action.type) {
    case 'CHANGE_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

// compose appTodo reducer by combining all the reducers of the app
const  todosApp = (state = {}, action) => {
  return {
    todos: todos(
      state.todos, 
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter, 
      action
    )
  }
}

const testAddTodo = () => {
  const stateBefore = []
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  }

  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ]
  Object.freeze(action)
  Object.freeze(stateBefore)

  expect(
    todos(stateBefore, action))
  .toEqual(stateAfter)
} 

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Learn React',
      completed: false
    },
  ]
  
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  }
  
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Learn React',
      completed: true
    },
  ]

  Object.freeze(stateBefore)
  Object.freeze(action)

  expect(
    todos(stateBefore, action))
  .toEqual(stateAfter)

}

const testChangeVisibilityFilter = () => {
  const stateBefore = {
    todos: [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Learn React',
        completed: false
      },
    ],

    visibilityFilter: 'SWOW_ALL'
  } 
  
  const action = {
    type: 'CHANGE_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
  }

  const stateAfter = {
    todos: [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Learn React',
        completed: false
      },
    ],

    visibilityFilter: 'SHOW_COMPLETED'
  } 
  
  expect(
    todosApp(stateBefore, action))
  .toEqual(stateAfter)

}

testAddTodo()
testToggleTodo()
testChangeVisibilityFilter()
console.log('All tests passed!')
