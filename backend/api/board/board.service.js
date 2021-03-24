const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy) {
    try {
        const collection = await dbService.getCollection('board')
        var boards = await collection.find({ 'createdBy._id': filterBy.userId }).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        const board = await collection.findOne({ "_id": ObjectId(boardId) })
        return board
    } catch (err) {
        console.log(`ERROR: cannot find board ${boardId}`)
        throw err;
    }
}


async function remove(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.deleteOne({ "_id": ObjectId(boardId) })
    } catch (err) {
        console.log(`ERROR: cannot remove board ${boardId}`)
        throw err;
    }
}

async function update(board) {
    const collection = await dbService.getCollection('board')
    board._id = ObjectId(board._id);
    try {
        await collection.updateOne({ "_id": board._id }, { $set: board })
        return board
    } catch (err) {
        console.log(`ERROR: cannot update board ${board._id}`)
        throw err;
    }
}

async function add(board) {
    const collection = await dbService.getCollection('board')
    board._id = ObjectId(board._id);
    try {
        await collection.insertOne(board);
        return board
    } catch (err) {
        console.log(`ERROR: cannot update board ${board._id}`)
        throw err;
    }
}




module.exports = {
    query,
    remove,
    update,
    remove,
    getById,
    add
}


