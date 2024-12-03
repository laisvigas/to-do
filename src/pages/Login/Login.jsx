import { useForm } from "react-hook-form";
import { loginUser, loginWithGoogle } from "../../firebase/authentication";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { Button, Container, Row, Col, Form, Alert } from "react-bootstrap";
import Header from "../../components/Header/Header";

function Login() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { setAuthenticated } = useAuth(); 

    async function handleFormSubmit({ email, password }) {
        try {
            await loginUser(email, password); 
            setAuthenticated(true);
            navigate("/");
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                window.alert("Invalid email or password. If you're not registered, please sign up.");
            } else {
                console.error(error);
                window.alert("Something went wrong.");
            }
        }
    }

    async function handleGoogleLogin() {
        try {
            await loginWithGoogle(); 
            setAuthenticated(true); 
            navigate("/"); 
        } catch (error) {
            console.error(error);
            window.alert("Something went wrong.");
        }
    }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <Header /> 
            <Row className="w-100 mt-4"> 
                <Col md={6} lg={4} className="mx-auto">
                    <div className="card p-4 shadow-sm">
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: "Email is required",
                                        minLength: {
                                            value: 10,
                                            message: "Email must be at least 10 characters"
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email format"
                                        }
                                    })}
                                    autoComplete="off"
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
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    isInvalid={!!errors.password}
                                />
                                {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 mb-2">
                                Login
                            </Button>

                            <Button variant="dark" type="button" className="w-100 mb-3" onClick={handleGoogleLogin}>
                                Login with Google
                            </Button>

                            <div className="text-center">
                                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                                <p><a href="/">Go to Home</a></p> 
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
