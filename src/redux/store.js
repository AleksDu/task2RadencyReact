import { configureStore, createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
    notes: [
        {
    text: "Shopping list",
    category: "Task",
    time: "2021-4-20 | 10:17",
    dates: [],
    archived: "true",
  },
  {
    text: "The theory of evolution",
    category: "Random Thought",
    time: "2021-4-27 | 10:15",
    dates: ["3/05/2021, 5/05/2021"],
    archived: "false",
  },
  {
    text: "New Feature",
    category: "Idea",
    time: "2021-5-5 | 10:30",
    dates: [],
    archived: "true",
  },
  {
    text: "William Gaddis",
    category: "Quote",
    time: "2022-5-7 | 11:00",
    dates: [],
    archived: "true",
  },
  {
    text: "Books",
    category: "Task",
    time: "2021-5-15 | 10:35",
    dates: [],
    archived: "true",
  },
  {
    text: "War",
    category: "Evil",
    time: "2022-5-1 | 13:12",
    dates: [],
    archived: "false",
  },
  {
    text: "God",
    category: "Strong",
    time: "01-01-01 | 00:00",
    dates: [],
    archived: "true",
        },
  
    ],
    tableData: [],
}

const reducer = createReducer(initialState, {
    [actions.add]: (state, action) => {
        return {
            ...state,
    notes: [...state.notes, ...action.payload],
};

    },
    [actions.deleteNote]: (state, action) => {
        const newNotes = state.notes.filter(note => note.time !== state.notes[action.payload].time);
        return {
            ...state,
            notes: newNotes,
        };
    },
    [actions.changeTableData]: (state, action) => {
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