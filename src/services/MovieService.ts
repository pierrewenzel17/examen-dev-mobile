import Genre from "../models/Genre";
import Movie from "../models/Movie";
import MovieDetails from "../models/MovieDetails";

export async function getMovies(searchTerm: string, offset = 0): Promise<Array<Movie>> {
  try {
    let response;
    const res: Array<Movie> = [];
    if (searchTerm === "Batman") {
      switch (offset) {
        case 0:
          response = require('../helpers/SearchMovies-Batman_p1.json');
          break;
        case 20:
          response = require('../helpers/SearchMovies-Batman_p2.json');
          break;
        default:
          response = require('../helpers/SearchMovies-Batman_p1.json');
      }
    } else {
      switch (offset) {
        case 0:
          response = require('../helpers/PopularMovies_p1.json');
          break;
        case 20:
          response = require('../helpers/PopularMovies_p2.json');
          break;
        default:
          response = require('../helpers/PopularMovies_p1.json');
      }
    }
    response.results.map((value: any) => {
      res.push(
        {
          id: value.id,
          title: value.title,
          release_date: value.release_date,
          vote_average: value.vote_average,
          overview: value.overview
        }
      )
    });
    return res;
  } catch (error: any) {
    console.log(`Error with function getRestaurants ${error.message}`);
    throw error;
  }
};

export async function getMovie(id: number): Promise<MovieDetails | void> {
  if (id === 618353) {
    let response1 = require('../helpers/MovieCredits.json');
    let response2 = require('../helpers/MovieDetails.json');
    const genres: Array<Genre> = []
    const cast: Array<string> = []
    response1.cast.map((value : any) => {cast.push(value.name)})
    response2.genres.map((value: any) => { genres.push({ id: value.id, name: value.name }) })
    const res: MovieDetails = {
      title: response2.title,
      release_date: response2.release_date,
      runtime: response2.runtime,
      overview: response2.overview,
      genres: genres,
      cast: cast
    }
    return res;
  }
}