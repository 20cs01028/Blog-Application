import mongoose from "mongoose";



const Connection = async (user, pass) => {
    const URL = `mongodb://${user}:${pass}@ac-kmctvkd-shard-00-00.fcun3dw.mongodb.net:27017,ac-kmctvkd-shard-00-01.fcun3dw.mongodb.net:27017,ac-kmctvkd-shard-00-02.fcun3dw.mongodb.net:27017/?ssl=true&replicaSet=atlas-mm3jqb-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Blog-app`;
    try {

        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch(error) {
        console.log('Error while connecting to the database', error);
    }
}

export default Connection;