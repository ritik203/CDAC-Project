import { createContext, useContext, useReducer } from "react";

const cityContext = createContext();

initialState = {
    id : null,
    name: "",
    district: "",
    _state: "",
    pincode: null
};


function reducer(state, action) {
    switch(action.type) {
        case "city/save" :
            return {
                ...state,
                id : action.payload.city_id,
                name: action.payload.name,
                district: action.payload.district,
                _state: action.payload.state,
                pincode: action.payload.pincode
            };

        default : 
            return state;
    }
}

function CityProvider(props) {
    const [{ id, name, district, _state, pincode }, dispatch] = useReducer(reducer ,initialState);
    return (
        <cityContext.Provider value={{id, name, district, _state, pincode, dispatch}}>
            { props.children }
        </cityContext.Provider>
    );
}

function useCity() {
    const context = useContext(cityContext);
    return context;
}

export { CityProvider, useCity };