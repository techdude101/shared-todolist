const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('build/static/'));

/* GET React App */
const publicPath = path.join(__dirname, 'build');
app.use("/", express.static(publicPath));

app.get("/list/*", (req, res) => {
    res.redirect("/#" + req.route.path);
});

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + 'build/index.html'));
});



const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);