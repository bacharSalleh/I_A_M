import { BlockTime } from "@Domain/block/bloc_time_value.domain";
import { BlockRepository } from "@Domain/block/block_repository.domain";
import { Block } from "@Domain/block/block_entity.domain";

export class BlockManager {
  private repo: BlockRepository;

  constructor(repo: BlockRepository) {
    this.repo = repo;
  }

  async block(jti: string, blockTime: BlockTime): Promise<Block> {
    const block: Block = await this.repo.save(jti, blockTime);
    return block;
  }

  public async unBlock(jti: string) {
    const isDestroyed = await this.repo.destroy(jti);
    return isDestroyed;
  }

  async isBlocked(jti: string): Promise<Boolean> {
    const isBlockedBefore = await this.repo.isExist(jti);

    if (isBlockedBefore) return true;
    return false;
  }
}
