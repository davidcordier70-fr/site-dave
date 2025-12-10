const { getCategorys,  createCategory, getCompetences, getExperiences, getFormations, createCompetence, deleteCategory, createUser, authUtilisateur, getCurrentUser, createMessage, main, updateUser, createExperience, createFormation, updatePassword, messageContact, getRealisations, deleteCptUser } = require('../queries/api.queries')
const jsonwebtoken = require('jsonwebtoken');
const { key, keyPub } =  require('./../keys/index')
const bcrypt = require('bcrypt');


exports.categorysList = async (req, res, next) => {
    try {
        console.log('get')
        const categorys = await getCategorys()
        res.set('Access-Control-Allow-Origin', '*')
        res.json( categorys)
    } catch(e) {
        next(e)
    }
}

exports.experiencesList = async (req, res, next) => {
    try {
        console.log('get')
        const experiences = await getExperiences()
        res.set('Access-Control-Allow-Origin', '*')
        res.json( experiences)
    } catch(e) {
        next(e)
    }
}

exports.formationsList = async (req, res, next) => {
    try {
        console.log('get')
        const formations = await getFormations()
        res.set('Access-Control-Allow-Origin', '*')
        res.json( formations)
    } catch(e) {
        next(e)
    }
}


exports.createCategory = async (req, res) => {
    try {
        console.log(req.body)
        const category = await createCategory(req.body)
        res.status(200).json(req.body)
    } catch(e) {
        const errors = Object.keys(e.errors).map((key) => e.errors[key].message)
        console.log(errors)
        res.status(400).render("tweets/tweet-form", { errors})
    }
}

exports.categoryDelete = async (req, res) => {
    try {
        console.log('delete')
        const categoryId =req.params.categoryId
        console.log(categoryId)
        await deleteCategory(categoryId)
        res.status(200).json('categorie supprimée')
        //const categorys = await getCategorys()
        //res.render("tweets/tweet-list", { tweets})
    } catch(e) {
        const errors = Object.keys(e.errors).map((key) => e.errors[key].message)
        console.log(errors)
        res.status(400).render("tweets/tweet-form", { errors})
    }
}

exports.competencesList = async (req, res, next) => {
    try {
        console.log('getcomp')
        const competences = await getCompetences()
        res.set('Access-Control-Allow-Origin', '*')
        res.json( competences)
    } catch(e) {
        next(e)
    }
}

exports.realisationsList = async (req, res, next) => {
    try {
        console.log('getcomp')
        const realisations = await getRealisations()
        res.set('Access-Control-Allow-Origin', '*')
        res.json( realisations)
    } catch(e) {
        next(e)
    }
}

exports.createCompetence = async (req, res) => {
    try {
        const competence = await createCompetence(req.body)
        res.status(200).json(req.body)
    } catch(e) {
        const errors = Object.keys(e.errors).map((key) => e.errors[key].message)
        console.log(errors)
        res.status(400).render("tweets/tweet-form", { errors})
    }
}

exports.createUser = async (req, res) => {
    try {
        const newUser = await createUser(req.body)
        const { email } = req.body
        console.log(email)
        if (email !== undefined) {
            data = await main(email)
        }
        res.json(newUser)
    } catch(e) {
        console.log(e)
        if (e.code === 11000) {
            return res.status(400).json("adresse email déjà utilisée");
         }
        return res.status(400).json("oops une erreur est survenue");
    }
}

exports.userUpdate = async (req, res) => {
    const userId =req.params.id
    try {
        console.log(userId)
        //const tweet = await getTweet(tweetId)
        console.log("body : "+req.body)
        const newUser = await updateUser(userId, req.body) 
        res.status(200).json(req.body)
    } catch(e) {
        const errors = Object.keys(e.errors).map((key) => e.errors[key].message)
        console.log(errors)
    }
}

exports.passwordUpdate = async (req, res) => {
    const userId =req.params.id
    try {
        
        //const tweet = await getTweet(tweetId)
        const newUser = await updatePassword(userId, req.body) 
        res.status(200).json(req.body)
    } catch(e) {
        //const errors = Object.keys(e.errors).map((key) => e.errors[key].message)
        console.log(e)
    }
}

exports.currentUser = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub)
      console.log(decodedToken)
      const currentUser = await getCurrentUser(decodedToken.sub)
      if (currentUser) {
        return res.json(currentUser);
      } else {
        return res.json(null);
      }
    } catch (e) {
      return res.json(null);
    }
  } else {
    return res.json(null);
  }
};

exports.createMessage = async (req, res) => {
  const { email, nom, prenom, noment, titre, message } = req.body
  console.log(req.body)
  if (email !== undefined) {
       try {
          console.log(email, nom, prenom, noment, titre, message)
          data = await messageContact(email, nom, prenom, noment, titre, message)
       } catch (e) {
          console.log(e)
       }   
  }
  const messageSoumis = await createMessage(req.body)
  
  res.json(messageSoumis)
};

exports.createExperience = async (req, res) => {
  const experience = await createExperience(req.body)
  
  res.json(experience)
};

exports.createFormation = async (req, res) => {
  const formation = await createFormation(req.body)
  
  res.json(formation)
};

exports.deleteUser = (req, res) => {
  res.clearCookie("token");
  return res.end();
};

exports.deleteCptUser = async (req, res) => { 
     console.log(req);
  console.log(req.params.userId)
  const userId =req.params.userId
  await deleteCptUser(userId)
  res.clearCookie("token");
  return res.status(200).json('User supprimé')
  
};


exports.authUser = async (req, res) => {
    try {
        console.log(req.body)
        const { password } = req.body;
        const authUser = await authUtilisateur(req.body)
        console.log(authUser)
        console.log(key)
        console.log(password)
        console.log(authUser.password)
        if (authUser) {
            console.log('coucou2')
            if (bcrypt.compareSync(password, authUser.password)) {
                const token = jsonwebtoken.sign({}, key, {
                subject: authUser._id.toString(),
                expiresIn: 3600 * 24 * 30 * 6,
                algorithm: "RS256",
                });
                res.cookie("token", token, { httpOnly: true });
                return res.json(authUser);
            } else {
                return res.status(400).json("Mauvais email ou mot de passe");
            }
        } else {
            return res.status(400).json("Mauvais email ou mot de passe");
         }
    } catch(e) {
        return res.status(400).json("Mauvais email ou mot de passe");
    }
}