import { ObjectID } from 'bson';
export class User {
  constructor({ name, _partition, _id = String(new ObjectId()) }) {
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
    primaryKey: '_id',
  };
}
export class Address {
  constructor({
    _id = new ObjectID(),
    addressId,
    department,
    departmentId,
    fullAddress,
  }) {
    this._id = _id;
    this.addressId = addressId;
    this.department = department;
    this.departmentId = departmentId;
    this.fullAddress = fullAddress;
  }
  static schema = {
    name: 'Addresses',
    properties: {
      _id: 'objectId',
      addressId: 'int',
      department: 'string',
      departmentId: 'int',
      fullAddress: 'string',
    },
    primaryKey: '_id',
  };
}

export class Order {
  constructor(
    _id = new ObjectID(),
    _partition,
    addressId,
    department,
    departmentId,
    description,
    fullAddress,
    locality,
    localityId,
    sector,
    sectorId
  ) {
    this._id = _id;
    this.addressId = addressId;
    this.description = description;
    this.department = department;
    this.departmentId = departmentId;
    this.fullAddress = fullAddress;
    this.locality = locality;
    this.localityId = localityId;
    this.sector = sector;
    this.sectorId = sectorId;
  }

  static schema = {
    name: 'Orders',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      addressId: 'int',
      department: 'string',
      departmentId: 'int',
      description: 'string',
      fullAddress: 'string',
      locality: 'string',
      localityId: 'int',
      sector: 'string',
      sectorId: 'int',
    },
    primaryKey: '_id',
  };
}
