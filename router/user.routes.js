
const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

// Route pour créer un nouvel utilisateur

router.post('/create', async (req, res) =>{
    try{
        //

        const userData = req.body;
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json({message: 'Utilisateur créé avec succès', user: newUser});

    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
});

// Route pour récupérer tous les utilisateurs

router.get('/all', async (req, res)=>{
    try{
        //

        const users =  await User.find();
        res.status(200).json(users);

    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
});

// Route pour récupérer un utilisateur par son ID

router.get('/:id', async (req, res)=>{
    try{
        //

        const userId = req.params.id;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'Utilisateur non trouvé'});
        }
        res.status(200).json(user);

    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
});

// Route pour mettre à jour un utilisateur par son ID

router.put('/edit/:id', async (req, res) =>{
    try{
        //

        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {new: true});
        if(!updatedUser){
            return res.status(404).json({message: 'Utilisateur non trouvé'});
        }
        res.status(200).json({message: 'Utilisateur mis à jour avec succès', user: updatedUser});

    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
});

// Route pour supprimer un utilisateur par son ID

router.delete('/delete/:id', async (req, res) =>{
    try{
        //
    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
});

module.exports = router;


