

import { httpService } from './httpService'
// import { storageService } from './asyncStorageService'
import { userService } from './userService'
import { utilService } from './utilService'

export const boardService = {
  add,
  query,
  remove,
  getById,
  makeGroup,
  updateBoard,
  makeCard,
  makeBoard,
  filterByCardTitle,
  makeActivity
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(filterBy) {
  let queryParams = new URLSearchParams()
  queryParams.set('userId', filterBy.userId)
  return httpService.get(`board?${queryParams}`)
  // return storageService.query('board')
}

function getById(boardId) {
  return httpService.get(`board/${boardId}`)
}

function remove(boardId) {
  return httpService.delete(`board/${boardId}`)
  // return storageService.delete('board', boardId)

}

async function updateBoard(board) {
  const updatedBoard = await httpService.put(`board/${board._id}`, board)
  return updatedBoard
}
async function add(board) {

  const addedBoard = await httpService.post(`board`, board)

  // board.byUser = userService.getLoggedinUser()
  // board.aboutUser = await userService.getById(board.aboutUserId)
  // const addedBoard = storageService.post('board', board)

  return addedBoard
}


function makeGroup(groupTitle) {
  let group = {
    id: 'g' + utilService.makeId(),
    title: groupTitle,
    cards: [{
      id: 'c' + utilService.makeId(),
      title: 'default-empty',
      description: '',
      comments: [],
      checklists: [],
      members: [],
      labels: [],
      createdAt: Date.now(),
      dueDate: '',
      byMember: {},
      style: { coverType: 'top' }
    }]

  }

  return group

}


function makeCard(cardTitle) {
  let card = {
    id: 'c' + utilService.makeId(),
    title: cardTitle,
    description: '',
    comments: [],
    checklists: [],
    members: [],
    labels: [],
    createdAt: Date.now(),
    dueDate: '',
    byMember: {},
    style: { coverType: 'top' }

  }
  return card

}

async function makeActivity(txt, card = {}) {
  let activity = {
    id: 'a' + utilService.makeId(),
    createdAt: Date.now(),
    txt: txt,
    byMember: await getMiniUser(),
    card: card
  }
  return activity
}

async function getMiniUser() {
  let loggedinUser = userService.getLoggedinUser()
  let createdBy = (loggedinUser) ? loggedinUser : await userService.login({ username: 'Guest', password: '123' })
  return createdBy
}

async function makeBoard(boardTitle, bgUrl) {

  const colors = ['#61BD4F', '#F2D600', '#FF9F1A', '#EB5A46', '#C377E0', '#0079BF']
  const labels = colors.map(color => { return { id: color, title: '', accessibility: '' } })

  let miniUser = await getMiniUser()
  const newBoard = {
    title: boardTitle,
    createdAt: Date.now(),
    createdBy: miniUser,
    style: {
      bgurl: bgUrl
    },
    members: [miniUser],
    groups: [makeGroup('New List')],
    activities: [],

    labels
  }

  const activity = await makeActivity('Created Board')

  newBoard.activities.unshift(activity)

  const addedBoard = await httpService.post(`board`, newBoard);
  return addedBoard

}


async function filterByCardTitle(board, filterBy) {
  console.log('Board got to board service', board)
  console.log('filter got to board service', filterBy)
  if (filterBy.title) {
    const filterRegex = new RegExp(filterBy.title, 'i')
    board.groups = board.groups.map(group => {
      const newGroup = { ...group }
      newGroup.cards = newGroup.cards.filter(card => filterRegex.test(card.title))
      return newGroup
    })
  }

  return board;

}