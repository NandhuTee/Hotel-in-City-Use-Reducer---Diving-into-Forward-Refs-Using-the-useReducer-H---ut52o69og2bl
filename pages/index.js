import React, { useReducer, useEffect, useState } from "react";

const initialState = { hotels: [], filteredHotels: [] };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {...state, hotels: action.payload}
    case "FILTER":
      return {...state, filteredHotels: state.hotels.filter((hotel)=>{
        console.log(hotel.city);
        console.log(action.payload)
        return hotel.city.toLowerCase().includes(action.payload.toLowerCase())
      })}
    default:
      return state
   
  }
}
export default function Home() {
  const [city, setCity] = useState('');
   const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    fetch('https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels')
      .then((response)=>{
        return response.json()
      })
      .then((data)=>{
        console.log(data)
        dispatch({ type: "FETCH_SUCCESS", payload: data});
      })
  },[])

  useEffect(() => {
    console.log('called')
    dispatch({ type: "FILTER", payload: city});
  }, [city]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter city name"
        onChange={(e)=>setCity(e.target.value)}
        value={city}
      />
      {state.filteredHotels.map((hotel)=>{
        return (
          <p key={`${hotel.city}-${hotel.hotel_name}`}>{hotel.hotel_name}</p>
        )
      })}
        
     
    </div>
  );
  }
  
