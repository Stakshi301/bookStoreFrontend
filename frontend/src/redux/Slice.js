import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Async Thunks
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await axios.get('http://localhost:5000/book/getBook');
    return response.data;
  });
  
  export const addBookk = createAsyncThunk('books/addBook', async (book) => {
    const response = await axios.post('http://localhost:5000/book/postBook', book);
    return response.data;
  });
  
    // DELETE BOOK
export const deleteBookk = createAsyncThunk('books/deleteBook', async (id) => {
    await axios.delete(`http://localhost:5000/book/deleteBook/${id}`);
    return id; // just return the id so we can remove it from the state
  });
  
  // UPDATE BOOK
  export const updateBookk = createAsyncThunk('books/updateBook', async ({ id, updatedBook }) => {
    const response = await axios.put(`http://localhost:5000/book/putBook/${id}`, updatedBook);
    return response.data; // assuming updated book object is returned
  });
    

// Slice
const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle',
    error: null
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(addBookk.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(deleteBookk.fulfilled, (state, action) => {
        state.books = state.books.filter(book => book._id !== action.payload);
      })
      .addCase(updateBookk.fulfilled, (state, action) => {
        const updated = action.payload;
        state.books = state.books.map(book =>
          book._id === updated._id ? updated : book
        );
      });
  }
  
});

// Exports
export default bookSlice.reducer;
