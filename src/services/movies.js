const API_KEY = '5883c0bc'
//http://www.omdbapi.com/?apikey=5883c0bc&s=Avengers

export const searchMovies = async ({ search }) => {
    if(search === '') return null
    
    try{ 
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()
        console.log(search)
        console.log(json)
        const movies = json.Search

        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster 
        }))

    } catch (e){
        throw new Error ('Error searching movie')
    }
        /*if(search){
            return fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
            .then(res => res.json())
            .then(json => {
                setResponseMovies(json)
            })
        }*/
    /*else{
        return setResponseMovies(withoutResults)
    }*/
    
}