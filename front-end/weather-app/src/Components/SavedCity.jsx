import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaWind } from "react-icons/fa";
import './Saved.css'
import { useParams } from "react-router-dom";

function SavedCity() {
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const {userId} = useParams()

  useEffect(() => {
    axios.get(`http://localhost:5000/getSaved/${userId}`).then((response) => {
      const cityNames = response.data.map((item) => item.cityName);
      setCities(cityNames);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      for (let cityName of cities) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3531a36cae131ef86c0fd8127473f1dd`
          );
          const filteredData = response.data.list.filter(
            (item, index) => index % 8 === 0
          );
          newData.push({ cityName, data: filteredData });
        } catch (error) {
          console.error(error);
        }
      }
      setData(newData);
    };

    if (cities.length > 0) {
      fetchData();
    }
  }, [cities]);

  return (
    <div className={cities.length === 0 ? "savedParent fullHeight" : "savedParent"}>
    {cities.length === 0 ? (
      <h2 className="text-center">No city saved yet</h2>
    ) : (
      data.map((cityData) => (
        <div key={cityData.cityName}>
          <h1 className="text-center cityName">{cityData.cityName}</h1>
          <div className="savedWeather">
            {cityData.data.map((item, index) => (
              <Card className="savedchild" key={index}>
                <Card.Body>
                  <h1 className="text-center">
                    {item.main && Math.round(item.main.temp - 273.15)}°C
                  </h1>
                  <p className="text-center">
                    {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>

                  <p className="text-center">
                    {new Date(item.dt * 1000).toLocaleDateString()}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                      alt="Weather icon"
                      style={{
                        height: "50px",
                        width: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <p className="text-center">
                    {item.weather[0].description}
                  </p>

                  <p className="text-center">
                    {item.wind.speed}m/s
                    <FaWind />
                  </p>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      ))
    )}
  </div>
  );
}

export default SavedCity;
