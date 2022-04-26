import { createAction } from "@reduxjs/toolkit";

export const addNote = createAction("note/ADD");
export const deleteNote = createAction("note/DELETE");
export const editNote = createAction("note/EDIT");
export const archiveNote = createAction("note/ARCHIVE");
export const unarchiveNote = createAction("note/UNARCHIVE");
export const setTableData = createAction("note/SET_TABLE_DATA");
export const closeModal = createAction("note/CLOSE_MODAL");
export const openModal = createAction("note/OPEN_MODAL");
export const toggleShowArchived = createAction("page/TOGGLE_SHOW_ARCHIVED");
