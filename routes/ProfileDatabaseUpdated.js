const express = require('express');
const ProfileDatabaseUpdated = require('../controllers/Profile/ProfileDatabaseUpdated');

const routeforprofiledatabaseupdated =express.Router()

routeforprofiledatabaseupdated.post('/',ProfileDatabaseUpdated)


module.exports = routeforprofiledatabaseupdated;