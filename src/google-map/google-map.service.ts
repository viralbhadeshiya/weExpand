import { Injectable } from '@nestjs/common';
import { IStore } from './google-map.types';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class GoogleMapService {
  // Local instant for db just to show how it will work because I don't know how to implement docker.
  public dbInstance: Array<IStore> = [];

  // Get location by Id
  public async getLocation(storeId: string): Promise<IStore | string> {
    try {
      if (!storeId) {
        throw new Error('Invalid get location request');
      }
      /*
        Sql query =>
        SELECT * FROM `Store`
      */
      const store = this.dbInstance.find((obj) => obj.id === storeId);
      return store;
    } catch (err) {
      if (err && err.msg) {
        return err.msg;
      }
      return `Unhandled error while fetching data ${err}`;
    }
  }

  // Add store data
  public async addStore(storeData: IStore): Promise<string> {
    try {
      if (
        !storeData.name ||
        !storeData.lan ||
        !storeData.log ||
        !storeData.businessType
      ) {
        throw new Error('Invalid Request for create store');
      }

      /*
        sql query ->
        INSERT INTO `Store` ( 'name', 'lan', 'log' , 'businessType') 
        VALUES (`${storeData.name}`, `${storeData.lan}`, `${storeData.log}`, `${storeData.businessType}`)
      */

      const addObj = {
        id: uuidV4(),
        ...storeData,
      };
      this.dbInstance.push(addObj);
      return `Store created SuccessFully. ${JSON.stringify(addObj)}`;
    } catch (err) {
      if (err && err.msg) {
        return err.msg;
      }
      return `Unhandled error while adding data ${err}`;
    }
  }

  // Update any fileds from store data by it's id.
  public async updateStore(
    storeId: string,
    storeFields: IStore,
  ): Promise<string> {
    try {
      if (!storeId || storeFields.id) {
        throw new Error('Invalid update location request');
      }

      /*
        sql query ->
        UPDATE `Store`
        SET 'name' = storeData.name, 'lan' = storeData.lan, 'log'  = storeData.log, 'businessType' = storeData.businessType
        WHERE id = storeId
      */
      this.dbInstance.find((obj) => {
        if (obj.id === storeId) {
          if (storeFields.businessType) {
            obj.businessType = storeFields.businessType;
          }
          if (storeFields.name) {
            obj.name = storeFields.name;
          }
          if (storeFields.lan) {
            obj.lan = storeFields.lan;
          }
          if (storeFields.log) {
            obj.log = storeFields.log;
          }
        }
      });
      return `${storeId} store updated successfully`;
    } catch (err) {
      if (err && err.msg) {
        return err.msg;
      }
      return `Unhandled error while updating data ${err}`;
    }
  }

  // Delete store data by Id
  public async deleteStore(storeId: string): Promise<string> {
    try {
      if (!storeId) {
        throw new Error('Invalid get location request');
      }

      /*
        sql query ->
        DELETE FROM `store`
        WHERE id = storeID;
      */
      this.dbInstance = this.dbInstance.filter((obj) => obj.id !== storeId);
      return `${storeId} store removed succesfully`;
    } catch (err) {
      if (err && err.msg) {
        return err.msg;
      }
      return `Unhandled error while deleting data ${err}`;
    }
  }
}
