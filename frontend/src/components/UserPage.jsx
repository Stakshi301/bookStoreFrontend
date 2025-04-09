import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserPage = () => {
  const [likedBooks, setLikedBooks] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser.name);
    }
  }, []);


const navigate=useNavigate();
  useEffect(() => {
    const fetchLikedBooks = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      console.log("UserID:", userId); 

      const res = await axios.get(`http://localhost:5000/sign-login/${userId}/likes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLikedBooks(res.data);
    };

    fetchLikedBooks();
  }, []);


  useEffect(() => {
    console.log("Fetched liked books:", likedBooks);
  }, [likedBooks]);
  

  function handleBack(){
    navigate('/books');
  }

  function handleBackLanding(){
    navigate('/');
  }
  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4 font-bold text-center ">Welcome, <span className="underline">{userName}</span>  your Liked Books ❤️</h2>
      <div className="flex justify-between">
        <button className="border border-black p-1 rounded-lg bg-amber-50 hover:bg-[#6D4C41] hover:text-amber-50 hover:border-amber-50" onClick={handleBack}>Books Page</button>
        <button className="border border-black p-1 rounded-lg bg-amber-50 hover:bg-[#6D4C41] hover:text-amber-50 hover:border-amber-50" onClick={handleBackLanding}>Landing Page</button>
      </div>
      {likedBooks.map((book) => (
        <div key={book._id} className="bg-amber-50 mt-4 pl-4 shadow-md p-3 rounded mb-2">
          <h3 className="text-xl underline">{book.name}</h3>
          <p className="text-gray-600">{book.author}</p>
          <a href={book.link}    target="_blank" 
        rel="noopener noreferrer"  className="text-gray-600">📖 Read this Book</a>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
