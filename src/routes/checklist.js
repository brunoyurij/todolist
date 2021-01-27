import express from 'express'
import Checklist from '../models/checklist.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const checklists = await Checklist.find({})

        res.status(200).render('checklists/index', { checklists })
    } catch (error) {
        res.status(500).render('pages/error', { error })
    }
})

router.get('/new', async (req, res) => {
    try {
        const checklist = new Checklist()

        res.status(200).render('checklists/new', { checklist })
    } catch (error) {
        res.status(422).render('pages/error', { error })
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const { id } = req.params
        const checklist = await Checklist.findById(id)

        res.status(200).render('checklists/edit', { checklist })
    } catch (error) {
        res.status(422).render('pages/error', { error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const checklist = await Checklist.findById(id).populate('tasks')

        res.status(200).render('checklists/show', { checklist })
    } catch (error) {
        res.status(422).render('pages/error', { error })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name } = req.body.checklist

    const checklist = await Checklist.findById(id)
    try {
        await checklist.updateOne({ name })

        res.redirect('/checklists')
    } catch (error) {
        res.status(422).render('/checklists/edit', {
            checklist: { ...checklist, error },
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        await Checklist.findByIdAndRemove(id)

        res.redirect('/checklists')
    } catch (error) {
        res.status(500).render('pages/error', {
            error: 'Erro ao deletar a Lista de tarefas',
        })
    }
})

router.post('/', async (req, res) => {
    const { name } = req.body.checklist

    try {
        await Checklist.create({ name })

        res.redirect('/checklists')
    } catch (error) {
        res.status(422).render('checklists/new', {
            checklist: { ...req.body.checklist, error },
        })
    }
})

export default router
