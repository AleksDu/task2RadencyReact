import { configureStore, createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
    notes: [
        {
    text: "Shopping list",
    category: "Task",
    time: "2021-4-20 | 10:17",
    dates: [],
        archived: "false",
        id: 1,
  },
  {
    text: "The theory of evolution",
    category: "Random Thought",
    time: "2021-4-27 | 10:15",
    dates: ["3/05/2021, 5/05/2021"],
    archived: "false",
    id: 2,
  },
  {
    text: "New Feature",
    category: "Idea",
    time: "2021-5-5 | 10:30",
    dates: [],
    archived: "true",
    id: 3,
  },
  {
    text: "William Gaddis",
    category: "Quote",
    time: "2022-5-7 | 11:00",
    dates: [],
    archived: "true",
    id: 4,
  },
  {
    text: "Books",
    category: "Task",
    time: "2021-5-15 | 10:35",
    dates: [],
    archived: "true", 
    id: 5,
  },
  {
    text: "War",
    category: "Evil",
    time: "2022-5-1 | 13:12",
    dates: [],
    archived: "false",
    id: 6,
  },
  {
    text: "God",
    category: "Strong",
    time: "01-01-01 | 00:00",
    dates: [],
    archived: "true",
    id: 7,
        },
  
    ],
  tableData: [],
  modal: {
    isOpen: false,
    text: '',
    category: '',
    id: '',
  },
}

const reducer = createReducer(initialState, {
    [actions.addNote]: (state, action) => {
        return {
            ...state,
    notes: [...state.notes, action.payload],
};

    },
    [actions.deleteNote]: (state, action) => {
        const newNotes = state.notes.filter(note => note.id != action.payload);
        return {
            ...state,
            notes: newNotes,
        };
  },
  [actions.closeModal]: (state, action) => {
    const closeModal = {
      text: '',
      category: '',
      isOpen: false
    }
    return {
      ...state,
      modal: closeModal,
    };
  },
  [actions.openModal]: (state, action) => {
    const newModal = {
      text: state.notes.filter(note => note.id == action.payload)[0].text,
      category: state.notes.filter(note => note.id == action.payload)[0].category,
      isOpen: true,
      id: action.payload
    }
    return {
      ...state,
      modal: newModal,
    };
  },
  [actions.editNote]: (state, action) => {
    const newNotes = state.notes.map(note => {
      if (note.id == action.payload.id) {
        return { ...note, text: action.payload.text, category: action.payload.category };
      } return note;
    });
    return {
      ...state,
      notes: newNotes,
    };

  },
  

  [actions.archive]: (state, action) => {
    const newNotes = state.notes.map((note) => {

      if (note.id == action.payload) {
        return {
          ...note,
          archived: "true"
        };
      }
        return note;

      })
      return {
        ...state,
        notes: newNotes,
      };
  },
    [actions.setTableData]: (state, action) => {
        return {
            ...state,
            tableData: action.payload
        }
}
})
    

const store = configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== 'production'
})


export default store;