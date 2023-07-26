import express from 'express'
import { BookController } from './book.controller';
import authGuard from '../authAndUser/authGuard';

const router = express.Router()


router.post('/add-new-book', authGuard,BookController.addNewBook)

//this route using all books
router.get('/all-books', BookController.allBooks)

//down this route use book details
router.get('/:id', BookController.bookDetails)

// this route using comment
router.post('/review/:id',authGuard, BookController.bookReview)
router.get('/review/:id', BookController.bookReviewGet)

// this route using edit book
router.patch('/editBook/:id', authGuard,BookController.bookEdit)

// this route using book delete
router.delete('/bookDetails/:id', authGuard,BookController.bookDelete)

//this route front 10 data 
router.get('/', BookController.books)

export const BookRoutes = router;