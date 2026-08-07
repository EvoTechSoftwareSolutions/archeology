import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const districtRepository = {
  getAll() {
    return prisma.district.findMany({
        include:{
            historicalPlaces:true,
        }
    });
  },

    getById(id: number) {
        return prisma.district.findUnique({
            where:{
                id,
            },
            include:{
                historicalPlaces:true,
            }
            
        });
    },

    getByName(name:string){
        return prisma.district.findFirst({
            where:{
                name,
            },
        });
    },

    create(data: any) {
        return prisma.district.create({
            data,
        });
    },

    update(id: number, data: any) {
        return prisma.district.update({
            where: {
                id,
            },
            data,
        });
    },

    delete(id: number) {
        return prisma.district.delete({
            where: {
                id,
            },
        });
    }

}