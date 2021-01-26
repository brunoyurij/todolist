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

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const checklist = await Checklist.findById(id)

        res.status(200).render('checklists/show', { checklist })
    } catch (error) {
        res.status(422).render('pages/error', { error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body

        const checklist = await Checklist.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        )

        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const checklist = await Checklist.findByIdAndRemove(id)

        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)
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
