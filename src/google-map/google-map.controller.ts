import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GoogleMapService } from './google-map.service';
import { IStore } from './google-map.types';

@Controller('google-map')
export class GoogleMapController {
  constructor(private googleMapService: GoogleMapService) {}

  /**
   * Get routes to get any store's location and other details by it's id.
   * @param id -> id of store
   * @returns -> store object
   */
  @Get(':id')
  async getLocation(@Param('id') id: string) {
    return this.googleMapService.getLocation(id);
  }

  /**
   * Post routes to create new store data in db
   * @param storeData -> IStore object to store datain db
   * @returns -> new store object with success message
   */
  @Post()
  async addStore(@Body() storeData: IStore) {
    return this.googleMapService.addStore(storeData);
  }

  /**
   * Put routes to update data of any store my id. It's not allowed to update store id other than that any thing can be updated.
   * @param id -> store id for which we want to update
   * @param queryObj -> fileds we want to update
   * @returns -> successfull message after update store data
   */
  @Put(':id')
  async updateStore(@Param('id') id: string, @Query() queryObj) {
    return this.googleMapService.updateStore(id, queryObj);
  }

  /**
   * Delete route to remove store data from db
   * @param id -> store id to delete data
   * @returns -> successful message of deleted store
   */
  @Delete(':id')
  async deleteStore(@Param('id') id: string) {
    return this.googleMapService.deleteStore(id);
  }
}
