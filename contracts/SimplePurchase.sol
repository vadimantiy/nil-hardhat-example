// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import "./nil/Nil.sol";
import "./nil/NilCurrencyBase.sol";

contract SimplePurchase {
    using Nil for address;

    uint256 public acceptedToken;
    uint256 public purchasedToken;

    receive() external payable {}

    constructor(uint256 _acceptedToken, uint256 _purchasedToken) {
        acceptedToken = _acceptedToken;
        purchasedToken = _purchasedToken;
    }

    function purchase(address destination) external payable {
        Nil.Token[] memory _msgTokens = Nil.msgTokens();
        require(_msgTokens.length == 1, "only 1 token should be attached");
        require(_msgTokens[0].id == acceptedToken, "wrong attached token");

        uint256 amount = _msgTokens[0].amount;
        require(amount > 0, "empty amount");

        uint256 purchasedAmount = amount * 2;

        Nil.Token[] memory purchasedTokens = new Nil.Token[](1);
        purchasedTokens[0] = Nil.Token({
            id: purchasedToken, // Use the tokenId passed as argument
            amount: purchasedAmount
        });

        bool success = Nil.asyncCall(
            destination,
            address(this),
            address(this),
            100000,
            0,
            false,
            0,
            purchasedTokens,
            ""
        );
        require(success, "Token transfer failed");
    }

}
