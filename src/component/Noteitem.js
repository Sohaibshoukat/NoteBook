import React, { useContext } from 'react'
import noteContext from '../context/notes/notesCotext';
import AlertContext from '../context/Alert/AlertContext'

const Noteitem = (props) => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;

    const context = useContext(noteContext);
    const {deleteNote} = context;


    const { note ,updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.Title}</h5>
                    <p className="card-text">{note.Description}</p>
                    {/* <p className="btn btn-primary">{note.tag}</p> */}
                    <i className="fa-regular fa-trash-can mx-2" 
                    onClick={()=>{
                        deleteNote(note._id);
                        showAlert("Note Deleted Succefully","success")
                    }}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
