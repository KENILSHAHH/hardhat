import hre from "hardhat";

async function main() {
  console.log("Deploying SimpleStorage contract...");

  // Get wallet client (signer)
  const [deployer] = await hre.viem.getWalletClients();
  console.log("Deploying from address:", deployer.account.address);

  // Deploy the contract
  const simpleStorage = await hre.viem.deployContract("contracts/SimpleStorage.sol:SimpleStorage");
  console.log("SimpleStorage deployed at:", `https://amoy.polygonscan.com/address/${simpleStorage.address}`);

  // Interact with the contract
  console.log("\nSetting data to 42...");
  await simpleStorage.write.set([42n]);

  console.log("Fetching stored data...");
  const storedData = await simpleStorage.read.get();
  console.log("Stored Data:", storedData.toString()); // Convert BigInt to string

  console.log("\nUpdating data to 100...");
  await simpleStorage.write.set([100n]);

  console.log("Fetching updated data...");
  const updatedData = await simpleStorage.read.get();
  console.log("Updated Data:", updatedData.toString());
}

// Run the script and handle errors
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
