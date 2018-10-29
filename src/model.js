const player = {
  cash: 1000000000000,
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

const region = { 
  'north': { 'applePrice': 24, 'pearPrice': 24, 'blueberryPrice': 24 },
  'south': { 'watermelonPrice': 212, 'peachPrice': 77, 'mangoPrice': 100 },
  'northeast': { 'pearPrice': 212, 'blueberryPrice': 77, 'plumPrice': 100 }, 
  'northwest': { 'pearPrice': 212, 'strawberryPrice': 77, 'plumPrice': 100 }, 
  'southeast': { 'bananaPrice': 212, 'peachPrice': 77, 'mangoPrice': 100 }, 
  'southwest': { 'bananaPrice': 212, 'strawberryPrice': 77, 'cherryPrice': 100 }
}

const events = {
  drought: 'prices will increase for this crop', //in later versions (future) supply will decrease
  bunkerCrop: 'prices will decrease for this crop', //in later versions (future) supply will increase
  cropSpoil: 'prices will increase for this crop', //in later versions supply (on Hand) will decrease
  hurricane: 'prices will increase for this crop', //in later versions supply (on Hand) will decrease from damage, but neighboring crops may benefit from extra rain
  promotion: 'giant wholesalers are promoting & selling X fruit,  prices will increase for this crop', //in later version price could go either way, depending on supply (on hand), currently price will rise
  dumping: 'foreign competitors have glutted the market with cheap X fruit' //in later versions supply (on Hand) will increase
}

export { player, transactionLog, region, bank, fruits }
