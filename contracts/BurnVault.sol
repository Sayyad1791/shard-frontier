// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITestToken {
function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract BurnVault {
address public owner;
ITestToken public token;

event Burned(address indexed player, uint256 amount);

constructor(address _token) {
owner = msg.sender;
token = ITestToken(_token);
}

function burn(uint256 amount) external {
require(token.transferFrom(msg.sender, address(0), amount), "Transfer failed");
emit Burned(msg.sender, amount);
}
}