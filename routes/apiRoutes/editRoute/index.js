const router = require('express').Router();
const { Post, User } = require('../../../models');

router.put('/:id', async (req,res)=> {
    //console.log(req.body);
    // localhost3001/api/post/1
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if(!postData){
            res.status(404).json({message: 'No post found with this id!'});
            return;
        }
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;