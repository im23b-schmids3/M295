const express  = require('express');
const port = 3000;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

let books = []

app.get('/books', (req, res) => {
    res.json(books);
});


app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    const id = books.length + 1;
    const book = { id, title, author, year };
    books.push(book);
    res.status(201).json(book);
});


app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});

app.put('/books/:id', (req, res) =>
{
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    const { title, author, year } = req.body;
    books[bookIndex] = { id: bookId, title, author, year };
    res.json(books[bookIndex]);
});

app.delete('/books/:id', (req, res) =>
{
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    books.splice(bookIndex, 1);
    res.status(204).send();
});


app.listen(3000, "0.0.0.0", () =>
{(console.log(`Server running on http://localhost:${port}`))
});
