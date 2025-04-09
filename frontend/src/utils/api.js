import axios from "axios";

const API =axios.create({baseURL: "https://bookstorefrontend-f3gf.onrender.com"});

export const getBooks=()=>API.get('/book/getBook');
export const postBook=(bookData)=>API.post('/book/postBook',bookData);
export const putBook=(id,bookData)=>API.put(`/book/putBook/${id}`,bookData);
export const deleteBook=(id)=>API.delete(`/book/deleteBook/${id}`);