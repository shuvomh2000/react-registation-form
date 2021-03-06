import React, { useEffect, useState } from 'react'
import { Form,Modal,Button,ProgressBar,Card } from 'react-bootstrap'
import { getDatabase, ref, set,onValue,push } from "firebase/database";
import { getStorage, ref as refer, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth} from "firebase/auth";
import { useSelector } from 'react-redux';

const Middle = () => {
    let auth =getAuth()
 
    let userdata = useSelector(item=>item.activeuser.id)
    let [msg,setMsg] = useState('')
    let [Typing,settyping] = useState([])
    let [usermsg,setUsermsg] = useState([])
    let [uploadfile,setUploadfile] = useState('')
    let [progress2,setProgress2] = useState(0)
    let [bar,setBar] = useState(false)
    let [automsgsend,setAutomsgsend] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let handleMSg = (e)=>{
        setMsg(e.target.value)
        const db = getDatabase();
        set(ref(db, 'typing/'+auth.currentUser.uid), {
            name: auth.currentUser.displayName,
            receiver: userdata,
            sender: auth.currentUser.uid
        });
        const userRef = ref(db, 'typing/');
        onValue(userRef, (snapshot) => {
        let typingarr = []
        snapshot.forEach(item=>{
          typingarr.push(item.val())
        })
        settyping(typingarr)
        })
    }

    let handleSend = ()=>{
        const db = getDatabase()
        set(push(ref(db, 'messages/')), {
            msg: msg,
            name: auth.currentUser.displayName,
            receiver: userdata,
            sender: auth.currentUser.uid
        });
        setAutomsgsend(!automsgsend)  
        setMsg('')
    }


    useEffect (()=>{
        const db = getDatabase();
        const userRef = ref(db, 'messages/');
        onValue(userRef, (snapshot) => {
        let msgarr = []
        snapshot.forEach(item=>{
          msgarr.push(item.val())
        })
        setUsermsg(msgarr)
        })
    },[userdata])

    let handleFilesend = (e)=>{
        setUploadfile (e.target.files[0])
    }
    let handleFileUplaod = ()=>{
        setProgress2(2)
        const storage = getStorage();
        const storageRef = refer(storage, `file/${uploadfile.name}`);
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
          });
        }
      );
    }

  return (
   <>
   <div className='middle'>
   {usermsg.map(item=>(
    item.receiver == userdata || item.sender == userdata ?
     <Card style={item.sender == auth.currentUser.uid?receiver:sender}>
     <Card.Body>
       <Card.Title>{item.name}</Card.Title>
       <Card.Text>
         {item.msg}
       </Card.Text>
     </Card.Body>
   </Card>
   :
   ''
   ))}
   {Typing.map(item=>(
     item.receiver == auth.currentUser.uid
     ?
    <h1>{item.name}...</h1>
      :
      ""
   ))}

   

   </div>

   <Form.Control onChange={handleMSg} type="text" placeholder="massage" value={msg} />
   <Button className='w-50' onClick={handleSend} >Send</Button>
   <Button className='w-50' variant="primary" onClick={handleShow}>File</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>choose a file for upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control onChange={handleFilesend} type="file" placeholder="massage" />
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
   </>
  )
}

let sender = {
  width: "300px",
  marginRight: "auto",
}

let receiver = {
  width: "300px",
  marginLeft: "auto"
}

export default Middle