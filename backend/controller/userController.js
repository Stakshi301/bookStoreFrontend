const jwt=require('jsonwebtoken');
const User =require('../model/useSchema');
const bcrypt=require('bcryptjs');

const signIn=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const userExist=await User .findOne({email});
        if(userExist) return res.status(400).json({message:'User already exist'});

        const hashPass=await bcrypt.hash(password,10);

        const role = email==="semwaleishta6@gmail.com" ? 'admin' : 'user';
        const newUser=new User ({name,email,password:hashPass,role});
        
        await newUser.save();
        res.status(200).json({message:'User signin successfully'});
    }catch(err){
        res.status(500).json(err.message);
    }
}; 


const logIn = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const userExist=await User .findOne({email});
        if(!userExist) return res.status(400).json({message:'User not exist please Signup first'});
        
        const matchPass = await bcrypt.compare(password,userExist.password);
        if(!matchPass) return res.status(400).json({message:'Invalid Password'});

        if (email === "semwaleishta6@gmail.com" && userExist.role !== "admin") {
          userExist.role = "admin";
          await userExist.save();
        }

        const token=jwt.sign(
            {userId:userExist._id, role:userExist.role},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        );  
        res.json({
          success: true,
          token,
          user: userExist,
          role: userExist.role,
        });
            }catch(err){
        res.status(500).json(err.message);
    }
}

const likeBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the book is already liked (ObjectId comparison)
    const isAlreadyLiked = user.likedBooks.some(
      (id) => id.toString() === bookId
    );

    if (!isAlreadyLiked) {
      user.likedBooks.push(bookId);
      await user.save();
    }

    res.status(200).json({ message: 'Book liked successfully' });
    console.log('✅ Liked book successfully');
  } catch (err) {
    console.error('❌ likeBook Error:', err);
    res.status(500).json({ message: 'Failed to like book', error: err.message });
  }
};

    
const getLiked = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('likedBooks');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.likedBooks);
  } catch (err) {
    console.error("getLiked Error:", err);
    res.status(500).json({ message: 'Error fetching liked books', error: err.message });
  }
};

  
  
  
  



module.exports={signIn,logIn,likeBook,getLiked};
