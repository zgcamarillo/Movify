require('dotenv').config(); //hides key into a locked file only your computer can read
const express = require('express'); //express factory function
const app = express(); //turning on server machine

app.use(express.static('public')); //checking public file and sending it back
app.get('/api/test', (req, res) => {
    res.json({ message: "Server is working!" })
})

app.get('/api/search', async (req, res) => {
    console.log('Token starts with:', process.env.TMDB_TOKEN?.slice(0, 5))

    try {
        //get the search query from the url 
        const query = req.query.q //grabbing name user types
        console.log('search query:', query)

        //call tmdb api - tolks to tmdb from the server HIDES KEY 
        
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
            {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
                }
            }
        )

        const text = await response.text()
        console.log('Raw TMDB response:', text)

        const data = JSON.parse(text) 

        //send only the results array back to the browser 
        res.json(data.results) 
    } catch (err) { //haandling errors
        console.error('Server error',err)
        res.status(500).json({ error: 'TMDB request failed' })
    }
})


app.listen(8080, () => {
    console.log('Server running on port 8080')
})