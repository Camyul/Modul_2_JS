const { Router } = require('express');

const items = [{
    id: 1,
    name: 'Cuki',
}];

const attach = (app) => {
    const router = new Router();

    router
        .get('/:id', (req, res) => {
            const id = parseInt(req.params.id, 10);
            const item = items.find((i) => i.id === id);

            if (!item) {
                return res
                    .status(404)
                    .send({
                        error: 'Not found',
                    });
            }
            return res.send(item);
        })
        .get('/', (req, res) => {
            let {
                q,
                page,
                size,
            } = req.query; // Позволява търсене по куери параметър "?q=..."
            page = parseInt(page, 10) || 1;
            size = parseInt(size, 10) || 10;

            let result = items;
            if (q) {
                q = q.toLowerCase();

                result = result.filter((item) => {
                    return item.name.toLowerCase().includes(q);
                });
            }
            result = result.slice((page - 1) * size, page * size);
            res.send(result);
        })
        .post('/', (req, res) => {
            const item = req.body;
            item.id = items.length + 1;
            items.push(item);
            res
                .status(201)
                .send(item);
        });
    app.use('/api/items', router);
};

module.exports = attach;
