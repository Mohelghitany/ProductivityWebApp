'use client';
import React, { useState, useEffect } from "react";
import './note.css';

export default function Notes1() {
  const [NoteTitle, setNoteTitle] = useState('');
  const [NoteDetails, setNoteDetails] = useState('');
  const [Tag, setTag] = useState('');
  const [tempTags, setTempTags] = useState([]);
  const [Color, setColor] = useState(null);
  const [Notes, setNotes] = useState([]);
  const [Edit, setEdit] = useState(null);
  const [SearchTag, setSearchTag] = useState('');
  const [ModalOpen, setModalOpen] = useState(false); 
  const colors = [  
    '#4A593D', 
    '#6C8672',
    '#8BA382',  
    '#D99E73', 
    '#F2C78F',
    '#FF5E57',
    '#D9534F', 
    '#A9C1A9'
  ];

  useEffect(() => {
   
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      title: NoteTitle,
      details: NoteDetails,
      tags: tempTags, 
      color: Color,
      time: new Date().toLocaleTimeString(), 
    };

    let updatedNotes;
    if (Edit !== null) {
      updatedNotes = Notes.map((note, index) =>
        index === Edit ? newNote : note
      );
      setEdit(null);
    } else {
      updatedNotes = [...Notes, newNote];
    }

    setNotes(updatedNotes);

    
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    
    setNoteTitle('');
    setNoteDetails('');
    setTag('');
    setColor(null);
    setTempTags([]); 
    setModalOpen(false); 
  };

  const handleColor = (color) => {
    setColor(color);
  };

  const deleteNote = (index) => {
    const newNotes = Notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const editNote = (index) => {
    const note = Notes[index];
    setNoteTitle(note.title);
    setNoteDetails(note.details);
    setTempTags(note.tags); 
    setColor(note.color);
    setEdit(index);
    setModalOpen(true); 
  };

  const filteredNotes = Notes.filter(note =>
    note.tags.some(tag => tag.toLowerCase().includes(SearchTag.toLowerCase()))
  );

  const ButtonTag = () => {
    if (Tag) {
      setTempTags([...tempTags, Tag]);
      setTag(''); 
    }
  };

  const deleteTempTag = (tagIndex) => {
    setTempTags(tempTags.filter((_, index) => index !== tagIndex));
  };

  return (
    <>
      <div className="search-bar"> 
        <input 
          className="search" 
          type="text" 
          placeholder="Search by Tag" 
          value={SearchTag}
          onChange={(e) => setSearchTag(e.target.value)}
        />
        <button className="open-modal-button" onClick={() => setModalOpen(true)}>Add New Note</button>
      </div>

      {ModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="all">
                <input 
                  type="text" 
                  value={NoteTitle} 
                  onChange={(e) => setNoteTitle(e.target.value)} 
                  placeholder="Note Title..." 
                  className="note-title" 
                />
                <textarea 
                  value={NoteDetails} 
                  onChange={(e) => setNoteDetails(e.target.value)} 
                  placeholder="Add Details of Note.." 
                  className="details"
                />
              </div>

              <div className="tags">
                <input 
                  type="text" 
                  value={Tag} 
                  onChange={(e) => setTag(e.target.value)} 
                  placeholder="Tag #.." 
                  className="add-tag" 
                />
                <button id='button-tag' type="button" 
                  className="tag-button"
                  onClick={ButtonTag}
                >
                  Add Tag
                </button>
              </div>
              <div className="tag-list">
                  {tempTags.map((tag, tagIndex) => (
                    <div key={tagIndex} className="tag-item">
                      <span>{tag}</span>
                      <button type="button" onClick={() => deleteTempTag(tagIndex)}>X</button>
                    </div>
                  ))}
              </div>

              <div className="palette">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="color-circle"
                    onClick={() => handleColor(color)}
                    style={{
                      backgroundColor: color,
                      border: Color === color ? '3px solid black' : 'none',
                      width: '40px', 
                      height: '40px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'inline-block'
                    }}
                  />
                ))}
              </div>

              <div className="edit-buttons">
                <button type="button" className="close" onClick={() => setModalOpen(false)}>&larr;  Back</button>
                <button type="submit" className="done">Done</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div>
        {filteredNotes.map((note, index) => (
          <div key={index} style={{ backgroundColor: note.color }} className="card">
            <h2 className="h2">{note.title}</h2>
            <hr className="divide"/>
            <p className="p">{note.details}</p>
            <div>
              {note.tags.map((tag, tagIndex) => (
                <span key={tagIndex} style={{ marginRight: "10px", fontWeight: "normal"}}>
                  #{tag} 
                </span>
              ))}
            </div>
            <div className="div2">
              <div className="time">
                <p>{note.time}</p> 
              </div>
              <div className="But-ED">
                <button className="delete" onClick={() => deleteNote(index)}>Delete</button>
                <button className="edit" onClick={() => editNote(index)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
