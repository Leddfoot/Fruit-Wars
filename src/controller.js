// Controller

import { player, transactionLog, region, bank } from './model.js'

const increasePlayerCash = (amount) => {
  player.cash += amount
}

const decreasePlayerCash = (amount) => {
  player.cash -= amount
}

const borrowCash = (amount) => {
  player.cash += amount
  bank.playerDebt += amount
}

const accrueInterest = () => {
  bank.playerDebt += bank.playerDebt * bank.interestRate
}

const payLoan = (amountPaid) => {
  amountPaid > bank.playerDebt ? console.log('You don\'t owe the bank that much') : bank.playerDebt -= amountPaid
}

const getCurrentRegionData = (currentRegion) => {
  return region[currentRegion]
}

const calculateTransactionCost = (costOfFruit, quantity) => {
  return costOfFruit * quantity
}

const buyFruit = (currentRegion, fruitType, quantityToBuy) => {
  const currentRegionData = getCurrentRegionData(currentRegion)
  const priceString = `${fruitType}Price`

  if (!currentRegionData[priceString]) {
    console.log('that fruit is not traded in this region')
  } else if (currentRegionData[priceString] * quantityToBuy < player.cash) {
    const priceOfPurchase = calculateTransactionCost(currentRegionData[priceString], quantityToBuy)
    player.cash -= priceOfPurchase
    const unitPriceOfPurchase = priceOfPurchase / quantityToBuy

    player.inventory.push({
      fruitType: fruitType,
      quantity: quantityToBuy,
      priceOfPurchase,
      unitPriceOfPurchase
    })

    const transactionType = 'bought'

    transactionLog.push({ 'quantity': quantityToBuy, 'fruitType': fruitType, 'transactionCost': priceOfPurchase, 'transactionType': transactionType })
    console.log(transactionLog)
    console.log(player.inventory)
  } else {
    console.log('not enough cash for that')
  }
}

const checkSellingAvailability = (currentRegion, player, fruitType, quantityToSell) => {
  const inventory = player.inventory

  let index
  let enoughToSellInOneGroup = -1

  function getIndividualInventories (element) {
    if (fruitType === element.fruitType && element.quantity > quantityToSell) {
      return element.quantity >= quantityToSell
    }
    
  }

  function sellAcrossMultipleIndexes (element) {
    if (fruitType === element.fruitType) {
      return element.quantity > 0
    }
    
  }
  enoughToSellInOneGroup = player.inventory.findIndex(getIndividualInventories)

  if (enoughToSellInOneGroup !== -1) {
    index = enoughToSellInOneGroup
    decrementInventory(currentRegion, index, fruitType, quantityToSell)
  } else {
    index = inventory.findIndex(sellAcrossMultipleIndexes)
    if (index === -1) {
      console.log('you don\'t have any more to sell')
    } else {
      const partialAmountToSell = inventory[index].quantity
      const remainingInventoryToSell = quantityToSell - partialAmountToSell

      decrementInventory(currentRegion, index, fruitType, partialAmountToSell)
      checkSellingAvailability(currentRegion, player, fruitType, remainingInventoryToSell)
    }
  }
}

const decrementInventory = (currentRegion, index, fruitType, quantityToSell) => {
  player.inventory[index].quantity -= quantityToSell

  const currentRegionData = getCurrentRegionData(currentRegion)
  const priceString = `${fruitType}Price`

  const priceOfPurchase = calculateTransactionCost(currentRegionData[priceString], quantityToSell)

  player.cash += priceOfPurchase
  const transactionType = 'sold'
  

  transactionLog.push({ 'quantity': quantityToSell, 'fruitType': fruitType, 'transactionCost': priceOfPurchase, 'transactionType': transactionType })
  if (player.inventory[index].quantity === 0) {
    player.inventory.splice(index, 1)
  }
  // console.log(player.inventory)
  
  
}

const sellFruit = (currentRegion, fruitType, quantityToSell) => {
  // console.log(transactionLog)
  const currentRegionData = region[currentRegion]
  const priceString = `${fruitType}Price`

  if (!currentRegionData[priceString]) {
    console.log('that fruit is not currently traded in this region')
    return
  }

  checkSellingAvailability(currentRegion, player, fruitType, quantityToSell)
}

const temporaryPriceRandomizer = () => {
  
}


export { increasePlayerCash, decreasePlayerCash, borrowCash, accrueInterest, payLoan, buyFruit, sellFruit, getCurrentRegionData, checkSellingAvailability, temporaryPriceRandomizer} //, getCurrentInventory}
//checkSellingAvailability() is only exported to be available for testing
