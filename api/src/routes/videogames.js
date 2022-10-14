const { Router } = require('express');
const { Op } = require ("sequelize")
const { Videogame } = require ("../db")
const { Genre } = require ("../db")
const axios = require("axios");
const { API_KEY } = process.env;

const router = Router();

router.get("/", async (req, res, next) => {
    let videogamesAPI =  await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)
    let name = req.query.name;
    let videogame;

    if(name) {
        try {
            let videogameDB = await Videogame.findAll({
                include: Genre,
                where: {
                    name: {
                        [Op.iLike]: "%" + name + "%"
                    }
                },
            })
            let videogameAPI = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
            if (videogameDB.length) {
                videogame = videogameDB.concat(videogameAPI.data.results)
            } else {
                videogame = videogameAPI.data.results
            }
            if(videogame.length === 0){
                return res.send("not found")
            }else{
                return res.status(200).json(videogame)
            }
        } catch (error) {
            next(error)
        }
    } else {
        try {
            let localDb =  await Videogame.findAll({include: Genre});
            let subsequent = videogamesAPI.data.next;
            let subsequentReq = await axios(subsequent);
            let subsequentReq2 =  await axios(subsequentReq.data.next);
            let subsequentReq3 =  await axios(subsequentReq2.data.next);
            let subsequentReq4 =  await axios(subsequentReq3.data.next);
            let subsequentReq5 =  await axios(subsequentReq4.data.next);
            videogame = [...localDb.concat(videogamesAPI.data.results).concat(subsequentReq.data.results).concat(subsequentReq2.data.results).concat(subsequentReq3.data.results).concat(subsequentReq4.data.results).concat(subsequentReq5.data.results)];
            return res.status(200).json(videogame)
        } catch (error) {
            next(error);
        };
        let videogames = await Videogame.findAll({include: Genre})
        return res.json(videogames)
    };
});

router.get("/:id", async (req, res, next) => {
    try {
    let id = req.params.id
    let game
    console.log(id)
        if(id.length === 36){
            game = await Videogame.findByPk(id, {
                include: Genre
            })
        }else{
            let gameSearch = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            //mapeo
            let platforms = [];
            gameSearch.data.platforms.map(p => {
                platforms.push(p.platform.name)
            })
            let genres = [];
            gameSearch.data.genres.map(g => {
                genres.push(g.name)
            })
            game = {
                    name: gameSearch.data.name,
                    id: gameSearch.data.id,
                    description: gameSearch.data.description,
                    released: gameSearch.data.released,
                    background_image: gameSearch.data.background_image,
                    rating: gameSearch.data.rating,
                    platforms: platforms,
                    genres: genres
                }         
        }
        return res.status(200).json(game)
    } catch (error) {
        next(error)
    };
})

router.post("/", async (req, res, next) => {
    let {name, released, rating, genres, description, platforms, background_image} = req.body
    let genresFind
    try {
        let newGame = await Videogame.create({
            name,
            released,
            platforms: [platforms],
            description,
            rating,
            background_image,
        })
        if(genres){
            genres.map(async g => {
                await newGame.addGenre(g)
            })
        }
        res.status(201).json(newGame)
    } catch (error) {
        next(error)
    };
});

module.exports = router