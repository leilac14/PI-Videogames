// router.post("/", async (req, res, next) => {
//     try {
//         const { name, health, attack, defense, speed, height, weight, types, image} = req.body
//         const pokemonCreated = await Pokemon.create({
//             name, health, attack, defense, speed, height, weight, image
//         })

//         if (types) {
//             types.map(async (t) =>{
//                 await pokemonCreated.addType(t)
//             })
//         }

//         res.send(pokemonCreated)
//     } catch (error) {
//         next(error)
//     }

//     if(id.length === 36) {
//         const dbPokemon = await Pokemon.findByPk(id, {
//             include: [{
//                 model: Type
//             }]
//         })

//         const apiResult = await axios(https://pokeapi.co/api/v2/pokemon/${id})
//             let types = []
//             apiResult.data.types.map( t => {
//                 types.push(t.type.name)
//             })
//             const apiPokemon = {
//                 image: apiResult.data.sprites.other["official-artwork"].front_default,
//                 name: apiResult.data.name,
//                 order: apiResult.data.order,
//                 health: apiResult.data.stats[0].base_stat,
//                 attack: apiResult.data.stats[1].base_stat,
//                 defense: apiResult.data.stats[2].base_stat,
//                 speed: apiResult.data.stats[5].base_stat,
//                 height: apiResult.data.height,
//                 weight: apiResult.data.weight,
//                 types: types
//             }

// router.get("/", async (req, res, next) => {
//     try {
//         const dbResult = await Pokemon.findAll({
//             include: [{
//                 model: Type
//             }]
//         })

//         const dbPokemons = []

//         for (let i = 0; i < dbResult.length; i++) {
//             let types = []
//             dbResult[i].types.map(t => {
//                 types.push(t.name)
//             })
//             dbPokemons.push({
//                 id: dbResult[i].id,
//                 image: dbResult[i].image,
//                 name: dbResult[i].name,
//                 attack: dbResult[i].attack,
//                 types: types
//             })
//         }


//         const apiTotal = await axios("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40%22)

//         const apiTotalResult = apiTotal.data.results

//         const allApiPokemons = []

//         for (let i = 0; i < apiTotalResult.length; i++) {
//             let pokemon = await axios(apiTotalResult[i].url)
//             let types = []
//             pokemon.data.types.map(t => {
//                 types.push(t.type.name)
//             })
//             allApiPokemons.push({
//                 id: pokemon.data.id,
//                 image: pokemon.data.sprites.other["official-artwork"].front_default,
//                 name: pokemon.data.name,
//                 attack: pokemon.data.stats[1].base_stat,
//                 types: types
//             })
//         }

//         const allPokemons = [...dbPokemons, ...allApiPokemons]

//         const { name } = req.query
//         if (name) {

//             const searchPokemon = allPokemons.find((p) => {
//                 return p.name === name
//             })

//             if (searchPokemon) { 
//                 res.send([searchPokemon])
//             } else {
//                 res.send(A pokemon with the name ${name} was not found)
//             }

//         } else {
//             res.send(allPokemons)
//         }

//     } catch (error) {
//         next(error)
//     }
// })

//https://cdn.pixabay.com/photo/2022/06/28/19/01/pixel-7290384_960_720.png
//https://cdn.pixabay.com/photo/2022/06/23/16/58/pixel-art-7280241_960_720.png (purple)