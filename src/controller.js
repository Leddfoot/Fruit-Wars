// Controller

import { player, transactionLog, region, bank, fruits } from './model.js'



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
        return
    } else if(currentRegionData[priceString] * quantityToBuy < player.cash) {
        // console.log('Yes, that region has that fruit')
        const priceOfPurchase = calculateTransactionCost(currentRegionData[priceString], quantityToBuy) 
        player.cash -= priceOfPurchase
        
        //NOTE!!Price of Purchase will be used in future updates for transaction history
        player.inventory.push({
            fruitType: fruitType,
            quantity: quantityToBuy,
            priceOfPurchase           
         }) 
        //  console.log(player.inventory);
         
        const transactionType = 'bought'

        transactionLog.push({ 'quantity': quantityToBuy, 'fruitType': fruitType, 'transactionCost': priceOfPurchase, 'Transaction Type': transactionType })
   
    } else {
        console.log('not enough cash for that');
    }
}

const checkAvailability = (currentRegion, player, fruitType, quantityToSell) => {
    const inventory = player.inventory
    // console.log(`this is inventory ${inventory}`);
    // console.log(player[inventory]);
    
    let index = undefined
    let enoughToSellInOneGroup = -1
    
    function getIndividualInventories (element) {
        return element.quantity >= quantityToSell
    }

    function sellAcrossMultipleIndexes(element) {
        return element.quantity > 0
    }
    enoughToSellInOneGroup = player.inventory.findIndex(getIndividualInventories)

    if (enoughToSellInOneGroup != -1) {
        index = enoughToSellInOneGroup
        decrementInventory(currentRegion, index, fruitType, quantityToSell )
    } else {

        index = inventory.findIndex(sellAcrossMultipleIndexes) 
        console.log('index' + index);
        if (index === -1) {
            console.log('you don\'t have any to sell');            
        } else {
            const partialAmountToSell = inventory[index].quantity
            const remainingInventoryToSell = quantityToSell - partialAmountToSell
            
            decrementInventory(currentRegion, index, fruitType, partialAmountToSell)
            checkAvailability(currentRegion, player, fruitType, remainingInventoryToSell)
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

    transactionLog.push({ 'quantity': quantityToSell, 'fruitType': fruitType, 'transactionCost': priceOfPurchase, 'Transaction Type':transactionType})
    if (player.inventory[index].quantity === 0) {
        player.inventory.splice(index, 1)
    }

    console.log(transactionLog);
}


const sellFruit = (currentRegion, fruitType, quantityToSell) => {      
    const currentRegionData = region[currentRegion]
    const priceString = `${fruitType}Price`  

    if (!currentRegionData[priceString]) {
        console.log('that fruit is not currently traded in this region')
        return
    }


    checkAvailability(currentRegion, player, fruitType, quantityToSell)
}
console.log(player.inventory);



export { increasePlayerCash, decreasePlayerCash, borrowCash, accrueInterest, payLoan, buyFruit, sellFruit }