const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://db_aplicativo:8ikjk0@cluster0-ajt2e.mongodb.net/aplicativo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);
