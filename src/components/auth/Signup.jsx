import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //formdata object
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center max-w-7xl mx-auto px-4 w-full">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5 border border-gray-200 rounded-md p-4 md:p-6 my-10"
        >
          <h1 className="font-bold text-xl md:text-2xl mb-5 text-center md:text-left">Sign Up</h1>
          
          <div className="my-3 md:my-4">
            <Label htmlFor="fullname" className="text-sm md:text-base">Full Name</Label>
            <Input
              id="fullname"
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Jay Kumar"
              className="mt-1 text-sm md:text-base"
            />
          </div>
          
          <div className="my-3 md:my-4">
            <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
            <Input
              id="email"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="jay@gmail.com"
              className="mt-1 text-sm md:text-base"
            />
          </div>
          
          <div className="my-3 md:my-4">
            <Label htmlFor="phoneNumber" className="text-sm md:text-base">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8080808080"
              className="mt-1 text-sm md:text-base"
            />
          </div>
          
          <div className="my-3 md:my-4">
            <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
            <Input
              id="password"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="mt-1 text-sm md:text-base"
            />
          </div>
          
          <div className="my-4 md:my-5">
            <Label className="text-sm md:text-base mb-2 block">Select Role</Label>
            <RadioGroup className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  id="student-role"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student-role" className="cursor-pointer text-sm md:text-base">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="recruiter-role"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter-role" className="cursor-pointer text-sm md:text-base">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="my-4 md:my-5">
            <Label htmlFor="profile-picture" className="text-sm md:text-base mb-2 block">Profile Picture</Label>
            <Input
              id="profile-picture"
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer text-xs md:text-sm"
            />
          </div>
          
          {loading ? (
            <Button className="w-full my-4 md:my-5 py-2 text-sm md:text-base" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 md:my-5 py-2 text-sm md:text-base">
              Signup
            </Button>
          )}
          
          <div className="text-center mt-4">
            <span className="text-xs md:text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;