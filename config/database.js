import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log("we're connected")
})

export default mongoose
