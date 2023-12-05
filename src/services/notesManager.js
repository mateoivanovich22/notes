import NotesModel from "../dao/models/notes.js";

class NotesManager {
  constructor() {}

  async findNotesById(noteId) {
    try {
      const note = await NotesModel.findOne({ user: noteId });

      if (!note) {
        return null;
      }

      return note.toJSON();
    } catch (error) {
      console.log(
        `Error al buscar el casillero de notas con ID ${noteId}: ${error.message}`
      );
      throw error;
    }
  }

  async createNote(userID, note) {
    try {
      const notesFile = await NotesModel.findOne({ user: userID });

      if (!notesFile) {
        return null;
      }

      notesFile.notes.push(note);

      notesFile.save();

      return notesFile;
    } catch (error) {
      console.log(
        `Error al crear el casillero de notas para el user con ID ${userID}: ${error.message}`
      );
      throw error;
    }
  }

  async createNotesFile(userId) {
    try {
      const notes = {
        notes: [],
        user: userId,
      };
      const notesFile = await NotesModel.create(notes);

      if (!notesFile) {
        return null;
      }

      return notesFile.toJSON();
    } catch (error) {
      console.log(
        `Error al crear el casillero de notas para el user con ID ${userId}: ${error.message}`
      );
      throw error;
    }
  }

  async findNoteById(userId, noteId) {
    const note = await NotesModel.findOne({ user: userId });
    if (!note) {
      return null;
    }
    const foundNote = note.notes.find((note) => note._id.toString() === noteId);
    return foundNote.toJSON() || null;
  }

  async findNoteByIdAndUpdate(userId, noteId, data) {
    const note = await NotesModel.findOne({ user: userId });
    if (!note) {
      return null;
    }
    const foundNoteIndex = note.notes.findIndex((note) => note._id.toString() === noteId);
  
    if (foundNoteIndex === -1) {
      return null; 
    }

    data.image = note.notes[foundNoteIndex].image
    const updatedNote = {
      ...note.notes[foundNoteIndex], 
      ...data,
    };

    note.notes[foundNoteIndex] = updatedNote;
  
    await note.save();
    
    console.log("Updated note: ",note.notes[foundNoteIndex])

    return note.notes[foundNoteIndex];
  }


  async countWords(text) {
    if (!text.trim()) {
      return 0;
    }

    const words = text.split(/\s+/);

    const nonEmptyWords = words.filter((word) => word.trim() !== '');

    return nonEmptyWords.length;
  }

  async deleteNote(userId,noteID) {
    try {
      const note = await NotesModel.findOne({ user: userId });
  
      const foundNoteIndex = note.notes.findIndex((note) => note._id.toString() === noteID);
  
      if (foundNoteIndex === -1) {
        return null; 
      }

      note.notes.splice(foundNoteIndex, 1);

      await note.save();
  
      return note; 
    } catch (error) {
      console.log(`Error al eliminar la nota con ID ${noteID}: ${error.message}`);
      throw error;
    }
  }
  

}

export default NotesManager;
