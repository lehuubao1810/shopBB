import express from 'express';
import routerAccess from './access.route.js';
import routerCategory from './category.route.js';
import routerProduct from './product.route.js';
import routerOrder from './order.route.js';
import routerMail from './mail.route.js';

const router = express.Router();

// check apiKey


// check permission


router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/access', routerAccess)
router.use('/category', routerCategory)
router.use('/product', routerProduct)
router.use('/order', routerOrder)
router.use('/mail', routerMail)


export default router; 