const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// biome-ignore lint: type is not exported
module.exports = buildModule("SimplePurchaseModule", (m: any) => {
  
    const acceptedToken = "0x1da96e468a07f45d44ccc0acf86b4838ad8b6";
    const token = "0x15ba74027961f20151efedb604be1d819202a";

    const simplePurchase = m.contract("SimplePurchase", [acceptedToken, token]);

  return { simplePurchase };
});
