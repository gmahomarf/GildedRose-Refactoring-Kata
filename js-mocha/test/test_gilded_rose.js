var { expect } = require('chai');
var { Shop, Item } = require('../src/gilded_rose.js');
describe("Gilded Rose", function () {

  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  describe("regular items", () => {
    it("should degrade at a normal rate", () => {
      const item = new Item("regular thing", 10, 15);
      const gildedRose = new Shop([item]);
      gildedRose.updateQuality();
      expect(item.sellIn).to.equal(9);
      expect(item.quality).to.equal(14);
    });

    it("should degrade at double the rate once expired", () => {
      const item = new Item("regular expired thing", -1, 20);
      const gildedRose = new Shop([item]);
      gildedRose.updateQuality();
      expect(item.sellIn).to.equal(-2);
      expect(item.quality).to.equal(18);
    });

    it("should never degrade past zero", () => {
      const expiredItem = new Item("regular expired item", -2, 1);
      const expiredItem2 = new Item("regular expired item", 0, 0);
      const notExpiredItem = new Item("regular expired item", 15, 0);
      const gildedRose = new Shop([expiredItem, expiredItem2, notExpiredItem]);
      gildedRose.updateQuality();
      expect(expiredItem.quality).to.equal(0);
      expect(expiredItem2.quality).to.equal(0);
      expect(notExpiredItem.quality).to.equal(0);
    });
  });

  describe("aged items", () =>{
    it("should increase in quality", () => {
      const agedBrie = new Item("Aged Brie", 10, 12);
      const gildedRose = new Shop([agedBrie]);
      gildedRose.updateQuality();
      expect(agedBrie.quality).to.equal(13);
    });

    it("should never increase in quality past 50", () => {
      const agedBrie = new Item("Aged Brie", 10, 50);
      const gildedRose = new Shop([agedBrie]);
      gildedRose.updateQuality();
      expect(agedBrie.quality).to.equal(50);
    });
  });

  describe("legendary items", () => {
    it("should never expire or degrade", () => {
      const sulfuras = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
      const gildedRose = new Shop([sulfuras]);
      gildedRose.updateQuality();
      expect(sulfuras.sellIn).to.equal(10);
      expect(sulfuras.quality).to.equal(80);
    });
  })

  describe("backstage passes", () => {
    it("should increase in quality at double the rate when within 6 and 10 days of expiration", () => {
      const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 24);
      const backstagePass2 = new Item("Backstage passes to a TAFKAL80ETC concert", 6, 17);
      const gildedRose = new Shop([backstagePass, backstagePass2]);
      gildedRose.updateQuality();
      expect(backstagePass.quality).to.equal(26);
      expect(backstagePass2.quality).to.equal(19);
    });

    it("should increase in quality at triple the rate when within 5 and 1 days of expiration", () => {
      const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 17);
      const backstagePass2 = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 12);
      const gildedRose = new Shop([backstagePass, backstagePass2]);
      gildedRose.updateQuality();
      expect(backstagePass.quality).to.equal(20);
      expect(backstagePass2.quality).to.equal(15);
    });

    it("should drop in quality to zero after their expiration", () => {
      const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 24);
      const gildedRose = new Shop([backstagePass]);
      gildedRose.updateQuality();
      expect(backstagePass.quality).to.equal(0);
    });
  });

  describe("conjured items", () => {
    it("should degrade twice as fast when not yet expired", () => {
      const conjuredItem = new Item("Conjured Sword of Enlightenment", 5, 24);
      const gildedRose = new Shop([conjuredItem]);
      gildedRose.updateQuality();
      expect(conjuredItem.quality).to.equal(22);
    });

    it("should degrade four times as fast when expired", () => {
      const conjuredItem = new Item("Conjured Potion of Life", -2, 17);
      const gildedRose = new Shop([conjuredItem]);
      gildedRose.updateQuality();
      expect(conjuredItem.quality).to.equal(13);
    });

    it("should never degrade past zero", () => {
      const expiredConjuredItem = new Item("Conjured expired item", -2, 3);
      const expiredConjuredItem2 = new Item("Conjured expired item", -4, 0);
      const notExpiredConjuredItem = new Item("Conjured not expired item", 15, 1);
      const notExpiredConjuredItem2 = new Item("Conjured not expired item", 3, 0);
      const gildedRose = new Shop([expiredConjuredItem, expiredConjuredItem2, notExpiredConjuredItem, notExpiredConjuredItem2]);
      gildedRose.updateQuality();
      expect(expiredConjuredItem.quality).to.equal(0);
      expect(expiredConjuredItem2.quality).to.equal(0);
      expect(notExpiredConjuredItem.quality).to.equal(0);
      expect(notExpiredConjuredItem2.quality).to.equal(0);
    });
  })
});
