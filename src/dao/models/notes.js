import mongoose from 'mongoose';
import db from './db.js';

const collection = 'notes';
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    notes: [
        {
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          wordsCount: {
            type: Number,
            required: true,
          },
          image: {
            type: String,
            required: true,
          }
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
});

const NotesModel = db.model(collection, notesSchema);

export default NotesModel;