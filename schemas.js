import { ObjectId } from "bson";
class Item {
  constructor(
    id = new ObjectId(), name) {
    this._id = id,
      this.name = name
  }

  static schema = {
    name: 'items',
    properties: {
      _id: objectId,
      name: string,
    }
  }
}
class SalesPerson {
  constructor(
    id = new ObjectId(), name) {
    this._id = id,
      this.name = name
  }

  static schema = {
    name: 'salesPersons',
    properties: {
      _id: objectId,
      name: string,
    }
  }
}
class Sale {
  constructor(
    id = new ObjectId(), name) {
    this._id = id,
      this.name = name
  }

  static schema = {
    name: 'sales',
    properties: {
      _id: objectId,
      itemId: objectId,
      salePersonId: objectId,
      quantity: number,
      total: number
    }
  }
}

export { FormData, Sale };