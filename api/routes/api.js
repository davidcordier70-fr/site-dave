const express = require('express')
//const api = require('./api')
const { categorysList, createCategory, competencesList, categoryDelete, createCompetence, createUser, authUser, currentUser, deleteUser, createMessage } = require('./../controllers/api.controller')

const router = express.Router()

router.get('/categorys', categorysList)

router.post('/categorys', createCategory)

router.get('/competences', competencesList)

router.post('/categorys', createCategory)

router.post('/competences', createCompetence)

router.delete('/categorys/:categoryId', categoryDelete)

router.post("/users", createUser);

router.get('/auth/current', currentUser)

router.post("/auth", authUser)

router.delete('/auth', deleteUser)

router.post('/messages', createMessage)


//router.use('/tweets', tweets)



module.exports = router