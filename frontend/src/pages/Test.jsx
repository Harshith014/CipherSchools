import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/authContext';

import "../css/test.css";

export default function ResponsiveTestDashboard() {
  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [reviewedQuestions, setReviewedQuestions] = useState({});
  const navigate = useNavigate();
  const { token, role } = useContext(AuthContext);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [microphonePermission, setMicrophonePermission] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setCameraStream(stream);
        setCameraPermission(true);
        setMicrophonePermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(error => {
        if (error.name === 'NotAllowedError') {
          setCameraPermission(false);
          setMicrophonePermission(false);
        } else {
          console.error('Error accessing camera and microphone:', error);
        }
      });
  }, []);

  const handlePermissionError = () => {
    if (!cameraPermission) {
      return <div className="text-red-500 text-center mb-4">Error: Camera permission denied.</div>;
    } else if (!microphonePermission) {
      return <div className="text-red-500 text-center mb-4">Error: Microphone permission denied.</div>;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (role === "user") {
      const fetchLatestTest = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/questions/latest`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setTest(response.data.test);
        } catch (error) {
          console.error("Error fetching test:", error);
        }
      };
      fetchLatestTest();
    }
  }, [role, token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);



  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    try {
      const userId = jwtDecode(token).id;
      const answersData = Object.entries(answers).map(
        ([questionId, optionIndex]) => ({
          questionId,
          option: optionIndex,
        })
      );

      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/questions/submit`,
        { userId, answers: answersData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Test submitted successfully!");
      navigate("/finish");
    } catch (error) {
      alert("Error submitting test. Please try again.,", error);
    }
  };

  const handleMarkForReview = (questionId) => {
    setReviewedQuestions((prevReviewedQuestions) => ({
      ...prevReviewedQuestions,
      [questionId]: !prevReviewedQuestions[questionId],
    }));
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: remainingSeconds.toString().padStart(2, "0"),
    };
  };

  const renderQuestionButtons = () => {
    if (!test || !test.questions) return null;

    return test.questions.map((question, index) => {
      const isAnswered = answers[question._id] !== undefined;
      const isCurrent = currentQuestionIndex === index;
      const isReviewed = reviewedQuestions[question._id];

      let buttonClass = "w-8 h-8 p-0 text-xs sm:text-sm ";
      if (isReviewed) {
        buttonClass += "bg-purple-500 text-white ";
      } else if (isCurrent) {
        buttonClass += "bg-blue-500 text-white ";
      } else if (isAnswered) {
        buttonClass += "bg-green-500 text-white ";
      } else {
        buttonClass += "bg-gray-200 text-gray-700 ";
      }

      return (
        <Button
          key={question._id}
          className={buttonClass}
          onClick={() => setCurrentQuestionIndex(index)}
        >
          {index + 1}
        </Button>
      );
    });
  };

  if (role !== "user" || !test) {
    return <div className="p-4 text-center">Loading or invalid role...</div>;
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  const formattedTime = formatTime(timeLeft);

  return (
    <div className="container mx-auto p-2 sm:p-4 max-w-6xl">
      {handlePermissionError()}
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 lg:pr-4 mb-4 lg:mb-0">
          <Card className="custom">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
              <CardTitle className="mb-2 sm:mb-0">Online Test - CAT Preparation</CardTitle>
              <div className="flex gap-2">
                {["hours", "minutes", "seconds"].map((unit) => (
                  <div key={unit} className="text-center">
                    <div className="text-lg sm:text-2xl font-bold">
                      {formattedTime[unit]}
                    </div>
                    <div className="text-xs">{unit}</div>
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">
                  Question {currentQuestionIndex + 1}
                </h3>
                <p className="mb-4">{currentQuestion.question}</p>
                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <Checkbox
                        id={`option-${index}`}
                        checked={answers[currentQuestion._id] === index}
                        onCheckedChange={() =>
                          handleAnswerChange(currentQuestion._id, index)
                        }
                      />
                      <label htmlFor={`option-${index}`} className="ml-2 text-sm sm:text-base">
                        {String.fromCharCode(65 + index)}. {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Questions</h4>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {renderQuestionButtons()}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <Button
                  variant="destructive"
                  onClick={() => handleMarkForReview(currentQuestion._id)}
                  className="w-full sm:w-auto"
                >
                  Mark for review
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentQuestionIndex((prev) =>
                        Math.min(test.questions.length - 1, prev + 1)
                      )
                    }
                  >
                    Next
                  </Button>
                </div>
                <Button variant="secondary" onClick={handleSubmit} className="w-full sm:w-auto">
                  Submit Test
                </Button>
              </div>

              <div className="flex flex-wrap justify-center mt-4 space-x-2 sm:space-x-4">
                {[
                  { color: "blue", label: "Current" },
                  { color: "gray", label: "Not Attempted" },
                  { color: "green", label: "Answered" },
                  { color: "purple", label: "Review" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center mb-2">
                    <div
                      className={`w-3 h-3 bg-${color}-500 rounded-full mr-2`}
                    ></div>
                    <span className="text-xs sm:text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3 lg:pl-4">
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Camera Preview</h4>
            <video
              className="w-full h-auto"
              autoPlay
              playsInline
              ref={videoRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}