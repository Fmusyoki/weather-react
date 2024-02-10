import React, { useState } from "react"
import axios from 'axios'
import hotBg from "./Assets/sunset.jpg"
import coldBg from "./Assets/cold.jpg"


function App() {

    const[data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [bg, setBg] = useState(hotBg)
    const [units, setUnits] = useState("metric")

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c278bc6fb6983211b0758bf3ee457e67`
   
    const searchLocation = (event) => {
        if(event.key === 'Enter'){
            axios.get(url).then((response) => {
                setData(response.data);
                console.log(response.data)
                
            }).catch((error) => {
                alert(error.response.data.message)
            })
            setLocation('')
            setUnits('')
            const threshold = units === "metric"? 20:60 ;
                if(data.temp <= threshold) setBg(coldBg);
                else setBg(hotBg);

            
        }
    }



    return(
        <div className="app" style={{ backgroundImage: `url(${bg})`}}>
            <div className="search">
            <input
                value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder='Enter Location'
                type="text" />
            </div>
            <div className="container">
            <div className="top">
                <div className="location">
                <p>{data.name}</p>
                </div>
                <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
                </div>
                <div className="description">
                {data.weather ? <p>{data.weather[0].description}</p> : null}
                </div>
            </div>
    
            {data.name !== undefined &&
                <div className="bottom">
                    <div className="feels">
                        {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
                        <p>Feels Like</p>
                    </div>
                    <div className="humidity">
                        {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                        <p>Wind Speed</p>
                    </div>
                </div>

            }
        </div>
      </div>
    );
}

export default App;