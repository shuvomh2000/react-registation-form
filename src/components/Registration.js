
import {Alert,Container,Form,Button,Spinner} from 'react-bootstrap'
import { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import "../firebaseconfig"
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
    
    let navigate = useNavigate();
 
    let [username,setUsername] = useState('')
    let [errusername,setErrusername] = useState('')
  
    let [email,setEmail] = useState('')
    let [erremail,setErremail] = useState('')
  
    let [password,setPassword] = useState('')
    let [errpassword,setErrpassword] = useState('')
  
    let [cpassword,setCpassword] = useState('')
    let [errcpassword,setErrcpassword] = useState('')
    let [match,setMatch] = useState('')
    let [loading,setLoading] = useState(false)
    let [samemail,setSamemail] = useState(false)
  
    let handleUsername = (e)=>{
      setUsername(e.target.value)
    }
    let handleEmail = (e)=>{
      setEmail(e.target.value)
    }
    let handlePassword = (e)=>{
      setPassword(e.target.value)
    }
    let handleCpassword = (e)=>{
      setCpassword(e.target.value)
    }
  
  
    let handleSubmit = (e)=>{
      e.preventDefault()
      if(username == ''){
        setErrusername('give a name')
      }else if(email == ''){
        setErremail('give a email')
      }else if(password == ''){
        setErrpassword('give a password')
      }else if(cpassword == ''){
        setErrcpassword('confirm your password')
      }else if(password != cpassword){
        setMatch('password not match')
      }else{
        setLoading(true)
        const auth = getAuth();
          createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
              // Signed in 
              console.log(user)
              updateProfile(auth.currentUser, {
                displayName: username, 
                photoURL: "https://e7.pngegg.com/pngimages/122/295/png-clipart-open-user-profile-facebook-free-content-facebook-silhouette-avatar-thumbnail.png"

              }).then(() => {
                const db = getDatabase();
                  set(ref(db, 'users/'+user.user.uid), {
                    username: username,
                    email: email,
                    id: user.user.uid,
                    img: user.user.photoURL 
                  }).then(()=>{
                      // Profile updated!
                      setUsername('')
                      setErrusername('')
                      setEmail('')
                      setErremail('')  
                      setPassword('')  
                      setErrpassword('')  
                      setCpassword('')  
                      setErrcpassword('')  
                      setMatch('')   
                      sendEmailVerification(auth.currentUser)
                      setLoading(false)
                      navigate("/login",{state:"account created successfully"});
                  })
              }).catch((error) => {
                console.log(error)
              });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              if(errorCode.includes("email")){
                setSamemail("email already in use")
                setLoading(false)
              }
              
            });
      }
    }
  



  return (
    <>
    <Container>
    <Alert variant="primary">
      <h1 className="text-center">Registation</h1>
    </Alert>

    <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control onChange={handleUsername} type="email" placeholder="Write Full Name" value={username} />
            {errusername
            ?
            <Form.Text className="text-muted err">
            {errusername}
          </Form.Text>
            :
            ""
            }
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control onChange={handleCpassword} type="password" placeholder="Confirm Password" value={cpassword}/>
          {errcpassword
            ?
            <Form.Text className="text-muted err">
            {errcpassword}
          </Form.Text>
            :
            ""
            }
          {match
            ?
            <Form.Text className="text-muted err">
            {match}
          </Form.Text>
            :
            ""
            }
            {samemail
            ?
            <Form.Text className="text-muted err">
            {samemail}
          </Form.Text>
            :
            ""
            }
        </Form.Group>

        {loading
        ?
        <Button className='w-100' variant="primary">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Button>
        :
        <Button onClick={handleSubmit} className='w-100' variant="primary">
         submit
        </Button>
        }
        <Form.Text id="passwordHelpBlock" muted>
            Already have an account? <Link to="/login">Login</Link> or <Link to="/">guest</Link>
        </Form.Text>
    </Form>
    </Container>
    </>
  )
}

export default Registration