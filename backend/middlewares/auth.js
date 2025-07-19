import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    let token =
      req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

      if(!token){
        token = req.query.token
      }
    if (!token) {
      return res.status(401).json({
        message: "user unauthorized",
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    if (!decode) {
      return res
        .status(401)
        .json({
          success: false,
          error: true,
          message: "Unauthorized invalid token",
        });
    }
    req.userId = decode.id;
    next()
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export default auth