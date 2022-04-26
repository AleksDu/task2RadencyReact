import { configureStore, createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as actions from "./actions";

import {State, Id, ModalData, Note} from "../types";

const initialState = {
  notes: [
    {
      text: " 3/05/2021, 5/05/2021 Shopping list",
      time: "2021-4-20 | 10:17",
      category: "Task",
      dates: [],
      isArchived: "false",
      id: 1,
    },
    {
      text: "The theory of evolution",
      category: "Random Thought",
      time: "2021-4-27 | 10:15",
      dates: ["3/05/2021, 5/05/2021"],
      isArchived: "false",
      id: 2,
    },
    {
      text: "New Feature",
      category: "Idea",
      time: "2021-5-5 | 10:30",
      dates: [],
      isArchived: "true",
      id: 3,
    },
    {
      text: "William Gaddis",
      category: "Quote",
      time: "2022-5-7 | 11:00",
      dates: [],
      isArchived: "true",
      id: 4,
    },
    {
      text: "Books",
      category: "Task",
      time: "2021-5-15 | 10:35",
      dates: [],
      isArchived: "true",
      id: 5,
    },
    {
      text: "War",
      category: "Evil",
      time: "2022-5-1 | 13:12",
      dates: [],
      isArchived: "false",
      id: 6,
    },
    {
      text: "God",
      category: "Strong",
      time: "01-01-01 | 00:00",
      dates: [],
      isArchived: "true",
      id: 7,
    },
  ],
  tableData: [],
  modal: {
      text: "",
      category: "",
    isOpen: false,
    id: "",
  },
  showArchived: false,
};



const reducer = createReducer(initialState, (builder) =>
    builder
        .addCase(
            actions.addNote, (state, action) => {
                const newNote = action.payload
                return {
                    ...state,
                    notes: [...state.notes, newNote]
                }
            }
    )
        .addCase(
            actions.deleteNote, (state, action) => {
                const newNotes = state.notes.filter((note: any) => note.id != action.payload)
                return {
                    ...state,
                    notes: newNotes
                }
            }
    )
        .addCase(
            actions.closeModal, (state, action) => {
                const closedModal = {text: '', category: '', isOpen: false, id: ''}
                return {
                    ...state,
                    modal: closedModal,
                }
            }
    )
        .addCase(
            actions.openModal, (state, action) => {
                const newModal = {
                    text: state.notes.filter(note => note.id == action.payload)[0].text,
                    category: state.notes.filter(note => note.id == action.payload)[0].category,
                    isOpen: true,
                    id: action.payload
                }
                return {
                    ...state,
                    modal: newModal,
                }
            }
    )
        .addCase(
            actions.editNote, (state, action) => {
                const newNotes = state.notes.map((note) => {
                    if (note.id == action.payload.id) {
                    return {...note, text: action.payload.text, category: action.payload.category};
                    }
                    return note
                })
                return {
                    ...state,
                    notes: newNotes,
                }
            }
    )
        .addCase(
            actions.archiveNote, (state, action) => {
                const newNotes = state.notes.map((note) => {
                    if (note.id == action.payload) {
                    return {...note, isArchived: true};
                    }
                    return note
                })
                return {
                    ...state,
                    notes: newNotes,
                }
            }
    )
        .addCase(
            actions.unarchiveNote, (state, action) => {
            const newNotes = state.notes.map((note) => {
                if (note.id == action.payload) {
                return {...note, isArchived: false};
                }
                return note
            })
            return {
                ...state,
                notes: newNotes,
            }
        }
    )
        .addCase(
            actions.toggleShowArchived, (state, action) => {
            return {
                ...state,
                showArchived: !state.showArchived
            }
        }
    )
        .addCase(
            actions.setTableData, (state, action) => {
                return {
                    ...state,
                    tableData: action.payload
                }
        }
    )
)

const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
});
export default store;

export type AppDispatch = typeof store.dispatch;
