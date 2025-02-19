import { useDispatch } from "react-redux";
import Button from "./Button";
import { useState } from "react";
import { fetchCityData } from "../services/apiCity";
import { saveCity } from "../features/citySlice";

const indianCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Surat",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Bhopal"
  ];
function LocationModal({ handleLocationModal }) {

    const [city, setCity] = useState("");
    const dispatch = useDispatch();

    async function onSubmitCity() {
        const result = await fetchCityData(city);
        dispatch(saveCity(result.data));
        handleLocationModal();
    }

    async function onSelectCity(city) {
        const result = await fetchCityData(city);
        dispatch(saveCity(result.data));
        handleLocationModal();
    }

    return (
        <>
            <div onClick={handleLocationModal} className="fixed inset-0 bg-slate-700 opacity-70 backdrop-blur-sm z-10"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 border rounded-lg 
                        w-[628px] z-10 p-8 flex items-center justify-start flex-col">
                <div className="w-full flex justify-between items-center gap-4 mt-2">
                    <input type="text" placeholder="Enter your city" onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-slate-500 rounded-sm py-1 px-4 bg-slate-50" />
                    <Button text="submit" type="primary" onClick={onSubmitCity} />
                </div>

                <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
                    {
                        indianCities.map((city) => <Button key={city} text={city} type="secondary" onClick={() => onSelectCity(city)} />)
                    }
                </div>
            </div>   
        </>
    )
}

export default LocationModal;
