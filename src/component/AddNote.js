import React, { useState } from 'react'
import NoteContext from "../context/notes/notesCotext"
import { useContext } from 'react'
import AlertContext from '../context/Alert/AlertContext'

function AddNote() {
  const AletContext = useContext(AlertContext);
  const {showAlert} = AletContext;

  const context = useContext(NoteContext)
  const { addNote } = context

  const [Note, setNote] = useState({title:"",description:"",tag:"genral"})

  const handleNote = (e) => {
    e.preventDefault();
    addNote(Note.title,Note.description,Note.tag);
    setNote({title:"",description:"",tag:"genral"})
    showAlert("Note Added Successfuly", "Success")
  }

  const  onChange =(e)=>{
    setNote({...Note,[e.target.name]: e.target.value})
  }

  return (
    <div className="container">
      <h1>ADD A NOTE</h1>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="email" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={Note.title} onChange={onChange} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description'  value={Note.description} onChange={onChange} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag'  value={Note.tag} onChange={onChange} minLength={3} required/>
        </div>
        <button disabled={Note.title.length<4 || Note.description.length<4} type="submit" className="btn btn-primary" onClick={handleNote}>Add Note</button>
      </form>

    </div>
  )
}

export default AddNote