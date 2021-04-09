const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const usuarios = require('./usuarios');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res) => {
    res.statusCode = 200;
    res.json({mensagem: "Rota Raiz"});
});

app.use('/usuarios',usuarios);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})