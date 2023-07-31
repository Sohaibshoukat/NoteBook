import React, { useContext, useEffect, useRef,useState } from 'react'
import NoteContext from "../context/notes/notesCotext"
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import AlertContext from '../context/Alert/AlertContext'
import { useNavigate } from 'react-router-dom'


function Notes() {
    let history = useNavigate();

    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;

    const context = useContext(NoteContext)
    const { notes, getNote, editNote} = context
    useEffect(() => {
        if(localStorage.getItem("token")){
            getNote();
        }
        else{
            history("/login");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);

    const [Note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"genral"});

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id , etitle: currentNote.Title,edescription:currentNote.Description,etag:currentNote.tag});
    }


    const handleNote = (e) => {
        console.log(Note)
        editNote(Note.id,Note.etitle,Note.edescription,Note.etag);
        refClose.current.click();
        showAlert("Note Updated Succefully","success")
      }
    
    const  onChange =(e)=>{
        setNote({...Note,[e.target.name]: e.target.value})
      }

    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="email" className="form-control" id="etitle" name="etitle"  value={Note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={Note.edescription} onChange={onChange} minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={Note.etag} minLength={3} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={Note.etitle.length<4 || Note.edescription.length<4} type="button" className="btn btn-primary" onClick={handleNote}>Update Note</button>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="row">
                <h1>Your Note</h1>
                {notes.length===0 ? <h3 className='center'>No Notes To Display</h3> 
                : notes.map((note) => {
                    return (
                        <Noteitem key={note._id} updateNote={updateNote} note={note} />
                    )
                })
                }
            </div>
        </>
    )
}

export default Notes