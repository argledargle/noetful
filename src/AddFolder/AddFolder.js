import React from 'react'
import config from '../config';
import CircleButton from '../CircleButton/CircleButton'
import { Link } from 'react-router-dom'
import './AddFolder.css'
//import PropTypes from 'prop-types';

class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            id: ""
        };
    }

    folderChanged(name) {
        this.setState({
            name
        });
    };

    handleSubmit(e) {
        const name = (({name}) => ({name}))(this.state);
        const url = `${config.API_ENDPOINT}/folders`;
        const options = {
          method: 'POST',
          body: JSON.stringify(name),
          headers: {
            "Content-Type": "application/json",
          }
        };

    fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then(() => {
        this.setState({
          name: "",
          date:""
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
      document.reload()
  }
    render() {
        const error = this.state.error
        ? <div className="error">{this.state.error}</div>
        : "";
        return(
            <div className="addfolder">
            <h2>Add Folder</h2>
            { error }
            <form className="addfolder__form" onSubmit={e => this.handleSubmit(e)}>
              <label htmlFor="foldername">Folder Name:</label>
              <br />
              <input
              required
                type="text"
                name="folder-name"
                placeholder="Folder"
                value={this.state.name}
                onChange={e => this.folderChanged(e.target.value)}/>
    
              <div className="addfolder__buttons">
                {/*<button onClick={e => this.props.showForm(false)}>Cancel</button>*/}
                <button type="submit" >Save</button>
              </div>  
            </form>
            <CircleButton
          tag={Link}
          to='/'
          type='button'
          className='NoteListNav__add-folder-button'
        > Home
          </CircleButton>
          </div>
        )
    }
}


export default AddFolder