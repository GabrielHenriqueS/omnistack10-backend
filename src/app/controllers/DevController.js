import axios from 'axios';

import Dev from '../schemas/Dev';
import parseStringAsArray from '../utils/parseStringAsArray'

class DevController{

  async store(req,res){
    const {github_username, techs, latitude, longitude} = req.body;

    let dev = await Dev.findOne({ github_username });

    if(!dev){

    const response = await axios.get(`https://api.github.com/users/${github_username}`);

    const {name = login, avatar_url, bio} = response.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    dev = await Dev.create({
      name,
      github_username,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });

  }


    return res.json(dev);
  }

  async index(req,res){
    const devs = await Dev.find();

    return res.json(devs);
  }


}

export default new DevController();