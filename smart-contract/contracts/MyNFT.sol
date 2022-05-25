// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract MyNFT is ERC721URIStorage {
    uint public tokenID;
    constructor() ERC721("Blink NFT","BLINK"){}
    
    function mint(string memory _tokenURI) external returns(uint){
         tokenID++;
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, _tokenURI);
        return tokenID;
    }
}