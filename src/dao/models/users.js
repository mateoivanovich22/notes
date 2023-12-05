import mongoose from 'mongoose';
import db from './db.js';

const collection = 'users';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  email: String,
  password: String,
});

const UsersModel = db.model(collection, userSchema);

export default UsersModel;
