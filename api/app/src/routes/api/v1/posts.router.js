const Router = require('koa-router');
const passport = require('koa-passport');
const PostsModel = require('models/posts.model');


const router = new Router({
    prefix: '/posts'
});

class PostsRouter {

    static async get(ctx) {
        const user = ctx.state.user;
        const data = await PostsModel.find();

        ctx.body = data;

    }

    static async save(ctx) {
        const newPosts = new PostsModel(ctx.request.body);
        newPosts.user = ctx.state.user.id;
        await newPosts.save();
        ctx.body = newPosts;
    }

    static async delete(ctx) {
        await PostsModel.findOneAndDelete({ _id: ctx.params.id})
        ctx.body = {};
    }

    static async put(ctx) {
        try {
            const updatedPost = await PostsModel.findOneAndUpdate(
                {_id: ctx.params.id}, 
                ctx.request.body
            );
            ctx.body = updatedPost
        } catch(e) {
            ctx.body = e;
        }
        
    }

    static async getById(ctx) {
        try {
            const post = await PostsModel.findById(ctx.params.id);
            ctx.body = post
        } catch(e) {
            ctx.body = e;
        }
        
    }

}

router.use(passport.authenticate('jwt', {
    session: false
  }));

router.get('/', PostsRouter.get);
router.get('/:id', PostsRouter.getById);
router.post('/', PostsRouter.save);
router.delete('/:id', PostsRouter.delete);
router.put('/:id', PostsRouter.put);

module.exports = router;