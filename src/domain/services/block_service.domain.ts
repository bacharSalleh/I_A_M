import { Block } from "@Domain/block/block_entity.domain";
import { JTI_BLOCKED_BEFORE, INVALID_BLOCK_PERIOD } from "@Messages";
import { BlockManager } from "@Domain/block/block_manager.domain";
import { BlockTime } from "@Domain/block/bloc_time_value.domain";
import BlocRepostioryImp from "@Data/block.repository";
import { DTO } from "@Shared/dto";
import { BlockedDTO } from "@Domain/shared/interfaces";

class BlockService {
  private blockManager = new BlockManager(BlocRepostioryImp);

  public async block(jti: string, blockTime: BlockTime) {
    if (!this.isBlockTimeValid(blockTime)) throw Error(INVALID_BLOCK_PERIOD);

    const isBlocked = await this.blockManager.isBlocked(jti);

    if (!isBlocked) {
      const blockedInfo: Block = await this.blockManager.block(jti, blockTime);

      let info: BlockedDTO;

      if (blockTime.forEver) {
        info = {
          jti: blockedInfo.jti,
          forEver: true
        };
      } else {
        info = {
          jti: blockedInfo.jti,
          forEver: false,
          from: blockedInfo.from,
          to: blockedInfo.to
        };
      }
      return new DTO<BlockedDTO>(null, info);
    }

    throw Error(JTI_BLOCKED_BEFORE);
  }

  public async unBlock(jti: string) {

    const isUnBlocked = await this.blockManager.unBlock(jti);

    if (isUnBlocked) return true;
    return false;
  }

  private isBlockTimeValid(blockTime: BlockTime): boolean {
    if (blockTime.forEver) return true;

    if (typeof blockTime.from == "number" && typeof blockTime.to == "number") {
      if (blockTime.from < blockTime.to) return true;
    }

    return false;
  }
}

export default new BlockService();
