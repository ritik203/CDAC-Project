import { Link, useNavigate } from "react-router"
import Button from "./Button"
import Logo from "./Logo"
import Searchbar from "./Searchbar"
import LocationModal from "./LocationModal"
import { useState } from "react"
import { useSelector } from "react-redux"

function Navbar() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const city = useSelector(state => state.city);
    const [isOpen, setIsOpen] = useState(false);

    function handleLocationModal() {
        setIsOpen((isOpen) => !isOpen);
    }

    function onLogin() {
        navigate("login");
    }

    function onSignin() {
        navigate("signin");
    }

    return (
        <>
            {
                isOpen &&
                <LocationModal handleLocationModal={handleLocationModal} />
            }
            <div className="w-full flex items-center justify-center flex-col bg-slate-50">
                <div className="w-4/5 flex items-center justify-between py-4">
                    <Logo />
                    <Searchbar />

                    <div className="flex gap-4">
                        {
                            city.name ? 
                            <p onClick={handleLocationModal} className="font-bold pt-0.5 pr-4 text-stone-500 cursor-pointer">{city.name}</p> 
                            : 
                            <Button text="city" type="secondary" onClick={handleLocationModal} />
                        }
                        {
                            user.name ?
                            <p className="font-bold pt-0.5 pr-4 text-stone-500 cursor-pointer">{user.name}</p>
                            :
                            <>
                                <Button onClick={onLogin} text="login" type="primary" />
                                <Button onClick={onSignin} text="sign in" type="secondary"/>
                            </>
                        }
                        
                    </div>
                </div>

                <div className="w-full flex items-center justify-between bg-stone-200 py-2 px-[150px]">
                    <div className="flex gap-4 text-sm">
                        <Link to="movies">Movies</Link>
                        <a href="#">Stream</a>
                        <a href="#">Events</a>
                        <a href="#">Plays</a>
                        <a href="#">Sports</a>
                        <a href="#">Activities</a>
                    </div>

                    <div className="flex gap-4 text-sm">
                        <Link to="home">Home</Link>
                        <Link to="services">Services</Link>
                        <Link to="about">About us</Link>
                        <Link to="contact">Contact us</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
