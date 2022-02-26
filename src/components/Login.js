
import {Alert,Container,Form,Button,Spinner} from 'react-bootstrap'
import { useState } from 'react'
import { Link,useLocation ,useNavigate} from 'react-router-dom'
import '../firebaseconfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    let navigate = useNavigate();
    const {state} = useLocation();
    
   
    let [email,setEmail] = useState('')
    let [erremail,setErremail] = useState('')
  
    let [password,setPassword] = useState('')
    let [errpassword,setErrpassword] = useState('')
    let [loading,setLoading] = useState(false)
    let [msg,setMsg] = useState(true)
  
    
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
        const auth = getAuth();
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
            navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
          });
      }
    }
    const notify = () => toast(state);
    
    if(msg){
      if(state){
        notify()
        setMsg(false) 
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
        </Form.Group>

        

        <Button onClick={handleSubmit} className='w-100' variant="primary" type="submit">
        {loading
            ?
            <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span>
            </Spinner>
            :
            'login'
            }
        </Button>
        <Form.Text id="passwordHelpBlock" muted>
            Don't have an account?<Link to="/registration">create account</Link> or <Link to="/">guest</Link>
        </Form.Text>
    </Form>
    </Container>
    </>
  )
}

export default Login