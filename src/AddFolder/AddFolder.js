import React from 'react'
import config from '../config';
import CircleButton from '../CircleButton/CircleButton'
import { Link } from 'react-router-dom'

class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            id: "" //use date.Now() to create this ID
        };
    }

    folderChanged(name, date) {
        this.setState({
            name
        });
        this.setState({
          date
      });
    };


    handleSubmit(e) {
        e.preventDefault()
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
      .then(data => {
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
  }
    render() {
        const error = this.state.error
        ? <div className="error">{this.state.error}</div>
        : "";
        var time = Date.now();
        return(
            <div className="addfolder">
            <h2>Add Folder</h2>
            { error }
            <form className="addfolder__form" onSubmit={e => this.handleSubmit(e)}>
              <label htmlFor="foldername">Folder Name:</label>
              <input
                type="text"
                name="folder-name"
                id={time}
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