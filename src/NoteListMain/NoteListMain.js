import React from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { getNotesForFolder } from "../notes-helpers";
import "./NoteListMain.css";
import NoteListError from "./NoteListError";

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };
  static contextType = ApiContext;

  render() {
    
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId);

    return (
      <section className="NoteListMain">
        <div className="NoteListMain__button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <br />
            Add Note
          </CircleButton>
        </div>
        <ul>
          {notesForFolder.map(note => (
            <li key={note.id}>
              <NoteListError>
                <Note id={note.id} name={note.name} modified={note.modified} />
              </NoteListError>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
