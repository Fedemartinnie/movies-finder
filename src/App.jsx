import './App.css'
import { useMovies } from './hooks/useMovies.jsx'
import { Movies } from './components/Movies.jsx'
import { useState,useEffect, useRef } from 'react'

function useSearch(){
  const[search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  
  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      console.log("isFirstInput? ",isFirstInput)
      return
    }
    if(search === ''){
      setError('El campo está vacío... Completa el campo')
      return
    }
    if (search.match(/^\d+$/)){
      setError('No se puede buscar una pelicula con un numero')
      return
    }
    if(search.length<3){
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
  
    setError(null)
  }, [search])

  return { search, updateSearch, error }
}


function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const handleSubmit = (event) => { //el event recupera all data from de form
    event.preventDefault() // evita q el formulario se envie y recargue la pagina    
    getMovies()
  }  
  
  const handleChange = (event) => {
      updateSearch(event.target.value)
  }
  
  const handleSort = () => {
    setSort(!sort)
  }


  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input  
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='query'
            placeholder='Avengers, Star Wars, Matrix'
          />
          <input type='checkbox' onChange={handleSort} checked={sort}/>
          <button type='submit'>Buscar</button>      
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
      
      {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        } 
      
      </main>
    </div>
  )
}

export default App
