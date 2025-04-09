import React from "react";
import { useEffect, useState } from "react";
import { getBooks } from "../utils/api";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import axios from "axios";

// import Login from "./Login";

const Books = () => {
    const navigate=useNavigate();
    const [liked, setLiked] = useState([]);
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getBooks();
          setBooks(response.data);
    
          const userId = localStorage.getItem("userId");
          const token = localStorage.getItem("token");
    
          if (userId && token) {
            const likedRes = await axios.get(
              `http://localhost:5000/sign-login/${userId}/likes`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const likedBookIds = likedRes.data.map(book => book._id);
            setLiked(likedBookIds);
          }
        } catch (error) {
          console.error("Error fetching books or likes:", error);
        }
      };
    
      fetchData();
    }, []);
    
    

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              book.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });

    const genres = ["All", ...new Set(books.map(book => book.genre))];

    function handleDashboard() {
      const role = localStorage.getItem("role");
      if (role === "admin") {
        navigate("/createBook");
      } else {
        navigate("/user");
      }
    }

  const role = localStorage.getItem("role");
const handleLike = async (bookId) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (role === "admin") {
    alert("Admins can't like books.");
    return;
  }

  if (!token || !userId) {
    alert("Please login to like books.");
    return;
  }

  try {
    await axios.post(
      `http://localhost:5000/sign-login/like`,
      { userId, bookId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Toggle like locally
    setLiked((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  } catch (error) {
    console.error("Error liking book:", error);
  }
};

   



    return (
        <div className="max-w-4xl mx-auto p-6 bg-[#f5f0e1] shadow-lg rounded-lg">
          <div className="head  ">
            <h1 className="text-center text-4xl font-serif text-[#6D4C41]">📚 Book List</h1>
            <button 
  onClick={handleDashboard}
  className="bg-[#6D4C41] text-white px-4 py-2 rounded hover:bg-[#5A3B2B] mt-4"
>
  Go to Dashboard
</button>
          </div>

            {/* Search Input */}
            <input 
                type="text" 
                placeholder="🔍 Search books..." 
                className="w-full p-3 border border-[#6D4C41] rounded-lg mt-4 bg-[#FAEBD7] text-[#6D4C41] focus:ring-2 focus:ring-[#8B5A2B] outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Genre Filter Dropdown */}
            <select 
                className="w-full p-3 border border-[#6D4C41] rounded-lg mt-2 bg-[#FAEBD7] text-[#6D4C41] focus:ring-2 focus:ring-[#8B5A2B] outline-none"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
            >
                {genres.map((genre, index) => (
                    <option key={index} value={genre}>{genre}</option>
                ))}
            </select>

            {/* Book List */}
            <ul className="mt-6 space-y-4">
            {filteredBooks.map((book) => {
  console.log("Book ID:", book._id);
  console.log("Liked Book IDs:", liked);

  return (
    <li key={book._id} className="p-5 bg-[#EDE0D4] shadow-md rounded-lg border border-[#8B5A2B]">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#6D4C41]">{book.name}</h2>
        <IoMdHeart
          className={`text-3xl cursor-pointer transition-all duration-200 ${
            liked.includes(book._id) ? "text-red-500" : "text-gray-300"
          }`}
          style={{ stroke: "black", strokeWidth: "20px" }}
          onClick={() => handleLike(book._id)}
        />
      </div>
      <p className="text-[#8B5A2B] font-medium">✍️ Author: {book.author}</p>
      <p className="text-[#8B5A2B] font-medium">💰 Price: ${book.price}</p>
      <p className="text-[#8B5A2B] font-medium">📖 Genre: {book.genre}</p>
      <a 
        href={book.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-700 underline hover:text-blue-900"
      >
        📖 Read this Book
      </a>
    </li>
  );
})}


            </ul>
            <Footer/>
        </div>
    );
};

export default Books;
