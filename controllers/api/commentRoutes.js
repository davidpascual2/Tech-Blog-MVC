const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

//CREATE new Comment
router.post('/', async (req,res) => {
    try {
        const newComment = await Comment.create({
            ...req.body, // what does elipses do //
            user_id: req.session.user_id, //user_id? or user.id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
})

//Get all Comments
router.get("/", async (req, res) => {
    try {
        const allComments = await Comment.findAll({
            include: [
                {
                    model: Post, 
                    include: {
                        model: User, 
                        attributes: { exclude: ["password"] }
                    }
                }
            ]
        })
        res.json(allComments)
    } catch (err) {
        res.status(500).json(err)
    }
}); 


//Get Comment by id
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findbyPK(req.params.id, {
            include: [
                {
                    model: Post, //??????????????
                    include: {
                        model: User,
                        attributes: { exclude: ["password"] }
                    }
                },
            ]
        });
        if(!commentData) {
            res.status(404).json({ message: 'no comment found with that ID'})
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//Delete Comment
router.delete('/:id', async (req,res) => {
    try{
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id
                // user_id: req.session.user_id
            }
        });

        if(!deleteComment) {
            res.status(404).json({ message: 'no comment with that ID.'})
        }
        res.status(200).json(deleteComment)
    } catch (err) {
        res.status(500).json(err) //why 500 and not 400 like above
    }
})

module.exports = router;