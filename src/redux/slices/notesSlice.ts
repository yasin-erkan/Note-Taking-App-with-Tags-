import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Note, NoteData} from '../../types';
import {v4} from 'uuid';

const initialState: {notes: Note[]} = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // PayloadAction: Used to specify the type of the action's payload in Redux
    addNote(state, action: PayloadAction<NoteData>) {
      // Add id to noteData and convert it to a note
      const newNote: Note = {...action.payload, id: v4()};

      // Add the new note to state
      state.notes.push(newNote);
    },

    // Used to delete a note
    deleteNote(state, action: PayloadAction<string>) {
      // Find the index of the note
      const i = state.notes.findIndex(note => note.id === action.payload);

      // Delete the note
      state.notes.splice(i, 1);
    },

    // Used to update a note
    updateNote(state, action: PayloadAction<Note>) {
      // Find the index of the note
      const i = state.notes.findIndex(note => note.id === action.payload.id);

      // Update the note
      state.notes.splice(i, 1, action.payload);
    },
  },
});

export const {addNote, deleteNote, updateNote} = notesSlice.actions;

export default notesSlice.reducer;
