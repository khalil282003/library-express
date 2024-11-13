const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

let books = [
    {id: 1, name: 'book1'},
    {id: 2, name: 'book2'},
    {id: 3, name: 'book3'},
    {id: 4, name: 'book4'}
];

app.get('/', (req, res) => {
    res.send('Hello SSS \nWelcome to this Library test application using express');
});


app.get('/api/v1/books', (req, res) => {
    res.json(books);
});

app.get('/api/v1/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

app.post('/api/v1/books', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }

    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/api/v1/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    const book = books.find(b => b.id === parseInt(id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.json(book);
});

app.delete('/api/v1/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(b => b.id === parseInt(id));

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    books.splice(bookIndex, 1);
    res.status(204).send(); 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});