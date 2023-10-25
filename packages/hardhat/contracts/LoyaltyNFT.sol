// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, Ownable, ERC721URIStorage {
    uint256 private _nextTokenId;

    constructor(address initialOwner, string memory _tokenName, string memory _tokenSymbol)
        ERC721(_tokenName, _tokenSymbol)
        Ownable(initialOwner)
    {}

    function safeMint(address to, string memory tokenUri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenUri);
    }
}
