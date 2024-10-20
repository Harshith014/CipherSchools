/* eslint-disable react/prop-types */
import { Progress } from "@/components/ui/progress"; // Adjust the import based on your setup
import { useEffect, useState } from "react";

const LoadingComponent = ({ value = 30 }) => {
  const [progress, setProgress] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Stop updating once it reaches 100%
          return 100;
        }
        return prev + 10; // Increment progress every 100ms (adjust as needed)
      });
    }, 100);

    return () => {
      clearInterval(interval); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="loading-container">
      <h3>Loading...</h3>
      <Progress value={progress} />
    </div>
  );
};

export default LoadingComponent;
