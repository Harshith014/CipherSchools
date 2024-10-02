import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-foreground">Navbar</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {token ? (
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button variant="ghost" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </>
            )}
            {role !== "user" && (
              <Button variant="ghost" onClick={() => navigate("/questions")}>
                Questions
              </Button>
            )}
            {role === "admin" ? (
              <Button variant="ghost" onClick={() => navigate("/createTest")}>
                Test
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => navigate("/test")}>
                Test
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;