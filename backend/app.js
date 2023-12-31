require("dotenv").config(); // environment variable
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connecté à la base de données MongoDB'))
    .catch(err => {
        console.error('Erreur de connexion à la base de données:', err);
        process.exit(1); // Arrête l'application en cas d'échec de la connexion à la base de données
    });

//pemret de valider le CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
