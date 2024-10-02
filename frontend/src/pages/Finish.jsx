import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import "../css/test.css";

const FinishPage = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      startCronJob();
    }, 300000); // 5 minutes

    return () => clearTimeout(timer);
  });

  const startCronJob = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/start-cron`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(
        "Error stopping the cron job:",
        error.response.data.message
      );
    }
  };

  return (
    <div className="custom flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Test Completed!</CardTitle>
          <CardDescription>
            Thank you for participating in the test. Your results will be sent
            to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              You can now close this page or navigate to another section of the
              application.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinishPage;
