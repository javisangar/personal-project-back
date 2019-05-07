const Router = require('koa-router');
const passport = require('koa-passport');
const CharacterModel = require('models/character.model');

const router = new Router({
    prefix: '/example'
});

class ExampleRouter {

    static async get(ctx) {
        const user = ctx.state.user;
        const data = await CharacterModel.find({user: user.id});

        ctx.body = data;

    }

    static async save(ctx) {
        const newCharacter = new CharacterModel(ctx.request.body);
        newCharacter.user = ctx.state.user.id;
        await newCharacter.save();
        ctx.body = newCharacter;
    }

}

router.use(passport.authenticate('jwt', {
    session: false
  }));

router.get('/', ExampleRouter.get);
router.post('/', ExampleRouter.save);

module.exports = router;