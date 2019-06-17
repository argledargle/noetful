import React from "react";
import config from "../config";
import CircleButton from "../CircleButton/CircleButton";
import { Link } from "react-router-dom";
import "./AddNote.css"

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      modified: "",
      folderId: "",
      content: "",
    };
  }

  folderChanged(name) {
    this.setState({
      name
    });
  }

  contentChanged(content) {
    this.setState({
      content
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const modified = (({ modified }) => ({ modified }))(this.state)
    const name = (({ name }) => ({ name }))(this.state);
    const content = (({content}) => ({content}))(this.state);
    console.log(name, content)
    const url = `${config.API_ENDPOINT}/notes`;
    const options = {
      method: "POST",
      body: JSON.stringify(name, content),
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log(JSON.stringify(name, content))

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          name: "",
          id: "",
          modified: "",
          folderId: "",
          content:""
        });
        console.log(this.context);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }
  render() {
    const error = this.state.error ? (
      <div className="error">{this.state.error}</div>
    ) : (
      ""
    );
    return (
      <div className="addnote">
        <h2>Add Folder</h2>
        {error}
        <form className="addnote__form" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="notename">Note Name:</label>
          <input
            type="text"
            name="note-name"
            placeholder="Note"
            value={this.state.name}
            onChange={e => this.folderChanged(e.target.value)}
          />
          <br />
          <label htmlFor="notecontent">Note Content:</label>
          <textarea
            type="text"
            name="note-content"
            placeholder="Note content"
            value={this.state.content}
            className="note-content"
            onChange={e => this.contentChanged(e.target.value)}
          />

          <div className="addnote__buttons">
            {/*<button onClick={e => this.props.showForm(false)}>Cancel</button>*/}
            <button type="submit">Save</button>
          </div>
        </form>
        <CircleButton
          tag={Link}
          to="/"
          type="button"
          className="NoteListNav__add-folder-button"
        >
          {" "}
          Home
        </CircleButton>
      </div>
    );
  }
}

export default AddNote;
