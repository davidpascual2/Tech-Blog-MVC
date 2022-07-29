const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

//CREATE new Post
router.post('/', async (req,res) => {
    try {
        const newPost = await Post.create({
            ...req.body, // what does elipses do 
            user_id: req.session.user_id, //user_id? or user.id
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
})


//Get Post by id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findbyPK(req.params.id, {
            include: [
                {
                    model: Comment, //??????????????
                    attributes: ['comment_text'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                //whats this for???????
                {  
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        if(!postData) {
            res.status(404).json({ message: 'no post found with that ID'})
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//Delete Post
router.get('/:id', async (req,res) => {
    try{
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id
                // user_id: req.session.user_id
            }
        });

        if(!deletePost) {
            res.status(404).json({ message: 'no post with that ID.'})
        }
        res.status(200).json(deletePost)
    } catch (err) {
        res.status(500).json(err) //why 500 and not 400 like above
    }
})

module.exports = router;
