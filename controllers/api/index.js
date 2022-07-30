const router = require('express').Router();
const userRoutes = require('./userRoutes'); //userRoutes come from file name 'userRoutes.js'
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes')

router.use('/users', userRoutes); // where does '/users' come from
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes)

module.exports = router;