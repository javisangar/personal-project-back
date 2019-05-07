const Router = require('koa-router');
const passport = require('koa-passport');
const RoutesModel = require('models/routes.model');

const router = new Router({
    prefix: '/routes'
});

class RoutesRouter {

    static async get(ctx) {
        const user = ctx.state.user;
        const data = await RoutesModel.find({});

        ctx.body = data;

    }

    static async save(ctx) {
        const newRoutes = new RoutesModel(ctx.request.body);
        newRoutes.user = ctx.state.user.id;
        await newRoutes.save();
        ctx.body = newRoutes;
    }

    static async delete(ctx) {
        await RoutesModel.findOneAndDelete({ _id: ctx.params.id})
        ctx.body = {};
    }

    static async put(ctx) {
        try {
            const updatedRoute = await RouteModel.findOneAndUpdate(
                {_id: ctx.params.id}, 
                ctx.request.body
            );
            ctx.body = updatedRoute
        } catch(e) {
            ctx.body = e;
        }
        
    }

    static async getById(ctx) {
        try {
            const route = await RoutesModel.findById(ctx.params.id);
            ctx.body = route
        } catch(e) {
            ctx.body = e;
        }
        
    }

}

router.use(passport.authenticate('jwt', {
    session: false
  }));

router.get('/', RoutesRouter.get);
router.get('/:id', RoutesRouter.getById);
router.post('/', RoutesRouter.save);
router.delete('/:id', RoutesRouter.delete);
router.put('/:id', RoutesRouter.put);

module.exports = router;