import jwt from 'jsonwebtoken';
import doetnv from 'dotenv';

doetnv.config();

const createJwt = (user) =>  {
    return jwt.sign(
        {id:user.id},
         process.env.JWT_SECRET,
         { expiresIn: '1h',}
);
};

export default createJwt;