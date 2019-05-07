const Router = require('koa-router');
const passport = require('koa-passport');
const SalesModel = require('models/Sales.model');

const router = new Router({
    prefix: '/sales'
});

class SalesRouter {

    static async get(ctx) {
        const user = ctx.state.user;
        const data = await SalesModel.find();

        ctx.body = data;

    }

    static async save(ctx) {
        const newSales = new SalesModel(ctx.request.body);
        newSales.user = ctx.state.user.id;
        await newSales.save();
        ctx.body = newSales;
    }

    static async delete(ctx) {
        await SalesModel.findOneAndDelete({ _id: ctx.params.id})
        ctx.body = {};
    }

    static async put(ctx) {
        try {
            const updatedSale = await SalesModel.findOneAndUpdate(
                {_id: ctx.params.id}, 
                ctx.request.body
            );
            ctx.body = updatedSale
        } catch(e) {
            ctx.body = e;
        }
        
    }

    static async getById(ctx) {
        try {
            const sale = await SalesModel.findById(ctx.params.id);
            ctx.body = sale
        } catch(e) {
            ctx.body = e;
        }
        
    }

}

router.use(passport.authenticate('jwt', {
    session: false
  }));

router.get('/', SalesRouter.get);
router.get('/:id', SalesRouter.getById);
router.post('/', SalesRouter.save);
router.delete('/:id', SalesRouter.delete);
router.put('/:id', SalesRouter.put);



module.exports = router;