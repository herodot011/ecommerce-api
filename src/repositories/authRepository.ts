import prisma from '../prisma';

export class AuthRepository {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email }
        })
    }

    async create(data: { email: string, password: string, name: string }) {
        return prisma.user.create({
            data
        })
    }
}