const initialState = {

  boards: [],
  templatesBoards: [],
  selectedBoard: {},
  filterBy: {}
}

export function boardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards }
    case 'SET_TEMPLATES':
      return { ...state, templatesBoards: action.boards }
    case 'SET_BOARD':
      return { ...state, selectedBoard: action.board }
    case 'SET_FILTER':
      return { ...state, filterBy: action.filterBy }
    default:
      return state
  }
}
