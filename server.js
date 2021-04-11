const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/my-events-tracker'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/my-events-tracker/index.html'));
});


app.listen(process.env.PORT || 4201);