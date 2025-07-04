import jwt from 'jsonwebtoken'

const genAccessToken =  (userId) =>{
    const token =  jwt.sign(
      { id: userId },
      process.env.SECRET_KEY_ACCESS_TOKEN,
      {expiresIn: '5h'}
    );
    return token
}
export default genAccessToken