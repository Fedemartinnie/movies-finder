import './App.css'
import { useEffect, useState } from 'react'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.jsx'



function App() {
  const { movies } = useMovies()
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (event) => { //el event recupera all data from de form
    event.preventDefault() // evita q el formulario se envie y recargue la pagina    
    console.log({ query })

  }  
  
  const handleChange = (event) => {
      const newQuery = event.target.value
      if(newQuery.startsWith(' ')) return
      setQuery(event.target.value)
  }
  

  useEffect(() => {
    if(query === ''){
      setError('El campo está vacío... Completa el campo')
      return
    }
    if (query.match(/^\d+$/)){
      setError('No se puiede buscar una pelicula con un numero')
      return
    }
    if(query.length<3){
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [query]) //query = dependencia

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} name='query' 
            placeholder='Avengers, Star Wars, Matrix'/>
          <button type='submit'>Buscar</button>      
        </form>
        {error && <p style={{ color: 'red' }}/>}
      </header>

      <main>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
