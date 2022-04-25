import { createAction } from "@reduxjs/toolkit";

export const addNote = createAction("note/add");
export const deleteNote = createAction("note/delete");
export const editNote = createAction("note/edit");
export const archiveNote = createAction("note/archive");
export const unarchiveNote = createAction("note/unarchive");
export const setTableData = createAction("note/setTableData");
export const closeModal = createAction("note/closeModal");
export const openModal = createAction("note/openModal");
export const toggleShowArchived = createAction("page/toggleShowArchived");
