import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const CreateTest = () => {
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/questions/createTest`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Test created successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      alert("Failed to create test. Please try again.", error);
    }
  };

  if (role === "admin") {
    return (
      <div className="custom flex justify-center items-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create Test</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Create Test
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  } else if (role === "user") {
    navigate("/test");
  } else {
    return <div className="p-4 text-center">Loading or invalid role...</div>;
  }
};

export default CreateTest;
