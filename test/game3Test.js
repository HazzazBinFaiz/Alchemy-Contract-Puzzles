const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();

    return { game, signer };
  }

  it('should be a winner', async function () {
    const { game, signer, address } = await loadFixture(deployContractAndSetVariables);

    const account1 = signer;
    const account2 = ethers.provider.getSigner(1);
    const account3 = ethers.provider.getSigner(2);

    // to call a contract as a signer you can use contract.connect
    await game.connect(account1).buy({ value: '2' });
    await game.connect(account2).buy({ value: '3' });
    await game.connect(account3).buy({ value: '1' });

    // TODO: win expects three arguments
    await game.win(
      await account1.getAddress(),
      await account2.getAddress(),
      await account3.getAddress(),
    );

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
