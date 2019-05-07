import { BlockRepository } from "@Domain/block/block_repository.domain";
import { BlockTime } from "@Domain/block/bloc_time_value.domain";
import BlockModel from "@Data/models/block.model";
import { Block } from "@Domain/block/block_entity.domain";
import { Sequelize } from "sequelize-typescript";

class BlockRepositoryImpl implements BlockRepository {
  public async destroy(jti: any): Promise<boolean> {
    const isDestroyed = await BlockModel.destroy({ where: { jti: jti } });
    return isDestroyed ? true : false;
  }

  public async isExist(jti: string): Promise<boolean> {
    const isExist = await BlockModel.findOne({ where: { jti: jti } });

    return isExist ? true : false;
  }

  public async isExistBeforeDate(jti: string, date: Date): Promise<boolean> {
    const isExist = await BlockModel.findOne({
      where: {
        jti: jti,
        [Sequelize.Op.or]: [
          { to: { [Sequelize.Op.gt]: date } },
          { forEver: true }
        ]
      }
    });

    // if (isExist) {
    //   console.log(jti, date);
    //   console.log(isExist.jti, isExist.to);
    // }

    return isExist ? true : false;
  }

  public async save(jti: any, blockTime: BlockTime): Promise<Block> {
    const savedBlock = await BlockModel.create({
      jti: jti,
      from: blockTime.from,
      to: blockTime.to,
      forEver: blockTime.forEver
    });

    return new Block(
      savedBlock.jti,
      new BlockTime(savedBlock.forEver, savedBlock.from, savedBlock.to)
    );
  }
}

export default new BlockRepositoryImpl();
