import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect } from "react";
import "../css/test.css";

const FinishPage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .post(`${import.meta.env.VITE_APP_BASE_URL}/start-cron`, null)
        .catch((error) => {
          console.error(
            "Error stopping the cron job:",
            error.response.data.message
          );
        });
    }, 300000); // 5 minutes in milliseconds

    return () => clearTimeout(timer);
  }, []);

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
