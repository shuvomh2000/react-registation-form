
import {Alert,Container,Form,Button,Spinner,Modal} from 'react-bootstrap'
import { useState } from 'react'
import { Link,useLocation ,useNavigate} from 'react-router-dom'
import '../firebaseconfig'
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    const {state} = useLocation();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   
    let [email,setEmail] = useState('')
    let [erremail,setErremail] = useState('')
  
    let [password,setPassword] = useState('')
    let [errpassword,setErrpassword] = useState('')
    let [loading,setLoading] = useState(false)
    let [msg,setMsg] = useState(true)
    let [resetemail,setResetemail] = useState('')
    let [errresetemail,setErrresetemail] = useState('')
    let [wpass,setWpass] = useState('')
  
    
    let handleEmail = (e)=>{
      setEmail(e.target.value)
    }
    let handlePassword = (e)=>{
      setPassword(e.target.value)
    }
  
    
  
    let handleSubmit = (e)=>{
      e.preventDefault()
      if(email == ''){
        setErremail('give a email')
      }else if(password == ''){
        setErrpassword('give a password')
      }else{
        setLoading(true)
        
        signInWithEmailAndPassword(auth, email, password)
          .then((user) => {
            // Signed in 
            console.log(user.user)
            setEmail('')
            setErremail('')
            setPassword('')
            setErrpassword('')
            // ...
            setLoading(false)
            navigate("/",{state: "successfully login"});
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode.includes("wrong")){
              setWpass("Incorrect Password")
              setLoading(false)
            }
            console.log(error)
          });
      }
    }
    const notify = () => toast(state);
    const notify2 = () => toast("Reset password to your email");
    
    if(msg){
      if(state){
        notify()
        setMsg(false) 
      }
    }
    let handleResetemail = (e)=>{
      setResetemail(e.target.value)
    }
    let handleResetPassword =()=>{
     if(resetemail == ''){
      setErrresetemail("Please Give AN Email")
     }else{
      sendPasswordResetEmail(auth, resetemail)
      .then(() => {
        setShow(false)
        notify2()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
     }
    }
  
    
  return (
    <>
    <Container>
    <Alert variant="primary">
      <h1 className="text-center">Login</h1>
    </Alert>

    <Form>
        <ToastContainer />

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control  onChange={handleEmail} type="email" placeholder="Enter email" value={email}/>
            {erremail
            ?
            <Form.Text className="text-muted err">
            {erremail}
          </Form.Text>
            :
            ""
            }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={handlePassword} type="password" placeholder="Password" value={password}/>
          {errpassword
            ?
            <Form.Text className="text-muted err">
            {errpassword}
          </Form.Text>
            :
            ""
            }
          {wpass
            ?
            <Form.Text className="text-muted err">
            {wpass}
          </Form.Text>
            :
            ""
            }
        </Form.Group>

        

        
        {loading
            ?
            <Button className='w-100' variant="primary" type="submit">
            <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span>
            </Spinner>
            </Button>
            :
            <Button onClick={handleSubmit} className='w-100' variant="primary" type="submit">
            Login
            </Button>
            }
        
        <div>
        <Form.Text  id="passwordHelpBlock" muted>
            Don't have an account?<Link to="/registration">create account</Link>
        </Form.Text>
        </div>
        <div>
        <Form.Text id="passwordHelpBlock" muted>
            Forget Your password? <Button variant="danger" onClick={handleShow}>
        Reset
      </Button>
        </Form.Text>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleResetemail} type="email" placeholder="Enter email"/>
            {errresetemail
            ?
            <Form.Text className="text-muted err">
            {errresetemail}
          </Form.Text>
          :
          ""
            }
           
          </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleResetPassword}>
              Reset
            </Button>
          </Modal.Footer>
        </Modal>

        
    </Form>
    </Container>
    </>
  )
}

export default Login