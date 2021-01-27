import express from 'express'
import path from 'path'
import MethodOverride from 'method-override'
import CheckListRouter from './src/routes/checklist.js'
import TaskListRouter from './src/routes/task.js'
import RootRouter from './src/routes/index.js'

import './config/database.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(MethodOverride('_method', { methods: ['POST', 'GET'] }))

app.set('views', path.join(path.resolve(), 'src/views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(path.resolve(), 'public')))

app.use('/', RootRouter)
app.use('/checklists', CheckListRouter)
app.use('/checklists', TaskListRouter.taskListRouter)
app.use('/tasks', TaskListRouter.taskListRouterNoDependencies)

app.listen(3333, () => console.log('server started'))
