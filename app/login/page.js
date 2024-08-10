"use client"

import {Input} from "@nextui-org/input";
import { useState, useEffect } from "react";
import { getOneUser } from "./services/loginservice";

export default function Login() {
    const [currentUser, setCurrentUser] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      // Check if isAdmin state is stored in localStorage
      const storedIsAdmin = localStorage.getItem("isAdmin");
      if (storedIsAdmin) {
        setIsAdmin(JSON.parse(storedIsAdmin));
      }
    }, []);


    const handleLogin = async() => {
        try{
          const loginDetails = {username, password}
          const result = await getOneUser("6", loginDetails);
          console.log(result.data.isadmin);
          setCurrentUser(result.data);
          const adminStatus = result.data.isadmin;
          setIsAdmin(adminStatus);
          // Persist isAdmin state to localStorage
          localStorage.setItem("isAdmin", JSON.stringify(adminStatus));

        } catch(err) {
            setError(err);
        }
    }

    const handleLogout = async() => {
      try{
        // Remove isAdmin from localStorage
        localStorage.removeItem("isAdmin");

        // Optionally, clear all localStorage (if needed)
        // localStorage.clear();

        // Redirect to the login page or home page after logout
        window.location.href = "/login"; // or any other page you want
      } catch(err) {
          setError(err);
      }
     }

    useEffect(() => {
      const getAdmin = async () => {
        try {
          console.log(currentUser);
          console.log(isAdmin);
        } catch (err) {
          setError(err.message);
          console.log(error)
        }
      };
  
      getAdmin();
    }, [currentUser, isAdmin]);


    return(
        <main className="flex flex-col items-center justify-center min-h-screen">
          <div className="flex flex-row">
            {
              isAdmin && <div className="text-white">Admin Mode On</div>
            }
            <div className="text-white text-2xl mb-7">Welcome to Login Page</div>
          </div>
            
            <div className="mb-5">
            <Input 
                type="text" 
                label="Username" 
                labelPlacement="outside" 
                placeholder="Enter your Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                classNames={{
                  label: "!text-white",
                  input: [
                    "!text-white",
                    
                  ],
                  innerWrapper: "bg-black",
                  inputWrapper: [
                    "bg-black",
                    "border", // Add border
                    "border-white",
                    "border-md", // Specify border color
                    "hover:bg-black",
                    "dark:hover:bg-black",
                    "group-data-[focus=true]:bg-black",
                    "dark:group-data-[focus=true]:bg-black",
                    "!cursor-text",
                  ],
                }}
              />
            </div>
            <div className="mb-5">
            <Input 
                type="password" 
                label="Password" 
                labelPlacement="outside" 
                placeholder="Enter your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                classNames={{
                  label: "!text-white",
                  input: [
                    "!text-white",
                    
                  ],
                  innerWrapper: "bg-black",
                  inputWrapper: [
                    "bg-black",
                    "border", // Add border
                    "border-white",
                    "border-md", // Specify border color
                    "hover:bg-black",
                    "dark:hover:bg-black",
                    "group-data-[focus=true]:bg-black",
                    "dark:group-data-[focus=true]:bg-black",
                    "!cursor-text",
                  ],
                }}
              />
            </div>
            
            <button className="hover:bg-green-600 hover:text-white" onClick={handleLogin}>Login</button>
            <button className="hover:bg-gray-600 hover:text-white" onClick={handleLogout}>Logout</button>
            <a className="hover:bg-red-600 hover:text-white" href="/">Go Back</a>
        </main>
    );
}