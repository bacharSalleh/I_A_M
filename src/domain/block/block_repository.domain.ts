import { BlockTime } from "@Domain/block/bloc_time_value.domain";
import { Block } from "@Domain/block/block_entity.domain";

export  interface BlockRepository {
    isExist(jti: string) : Promise<boolean>;
    isExistBeforeDate(jti: string, date: Date) : Promise<boolean>;
    save(jti, blockTime: BlockTime): Promise<Block>;
    destroy(jti): Promise<boolean>;
}