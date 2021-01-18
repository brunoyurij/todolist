import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    console.log('Ola')
    res.send()
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    res.send(`ID: ${req.params.id}`)
})

router.post('/', (req, res) => {
    res.status(200).json(req.body)
})

export default router
