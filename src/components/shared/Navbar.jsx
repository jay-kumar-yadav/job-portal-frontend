import React, { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <motion.div
      className="bg-white border-b"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-3 md:py-4">
        <motion.div
          className="text-xl font-bold"
         initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: 0.3 ,
            ease: "anticipate",
            duration: 2
          }}
        >
          Campus Recruitment <span className="text-[#F83002]">Portal</span>
        </motion.div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Navigation Links */}
        <motion.div
          className="hidden md:flex items-center gap-10"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: 0.3 ,
            ease: "anticipate",
            duration: 2
          }}
        >
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <Link to="/admin/companies">Companies</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <Link to="/admin/jobs">Jobs</Link>
                </motion.li>
              </>
            ) : (
              <>
                <motion.li whileHover={{ scale: 1.5,color: "#6A38C2" }}>
                  <Link to="/">Home</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.5,color: "#6A38C2" }}>
                  <Link to="/jobs">Jobs</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.5,color: "#6A38C2" }}>
                  <Link to="/browse">Browse</Link>
                </motion.li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button variant="outline">Login</Button>
                </motion.div>
              </Link>
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                    Signup
                  </Button>
                </motion.div>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="profile"
                    />
                  </Avatar>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="avatar"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-4 text-gray-600">
                    {user.role === "student" && (
                      <div className="flex items-center gap-2">
                        <User2 />
                        <Link to="/profile">
                          <Button variant="link">View Profile</Button>
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </PopoverContent>
            </Popover>
          )}
        </motion.div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden px-4 pb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-3 font-medium">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              )}
            </ul>
            {!user ? (
              <div className="mt-4 flex flex-col gap-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-2 text-gray-700">
                {user.role === "student" && (
                  <Link to="/profile">
                    <Button
                      variant="link"
                      className="w-full flex items-center justify-start gap-2"
                    >
                      <User2 className="w-4 h-4" />
                      View Profile
                    </Button>
                  </Link>
                )}
                <Button
                  variant="link"
                  className="w-full flex items-center justify-start gap-2"
                  onClick={logoutHandler}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
