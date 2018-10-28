const player = {
  cash: 100000,
  inventory: []
}

const transactionLog = []

const bank = {
  playerDebt: 0,
  interestRate: 0.1
}

const fruits = [
  'cherry',
  'banana',
  'pear',
  'apple',
  'strawberry',
  'blueberry',
  'watermelon',
  'peach',
  'blueberry',
  'plum',
  'mango'
]

const region = { // north, south, northeast, northwest, southeast, southwest
  'north': { 'applePrice': 24, 'pearPrice': 24, 'blueberryPrice': 24 },
  'south': { 'watermelonPrice': 212, 'peachPrice': 77, 'mangoPrice': 100 },
  'northeast': { 'pearPrice': 212, 'blueberryPrice': 77, 'plumPrice': 100 }, 
  'northwest': { 'pearPrice': 212, 'strawberryPrice': 77, 'plumPrice': 100 }, 
  'southeast': { 'bananaPrice': 212, 'peachPrice': 77, 'mangoPrice': 100 }, 
  'southwest': { 'bananaPrice': 212, 'strawberryPrice': 77, 'cherryPrice': 100 }
}

export { player, transactionLog, region, bank, fruits }
