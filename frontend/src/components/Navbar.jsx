import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-foreground">MCQ</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="block lg:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Menu for larger screens */}
            <div className="hidden lg:flex lg:space-x-4">
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

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {token ? (
                <Button variant="ghost" className="w-full" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </>
              )}
              {role !== "user" && (
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate("/questions")}
                >
                  Questions
                </Button>
              )}
              {role === "admin" ? (
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate("/createTest")}
                >
                  Test
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate("/test")}
                >
                  Test
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
