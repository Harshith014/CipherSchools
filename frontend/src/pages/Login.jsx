import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const data = response.data;
      login(data.token);
      alert("Login successful! You have successfully logged in.");
      localStorage.setItem("token", data.token);
      setEmail("");
      setPassword("");
      const token = data.token;
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      if (role === "admin") {
        navigate("/questions");
      } else if (role === "user") {
        navigate("/test");
      }
    } catch (error) {
      alert("Invalid email or password.", error);
    }
  };

  return (
    <div className="custom flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your email and password to login.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            No account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>Register</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;