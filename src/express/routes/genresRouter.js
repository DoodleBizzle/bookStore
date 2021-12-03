const express = require('express');
const genresRouter = express.Router();

genresRouter.get('/', async (req, res) => {
    try {
        const allGenres = await getAllGenres();
        res.send(allGenres);
    } catch (error) {
        console.error(error);
        next({name: 'Genre Error', 
        message: "Can't get genre"})   
}
});

genresRouter.get('/:genreID/products', async (req, res) => {
    try {
        const { genreID } = req.params
        const genresID = await getAllProductsByGenre(genreID);
        res.send(genresID);
    } catch (error) {
        console.error(error);
        next({name: 'Genre ID Error', 
        message: "Can't get genre ID"})   
}
});


module.exports = genresRouter;