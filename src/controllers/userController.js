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

const findUserById = async (req, res, next) => {
  try {
    const userId = req.params.id; // Ambil ID dari parameter URL
    const user = await userService.findUserById(userId); // Panggil fungsi service
  
    res.status(200).json({
      success: true,
      data: user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    next(error); // Teruskan error ke middleware handler
  }
};
   
const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id; // Ambil ID dari parameter URL
    const updateData = req.body; // Data pembaruan dari body request
  
    const updatedUser = await userService.updateUserById(userId, updateData); // Panggil fungsi service
  
    res.status(200).json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error); // Teruskan error ke middleware handler
  }
};



export default {
    register,
    login,
    addInterest,
    findUserById,
    updateUserById
}