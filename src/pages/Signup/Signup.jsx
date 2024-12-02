import { useForm } from "react-hook-form";
import { saveTask } from "../../firebase/firestore"; 
import { registerUser } from "../../firebase/authentication"; 
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form, Alert } from "react-bootstrap";

function Signup() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();

  async function saveUser({ email, password, name }) { 
    try {
      const user = await registerUser(email, password); 

      await saveTask({ 
        email, password, name,
        authId: user.uid,
      });

      navigate("/login");
    } catch (error) {
      window.alert(error.message || "Something went wrong.");
      console.error(error);
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit(saveUser)}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required"
                  })}
                  isInvalid={!!errors.name}
                />
                {errors.name && <Form.Control.Feedback type="invalid">{errors.name.message}</Form.Control.Feedback>}
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",  
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format", 
                    },
                  })}
                  isInvalid={!!errors.email}
                />
                {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { 
                    required: "Password is required", 
                    minLength: {
                      value: 6, 
                      message: "Password must have at least 6 characters" 
                    }
                  })}
                  isInvalid={!!errors.password}
                />
                {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Create Account
              </Button>

              <div className="text-center">
                <p>Already have an account? <a href="/login">Login</a></p>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
