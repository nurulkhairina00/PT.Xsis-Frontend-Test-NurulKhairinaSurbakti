import React, { useEffect, useState } from "react";
import ComponentNavbar from "./components/componentNavbar";
import ComponentCarousel from "./components/componentCarousel";
import ComponentNowPlaying from "./components/componentNowPlaying";
import ComponentPopuler from "./components/componentPopuler";
import axios from "axios";
import { API_URL } from "./utils/constants";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import SearchComponent from "./components/componentSearch";

function App() {
  const [dataPopuler, setDataPopuler] = useState([]);
  const [dataNow, setDataNow] = useState([]);
  const [dataUpcoming, setDataUpcoming] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [input, setInput] = useState({ title: "" });

  // get data movie upcoming
  const movieUpcoming = () => {
    axios
      .get(`${API_URL}/api/movies/upcoming`)
      .then((res) => {
        setDataUpcoming(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // get data movie now playing
  const movieNowPlaying = () => {
    axios
      .get(`${API_URL}/api/movies/now_playing`)
      .then((res) => {
        setDataNow(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // get data movie popular
  const moviePopuler = () => {
    axios
      .get(`${API_URL}/api/movies/popular`)
      .then((res) => {
        setDataPopuler(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // search movie
  const searchMovie = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/search/movie?query=${input.title}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWQwMDg5MDc1YjdhMmY3OTBmYmQ2MWRlZWM4NzRmMCIsInN1YiI6IjY1NzBhYTg5OWFjNTM1MDFmNDFkZTBkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XSP_BPAmzxnbYyGgq1B7l_FhKZBCXOT_i8MPk6D_O3Y",
      },
    };
    axios
      .request(options)
      .then((res) => {
        let filterData = res.data?.results.filter(
          (item) => item.poster_path !== null
        );
        setDataSearch(filterData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    movieUpcoming();
    movieNowPlaying();
    moviePopuler();
  }, []);

  useEffect(() => {
    searchMovie();
  }, [input]);

  return (
    <>
      <div className="App">
        <ComponentNavbar
          onSearchInputChange={(value) => setInput({ title: value })}
        />
        {dataSearch.length === 0 ? (
          <>
            <ComponentCarousel data={dataUpcoming} />
            <ComponentNowPlaying data={dataNow} />
            <ComponentPopuler data={dataPopuler} text="Populer" />
          </>
        ) : (
          <>
            <ComponentPopuler data={dataSearch} text="Search Result" />
          </>
        )}
      </div>
    </>
  );
}

export default App;
