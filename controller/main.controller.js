
/**
 * Blog Start Page
 * @param req
 * @param res
 * @param next
 */
exports.toBlogPage = (req,res,next)=>{
    res.render('index',{title:'Looty博客'});
}