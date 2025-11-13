const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Dave:qwe@cluster0.vl8oqqa.mongodb.net/siteDave?retryWrites=true&w=majority&appName=Cluster0")
    .then(async () => {
        console.log("Connexion OK")
    })
    .catch(err => console.log(err))