
const express = require('express');
const router = express.Router();
const Article = require('../models/article.model');

// Route pour créer un nouvel article

router.post('/create', async (req, res) =>{
    try{
        //

        const articleData = req.body;
        // verifier si nous recevons au moi une image (img) principale et deux iamge secondaire 
        const {img, img1, img2} = req.body;
        if(!img || !img1 || !img2){
            return  res.status(400).json({message: 'Au moins une image principale et deux images secondaires sont requises.'});
        }

        const newArticle = new Article(articleData);
        await newArticle.save();
        res.status(201).json({message: 'Article créé avec succès', article: newArticle});

    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
});


// Route pour récupérer tous les articles

router.get('/all', async (req, res) =>{
    try{
        //

        const articles =  await Article.find()
            .populate('user', 'prenom email')
            .populate('avis');
        res.status(200).json(articles);


    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
});

// Route pour récupérer un article par son ID

router.get('/:id', async (req, res) =>{
    try{
        //

        const articleId = req.params.id;

        const article = await Article.findById(articleId)
            .populate('user', 'prenom email')
            .populate('avis');

        if(!article) return res.status(404).json({message: 'Article non trouvé'});

        res.status(200).json(article);

    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
});

// Route pour mettre à jour un article par son ID

router.put('/edit/:id', async (req, res) =>{
    try{
        //

        const articleId = req.params.id;
        const updateData = req.body;

        const updatedArticle = await Article.findByIdAndUpdate(articleId, updateData, {new: true});
        if(!updatedArticle){
            return res.status(404).json({message: 'Article non trouvé'});
        }

        res.status(200).json({message: 'Article mis à jour avec succès', article: updatedArticle});

    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
})

// Route pour supprimer un article par son ID

router.delete('/delete/:id', async (req, res) =>{
    try{
        //

        const articleId = req.params.id;

        const deletedArticle = await Article.findByIdAndDelete(articleId);

        if(!deletedArticle){
            return res.status(404).json({message: 'Article non trouvé'});
        }
        res.status(200).json({message: 'Article supprimé avec succès'});

    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
})

//trier les articles par prix 

router.get('/sort/price/:order', async (req, res) =>{
    try{
        //

        const order = req.params.order;
        const sortOrder = order === 'asc' ? 1 : -1;
        const articles = await Article.find().sort({price: sortOrder});
        res.status(200).json(articles);

        // const order = req.params.order;
        // const sortOrder = order === 'asc' ? 1 : -1;

        // const articles = await Article.find().sort({prix: sortOrder});
        // res.status(200).json(articles);

    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
})

//trier les articles par les note moyenne des avis

router.get('/sort/rating/:order', async (req, res) =>{
    try{
        //

        const order = req.params.order;
        const sortOrder = order === 'asc' ? 1 : -1;

        const articles = await Article.aggregate([
            {
                $lookup: {
                    from: 'avis',
                    localField: 'avis',
                    foreignField: '_id',
                    as: 'avisDetails'
                }
            },
            {
                $addFields: {
                    averageRating: { $avg: '$avisDetails.rating' }
                }
            },
            {
                $sort: { averageRating: sortOrder }
            }
        ]);

        res.status(200).json(articles);


    } catch(error){
        res.status(500).json({message: 'Erreur du serveur'});
    }
})

module.exports = router;

