const express = require("express");
const Note = require("../Modals/Note");
const router = express.Router();
const fetchuser = require('../midelware/Fetchuser');
const { body, validationResult } = require('express-validator');

//Get All notes of the user
router.get("/FetchallNotes", fetchuser , async (req, res) => {
    try {
        const notes = await Note.find({ User: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error)
        res.status(500).send('network error occured')
    }

})

//Store new notes
router.post("/Addnotes", fetchuser, [
    body('Title', 'enter Valid Title').isLength({ min: 3 }),
    body('Description', 'enter atleast 5 char description').isLength({ min: 3 })
], async (req, res) => {

    try {

        const { Title, Description, tag } = req.body;


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            Title, Description, tag, User: req.user.id
        })

        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }

})

//Get All notes of the user
router.put("/UpdateNotes/:id", fetchuser, async (req, res) => {
    try {
        const { Title, Description, tag } = req.body;

        const newNote ={};
        if(Title){newNote.Title=Title}
        if(Description){newNote.Description=Description}
        if(tag){newNote.tag=tag}

        let note = await Note.findById(req.params.id);
        if(!note)
        {
          return  res.status(404).send("Not Found")
        }

        if(note.User.toString()!==req.user.id){
            return res.status(401).send("Note not found")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
        res.json(note)

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }

})


//Get All notes of the user
router.delete("/DeleteNode/:id", fetchuser, async (req, res) => {
    try {

        let note = await Note.findById(req.params.id);
        if(!note)
        {
          return  res.status(404).send("Not Found")
        }

        if(note.User.toString()!==req.user.id){
            return res.status(401).send("Note not found")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json("Successfull node deleted")

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }

})

module.exports = router