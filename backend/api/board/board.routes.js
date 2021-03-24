const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
// const {log} = require('../../middlewares/logger.middleware')
const { getBoards, getBoard, updateBoard, deleteBoard, addBoard } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', log, getReviews)
// router.post('/',  requireAuth, addReview)
// router.delete('/:id',  requireAuth, deleteReview)


router.get('/', getBoards)
router.get('/:id', getBoard)
router.post('/', addBoard)
router.put('/:id', updateBoard)
router.delete('/:id', deleteBoard)

module.exports = router