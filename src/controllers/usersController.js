import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { insertSignup } from '../repositories/userRepository.js';

async function signup(req, res) {
    const { email, password, username, pictureUrl } = req.body;
    password = bcrypt.hashSync(password, 12);
    try {
        await insertSignup({ email, password, username, pictureUrl })
        return res.sendStatus(StatusCodes.CREATED)
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { signup }