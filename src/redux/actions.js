import { createAction } from '@reduxjs/toolkit';

export const addNote = createAction('note/add');
export const deleteNote = createAction('note/delete');
export const editNote = createAction('note/edit');
export const archive = createAction('note/archive');
export const unarchive = createAction('note/unarchive');
export const setTableData = createAction('note/setTableData');