import express from 'express'
import path from 'path'
import CheckListRouter from './src/routes/checklist.js'
import RootRouter from './src/routes/index.js'

import './config/database.js'

const app = express()

app.use(express.json())

app.set('views', path.join(path.resolve(), 'src/views'))
app.set('view engine', 'ejs')

app.use('/', RootRouter)
app.use('/checklists', CheckListRouter)

app.listen(3333, () => console.log('server started'))
