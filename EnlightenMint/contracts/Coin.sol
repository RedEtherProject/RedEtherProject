// Specifies that the source code is for a version
// of Solidity greater than 0.5.0
pragma solidity >=0.5.0 <0.7.0;

contract Coin {
  address public minter;

  mapping (address => uint) public balances;

  event Sent(address from, address to, uint amount);

  constructor() public {
    //msg is a global variable written into the blockchain
    minter = msg.sender;
  }

  function mint(address receiver, uint amount) public {
    //require must return true or else it will not update state
    require(msg.sender == minter, "You are not validation");
    require(amount < 1e60, "You have exceeded mint amount");
    balances[receiver] += amount;
  }

  function send(address receiver, uint amount) public {
    require(amount <= balances[msg.sender], "Insufficient Eth");
    balances[msg.sender] -= amount;
    balances[receiver] += amount;
    emit Sent(msg.sender, receiver, amount);
  }

}