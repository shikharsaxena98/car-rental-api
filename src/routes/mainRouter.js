const router = require('express').Router();
const carRouter = require('./car');
const userRouter = require('./user');
const bookingRouter = require('./booking');

router.use(carRouter);

router.use(userRouter);

router.use(bookingRouter)

// export default router;
module.exports = router;