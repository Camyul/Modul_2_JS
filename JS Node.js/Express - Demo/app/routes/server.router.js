const { Router } = require('express');

const items = [{
    id: 1,
    name: 'Cuki',
}, {
    id: 2,
    name: 'John',
}];

const attach = (app) => {
    const router = new Router();

    router.get('/', (req, res) => {
        res.render('items/all', {
            model: items,
        });
    }).get('/form', (req, res) => {
        return res.render('items/form');
    }).get('/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        const item = items.find((i) => i.id === id);
        if (!item) {
            return res.redirect('/404');
        }

        return res.render('items/details', {
            model: item,
        });
    }).post('/', (req, res) => {
        const item = req.body;
        item.id = items.length + 1;
        items.push(item);
        return res.redirect('items');
    });
    app.use('/items', router);
};

module.exports = attach;
