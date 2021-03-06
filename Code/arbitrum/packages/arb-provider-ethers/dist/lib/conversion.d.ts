import { BigNumber, BigNumberish } from 'ethers/utils';
export declare class ArbConversion {
    readonly ticksPerBlock: BigNumber;
    readonly secondsPerBlock: BigNumber;
    readonly gasPerSecond: number;
    readonly gasPerStep: number;
    constructor(ticksPerBlock?: BigNumber, secondsPerBlock?: BigNumber, gasPerSecond?: number, gasPerStep?: number);
    blocksToSeconds(blocks: BigNumberish): BigNumber;
    blocksToTicks(blocks: BigNumberish): BigNumber;
    ticksToBlocks(ticks: BigNumber): BigNumber;
    ticksToSeconds(ticks: BigNumber): BigNumber;
    secondsToBlocks(seconds: BigNumberish): BigNumber;
    secondsToTicks(seconds: BigNumberish): BigNumber;
    cpuFactorToSpeedLimitSecs(factor: number): number;
    speedLimitSecsToCpuFactor(seconds: number): number;
    assertionTimeToSteps(seconds: number, speedLimitSeconds: number): number;
    stepsToAssertionTime(steps: number, speedLimitSeconds: number): number;
}
