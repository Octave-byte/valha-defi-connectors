/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const VaultABI = require('../abi/Vault.json');
const StakingABI = require('../abi/FairLaunch.json');
const { toBnERC20Decimals } = require('../../../../utils/toBNTokenDecimals');

const POOLID = {
  '0x800933d685e7dc753758ceb77c8bd34abf1e26d7': 24,
  '0x158da805682bdc8ee32d52833ad41e74bb951e59': 16,
  '0x7c9e73d4c71dae564d41f78d56439bb4ba87592f': 3,
  '0x3282d2a151ca00bfe7ed17aa16e42880248cd3cd': 20,
};

/// invest
async function deposit(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
) {
  const abi = VaultABI;
  const method_name = 'deposit';
  const position_token = underlying_tokens[0];
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: investing_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// unlock
async function unlock() {
  return {};
}

/// redeem
async function redeem(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
) {
  const abi = VaultABI;
  const method_name = 'withdraw';
  const position_token = pool_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: investing_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// stake
async function stake(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
) {
  const poolId = POOLID[pool_address.toLowerCase()];
  const abi = StakingABI;
  const method_name = 'deposit';
  const position_token = pool_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [userAddress, poolId, amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: position_token, // token needed to approve
    position_token_type: 'ERC-20', //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// unstake
async function unstake(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
) {
  const poolId = POOLID[pool_address.toLowerCase()];
  const abi = StakingABI;
  const method_name = 'withdraw';
  const position_token = pool_address;
  const amountBN = await toBnERC20Decimals(amountNotBN, chain, position_token);
  const args = [userAddress, poolId, amountBN];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null, // token needed to approve
    position_token_type: null, //token type to approve
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    amount: amountBN, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

/// claim
async function claimRewards(
  pool_name,
  chain,
  underlying_tokens,
  pool_address,
  investing_address,
  staking_address,
  boosting_address,
  distributor_address,
  rewards_tokens,
  metadata,
  amountNotBN,
  userAddress,
  receiverAddress,
  lockupTimestamp,
) {
  const abi = StakingABI;
  const method_name = 'harvest';
  const poolId = POOLID[pool_address.toLowerCase()];
  const args = [poolId];

  return {
    abi: abi, //json file name
    method_name: method_name, //method to interact with the pool
    position_token: null,
    position_token_type: null,
    interaction_address: staking_address, // contract to interact with to interact with poolAddress
    amount: null, //amount that will be use in the ERC20 approve tx of the position token is an ERC20 or that will be use as the 'value' of the transaction
    args: args, //args to pass to the smart contracts to trigger 'method_name'
  };
}

module.exports = {
  deposit: deposit,
  deposit_and_stake: null,
  unlock: null,
  redeem: redeem,
  stake: stake,
  unstake: unstake,
  boost: null,
  unboost: null,
  claim_rewards: claimRewards,
  claim_interests: null,
};
