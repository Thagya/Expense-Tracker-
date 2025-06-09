import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import Authlayout from "../../components/layouts/Authlayout";
import Input from "../../components/input/input";


function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  if(!validatePassword(password)) {
    setError("Password must be at least 8 characters long.");
    return;
  }

    setError(null);
    // Add your login logic here (e.g., API call)

  };

  return (
    <Authlayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to log in</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            label="Email"
            type="email"
            className="mb-4"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            label="Min 8 characters"
            type="password"
            className="mb-4"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">Login</button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </Authlayout>
  );
}

export default Login