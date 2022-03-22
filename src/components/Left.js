import React, { useEffect, useState } from 'react'
import {useLocation ,useNavigate } from 'react-router-dom'
import { DropdownButton,Dropdown,ButtonGroup,Button,ListGroup } from 'react-bootstrap'
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";




const Left = (props) => {
    let [users,setUsers] = useState([])
    let [activeuser,setActiveuser] = useState("")
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

      let handleActive = (id)=>{
        setActiveuser(id)
      }

      let userArr = []

      useEffect(()=>{
        const db = getDatabase();
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            snapshot.forEach(item=>{
                if(props.id !== item.key){
                    userArr.push(item.val())
                }
                
            })
            setUsers(userArr)
        });
      },[props.id])

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
        <h3>peoples</h3>

        {users.map(item=>(
            <ListGroup>
                <ListGroup.Item style={activeuser == item.id ? active:notactive} onClick={()=>handleActive(item.id)}>{item.username }</ListGroup.Item>
            </ListGroup>
        ))}
    </div>

    
    </>
  )
}

let active ={
    color: "red" 
}
let notactive ={
    color: "#000" 
}

export default Left