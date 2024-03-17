import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card} from "react-bootstrap";
import "./WeatherPage.css";
import { FaWind } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlinePushPin } from "react-icons/md";

function WeatherPage() {
  const [city, setCity] = useState("");
  const [searchcity, setSearchCity] = useState("");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [enterPressed, setEnterPressed] = useState(false);
  const [savedCity,setsavedcity] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3531a36cae131ef86c0fd8127473f1dd`;

      axios.get(url).then((response) => {
        const city = response.data.city.name;
        setCity(city);
      });
    });
  }, []);

  useEffect(() => {
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3531a36cae131ef86c0fd8127473f1dd`
        )
        .then((response) => {
          console.log(response.data.city.name);

          const filteredData = response.data.list.filter((item, index) => {
            return index % 8 === 0;
          });
          setData(filteredData);
        });
    }
  }, [city]);

  const handleChange = (event) => {
    if (event.target.value === "") {
      setSearchCity("");
      setSearchData([]);
    } else {
      setSearchCity(event.target.value);
    }
  };

  const search = (event) => {
    if (event.key === "Enter") {
      setEnterPressed(true);
      if (!searchcity) {
        alert("Enter a city name");
        return;
      }

      setsavedcity(searchcity)
     

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchcity}&appid=3531a36cae131ef86c0fd8127473f1dd`
        )
        .then((disp) => {
          const filteredData = disp.data.list.filter((item, index) => {
            return index % 8 === 0;
          });
          setSearchData(filteredData);
          console.log(filteredData);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            alert("Wrong city name");
          } else {
            console.log(error);
          }
        });
    }
  };
  
  console.log('savedcity',savedCity)

  const save = () => {
    if (!savedCity) {
       alert("No city selected to save.");
       return;
    }

    axios.post("http://localhost:5000/saved", { cityName: savedCity,userId:userId }).then((response) => {
         console.log(response.data);
         alert("City saved successfully.");
       })
       .catch((error) => {
         console.error(error);
         alert("Failed to save city.");
       });
};


   

  return (
    <div className="weatherParent">
      <div className="inputField">
        <input
          type="text"
          placeholder="search "
          onChange={handleChange}
          onKeyPress={search}
          className="text-center"
        />
      </div>
      <div className="cityName">
        {searchcity ? <h2>{searchcity}</h2> : <h2>{city}</h2>}
      </div>

      <div className="weather">
        {searchcity
          ? searchData.map((item, index) => (
              <div key={index}>
                <Card className="weatherCard">
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

                  <div style={{ display: "flex", justifyContent: "center" }}>
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

                  <p className="text-center">{item.weather[0].description}</p>

                  <p className="text-center">
                    {" "}
                    {item.wind.speed}m/s
                    <FaWind />
                  </p>
                </Card>
              </div>
            ))
          : data.map((item, index) => (
              <div key={index}>
                <Card className="weatherCard">
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

                  <div style={{ display: "flex", justifyContent: "center" }}>
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

                  <p className="text-center">{item.weather[0].description}</p>

                  <p className="text-center">
                    {" "}
                    {item.wind.speed}m/s
                    <FaWind />
                  </p>
                </Card>
              </div>
            ))}

        <div>
          <Link to={`/saved/${userId}`}>
            <Button className="savedCity">
              <FaBookmark />
            </Button>
          </Link>
        </div>
      </div>
      {searchcity && enterPressed && (
        <div className="text-center">
          <Button onClick={save}>
            <MdOutlinePushPin />
          </Button>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
