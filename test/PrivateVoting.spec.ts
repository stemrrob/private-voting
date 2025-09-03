import { PrivateVoting, PrivateVoting__factory } from "../types";
import { ethers, fhevm } from "hardhat";
import { FhevmType } from "@fhevm/hardhat-plugin";
import { expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("PrivateVoting", function () {
  let voting: PrivateVoting;
  let deployer: HardhatEthersSigner;
  let alice: HardhatEthersSigner;
  let bob: HardhatEthersSigner;
  let contractAddress: string;

  beforeEach(async () => {
    [deployer, alice, bob] = await ethers.getSigners();
    const factory = (await ethers.getContractFactory("PrivateVoting")) as PrivateVoting__factory;
    voting = (await factory.deploy(30)) as PrivateVoting; // voting duration 30s
    contractAddress = await voting.getAddress();
  });

  it("should allow encrypted voting and reveal encrypted tally", async function () {
    const encOneAlice = await fhevm.createEncryptedInput(contractAddress, alice.address).add64(1).encrypt();
    const encOneBob = await fhevm.createEncryptedInput(contractAddress, bob.address).add64(1).encrypt();

    await (await voting.connect(alice).vote(1, encOneAlice.handles[0], encOneAlice.inputProof)).wait();
    await (await voting.connect(bob).vote(2, encOneBob.handles[0], encOneBob.inputProof)).wait();

    await ethers.provider.send("evm_increaseTime", [40]);
    await ethers.provider.send("evm_mine");

    const tally1 = await voting.getTally(1);
    const tally2 = await voting.getTally(2);

    const clear1 = await fhevm.userDecryptEuint(FhevmType.euint64, tally1, contractAddress, deployer);
    const clear2 = await fhevm.userDecryptEuint(FhevmType.euint64, tally2, contractAddress, deployer);

    expect(clear1).to.eq(1);
    expect(clear2).to.eq(1);
  });

  it("should prevent double voting", async function () {
    const encOne = await fhevm.createEncryptedInput(contractAddress, alice.address).add64(1).encrypt();
    await (await voting.connect(alice).vote(1, encOne.handles[0], encOne.inputProof)).wait();

    await expect(
      voting.connect(alice).vote(1, encOne.handles[0], encOne.inputProof)
    ).to.be.revertedWithCustomError(voting, "AlreadyVoted");
  });
});
