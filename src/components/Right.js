import React from 'react'
import { ListGroup } from 'react-bootstrap'
import moment from 'moment'


const Right = (props) => {
  return (
    <>
    <div className='right'>
    <h3>account info</h3>
    <ListGroup>
      <ListGroup.Item>{moment(props.createtime).fromNow()}</ListGroup.Item>
    </ListGroup>
    </div>
    </>
  )
}

export default Right