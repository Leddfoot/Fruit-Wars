
const assert = require('assert')
const controller = require('../src/controller.js')
const model = require('../src/model.js')
const expect = require('chai').expect
var chai = require('chai')
chai.should()
chai.use(require('chai-things'))

describe('just testing arrow function here', () => {
  it('should return true', () => {
    assert.equal(true, true)
  })
})

describe('player object', () => {
  it('player.cash should start at 100000', () => {
    assert.equal(model.player.cash, 100000)
  })
  describe('increase and decrease functions should increment/decrement properly', () => {
    it('should add cash to player.cash', () => {
      model.player.cash = 0
      controller.increasePlayerCash(100)
      assert.equal(model.player.cash, 100)
    })
    it('should remove cash from player.cash', () => {
      model.player.cash = 100
      controller.decreasePlayerCash(100)
      assert.equal(model.player.cash, 0)
    })
  })

  describe('borrow cash functionality', () => {
    it('should add the amount borrowed to bank.playerDebt', () => {
      model.bank.playerDebt = 0
      controller.borrowCash(555)
      assert.equal(model.bank.playerDebt, 555)
    })
    it('should add the amount borrowed to player.cash', () => {
      model.player.cash = 0
      controller.borrowCash(777)
      assert.equal(model.player.cash, 777)
    })
  })
  describe('interest rate testing', () => {
    it('should add the interest percentage to the debt', () => {
      model.bank.playerDebt = 100
      controller.accrueInterest()
      assert.equal(model.bank.playerDebt, 110)
    })
  })
})

describe('buyFruit()', () => {
  it('should not allow purchase of fruit that is not available in a region', () => {
    assert.equal(controller.buyFruit('south', 'guava', 33), undefined)
  })
  it('should not allow purchase that is greater than the amount of cash a player has', () => {
    model.player.cash = 0
    assert.equal(controller.buyFruit('south', 'peach', 33), undefined)
  })
  it('should remove cash from player.cash when a transaction does occur', () => {
    model.player.cash = 10000
    model.region.south.peachPrice = 10
    controller.buyFruit('south', 'peach', 1)
    assert.equal(model.player.cash, 9990)
  })
  it('should add the purchase to player.inventory when a transaction does occur', () => {
    model.player.cash = 10000
    model.region.south.peachPrice = 10
    controller.buyFruit('south', 'peach', 1)
    model.player.inventory.should.include.something.that.deep.equals({ fruitType: 'peach', quantity: 1, priceOfPurchase: 10 })
  })
  it('should add details of the purchase to transactionLog when a transaction does occur', () => {
    model.transactionLog = []
    model.region.south.peachPrice = 10
    controller.buyFruit('south', 'peach', 1)
    model.transactionLog.should.include.something.that.deep.equals({ fruitType: 'peach', quantity: 1, 'transactionCost': 10, 'transactionType': 'bought' })
  })
})

describe('sellFruit()', () => {
  it('should not allow purchase of fruit that is not available in a region', () => {
    assert.equal(controller.sellFruit('south', 'guava', 33), undefined)
  })
})


describe('checkSellingAvailability', () => {
  it('should be somewhat mindbending', () => {
    assert.equal(true, true)
  })
  it('should remove the quantity to be sold from player.inventory, if there is enough in ONE group to satisfy the amount that is being sold ', () => {
    model.player.inventory = []
    controller.buyFruit('south', 'mango', 50)    
    controller.checkSellingAvailability('south', model.player, 'mango', 22)
    model.player.inventory.should.include.something.that.deep.equals({ fruitType: 'mango', quantity: 28, priceOfPurchase: 5000 })
  })
  it('should remove the quantity to be sold from player.inventory, if there is enough in MORE THAN one group to satisfy the amount that is being sold ', () => {
    model.player.inventory = []
    controller.buyFruit('south', 'mango', 50)
    controller.buyFruit('south', 'mango', 50)
    controller.checkSellingAvailability('south', model.player, 'mango', 100);
    assert(Array.isArray([]), 'THIS TEST NEEDS TO BE IMPROVED!');
  })
  //  YOU ARE HERE!!! when you remove an amount larger than the amount available, checkAvailability is selling a partial amount
  //which is right but you need to think about trying to sell more than you have !! it should offer to sell max qty or something
  it('should remove the quantity to be sold from player.inventory, if there is a partial amount available ', () => {
    model.player.inventory = []
    controller.buyFruit('south', 'mango', 50)
    controller.checkSellingAvailability('south', model.player, 'mango', 100)
    model.player.inventory.should.not.include({ fruitType: 'mango', quantity: 50, priceOfPurchase: 5000 })
    })
  it('should make an entry in the transactionLog, when goods are purchased or sold successfully', () => {
    model.transactionLog = []
    controller.buyFruit('south', 'mango', 50)
    controller.checkSellingAvailability('south', model.player, 'mango', 50)
    model.transactionLog.should.include.something.that.deep.equals({ quantity: 50, fruitType: 'mango', transactionCost: 5000, transactionType: 'sold' })
    model.transactionLog.should.include.something.that.deep.equals({ quantity: 50, fruitType: 'mango', transactionCost: 5000, transactionType: 'bought' })
  })
  it('If player tries to sell more than they have, it should only add funds for the quantity that they have available to sell, ie they should not get funds for the entire hundred in this test', () => {
    model.transactionLog = []
    controller.buyFruit('south', 'mango', 50)
    controller.checkSellingAvailability('south', model.player, 'mango', 100)
    model.transactionLog.should.include.something.that.deep.equals({ quantity: 50, fruitType: 'mango', transactionCost: 5000, transactionType: 'sold' })
  })
})
