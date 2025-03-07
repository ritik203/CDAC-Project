import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { LoginUser } from "../services/apiUser";
import { useDispatch } from "react-redux";
import { onAuthenticate } from "../features/userSlice";
import toast from "react-hot-toast";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email : "",
        password: "",
    });

    async function onClickLogin() {
        try {
            console.log(user);

            const result = await LoginUser(user);
            
            dispatch(onAuthenticate(result.data));

            setUser({ email: "", password: "" });

            navigate("/");
        } catch (error) {
            toast.error("Wrong user name and password!");
            console.error("Login failed:", error);
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex justify-center items-center flex-col gap-4 border border-stone-300 py-10 px-8 rounded-xl">
                <div className="flex justify-center items-center flex-col">
                    <h1 className="font-extrabold text-3xl">Welcome Back</h1>
                    <p className="font-extralight">Please sign in to your account</p>
                </div>

                <div className="w-[300px] py-2 flex justify-center items-center gap-2 rounded-md border border-stone-300 cursor-pointer">
                    <FaGoogle />
                    <p>Sign in with Google</p>
                </div>

                <div className="border border-stone-400 h-[1px] w-[100%] bg-stone-400"></div>

                <div className="w-full flex justify-center items-start flex-col">
                    <p className="font-light">Email Address</p>
                    <input type="text" onChange={(e) => setUser({ ...user, email : e.target.value})}
                    className="w-full py-1 rounded-md px-4 border border-stone-300" />
                </div>

                <div className="w-full flex justify-center items-start flex-col">
                    <p className="font-light">Password</p>
                    <input type="text" onChange={(e) => setUser({ ...user, password : e.target.value})}
                    className="w-full py-1 rounded-md px-4 border border-stone-300" />
                </div>

                <button onClick={onClickLogin}  
                className="w-full border-none outline-none bg-blue-600 text-slate-100 py-2 rounded-md mt-1 cursor-pointer">Login</button>

                <div className="w-full flex justify-center items-center flex-col">
                    <p className="font-medium">Don't have an account ? <Link to="/signin" className="text-blue-500">sign up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
