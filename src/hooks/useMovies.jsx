import responseMovies from '../mocks/with-results.json'

export function useMovies() {
    const movies = responseMovies.Search //*get all movies from mock.json
  
    const mappedMovies = movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  
    return { movies: mappedMovies }
  }