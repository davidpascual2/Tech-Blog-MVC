const router = require('express').Router();
const { User } = require('../../models');

//CREATE new user
router.post('/', async (req, res) => {
    try {
        console.log(req.body, "req body!!!!")
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        }); 

        req.session.save(() => {
            req.session.user_id = userData.id; //WHY 'user_id
            req.session.loggedIn = true; // loggedIn

            res.status(200).json(userData)
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//post login
router.post('/login', async (req, res) => {
    try {
        //username 
        const userData = await User.findOne({ where: { username: req.body.username } });
        
        if(!userData) {
            res.status(400).json({ message: 'incorrect username or password'})
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'invalid username or password'});
            return;
        }
        console.log('!!!!!!!!!!')
        console.log(userData)
        req.session.save(() => {
        
            req.session.user_id = userData.id;
            req.session.loggedIn = true; 
            console.log(req.session)
            res.json({ user: userData, message: 'You are now logged in'});
            
        });

    } catch (err) {
        res.status(400).json(err);
    }  
});

//post logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }
});

module.exports = router;


