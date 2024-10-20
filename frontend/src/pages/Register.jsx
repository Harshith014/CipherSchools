import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingComponent from '../components/Loading';
import "../css/test.css";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/register`,
        formData
      );
      console.log(response.data);
      alert("Registration successful! You have successfully registered.");
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      alert(
        "Registration failed. " +
          (error.response?.data?.message || "An unknown error occurred")
      );
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="custom flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Create a new account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {["username", "email", "password"].map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    type={field === "password" ? "password" : "text"}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          )}
          <p className="text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
