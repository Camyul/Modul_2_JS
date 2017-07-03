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
        res
            .status(404)
            .send('<h1>Home</h1>');
    }).get('/json', (req, res) => {
        res.send({
            id: 1,
            name: 'Gosho',
            interests: ['Math', 'JS'],
        });
    }).get('/all', (req, res) => {
        res.render('all', {
            model: items,
        });
    }).get('/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        const item = items.find((i) => i.id === id);
        if (!item) {
            return res.redirect('/404');
        }

        return res.render('details', {
            model: item,
        });
    });
    app.use('/', router);
};

module.exports = attach;
