
/**
 * Blog Start Page
 * @param req
 * @param res
 * @param next
 */
exports.blogIndex = (req,res,next)=>{
    res.render('index',{title:'Looty博客'});
}