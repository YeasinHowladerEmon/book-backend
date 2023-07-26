"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const authGuard_1 = __importDefault(require("../authAndUser/authGuard"));
const router = express_1.default.Router();
router.post('/add-new-book', authGuard_1.default, book_controller_1.BookController.addNewBook);
//this route using all books
router.get('/all-books', book_controller_1.BookController.allBooks);
//down this route use book details
router.get('/:id', book_controller_1.BookController.bookDetails);
// this route using comment
router.post('/review/:id', authGuard_1.default, book_controller_1.BookController.bookReview);
router.get('/review/:id', book_controller_1.BookController.bookReviewGet);
// this route using edit book
router.patch('/editBook/:id', authGuard_1.default, book_controller_1.BookController.bookEdit);
// this route using book delete
router.delete('/bookDetails/:id', authGuard_1.default, book_controller_1.BookController.bookDelete);
//this route front 10 data 
router.get('/', book_controller_1.BookController.books);
exports.BookRoutes = router;
