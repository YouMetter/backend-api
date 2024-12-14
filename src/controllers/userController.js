import userService from "../services/userService.js"

const register = async (req, res, next) => {
    try {
        const request = req.body
        await userService.register(request);
        res.status(201).json({
            success: true,
            data: {},
            message: "berhasil mendaftarkan akun"
        })
        
    } catch (error) {
        next(error)
    } 
}

const login = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await userService.login(request);

        res.status(200).json({
            success: true,
            data: {
                token: result
            },
            message: 'berhasil membuat akun'
        })
    } catch (error) {
        next(error)
    }
}

const addInterest = async (req, res, next) => {
    try {
        const request = req.body
        const user = req.user

        await userService.addInterest(user.id, request.interest);

        res.status(201).json({
            success: true,
            data: {},
            message: 'berhasil menambahkan interest'
        })
    } catch (error) {
        next(error)
    }
}

const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user
    const result = await userService.getCurrentUser(user)
  
    res.status(200).json({
      success: true,
      data: {
        id: result.id,
        name: result.name || "",
        username: result.username,
        email: result.email,
        profileImage: result.profile_image || "https://google.com/image",
        createdAt: result.created_at
      },
      message: "berhasil mendapatkan data user",
    });
  } catch (error) {
    next(error); // Teruskan error ke middleware handler
  }
};
   
const updateCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;
    const updateData = req.body; // Data pembaruan dari body request
  
    await userService.updateCurrentUser(user, updateData); // Panggil fungsi service
  
    res.status(200).json({
      success: true,
      data: {},
      message: 'user berhasil update profile',
    });
  } catch (error) {
    next(error); // Teruskan error ke middleware handler
  }
};



export default {
    register,
    login,
    addInterest,
    getCurrentUser,
    updateCurrentUser
}