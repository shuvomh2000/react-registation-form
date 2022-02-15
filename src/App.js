

import {Alert,Container,Form,Button} from 'react-bootstrap'
import { useState } from 'react'


function App() {

  let [username,setUsername] = useState('')
  let [errusername,setErrusername] = useState('')

  let [email,setEmail] = useState('')
  let [erremail,setErremail] = useState('')

  let [password,setPassword] = useState('')
  let [errpassword,setErrpassword] = useState('')

  let [cpassword,setCpassword] = useState('')
  let [errcpassword,setErrcpassword] = useState('')
  let [match,setMatch] = useState('')

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
            <Form.Control onChange={handleUsername} type="email" placeholder="Write Full Name" />
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
            <Form.Control  onChange={handleEmail} type="email" placeholder="Enter email" />
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
          <Form.Control onChange={handlePassword} type="password" placeholder="Password" />
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
          <Form.Control onChange={handleCpassword} type="password" placeholder="Confirm Password" />
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
        </Form.Group>

        <Button onClick={handleSubmit} className='w-100' variant="primary" type="submit">
          Submit
        </Button>
    </Form>
    </Container>
    </>
  );
}

export default App;
