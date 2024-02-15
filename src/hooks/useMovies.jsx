//import withResults from '../mocks/with-results.json'
//import withoutResults from '../mocks/no-results.json'
import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading , setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)
    

  const getMovies = useCallback (async({ search }) => {
    if(search === previousSearch.current) return

    try{
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e){
      setError(e.message)
    } finally {
      setLoading(false)
    }
  
  }, []) 


  // no se porque no funciona el parametro dentro del return async({search})
  /*const getMovies = useMemo(() => {
    return async ( ) => {
      if( search === previousSearch.current) return


      try{
        setLoading(true)
        setError(null)
        const newMovies = await searchMovies({ search })
        //previousSearch.current = search
        setMovies(newMovies)
      } catch (e){
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
  }, [search]) */

  const sortedMovies = useMemo(() => {
    console.log('memoSortedMovies')
    
    if(!movies) return
    
    return sort 
      ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies]) //si cambia el sort, peliculas... vuelve a calcular
  
  return { movies: sortedMovies, getMovies, loading }
} 