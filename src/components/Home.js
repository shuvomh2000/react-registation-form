import { useState } from 'react'
import {Alert,Container,Button} from 'react-bootstrap'
import {useLocation ,useNavigate } from 'react-router-dom'
import '../firebaseconfig'
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";







const Home = () => {
    let navigate = useNavigate();
    const {state} = useLocation();
    let [msg,setMsg] = useState(true)
    let [varifymail,setVarifymail] = useState(false)
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.emailVerified){
          setVarifymail(true)
        }
        const uid = user.uid;
        console.log(user)
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
    <Container>

    {msg
    ?
        <Alert variant="primary">
          {state}
        </Alert>
    :
      ""

    }
    {varifymail
    ?
    <Button onClick={handleLogout} className='w-100' variant="primary" type="submit">Logout </Button>
    :
    <>
    <Button className='w-100' variant="primary" type="submit">verify email </Button>
    <Button className='w-100 mt-5' onClick={handleLogout} className='w-100' variant="primary" type="submit">Logout </Button>
    </>
    }
        
      
  </Container>
    </>
   
  )
}

export default Home