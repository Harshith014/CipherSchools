/* eslint-disable react/prop-types */

import { Progress } from "@/components/ui/progress"; // Adjust the import based on your setup


const LoadingComponent = ({ value = 30 }) => {
  return (
    <div className="loading-container">
      <h3>Loading...</h3>
      <Progress value={value} />
    </div>
  );
};

export default LoadingComponent;