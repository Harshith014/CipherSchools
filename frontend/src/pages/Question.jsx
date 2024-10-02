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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";
import "../css/test.css";

const CreateQuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const [marks, setMarks] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const questionData = {
      question,
      options,
      correctOption,
      marks,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/questions/create`,
        questionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Question created successfully!");
      setQuestion("");
      setOptions([]);
      setCorrectOption("");
      setMarks("");
    } catch (error) {
      alert("Failed to create question. Please try again.", error);
    }
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((option, i) => i !== index));
  };

  const handleOptionChange = (index, value) => {
    setOptions(options.map((option, i) => (i === index ? value : option)));
  };

  return (
    <div className="custom flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Question</CardTitle>
          <CardDescription>Create a new question with options.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="options">Options</Label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddOption}>
                Add Option
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="correctOption">Correct Option</Label>
              <div className="flex items-center space-x-2">
                <div className="text-sm">
                  {correctOption !== ""
                    ? options[correctOption]
                    : "Select Correct Option"}
                </div>
                <Select value={correctOption} onValueChange={setCorrectOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Correct Option" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option, index) => (
                      <SelectItem key={index} value={index}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="marks">Marks</Label>
              <Input
                id="marks"
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create Question
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuestionForm;
