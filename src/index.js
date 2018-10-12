// NOte to self Remove Later!! You are testing out standard in lieu of
// ESLINT. It is configured in package.json. Use NPM test commmand


//ADD GITIGNORE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import { increasePlayerCash, decreasePlayerCash, borrowCash, accrueInterest, payLoan, buyFruit, sellFruit } from './controller'
import { bank, region } from './model' //?temporary??
let currentRegion = 'south'

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
// sellFruit(currentRegion, 'mango', 20)
// sellFruit(currentRegion, 'mango', 18)
// sellFruit(currentRegion, 'mango', 3)
// sellFruit(currentRegion, 'mango', 40)
// sellFruit(currentRegion, 'mango', 20)
// sellFruit(currentRegion, 'mango', 60)
// sellFruit(currentRegion, 'mango', 6000)
sellFruit(currentRegion, 'peach', 34); 
// sellFruit(currentRegion, 'peach', 33)









// console.log(`Players debt is: ${bank.playerDebt}. Player is paying interest of: ${bank.interestRate * 100}%`)
// console.log(region.north[0].applePrice);




// export { currentRegion }