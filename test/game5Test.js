const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);
    // good luck
    const privKey = '0x8cec9e1ad414ba90c3eaa96ac3c781f64aa4ea7b63d3fe940e6dc1b9247f54b5';

    const wallet = new ethers.Wallet(privKey, ethers.provider);

    await ethers.provider.getSigner(0).sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther('1')
    })

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
