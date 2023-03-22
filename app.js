const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Global configuration access
const routes = require('./routes/index');
app.use([routes]);

let PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("root")
})

app.get('*', function (req, res) {
    res.status(404).send('URL Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});