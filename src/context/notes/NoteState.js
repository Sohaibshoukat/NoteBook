import React, { useState } from "react"
import NoteContext from "./notesCotext"

const NoteState = (props) => {
    const host ="http://localhost:5000";

    const notesInitial = []

    const [notes, setnotes] = useState(notesInitial)

    const getNote = async () => {
        const response = await fetch(`${host}/api/notes/FetchallNotes`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token")
            }
        })
        const json = await response.json();
        console.log(json)
        setnotes(json)
    }

    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/Addnotes`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem("token")
            },
            body: JSON.stringify({"Title": title, "Description": description, "Tag": tag})
        });
        const note = await response.json();
        setnotes(notes.concat(note))
    }


    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/DeleteNode/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token")
            },
        })

        const json = response.json();
        console.log(json)

        console.log(id);
        const newNote = notes.filter((note) => { return note._id !== id })
        setnotes(newNote)
    }

    const editNote = async(id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/UpdateNotes/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify({"Title": title, "Description": description, "Tag": tag})
        })

        const json = await response.json();
        console.log(json);
        
        let newNotes =JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].Title = title;
                newNotes[index].Description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setnotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes,getNote, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState