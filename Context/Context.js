"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

export const Context = createContext();
const ContextProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [signup, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  // sign up user
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (signup.password.length < 6) {
        setError(true);
        setMessage("Password must be at least 6 characters");
        setLoading(false);
      } else {
        const response = await axios.post("/api/signup", signup);

        setLoading(false);
        setError(response.data.status !== 201);
        setMessage(response.data.message);

        if (response.data.message === "User created successfully") {
          router.push("/loginpage");
        }
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Context.Provider
      value={{ signup, setSignUp, handleSignUpSubmit, loading, error, message }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
