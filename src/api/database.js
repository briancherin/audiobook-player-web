import { API, graphqlOperation } from "aws-amplify";
import { listBooks } from "../graphql/queries";
import { createBook, deleteBook } from "../graphql/mutations";

export async function fetchBooks() {
    const results = await API.graphql(graphqlOperation(listBooks, {limit: 1000}));
    return results.data.listBooks.items;
}

export async function addBookToDatabase(bookTitle) {
    const input = {
        title: bookTitle,
        currentPositionMillis: 0
    }
    const result = await API.graphql(graphqlOperation(createBook, {input}));
    const id = result.data.createBook.id;
    return id;
}

export async function deleteBookFromDatabase(bookKey) {
    const input = {
        id: bookKey
    }
    await API.graphql(graphqlOperation(deleteBook, {input}));
}