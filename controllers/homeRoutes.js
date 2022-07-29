const router = require('express').Router();
const { Comment, Post, User } = require('../models');
// const User = require('../models/User');

//import custom middleware
// const withAuth = require('../utils/auth');


//GET all Posts
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

        const posts = postData.map((post) => {
            post.get({ plain: true })
        });

        //checks to make sure user is logged in?
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn, //loggedIn
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

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

//GET One comment, you do not get ALL comments because it is nested within Post???
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

router.get('/profile', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password'] },
            include: [{ model: Project }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// login route
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/'); // '/' OR 'Profile'??????
        return;
    }
    
    res.render('login');
})

module.exports = router;
