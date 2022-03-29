import { useState } from 'react'
import {Alert,Container,Button,Row,Col} from 'react-bootstrap'
import {useLocation ,useNavigate } from 'react-router-dom'
import '../firebaseconfig'
import Left from './Left';
import Right from './Right';
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import Middle from './Middle';







const Home = () => {
    let navigate = useNavigate();
    const {state} = useLocation();
    let [msg,setMsg] = useState(true)
    let [varifymail,setVarifymail] = useState(false)
    let [time,setTime] = useState("")
    let [name,setName] = useState("")  
    let [id,setId] = useState("")  
    let [email,setEmail] = useState("")  
    let [profilepicture,setProfilepicture] = useState("") 
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email)
        setId(user.uid)
        setProfilepicture(user.photoURL)
        setTime(user.metadata.creationTime)
        setName(user.displayName)
        if(user.emailVerified){
          setVarifymail(true)
        }
      } else {
        console.log("mail verify na")
        navigate("/login")
      }
    });

    let handleLogout = ()=>{
      
      signOut(auth).then(() => {
        navigate("/registration");
      }).catch((error) => {
        // An error happened.
        console.log(error)
      });

    }

    setTimeout(()=>{
      setMsg(false)
    },10000)

    

  return (
    <>
    

    {/* {msg
    ?
        <Alert variant="primary">
          {state}
        </Alert>
    :
      ""

    } */}

      <Row>
        <Col lg={3}>
          <Left username={name} img={profilepicture} id={id} email={email}/>
        </Col>
        <Col lg={6}>
          <Middle/>
        </Col>
        <Col lg={3}>
          <Right createtime={time} id={id}/>
        </Col>
      </Row>

    {/* {varifymail
    ?
      
    // <Button onClick={handleLogout} className='w-100' variant="primary" type="submit">Logout </Button>
    :
    <>
    <Button className='w-100' variant="primary" type="submit">verify email </Button>
    <Button className='w-100 mt-5' onClick={handleLogout} className='w-100' variant="primary" type="submit">Logout </Button>
    </>
    }
         */}
      
  
    </>
   
  )
}

export default Home