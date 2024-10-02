import { Button } from "@/components/ui/button";
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Please login to access this page</h1>
          <p className="text-lg">You need to login to access this feature.</p>
          <Button variant="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
        </div>
      </div>
    );
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;