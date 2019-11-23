// Require statements
let express = require('express');
let app = express();
let database = require('./database.js')


// Middleware
app.use(express.json());


// Configuration Variables
const port = 3000;

/////////////////////
// BOOK ROUTES //////
/////////////////////


// Routes
app.get('/', (request, response) => {
  response.send('Visit /api/books to see our list of titles');
});

// get all books
app.get('/api/books',  (req, res) => {
  // send all books as JSON response

  //create a Query string to use in database.all()
  const getAllBooksString = "SELECT * FROM books"
  database.all(getAllBooksString,(err, results)=>{
    if(err) {
      // connection failed send err code and log
      console.log("Get all books table failed", err);
      res.sendStatus(500);
    }else {
      // success! send res status and show results via json.
      console.log("Get all books succeeded");
      res.status(200).json(results);
    }
  })
});

// get one book
app.get('/api/books/:id',  (req, res) => {
  // find one book by its id
  // get params id 
  const bookId = req.params.id
  // set query string 
  const getBookIdStringQuery = `SELECT * FROM books WHERE books.oid = ?`

  // run the db.all
  database.all(getBookIdStringQuery, [bookId],(err, results)=>{
    if(err){
      console.log("Get one book failed.")
      res.sendStatus(500)
    }else {
      res.status(200).json(results)
    }
  })
});

// create new book
app.post('/api/books',  (req, res) => {
  // create new book with form data (`req.body`)
  const reqBody = [req.body.title, req.body.author_id, req.body.image, req.body.release_date, req.body.page_count]
  const createNewBookString = "INSERT INTO books VALUES (?, ?, ?, ?, ?)"
  database.run(createNewBookString, reqBody, err=>{
    if(err) {
      console.log(`Error inserting new book ${req.body.title}.`)
      res.sendStatus(500)
    }else {
      console.log(`Added new book ${req.body.title}`)
      res.sendStatus(200)
    }
  });
});

// update book
app.put('/api/books/:id', (req,res) => {
// get book id from url params (`req.params`)
  
  // identify what we are going to update
  const bookId = req.params.id;
  // create Query string
  const updateOneBook = `UPDATE books SET TITLE = ? WHERE books.oid = ${bookId}`

  // use Query string and req.body to run a the query on the database
  // ******* YOU NEED AN ARRAY WHEN YOU PROVIDE QUESTION MARK *******
  database.run(updateOneBook, [req.body.title], err=>{
    if(err){
      res.sendStatus(400);
      console.log(`Update book with id: ${bookId} failed.`, err);
    } else {
      res.sendStatus(200);
      console.log(`Book id: ${bookId} was updated successfully!`);
    }
  })
});

// delete book
app.delete('/api/books/:id',  (req, res) => {
  // get book id from url params (`req.params`)
  const bookId = req.params.id
  const deleteThisBookString = `DELETE FROM books WHERE ? = oid`

  database.run(deleteThisBookString, [bookId], err=>{
    if(err){
      console.log(`Delete book with id of ${bookId} failed.`)
      res.sendStatus(500)
    }else{
      console.log(`Book with id of ${bookId} got deleted`)
      res.sendStatus(200)
    }
  })

});
///////////////////////
// TODO: AUTHOR ROUTES
////////////////////////
// 1. Write a route to retrieve all authors from the database
app.get('/api/authors',  (req, res) => {
  // send all authors as JSON response

  //create a Query string to use in database.all()
  const getAllAuthorsString = "SELECT * FROM authors"
  database.all(getAllAuthorsString,(err, results)=>{
    if(err) {
      // connection failed send err code and log
      console.log("Get all authors table failed", err);
      res.sendStatus(500);
    }else {
      // success! send res status and show results via json.
      console.log("Get all authors succeeded");
      res.status(200).json(results);
    }
  })
});
// 2. Write a route to add a new author to the database
app.post('/api/authors',  (req, res) => {
  // create new book with form data (`req.body`)
  const reqBody = [req.body.name]
  const createNewAuthorString = "INSERT INTO authors VALUES (?)"
  database.run(createNewAuthorString, reqBody, err=>{
    if(err) {
      console.log(`Error inserting new book ${req.body.name}.`)
      res.sendStatus(500)
    }else {
      console.log(`Added new book ${req.body.name}`)
      res.sendStatus(200)
    }
  });
});
// 3. (OPTIONAL) Write the rest of the RESTful routes for this entity for extra practice.
app.delete('/api/authors/:id',  (req, res) => {
  // get authors id from url params (`req.params`)
  const authorId = req.params.id
  const deleteThisAuthorString = `DELETE FROM authors WHERE ? = authors.oid`

  database.run(deleteThisAuthorString, [authorId], err=>{
    if(err){
      console.log(`Delete author with id of ${authorId} failed.`)
      res.sendStatus(500)
    }else{
      console.log(`Author with id of ${authorId} got deleted`)
      res.sendStatus(200)
    }
  })

});

//////////////////////////
// TODO: CATEGORY ROUTES
//////////////////////////
// 1. Add a route to retrieve all categories from the database
app.get('/api/categories',  (req, res) => {


  //create a Query string to use in database.all()
  const getAllCategoriesString = "SELECT * FROM categories"
  database.all(getAllCategoriesString,(err, results)=>{
    if(err) {
      // connection failed send err code and log
      console.log("Get all books table failed", err);
      res.sendStatus(500);
    }else {
      // success! send res status and show results via json.
      console.log("Get all books succeeded");
      res.status(200).json(results);
    }
  })
});
// 2. Write a route to add a new category to the database
app.post('/api/categories',  (req, res) => {
  // create new catagory with form data (`req.body`)
  const reqBody = [req.body.name]
  const createNewCatagoryString = "INSERT INTO categories VALUES (?)"
  database.run(createNewCatagoryString, reqBody, err=>{
    if(err) {
      console.log(`Error inserting new category ${req.body.name}.`)
      res.sendStatus(500)
    }else {
      console.log(`Added new category ${req.body.name}`)
      res.sendStatus(200)
    }
  });
});
// 3. (OPTIONAL) Write the rest of the RESTful routes for this entity for extra practice.
app.delete('/api/categories/:id', (req, res)=>{
  const categoryId = [req.params.id]
  const deleteQueryString = 'DELETE FROM categories WHERE categories.oid = ?'

  database.run(deleteQueryString, categoryIdç, err=>{
    if(err) {
      console.log(`Failed deleted book with id of ${categoryId}`)
      res.sendStatus(500)
    }else{
      console.log(`Deleted book with id of ${categoryId}`)
      res.sendStatus(200)
    }
  })
})

/////////////////////////////////////////////////
// TODO: BOOKS_CATEGORIES ROUTES (MANY TO MANY)
/////////////////////////////////////////////////


// Retrieve a book's categories using book ID
app.get('/api/books/:id/categories', (req, res)=>{
  const bookId = req.params.id;
  const queryString = `SELECT * FROM books_categories WHERE book_id = ?`;

  database.all(queryString, [bookId], (err, results)=>{
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }else res.status(200).json(results);
  })
})


// Create an association between a book and a category using the book ID
app.post('/api/books/:id/categories', (req, res)=>{
  const bookId = req.params.id;
  const catId = req.body.category_id;
  const insertString = "INSERT INTO books_categories VALUES (?, ?)"

  database.run(insertString, [bookId, catId], (err)=>{
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }else res.sendStatus(200);
  });
})

// Start Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

