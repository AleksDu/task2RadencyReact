import { createAction } from "@reduxjs/toolkit";
import { Id, SubmitEdit, Note } from "../types";

export const addNote = createAction<Note>("note/ADD");
export const deleteNote = createAction<Id>("note/DELETE");
export const editNote = createAction<SubmitEdit>("note/EDIT");
export const archiveNote = createAction<Id>("note/ARCHIVE");
export const unarchiveNote = createAction<Id>("note/UNARCHIVE");
export const setTableData = createAction<any>("note/SET_TABLE_DATA");
export const closeModal = createAction<void>("note/CLOSE_MODAL");
export const openModal = createAction<any>("note/OPEN_MODAL");
export const toggleShowArchived = createAction<void>("page/TOGGLE_SHOW_ARCHIVED");
