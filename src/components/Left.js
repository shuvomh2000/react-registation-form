import React, { useEffect, useState } from 'react'
import {useLocation ,useNavigate } from 'react-router-dom'
import { DropdownButton,Dropdown,ButtonGroup,Button,ListGroup,Modal,ProgressBar,Form } from 'react-bootstrap'
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue,set} from "firebase/database";
import { getStorage, ref as refer, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {useDispatch} from 'react-redux'




const Left = (props) => {
    let dispatch = useDispatch()
    let [users,setUsers] = useState([])
    let [activeuser,setActiveuser] = useState("")
    let [uploadfile,setUploadfile] = useState('')
    let [profile,setProfile] = useState('')
    let [progress2,setProgress2] = useState(0)
    let [bar,setBar] = useState(false)


    const auth = getAuth();
    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        dispatch({type:"ACTIVE_USER",payload:id})
      }

      let userArr = []

      useEffect(()=>{
        const db = getDatabase();
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            snapshot.forEach(item=>{
                if(props.id !== item.key){
                    userArr.push(item.val())
                }else{
                  setProfile(item.val().img)
                }
                
            })
            setUsers(userArr)
        });
      },[props.id])

      let handleImageSelect = (e)=>{
        setUploadfile (e.target.files[0])
    }

    let handleFileUplaod = ()=>{
          setProgress2(2)
          const storage = getStorage();
          const storageRef = refer(storage, `userpicture/${uploadfile.name}`);
          const uploadTask = uploadBytesResumable(storageRef, uploadfile);

          uploadTask.on('state_changed', 
          (snapshot) => {
              setBar(true)
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress2(progress)
            console.log('Upload is ' + progress + '% done');
            if(progress == 100){
              setUploadfile('')
              setBar(false)
              setShow(false)
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
            console.log(error)
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              const db = getDatabase();
              set(ref(db, 'users/'+auth.currentUser.uid), {
                  username: props.username,
                  id: props.id,
                  email: props.email,
                  img: downloadURL
              });
            });
          }
        );
    }

  return (
    <>
    <div className='left'>
        <img className='w-25' src={profile}/>
        <br/>
        <DropdownButton
            as={ButtonGroup}
            id={`dropdown-variants-warning`}
            variant="warning"
            title={props.username}
        >
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={handleShow}>Change picture</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
            Active Item
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">
            <Button className='w-100 mt-5' onClick={handleLogout} variant="primary" type="submit">Logout </Button>
            </Dropdown.Item>
        </DropdownButton>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>choose Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Control onChange={handleImageSelect} type="file" placeholder="massage" />
            {bar ? < ProgressBar now={progress2?progress2:2} label={`${progress2?progress2:2}%`} /> : ''}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleFileUplaod}>
                upload
              </Button>
            </Modal.Footer>
        </Modal>
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