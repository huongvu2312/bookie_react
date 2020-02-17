const router = require('express').Router();
let FinishedBook = require('../model/finishedBook.model');

router.route('/').get((req, res) => {
    FinishedBook.find()
        .then(FinishedBooks => res.json(FinishedBooks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const author = req.body.author;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const newFinishedBook = new FinishedBook({
        name,
        author,
        startDate,
        endDate
    });
    newFinishedBook.save()
        .then(() => res.json('FinishedBook added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    FinishedBook.findOne({ id: req.params.id })
        .then(FinishedBook => res.json(FinishedBook))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    FinishedBook.findOneAndDelete({ id: req.params.id })
        .then(() => res.json('FinishedBook deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*router.route('/update/:id').post((req, res) => {
    FinishedBook.findOne({ id: req.params.id })
        .then(FinishedBook => {
            FinishedBook.name = req.body.name;
            FinishedBook.author = req.body.author;
            FinishedBook.startDate = req.body.startDate;
            FinishedBook.endDate = req.body.endDate;

            FinishedBook.save()
                .then(() => res.json('FinishedBook updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});*/

router.route('/update/:id').post((req, res) => {
    FinishedBook.findOneAndUpdate(
        { id: req.params.id },
        {
            name: req.body.name,
            author: req.body.author,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        .then(() => res.json('FinishedBook updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;