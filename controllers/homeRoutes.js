const router = require('express').Router();
const { Comment, Post, User } = require('../models');
// const User = require('../models/User');

//import custom middleware
const withAuth = require('../utils/auth');

//===============GET all Posts====================//
router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            include: [
                {
                    model: User, //user because you want to know the username of whoever made the post
                    attributes: ['username'],
                },
            ],
        });
        //serialize data so template can read it
        const posts = postData.map((post) => {
            post.get({ plain: true })
        });

        //checks to make sure user is logged in?
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//===============GET ONE POST================//
// router.get('/post/:id', async (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id, {
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

//Get one post
router.get('/post/:id', async (req, res) => { // add with auth
    try{
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['comment_text'], //?
                    include: {
                        model: User,
                        attributes: ["username"]
                    }
                },
                {
                    model: User,
                    attributes: ["username"]
                },
            ],
        });

        const post = postData.get({ plain: true });
        //checks to make sure user is logged in?
        res.render('post', {
            post,
            loggedIn: req.session.loggedIn //loggedIn
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//=================GET One comment==================// you do not get ALL comments because it is nested within Post???
router.get('/comment/:id', async (req, res) => { 
    try {
        const commentData = await Comment.findByPk(req.params.id) //only used when searching by id?

        const comment = commentData.get({ plain: true });

        res.render('painting', { comment, loggedIn: req.session.loggedIn })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

//==================GET PROFILE===================//

router.get('/profile', async (req, res) => {
    console.log(req.session)
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password'] },
            include: [{ model: Post }],
        });
        console.log(req.session.user_id)
        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user, // what does elipses do?
            loggedIn: true
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// router.get('/profile', async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username']
//                 },
//             ],
//             where: {
//                 user_id: req.session.user_id
//             }
//         });

//         const posts = postData.map((Post) =>Post.get({ plain: true } ));
    

//         res.render('profile', {
//             posts,
//             loggedIn: req.session.loggedIn
//         });
//     } catch (err) {
//         console.log(err)
//         res.status(500).json(err);
//     }
// });

//=======================LOGIN=========================//

// login route
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/profile'); // '/' OR 'Profile'??????
        return;
    }
    
    res.render('login');
});

// router.get('/signup', (req, res) => {
//     if(req.session.loggedIn) {
//         res.redirect('/profile'); // '/' OR 'Profile'??????
//         return;
//     }
    
//     res.render('login');
// });


//=================GET NEW POST================//

router.get('/new-post', (req, res) => {
    res.render('new-post');
});

// //===========Get NEW POST============//

// router.get('/profile/new-post', (req, res) => {
//     res.render('new-post')
// });

module.exports = router;
