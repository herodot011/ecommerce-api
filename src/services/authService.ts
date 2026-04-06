import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repositories/authRepository';

const authRepository = new AuthRepository();

export class AuthService {
    async register(email: string, password: string, name: string) {
        const existingUser = await authRepository.findByEmail(email)
            if(existingUser) {
                throw new Error('User with this email already exists')
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await authRepository.create({
                email,
                password: hashedPassword,
                name
            })
            return { id: user.id, email: user.email, name: user.name }
    }
    
    async login(email: string, password: string) {
        const user = await authRepository.findByEmail(email);
        if(!user) {
            throw new Error('Email or password invalid')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            throw new Error('Email or password invalid')
        }
        
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        )
        return { token, user: { id: user.id, email: user.email, role: user.role }}
    }
}