const Categorys = require('../database/models/category.model')
const Competences = require('../database/models/competence.model');
const Messages = require('../database/models/message.model');
const Users = require('../database/models/user.model')
const Experiences = require('../database/models/experience.model')
const Formations = require('../database/models/formation.model')
const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");
const inlineCss = require('nodemailer-juice');

const sparkPostTransport = require("nodemailer-sparkpost-transport");

const sparkPostTransporter = nodemailer.createTransport(
  sparkPostTransport({
    sparkPostApiKey: "0d425a42dc0e5a9e03ea8634066e6e437dd7d1f8",
    endpoint: "https://api.eu.sparkpost.com"
  })
);




exports.getCategorys = () => {
    return Categorys.find({}).exec()
}

exports.createCategory = (category) => {
    console.log(category)
    const newCategory = new Categorys(category)
    return newCategory.save()
}

exports.deleteCategory = (categoryId) => {
    return Categorys.find().findByIdAndDelete(categoryId)
}

exports.getCompetences = () => {
    return Competences.find({}).exec()
}

exports.getExperiences = () => {
    return Experiences.find({}).exec()
}

exports.getFormations = () => {
    return Formations.find({}).exec()
}

exports.createCompetence = (competence) => {
    const newCompetence = new Competences(competence)
    return newCompetence.save()
}

exports.createUser = async (newUser) => {
  const { email, nom, prenom, noment, password } = newUser;
  const user = new Users({
    email,
    nom,
    prenom,
    noment,
    password: await bcrypt.hash(password, 8),
  });
  return user.save()
}

exports.createMessage = async (message) => {
  const newMessage = new Messages(message)
  return newMessage.save()
}

exports.createExperience = async (experience) => {
  const newExperience = new Experiences(experience)
  return newExperience.save()
}

exports.createFormation = async (formation) => {
  const newFormation = new Formations(formation)
  return newFormation.save()
}

exports.authUtilisateur = async (authUser) => {
  const { email } = authUser;
  console.log('email'+email)
  return Users.findOne({ email }).exec();
  
}

exports.getCurrentUser = async (decodedToken) => {
  return Users.findById(decodedToken)
        .select("-__v -password")
        .exec();
  
}

exports.deleteCompetence = (competenceId) => {
    return Competences.find().findByIdAndDelete(competenceId)
}

exports.getTweet = (tweetId) => {
    console.log(tweetId)
    
    return Tweets.findOne({_id:tweetId}).exec()
}

exports.updateTweet = (tweetId, tweet) => {
  return Tweets.findByIdAndUpdate(tweetId, { $set: tweet }, { runValidators: true });
}

exports.updateUser = (id, User) => {
  return Users.findByIdAndUpdate(id, { $set: User }, { runValidators: true });
}

exports.updatePassword = async (id, user) => {
  const { email, nom, prenom, noment, password } = user;
 
  const newUser = {
    email,
    nom,
    prenom,
    noment,
    password: await bcrypt.hash(password, 8),
  };
  
  return Users.findByIdAndUpdate(id, { $set: newUser }, { runValidators: true });
}

exports.main = async (email) => {
  const data = await sparkPostTransporter.sendMail({
      from: 'no-reply@dave-it.fr',
      to: email,
      subject: 'Bienvenue sur dave-it.fr',
       html: `<!DOCTYPE html>
              <html>
              <head>
                <style>
                    .btn {
                        border-radius:10px;
                        font-weight:bold;
                        border:2px solid #e9d5ff;
                        padding:10px;
                        font-family: "Montserrat", sans-serif;
                        cursor:pointer;
                    
                    } 
                    .btn-primary {
                        background-color:rgb(0, 92, 187);
                        color:white;
                        font-weight:bold;
                        cursor:pointer;
                    } 
                    .btn-primary a {
                        color:white;
                        font-weight:bold;
                        cursor:pointer;
                        text-decoration:none;
                    }
                    .btn-primary:hover {
                        color:white;
                        background:black;
                        font-weight:400;
                        font-family: "Montserrat", sans-serif;
                        font-weight:bold;
                        cursor:pointer;
                    }
                    .mb-20 {
                        margin-bottom:20px;
                    }
                    .mb-10 {
                        margin-bottom:10px;
                    }
                    .mb-5 {
                        margin-bottom:5px;
                    }
                    .signature {
                        font-weight:bold;
                    }
                    span {
                        display:block;
                    }
                </style>
               </head> 
               <body>  
                    <h1>Bienvenue sur dave-it.fr</h1>
                    <p>Si vous désirez échanger sur mon parcours professionnel ou si vous disposer d'une opportunité de carrière, n'hésitez à m'envoyez un message via le lien ci-dessous :</p>
                    <button class='btn btn-primary mb-20' style='cursor:pointer'>
                        <a href='http://dave-it.fr/contact/' >
                        Accéder au formulaire de contact</p>
                        </a>  
                    </button>
                    <p>Vous pouvez accéder à mon parcours professionnel en cliquant sur le lien ci-dessous :</p> 
                    <button class='btn btn-primary mb-20' style='cursor:pointer'>
                        <a href='http://dave-it.fr/contact/'>
                            Accéder à mon parcours professionnel</p></button>
                        </a>
                    </button>
                    <p class='mb-20'>J'espère que mon profil vous plaira.</p> 
                    <p class='mb-20'>A bientôt !</p>
                    <div class='signature'>
                        <p>
                            <span class='mb-5'>David Cordier</span>
                            <span>Développeur Full Stack</span>
                        </p>
                    </div>
               </body>   
               </html>
            `
    })
    return data



}

exports.messageContact = async (email, nom, prenom, noment, titre, message) => {
  const data = await sparkPostTransporter.sendMail({
      from: 'no-reply@dave-it.fr',
      to: email,
      subject: 'Message de '+nom+' '+prenom,
       html: `<!DOCTYPE html>
              <html>
              <head>
                <style>
                    .btn {
                        border-radius:10px;
                        font-weight:bold;
                        border:2px solid #e9d5ff;
                        padding:10px;
                        font-family: "Montserrat", sans-serif;
                        cursor:pointer;
                    
                    } 
                    .btn-primary {
                        background-color:rgb(0, 92, 187);
                        color:white;
                        font-weight:bold;
                        cursor:pointer;
                    } 
                    .btn-primary a {
                        color:white;
                        font-weight:bold;
                        cursor:pointer;
                        text-decoration:none;
                    }
                    .btn-primary:hover {
                        color:white;
                        background:black;
                        font-weight:400;
                        font-family: "Montserrat", sans-serif;
                        font-weight:bold;
                        cursor:pointer;
                    }
                    .mb-20 {
                        margin-bottom:20px;
                    }
                    .mb-10 {
                        margin-bottom:10px;
                    }
                    .mb-5 {
                        margin-bottom:5px;
                    }
                    .signature {
                        font-weight:bold;
                    }
                    span {
                        display:block;
                    }
                </style>
               </head> 
               <body>  
                    <h1>Message de `+nom+' '+prenom+' '+noment+`</h1>
                    <p class='mb-20'>Titre :`+titre+`</p>
                    <p class='mb-20'>Message :`+message+`
               </body>   
               </html>
            `
    })
    return data



}