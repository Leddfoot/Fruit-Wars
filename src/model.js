const player = {
    cash: 100000,
    inventory: [],
}


const transactionLog = []



const bank = {
    playerDebt: 0,
    interestRate: .1
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

const region = { //north, south, northeast, northwest, southeast, southwest
    'north': { 'applePrice': 24, 'pearPrice': 24, 'plumPrice': 24 },
    'south': { 'watermelonPrice': 212, 'peachPrice': 77, 'mangoPrice': 100 }
  
    } 


export { player, transactionLog, region, bank, fruits }