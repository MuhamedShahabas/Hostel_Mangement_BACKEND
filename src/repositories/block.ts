import { CRUD } from "./CRUD";
import { IBlock, TotalRoomOccupancy } from "../interfaces/block";
import { BlockModel } from "../models/block";
import ErrorResponses from "../error/ErrorResponses";

export abstract class BlockRepo extends CRUD {
  // Block model
  model = BlockModel;

  // Get all blocks
  protected async getAll(): Promise<IBlock[] | null> {
    return await this.findAll<IBlock>();
  }

  // Update room by block ID
  protected async updateRoomByBlockId(_id: string, roomCode: string, data: any) {
    return await this.findOneAndUpdate<IBlock>({ _id, "rooms.code": roomCode }, data);
  }

  // Update room by code
  protected async updateRoomByCode(roomCode: string, data: any) {
    return await this.findOneAndUpdate<IBlock>({ code: roomCode[0], "rooms.code": roomCode }, data);
  }

  // Vacate room by _id and code
  protected async vacateRoomByCode(_id: string, roomCode: string, resident: boolean = false) {
    const updatedBlock = await this.findOneAndUpdate<IBlock>(
      { _id, "rooms.code": roomCode },
      {
        $unset: { "rooms.$.student": 1 },
        $set: { "rooms.$.availability": true },
        $inc: { occupancy: resident ? 0 : -1 },
      }
    );
    if (!updatedBlock) throw ErrorResponses.noDataFound("block");
    return updatedBlock;
  }

  // Total Room occupancy
  protected async totalOccupancy(): Promise<TotalRoomOccupancy> {
    const aggregatedResult = await this.model.aggregate([
      {
        $match: {},
      },
      {
        $group: {
          _id: null,
          occupancy: { $sum: "$occupancy" },
          totalRooms: { $sum: { $size: "$rooms" } },
        },
      },
    ]);
    const allBlocksData = aggregatedResult[0];
    const activeRoomsData = await this.model.aggregate([
      { $match: {} },
      {
        $unwind: "$rooms",
      },
    ]);
    const availableRooms = activeRoomsData.filter(({ rooms }) => rooms.availability).length;
    return {
      ...allBlocksData,
      availableRooms,
    };
  }

  // Create a new block
  protected async createNew(data: IBlock): Promise<IBlock | null> {
    return await this.create<IBlock>(data);
  }

  // Delete block
  protected async deleteBlockById(_id: string): Promise<IBlock | null> {
    return await this.findByIdAndDelete<IBlock>(_id);
  }

  // Update block by _id
  protected async updateBlockById(_id: string, data: any): Promise<IBlock | null> {
    return await this.findByIdAndUpdate<IBlock>(_id, data);
  }
}
