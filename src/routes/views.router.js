import { Router } from "express";
import {passportCall} from "../utils.js";

import UsersManager from "../services/usersManager.js";
const usersManager = new UsersManager();

import NotesManager from "../services/notesManager.js";
const notesManager = new NotesManager();

const router = Router();

router.get('/', (req,res) => {
    res.render('logReg')
})


router.post('/register', passportCall('register'), (req, res) => {

    if (!req.user) {
      console.log("Error registrando su usuario")
      return 
    }
    req.session.user = req.user;
    return res.redirect(`/notes`);
    
});

router.post('/login', passportCall('login'), (req, res) => {
    req.session.user = req.user;
    res.redirect(`/notes`);
});


router.get('/notes', async(req, res) => {

    if(req.session.user){
        const id = req.session.user._id;

        const notes = await notesManager.findNotesById(id);

        if(!notes){
            const createNotesFile = await notesManager.createNotesFile(id);
            return res.render('notes', {createNotesFile})
        }

        return res.render('notes', {notes});
    }
    return res.redirect('/');
    
})

router.get('/notes/create', async(req, res) => {
    if(!req.session.user){
        res.redirect('/');
    }
    res.render('createNote');
})

router.post('/notes/create', async(req, res) => {
    const id = req.session.user._id;

    const notesMessage= req.body.message

    const wordsCounted = await notesManager.countWords(notesMessage)

    const note = {
        title: req.body.title,
        description: notesMessage,
        wordsCount: wordsCounted,
        image: req.body.imagen
    }

    const createNote = await notesManager.createNote(id,note);
    res.status(200).send({message: "Note created"})
})

router.get('/notes/note/:nid', async(req, res) => {
    if(!req.session.user){
        res.redirect('/');
    }
    const noteID = req.params.nid
    const userId = req.session.user

    const note = await notesManager.findNoteById(userId, noteID)

    res.render("note", {note})
})

router.put('/notes/noteUpdate/:nid', async(req, res) => {
    const noteID = req.params.nid
    const userId = req.session.user
    const data = req.body

    const newWordsCounted = await notesManager.countWords(data.description)

    data._id = noteID
    data.wordsCount = newWordsCounted

    const noteUpdated = await notesManager.findNoteByIdAndUpdate(userId, noteID, data)

    res.status(200).send({ message: "Note updated" });
})

router.post('/notes/delete/:nid', async (req, res) => {
    const noteID = req.params.nid
    const userId = req.session.user._id

    const deletedNote = await notesManager.deleteNote(userId,noteID)

    if(!deletedNote){
        console.log("Note cannot be deleted: ", noteID)
        res.status(404).send({ message: "Error borrando nota" });
    }

    res.redirect("/notes");
    
})

export default router;