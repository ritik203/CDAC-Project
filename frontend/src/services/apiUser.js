import axios from "axios";
import toast from "react-hot-toast";

export async function LoginUser(user) {
    try{
        const response = await axios.post("http://localhost:4545/user/login", user);
        if(!response.ok) {
            throw new Error("User didn't logged in");
        }
        const result = await response.data;
        return result;
    }
    catch(error) {
        toast.error(error)
    }
}

export async function SigninUser(user) {
    try{
        const response = await axios.post("http://localhost:4545/user/register", user);
        if(!response.ok) {
            throw new Error("User didn't signedin in");
        }
        const result = await response.json();
        console.log(result);
        return result;
    }
    catch(error) {
        toast.error(error)
    }
}

