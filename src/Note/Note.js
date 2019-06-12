import React from 'react'
import { Link } from 'react-router-dom'
import './Note.css'
import moment from 'moment'

export default function Note(props) {
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <Link to = '/'><button className='Note__delete' type='button'>
        {' '}
        remove
      </button></Link>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {moment(props.modified).calendar()}
          </span>
        </div>
      </div>
    </div>
  )
}