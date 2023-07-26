import { ObjectId } from "mongodb";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";
import ApiError from "../../../errors/ApiError";
import { UpdateWriteOpResult } from "mongoose";
import { bookSearchableFields } from "./book.constant";

const addNewBook = async (
  payload: Partial<IBook>,
  user: JwtPayload | null
): Promise<IBook | null> => {
  payload.userId = user?.userId;
  const result = await Book.create(payload);
  return result;
};
const books = async () => {
  const result = await Book.find({}).sort({ timestamp: -1 }).limit(10);
  return result;
};

const allBooks = async (filters: IBookFilters) => {
  const { searchTerm, ...filtersData } = filters;
  
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((fields) => ({
        [fields]: {
          $regex: searchTerm,
          $options: "i"
        }
      }))
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value
      }))
    });
  }
  console.log(Object.keys(filtersData).length);
  console.log(
    Object.entries(filtersData).map(([field, value]) => ({
      [field]: value
    }))
  );
  console.log(andConditions, "and");

  const whereConditionsData =
    andConditions.length > 0
      ? {
          $and: andConditions
        }
      : {};
  // console.log(whereConditionsData);

  const result = await Book.find(whereConditionsData);
  return result;
};

const bookDetails = async (id: string) => {
  const result = await Book.findOne({ _id: new ObjectId(id) });
  return result;
};
const bookReview = async (
  id: string,
  comment: string
): Promise<UpdateWriteOpResult> => {
  try {
    const result = await Book.updateOne(
      { _id: new ObjectId(id) },
      { $push: { comments: comment } }
    );
    if (result.modifiedCount !== 1) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Book not found or comment not added"
      );
    }
    return result;
  } catch (error) {
    console.error("Error updating book:", error);
    return Promise.reject(error);
  }
};

const bookReviewGet = async (id: string) => {
  const result = await Book.findOne({ _id: new ObjectId(id) }, { comments: 1 });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  return result;
};

const bookEdit = async (
  id: string,
  payload: Partial<IBook>,
  user: JwtPayload | null
) => {
  payload.userId = user?.userId;
  const result = await Book.findOneAndUpdate(
    { _id: new ObjectId(id), userId: user?.userId },
    payload,
    { new: true }
  );
  if (!result) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "!Warning, This book it's not yours, so you don't edit this book"
    );
  }
  return result;
};

const bookDelete = async (
  id: string,
  user: JwtPayload | null
): Promise<IBook | null> => {
  const result = await Book.findOneAndDelete({
    _id: new ObjectId(id),
    userId: user?.userId
  });
  if (!result) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "!Warning, This book it's not yours, so you don't edit this book"
    );
  }
  return result;
};

export const BookService = {
  allBooks,
  books,
  addNewBook,
  bookDetails,
  bookReview,
  bookReviewGet,
  bookEdit,
  bookDelete
};
