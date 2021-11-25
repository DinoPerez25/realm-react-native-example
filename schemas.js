import { UUID } from "bson";

export class Sale {
  constructor({
    _partition,
    _id = new UUID(),
    itemId,
    quantity,
    salePersonId,
    total,
  }) {
    this._partition = _partition;
    this._id = _id;
    this.itemId = new UUID(itemId);
    this.quantity = quantity;
    this.salePersonId = new UUID(salePersonId);
    this.total = total;
  }
  static schema = {
    name: 'Sales',
    properties: {
      _id: 'uuid',
      _partition: 'string',
      itemId: 'uuid',
      quantity: 'int',
      salePersonId: 'uuid',
      total: 'double',
    },
    primaryKey: "_id",
  };
}
export class Items {
  constructor({
    name,
    partition,
    id = new UUID(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
  }
  static schema = {
    name: 'Items',
    properties: {
      _id: 'uuid',
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
    _id = String(new ObjectId()),
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
    _id = new UUID(),
  }) {
    this._partition = _partition;
    this._id = _id;
    this.name = name;
  }
  static schema = {
    name: 'Salespeople',
    properties: {
      _id: 'uuid',
      _partition: 'string',
      name: 'string',
    },
    primaryKey: "_id",
  };
}