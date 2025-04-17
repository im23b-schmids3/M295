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