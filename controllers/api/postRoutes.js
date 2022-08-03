const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');


// //Get Post by id
// router.get('/:id', async (req, res) => {
//     try {
//         const postData = await Post.findbyPK(req.params.id, {
//             include: [
//                 {
//                     model: Comment, // this gets any comments made on post
//                     attributes: ['comment_text'],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 },
                
//                 {  
//                     model: User, //this shows the post creator
//                     attributes: ['username']
//                 }
//             ]
//         });
//         if(!postData) {
//             res.status(404).json({ message: 'no post found with that ID'})
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

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



router.put('/:id', async (req, res) => {
    try{
        const updatePost = await Post.update({
            ...req.body //??
        },
        {
            where: { //??
                id: req.params.id //??
            }
        });

        if(!updatePost) {
            res.status(404).json({ message: 'no post with this ID'})
        }
        res.status(200).json(updatePost)
    } catch (err) {
        res.status(500).json(err)
    }
});


//Delete Post
router.delete('/:id', async (req,res) => {
    try{
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
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
