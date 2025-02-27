const express =require('express');
const updateprofileimage = require('../controllers/Profile/updateprofileimage');


const routeforupdateprofileimage = express.Router()


routeforupdateprofileimage.post('/',updateprofileimage)

module.exports= routeforupdateprofileimage;