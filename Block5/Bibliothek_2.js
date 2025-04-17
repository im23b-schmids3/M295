const express = require('express');
const {response} = require("express");
const app = express();
const port = 3000;

let books = [
    {isbn: '7549-7549-7549', title: 'The Hitchhiker\'s Guide to the Galaxy', year: '1979', author: 'Douglas Adams'},
    {isbn: '7549-7549-1234', title: 'The Micker\'s Guide to the Galaxy', year: '1989', author: 'Douglas NotAdams'},
    {isbn: '7549-7549-4567', title: 'The Ticker\'s Guide to the Galaxy', year: '1999', author: 'idk'},
    {isbn: '7549-7549-7654', title: 'The Clicker\'s Guide to the Galaxy', year: '2000', author: 'miau'},
];

const lends = [
    {
        id: 1,
        customer_id: "K1001",
        isbn: "9783161484100",
        borrowed_at: "2025-04-15T12:00:00Z",
        returned_at: null
    },
    {
        id: 2,
        customer_id: "K1002",
        isbn: "9783825530176",
        borrowed_at: "2025-04-10T14:30:00Z",
        returned_at: "2025-04-12T16:45:00Z"
    },
    {
        id: 3,
        customer_id: "K1003",
        isbn: "9783608950123",
        borrowed_at: "2025-04-14T09:15:00Z",
        returned_at: null
    }
];

app.get('lends', (req, res) => {
    res.json(lends);
});

app.get('/lends/:id', (req, res) => {
    const lend = lends.find(l => l.id === parseInt(req.params.id));
    if (lend) {
        res.json(lend);
    } else {
        res.status(404).send('Lend not found');
    }
});

app.post('/lends', (req, res) => {
    const {customer_id, isbn} = req.body;
    if (!customer_id || !isbn) {
        return res.status(400).send('Missing customer_id or isbn');
    }
    const newLend = {
        id: lends.length ? Math.max(...lends.map(l => l.id)) + 1 : 1,
        customer_id,
        isbn,
        borrowed_at: new Date().toISOString(),
        returned_at: null
    };
    lends.push(newLend);
    res.status(201).json(newLend);
});

app.delete('/lends/:id', (req, res) => {
    const lend = lends.find(l => l.id === parseInt(req.params.id));
    if (!lend) {
        return res.status(404).send('Lend not found');
    }
    if (lend.returned_at) {
        return res.status(400).send('Book already returned');
    }
    lend.returned_at = new Date().toISOString();
    res.status(200).json(lend);
});
app.get('/books', (request, response) => {
    response.json(books);
});

app.get('/books/:isbn', (request, response) => {
    const isbn = request.params.isbn;
    const book = books.find(b => b.isbn === isbn);
    if (book) {
        response.json(book);
    } else {
        response.status(404).send('Book not found');
    }
});

app.post('/books', (request, response) => {
    const newBook = request.body;
    newBook.isbn = newBook.isbn.trim();
    newBook.title = newBook.title.trim();
    newBook.author = newBook.author.trim();
    books.push(newBook);
    response.status(201).json(newBook);
});

app.put('/books/:isbn', (request, response) => {
    const isbn = request.params.isbn;
    const index = books.findIndex(b => b.isbn === isbn);
    if (index !== -1) {
        const updatedBook = request.body;
        updatedBook.isbn = updatedBook.isbn.trim();
        updatedBook.title = updatedBook.title.trim();
        updatedBook.author = updatedBook.author.trim();
        books[index] = updatedBook;
        response.json(updatedBook);
    } else {
        response.status(404).send('Book not found');
    }
});

app.delete('/books/:isbn', (request, response) => {
    const isbn = request.params.isbn;
    const index = books.findIndex(b => b.isbn === isbn);
    if (index !== -1) {
        books.splice(index, 1);
        response.status(204).send();
    } else {
        response.status(404).send('Book not found');
    }
});

app.patch('/books/:isbn', (request, response) => {
    const isbn = request.params.isbn;
    const book = books.find(b => b.isbn === isbn);
    if (book) {
        const updates = request.body;
        Object.keys(updates).forEach(key => {
            if (key !== 'isbn') {
                book[key] = typeof updates[key] === "string" ? updates[key].trim() : updates[key];
            }
        });
        response.json(book);
    } else {
        response.status(404).send('Book not found');
    }
});