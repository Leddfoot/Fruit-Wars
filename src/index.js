// NOte to self Remove Later!! You are testing out standard in lieu of
// ESLINT. It is configured in package.json. Use NPM test commmand
import { increasePlayerCash, decreasePlayerCash, borrowCash, accrueInterest, payLoan, buyFruit, sellFruit, getCurrentInventory } from './controller'
import { bank, region } from './model' // ?temporary??
let currentRegion = 'south'
// getCurrentInventory()



// increasePlayerCash(77)
// decreasePlayerCash(11)
// borrowCash(100)
// accrueInterest()
// payLoan(2)
buyFruit(currentRegion, 'peach', 33)
buyFruit(currentRegion, 'peach', 33)
// buyFruit(currentRegion, 'peach', 33)
buyFruit(currentRegion, 'mango', 40)
// buyFruit(currentRegion, 'mango', 30)
// buyFruit(currentRegion, 'mango', 80)
sellFruit(currentRegion, 'mango', 20)
// sellFruit(currentRegion, 'mango', 18)
// sellFruit(currentRegion, 'mango', 3)
// sellFruit(currentRegion, 'mango', 40)
// sellFruit(currentRegion, 'mango', 20)
// sellFruit(currentRegion, 'mango', 60)
// sellFruit(currentRegion, 'mango', 6000)
// sellFruit(currentRegion, 'peach', 34)
// sellFruit(currentRegion, 'peach', 33)




// export { currentRegion }
