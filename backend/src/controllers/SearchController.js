const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(requeste, response){
        //Buscar todos os dev em um raio de 10km
        //Filtrar tecnologia.

        const {latitude, longitude, techs} = requeste.query;

        const techsArray = parseStringAsArray(techs);

        console.log(techsArray);

        const devs = await Dev.find({
            techs:{
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000
                },
            },
        });

        return response.json({ devs });
        

    }
}