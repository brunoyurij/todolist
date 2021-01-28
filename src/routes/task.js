import express from 'express'

import Checklist from '../models/checklist.js'
import Task from '../models/task.js'

const taskListRouter = express.Router()
const taskListRouterNoDependencies = express.Router()

taskListRouter.get('/:id/tasks/new', async (req, res) => {
    try {
        const { id: checkListId } = req.params
        const task = new Task()

        res.status(200).render('tasks/new', { checkListId, task })
    } catch (error) {
        res.status(422).render('pages/error', {
            error: 'Erro ao carregar o formulário',
        })
    }
})

taskListRouter.post('/:id/tasks', async (req, res) => {
    const { id: checkListId } = req.params
    const { name } = req.body.task
    const task = new Task({ name, checklist: checkListId })

    try {
        await task.save()

        const checklist = await Checklist.findById(checkListId)

        checklist.tasks.push(task)
        await checklist.save()

        res.redirect(`/checklists/${checkListId}`)
    } catch (error) {
        res.status(422).render('tasks/new', {
            task: { ...task, error },
            checkListId,
        })
    }
})

taskListRouterNoDependencies.delete('/:id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)

    try {
        const checklist = await Checklist.findById(task.checklist)
        const taskToRemove = checklist.tasks.indexOf(task._id)

        checklist.tasks.slice(taskToRemove, 1)

        await checklist.save()

        res.redirect(`/checklists/${checklist._id}`)
    } catch (error) {
        res.status(422).render('tasks/new', {
            checkListId: task.checklist,
        })
    }
})

taskListRouterNoDependencies.put('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id)

    try {
        task.set(req.body.task)
        await task.save()

        res.status(200).json({ task })
    } catch (error) {
        res.status(422).json({ task: { ...error } })
    }
})

export default { taskListRouter, taskListRouterNoDependencies }
