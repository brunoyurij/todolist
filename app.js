import express from 'express'
import CheckListRouter from './src/routes/checklist.js'
import './config/database.js'

const app = express()

app.use(express.json())
app.use('/checklists', CheckListRouter)

app.listen(3333, () => console.log('server started'))
