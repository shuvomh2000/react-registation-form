import React from 'react'
import {useLocation ,useNavigate } from 'react-router-dom'
import { DropdownButton,Dropdown,ButtonGroup,Button } from 'react-bootstrap'
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";




const Left = (props) => {
    const auth = getAuth();
    let navigate = useNavigate();

    let handleLogout = ()=>{
      
        signOut(auth).then(() => {
          navigate("/login");
        }).catch((error) => {
          // An error happened.
          console.log(error)
        });
  
      }

  return (
    <>
    <div className='left'>
        <img className='w-25' src={props.img}/>
        <br/>
    <DropdownButton
        as={ButtonGroup}
        id={`dropdown-variants-warning`}
        variant="warning"
        title={props.username}
      >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Active Item
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">
    <Button className='w-100 mt-5' onClick={handleLogout} variant="primary" type="submit">Logout </Button>
            
        </Dropdown.Item>
      </DropdownButton>
    </div>
    </>
  )
}

export default Left