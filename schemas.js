import { ObjectId } from "bson";

export class Sale {
  constructor({
    _partition,
    _id = new ObjectId(),
    itemId,
    quantity,
    salePersonId,
    total,
  }) {
    this._partition = _partition;
    this._id = _id;
    this.itemId = itemId;
    this.quantity = quantity;
    this.salePersonId = salePersonId;
    this.total = total;
  }
  static schema = {
    name: 'Sales',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      itemId: 'objectId',
      quantity: 'int',
      salePersonId: 'objectId',
      total: 'double',
    },
    primaryKey: "_id",
  };
}
export class Items {
  constructor({
    name,
    partition,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
  }
  static schema = {
    name: 'Items',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      name: 'string',
    },
    primaryKey: "_id",
  }
}
export class User {
  constructor({
    name,
    _partition,
    _id = new ObjectId(),
  }) {
    this._partition = _partition;
    this._id = _id;
    this.name = name;
  }
  static schema = {
    name: 'Users',
    properties: {
      _id: 'string',
      _partition: 'string',
      name: 'string',
    },
    primaryKey: "_id",
  };
}
export class Salespeople {
  constructor({
    name,
    _partition,
    _id = new ObjectId(),
  }) {
    this._partition = _partition;
    this._id = _id;
    this.name = name;
  }
  static schema = {
    name: 'Salespeople',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      name: 'string',
    },
    primaryKey: "_id",
  };
}