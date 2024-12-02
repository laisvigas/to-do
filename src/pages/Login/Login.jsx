import { useForm } from "react-hook-form";
import { loginUser, loginWithGoogle } from "../../firebase/authentication";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { Button } from "react-bootstrap";


function Login() {
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const { setAuthenticated } = useAuth(); 

    async function handleFormSubmit({ email, password }) {
        try {
            await loginUser(email, password); 
            setAuthenticated(true);
            navigate("/");
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                window.alert("Invalid email or password.");
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
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: true,
                            minLength: 10,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/
                        })}
                        autoComplete="off"
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 15
                        })}
                    />
                </div>

                <Button variant="primary" type="submit">
                    Login
                </Button>

                <Button variant="dark" type="button" onClick={handleGoogleLogin}>
                    Login with Google
                </Button>
            </form>
        </div>
    );
}

export default Login;
