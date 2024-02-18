const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('new product', (product) => {
        console.log('new product: ' + product);
        io.emit('new product', product);
    });
    socket.on('delete product', (productId) => {
        console.log('delete product: ' + productId);
        io.emit('delete product', productId);
    });
});

http.listen(8080, () => {
  console.log('listening on *:8080');
});
