const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async delete(requeste, response){

        const { github_username } = requeste.query;

        const dev = await Dev.deleteOne({github_username});

        //console.log(dev);

        return response.json(dev);
    },

    async update(requeste, response){
        
        const { github_username, newName } = requeste.query;

        console.log(github_username)
        
        const devs = await Dev.findOne({github_username});
        
        const dev = await Dev.update({github_username},{
            github_username,
            name: newName,
            avatar_url: devs.avatar_url,
            bio: devs.bio,
            techs: devs.techsArray,
            location: devs.location,
        })

        return response.json(dev);
        console.log('processo finalizado');
    },

    async store (request, response)  {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });
    
    if(!dev){
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const {name = login, avatar_url, bio} = (apiResponse.data);
    
        const techsArray = parseStringAsArray(techs); //techs.split(',').map(tech => tech.trim());
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };
        
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        })
    }   

    return response.json(dev);
 }
};