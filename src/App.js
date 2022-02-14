
import './style.css'
import {Alert,Container,Form,Button} from 'react-bootstrap'


function App() {

  return (
    <>
    <Container>
    <Alert variant="primary">
      <h1 className="text-center">Registation</h1>
    </Alert>

    <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="email" placeholder="Write Full Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>

        <Button className='w-100' variant="primary" type="submit">
          Submit
        </Button>
    </Form>
    </Container>
    </>
  );
}

export default App;
