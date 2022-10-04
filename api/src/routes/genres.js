const { Router } = require('express');
const router = Router()
const { Genre } = require ("../db")
const axios = require("axios");
const { API_KEY } = process.env;

router.get("/", async (req, res, next) => {
    let genreAPI = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    let genreCheck = await Genre.findAll()
    let allGenres
    try {
        if(!genreCheck.length) {
            allGenres = await Genre.bulkCreate(genreAPI.data.results)
        } else {
            allGenres = genreCheck
        }
        return res.json(allGenres)
    } catch (error) {
        next(error)
    };
});

module.exports = router