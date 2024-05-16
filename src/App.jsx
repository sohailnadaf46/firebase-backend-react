import Auth from "./components/Auth";
import { dataBase } from "./config/auth.config";
import "./App.css";
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [movieUi, setMovieUi] = useState({ title: "", releaseDate: "" });
  const [isMovieOscar, setIsMovieOscar] = useState(false);

  const moviesCollectionRef = collection(dataBase, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const querySnapshot = await getDocs(moviesCollectionRef);
        const moviesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMovieList(moviesData);
      } catch (error) {
        console.error(error);
      }
    };

    getMovieList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieUi((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMovieClick = async () => {
    try {
      const newMovie = {
        title: movieUi.title,
        releaseDate: movieUi.releaseDate,
        recievedAnOscar: isMovieOscar,
      };
      await addDoc(moviesCollectionRef, newMovie)
      console.log("Movie added successfully");

      setMovieList((prevMovie)=> [...prevMovie, newMovie]);

      setMovieUi({title:"", releaseDate:""});
      setIsMovieOscar(false)
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteMoviedoc = async (id) => {
    try {
      const movieDoc = doc(dataBase, "movies", id);
      await deleteDoc(movieDoc);
      console.log("Movie deleted successfully");

      //updating the movie list after the movie is deleted
      setMovieList(prevMovies => prevMovies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie document:", error);
    }
  };
  

  return (
    <>
      <Auth />

      <div className="movies">
        <input
          type="text"
          placeholder="Movie title"
          name="title"
          value={movieUi.title}
          onChange={handleInputChange}
        />

        <input
          type="number"
          placeholder="Release date"
          name="releaseDate"
          value={movieUi.releaseDate}
          onChange={handleInputChange}
        />

        <input
          type="checkbox"
          checked={isMovieOscar}
          onChange={(e) => setIsMovieOscar(e.target.checked)}
        />

        <button type="button" onClick={handleMovieClick}>
          Submit
        </button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.title} style={{color: isMovieOscar ? 'green' : "black"}}>
            <h1>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={()=>deleteMoviedoc(movie.id)}>deleteMovie</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
