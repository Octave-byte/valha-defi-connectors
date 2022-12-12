import { getNodeProvider } from 'src/utils/getNodeProvider';
import { erc20BalanceOf } from 'src/utils/ERC20BalanceOf';
import { erc20Decimals } from 'src/utils/ERC20Decimals';
import PoolTokenABI from 'src/connectors/maple/V3/abi/PoolToken.json';
import { ethers } from 'ethers';

export async function checkMapleV3Liquidity(
  chain: string,
  poolAddress: string,
  tokenAddress: string,
): Promise<any> {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error('No provider was found.');
    const POOL = new ethers.Contract(poolAddress, PoolTokenABI, provider);
    const LiquidityLockerAddress = await POOL.liquidityLocker();
    const liquidityBN = await erc20BalanceOf(
      provider,
      tokenAddress,
      LiquidityLockerAddress,
    );
    const decimals = await erc20Decimals(provider, tokenAddress);
    const liquidity = liquidityBN / 10 ** decimals;
    return { data: liquidity, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}