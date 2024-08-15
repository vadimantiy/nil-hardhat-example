import {task} from "hardhat/config";
import {ethers} from "ethers";

task("simplepurchase", "Simple Purchase")
    .addParam("contract", "The address of the purchase contract")
    .setAction(async (taskArgs, hre) => {

        const walletAddress = hre.userConfig.walletAddress;

        const Wallet = await hre.ethers.getContractFactory("Wallet");
        const wallet = Wallet.attach(walletAddress);

        console.log("asyncCall wallet =", wallet.asyncCall);
        
        const acall = await wallet.asyncCall(
            taskArgs.contract,
            walletAddress,
            walletAddress,
            10000000,
            false,
            [
                {
                    "id": "0x1da96e468a07f45d44ccc0acf86b4838ad8b6",
                    "amount": 77777
                }
            ],
            0,
            "0x25b31a970000000000000000000000000001da96e468a07f45d44ccc0acf86b4838ad8b6"  // abi encoded purchase(address)
        );
        await acall.wait(0);
        
});
