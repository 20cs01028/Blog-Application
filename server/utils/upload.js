import multer from 'multer';
import pkg from '@thebguy/multer-gridfs-storage';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const { GridFsStorage } = pkg;

dotenv.config();

const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;


const storage = new GridFsStorage({
    db: mongoose.connection,
    url: `mongodb://${user}:${pass}@ac-kmctvkd-shard-00-00.fcun3dw.mongodb.net:27017,ac-kmctvkd-shard-00-01.fcun3dw.mongodb.net:27017,ac-kmctvkd-shard-00-02.fcun3dw.mongodb.net:27017/?ssl=true&replicaSet=atlas-mm3jqb-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Blog-app`,
    file: (request, file) => {
        return {
            bucketName: "fs",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 