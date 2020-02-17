const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const finishedBookSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
}, {
    timestamps: true,
});

finishedBookSchema.plugin(autoIncrement.plugin, { model: 'FinishedBook', field: 'id', startAt: 1 });
const FinishedBook = mongoose.model('FinishedBook', finishedBookSchema);

module.exports = FinishedBook;
