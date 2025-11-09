

const express = require('express');
const router = express.Router();

const Avis = require('../models/avis.model');
const Article = require('../models/article.model');

// Route pour créer un nouvel avis

router.post('/create/avis', async (req, res) =>{
    try{
        //

        const avisData = req.body;
        const newAvis = await Avis.create(avisData);

        // Mettre à jour l'article associé avec le nouvel avis
        await Article.findByIdAndUpdate(avisData.Article,{
            $push: { avis: newAvis._id }
        });

        res.status(201).json({message: 'Avis créé avec succès', avis: newAvis});

    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
});

// Route pour récupérer tous les avis

router.get('/avis', async (req, res) =>{
    try{
        //

        const avis =  await Avis.find();
        res.status(200).json(avis);


    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
})

// Route pour récupérer un avis par son ID

router.get('/avis/:id', async (req, res) =>{
    try{
        //

        const avisId = req.params.id;
        const avis = await Avis.findById(avisId);
        if(!avis){
            return res.status(404).json({message: 'Avis non trouvé'});
        }
        res.status(200).json(avis);

    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
})

// Route pour mettre à jour un avis par son ID

router.put('/edit/avis/:id', async (req, res) =>{
    try{
        //

        const avisId = req.params.id;
        const updateData = req.body;
        const updatedAvis = await Avis.findByIdAndUpdate(avisId, updateData, {new: true});
        if(!updatedAvis){
            return res.status(404).json({message: 'Avis non trouvé'});
        }
        res.status(200).json({message: 'Avis mis à jour avec succès', avis: updatedAvis});

    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
})

//delete avis

router.delete('/delete/avis/:id', async (req, res) =>{
    try{
        //

        const avisId = req.params.id;
        const avis = await Avis.findById(avisId);

        if(!avis) return res.status(404).json({message: 'Avis non trouvé'});

        await Article.findByIdAndUpdate(avis.Article, {
            $pull: { avis: avis._id }
        });

        await Avis.findByIdAndDelete(avisId);
        res.status(200).json({message: 'Avis supprimé avec succès'});



    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
})

module.exports = router;
