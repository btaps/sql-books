/*
Get the longest book by page_count
Selects the book titles based on a given category id 
Sum up the page count of the books associated with the theater category
Sum up the number of books associated with both the fiction and tragedy categories
Select one author and return all of categories their books are associated with
Create a hometown column for the authors table and set all of the values to "unknown".
*/

-- Question 1 Answer
SELECT * FROM books
INNER JOIN(
SELECT max(page_count) page_count
FROM books 
) maxpage_count
ON maxpage_count.page_count = books.page_count

-- Question 2 ANSWER
SELECT books.title, books_categories.category_id
FROM books_categories 
JOIN books
ON books_categories.category_id = 3 -- this could be any given category
AND books.oid = books_categories.book_id

-- Question 3 Answer
SELECT sum(books.page_count) 
FROM books_categories
JOIN books
WHERE books_categories.category_id = 5 
AND books.oid = books_categories.book_id

-- Question 4 Answer

SELECT count(books.title)
FROM books
JOIN books_categories ON books.oid = books_categories.book_id
JOIN categories ON books_categories.category_id = categories.oid
WHERE categories.name = "Fiction" OR categories.name = "Tragedy"

-- Question 5 Answer

SELECT books.title, authors.name
FROM authors
JOIN books
ON books.author_id = authors.oid 
WHERE authors.name = "Jules Verne"

-- Question 6 Answer

INSERT INTO authors ("HomeTown")
VALUES (NULL)



