import { generateUUID } from "@Test/test_tools";
import blockService from "@Domain/services/block_service.domain";
import {
  getBlockInfo,
  initDbForTests,
  destroyAllBlocks,
  saveBlockToDB
} from "@Test/db_helper";
import { BlockTime } from "@Domain/block/bloc_time_value.domain";
import {
  JTI_BLOCKED_BEFORE,
  INVALID_BLOCK_PERIOD,
  INVALID_JTI
} from "@Messages";
import { nowBySeconds } from "@Utils/date_tools";
import { MINUTE } from "@Utils/statics";

beforeAll(async () => {
  await initDbForTests();
});

beforeEach(async () => {
  await destroyAllBlocks();
});

test("Block__NonExistedJti_ForEver__BlockInfo", async () => {
  const fakeJti = generateUUID();

  const blockInfo = await blockService.block(fakeJti, new BlockTime(true));
  const blockInfoDB = await getBlockInfo(fakeJti);

  expect(blockInfo.data.jti).toBe(fakeJti);
  expect(blockInfo.data.forEver).toBe(true);
  expect(blockInfoDB.jti).toBe(fakeJti);
  expect(blockInfoDB.forEver).toBe(true);
});

test("Block__ExistedJti_ForEver__Error'JTI Blocked Before'", async () => {
  const fakeJti = generateUUID();

  await saveBlockToDB(fakeJti, new BlockTime(true));
  try {
    const blockInfo = await blockService.block(fakeJti, new BlockTime(true));
  } catch (error) {
    expect(error.message).toMatch(JTI_BLOCKED_BEFORE);
  }
});

test("Block__NonExistedJti_ForOneDay__BlockInfo", async () => {
  const fakeJti = generateUUID();
  const from = nowBySeconds();
  const to = from + 60 * MINUTE * 24;

  const blockInfo = await blockService.block(
    fakeJti,
    new BlockTime(false, from, to)
  );
  const blockInfoDB = await getBlockInfo(fakeJti);

  expect(blockInfo.data.jti).toBe(fakeJti);
  expect(blockInfo.data.forEver).toBe(false);
  expect(blockInfo.data.from.getTime()).toBe(from);
  expect(blockInfo.data.to.getTime()).toBe(to);
  expect(blockInfoDB.jti).toBe(fakeJti);
  expect(blockInfoDB.forEver).toBe(false);
  expect(blockInfoDB.from.getTime()).toBe(from);
  expect(blockInfoDB.to.getTime()).toBe(to);
});

test("Block__NonExistedJti_FromWithoutTo__Error'Invalid Block Period'", async () => {
  const fakeJti = generateUUID();
  const from = nowBySeconds();

  try {
    const blockInfo = await blockService.block(
      fakeJti,
      new BlockTime(false, from, null)
    );
    expect(1).toBe(0);
  } catch (error) {
    expect(error.message).toMatch(INVALID_BLOCK_PERIOD);
  }
});

test("Block__NonExistedJti_ToWithoutFrom__Error'Invalid Block Period'", async () => {
  const fakeJti = generateUUID();
  const to = nowBySeconds() + 5 * MINUTE;

  try {
    const blockInfo = await blockService.block(
      fakeJti,
      new BlockTime(false, null, to)
    );
    expect(1).toBe(0);
  } catch (error) {
    expect(error.message).toMatch(INVALID_BLOCK_PERIOD);
  }
});

test("Block__NonExistedJti_ToSmallerThanFrom__Error'Invalid Block Period'", async () => {
  const fakeJti = generateUUID();
  const from = nowBySeconds();
  const to = from + 5 * MINUTE;

  try {
    const blockInfo = await blockService.block(
      fakeJti,
      new BlockTime(false, to, from)
    );
    console.log(blockInfo.data.from.getTime());
    console.log(blockInfo.data.to.getTime());

    expect(1).toBe(0);
  } catch (error) {
    expect(error.message).toMatch(INVALID_BLOCK_PERIOD);
  }
});

test("UnBlock_ExistedJti_True", async () => {
  const fakeJti = generateUUID();

  await saveBlockToDB(fakeJti, new BlockTime(true));
  const isUnBlocked = await blockService.unBlock(fakeJti);

  const blockFromDb = await getBlockInfo(fakeJti);

  expect(blockFromDb).toBeFalsy();
  expect(isUnBlocked).toBe(true);
});

test("UnBlock_NonExistedJti_False", async () => {
  const fakeJti = generateUUID();

  const isUnBlocked = await blockService.unBlock(fakeJti);
  expect(isUnBlocked).toBe(false);
});

