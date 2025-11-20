const express = require('express')
//const api = require('./api')
const { categorysList, createCategory, competencesList, categoryDelete, createCompetence, createUser, authUser, currentUser, deleteUser, createMessage, userUpdate, createExperience, createFormation } = require('./../controllers/api.controller')

const router = express.Router()

router.get('/categorys', categorysList)

router.post('/categorys', createCategory)

router.get('/competences', competencesList)

router.post('/categorys', createCategory)

router.post('/competences', createCompetence)

router.delete('/categorys/:categoryId', categoryDelete)

router.patch('/users/:id', userUpdate)

router.post("/users", createUser);

router.get('/auth/current', currentUser)

router.post("/auth", authUser)

router.delete('/auth', deleteUser)

router.post('/messages', createMessage)

router.post('/parcours/experiences', createExperience)

router.post('/parcours/formations', createFormation)




//router.use('/tweets', tweets)



module.exports = router