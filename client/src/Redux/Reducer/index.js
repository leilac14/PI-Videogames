const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: [],
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload 
            }

        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
            


        case 'FILTER_BY_GENRES':
            let filtrados = [];
            const allVideogames = state.allVideogames;
            let filteredGenre = action.payload === 'All'? allVideogames : allVideogames.map(v => {for (let i = 0; i < v.genres.length; i++) {
                if (v.genres[i].name === action.payload) {
                    filtrados.push(v)
                }  
            }});
            if (filtrados.length > 0) {
                filteredGenre = filtrados
            }else{
                filteredGenre = allVideogames
            }
            return {
                ...state,
                videogames: filteredGenre
            }
        
        
        case 'ORDER_BY_NAME':
            let orderAsc = state.videogames.slice().sort((a, b) => {
                let videogameA = a.name.toLowerCase();
                let videogameB = b.name.toLowerCase();

                if(videogameA > videogameB) return 1;

                if(videogameB > videogameA) return -1;

                return 0;
            })

            const allVideogames3 = state.allVideogames;
            const orderName = action.payload === 'asc' ? orderAsc : orderAsc.reverse();

            return {
                ...state,
                videogames: action.payload === '' ? allVideogames3 : orderName
            }
    
        case 'ORDER_BY_RATING':
            let orderRatingAsc = state.videogames.slice().sort((a, b) => {

                if(Number(a.rating) > Number(b.rating)) return 1;

                if(Number(b.rating) > Number(a.rating)) return -1;

                return 0;
            })

            return {
                ...state,
                videogames: action.payload === 'asc' ? orderRatingAsc : orderRatingAsc.reverse()
            }

        case 'FILTER_CREATED':
            const allVideogames2 = state.allVideogames;
            let filteredCreation = action.payload === 'Created' ? allVideogames2.filter(el => el.id.length === 36) : allVideogames2.filter(el => el.id.length !== 36);
            if(filteredCreation.length === 0){
                filteredCreation = "not found"
            }
            
            return {
                ...state,
                videogames: action.payload === 'All' ? allVideogames2 : filteredCreation
            }
        
        case 'GET_NAME_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload
            }

        case 'GET_ID_VIDEOGAME':
            return {
                ...state,
                detail: action.payload
            }
        
        case 'CLEAN_HOME':
            return {
                ...state,
                videogames: []
            }

        default:
            return state;
    }

}

export default rootReducer;