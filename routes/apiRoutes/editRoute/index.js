router.post('/', async (req,res)=> {
         console.log(req.body);

    try {
        console.log(req.session);
        const postData = await Post.create({...req.body,
        user_id:req.session.user_id,
        
        });
        res.json(postData);
    
    // res.send('hello');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});