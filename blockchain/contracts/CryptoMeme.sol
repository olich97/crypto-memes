//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// https://docs.openzeppelin.com/contracts/5.x/erc1155
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// https://docs.openzeppelin.com/contracts/access-control
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Crypto Memes
 * @author Oleh Andrushko (https://olich.me)
 * @dev The contract for crypto memes platfrom (https://cryptomemes.olich.me): create, own, buy, get rewards and have fun
 */
contract CryptoMeme is ERC1155, Ownable {
    // ID for fungible token used as coins on the platform
    // CryptoMeme Coin (CMC) token amount will be rappresented with two decimals,
    // means need to divide the token amount by 100 to get its user representation
    uint256 public constant MEME_COIN = 0;

    // reward for creating a new meme in CryptoMeme Coin token (CMC)
    uint256 public MEME_CREATION_REWARD = 100; // 1.00 CMC = 0.01 Eth

    // max memes hosted by the platfrom, just in case to be sure
    uint64 public MAX_MEMES_SUPPLY = type(uint64).max;

    /**
     * @dev Mapping form memeIs to info
     */
    mapping(uint256 => MemeInfo) public memeInfos;

    /**
     * @dev List of memes in the platfrom
     */
    uint256[] public memeIds;

    /**
     * @dev Mapping enforcing unique hashes
     */
    mapping(bytes32 => bool) _hashExists;

    /**
     * @dev Main Meme Object
     */
    struct MemeInfo {
        address owner;
        uint256 createdAt; // unix timestamp then meme was minted
        uint256 price; // in CMC
        bool isForSale;
        uint256 id;
    }

    constructor(
        address initialOwner,
        string memory _baseUri
    ) ERC1155(_baseUri) Ownable(initialOwner) {}

    /**
     * @dev Sets base token uri
     */
    function setURI(string memory _newUri) public onlyOwner {
        _setURI(_newUri);
    }

    /****************************************|
    |       Memes Management                 |
    |_______________________________________*/

    /**
     * @dev Mint a new meme nft
     * @param _hash meme hash (should be text + content sha256)
     * @param price meme starting price
     * @param isForSale set meme for sale
     */
    function createMeme(bytes32 _hash, uint256 price, bool isForSale) external {
        require(price > 0, "Starting price should be greater than 0");
        require(!_hashExists[_hash], "Meme was already created");
        require(
            memeIds.length <= MAX_MEMES_SUPPLY,
            "Maximum meme supply reached"
        );
        // generate an unique id from the hash
        uint256 memeId = uint256(_hash);
        MemeInfo memory meme = MemeInfo({
            id: memeId,
            owner: msg.sender,
            createdAt: block.timestamp,
            price: price,
            isForSale: isForSale
        });
        memeInfos[memeId] = meme;
        memeIds.push(memeId);
        // mark hash as used, for uniuque memes
        _hashExists[_hash] = true;

        // mint a unique meme NFT
        _mint(msg.sender, memeId, 1, "");
        // reward creator with Meme Coins
        _mint(
            msg.sender,
            MEME_COIN,
            MEME_CREATION_REWARD,
            "MEME_CREATION_REWARD"
        );
    }

    /**
     * @dev Buy a meme from onother user
     * @param memeId token id
     */
    function buyMeme(uint256 memeId) external payable {
        require(memeInfos[memeId].owner != address(0), "Meme does not exists");
        require(
            memeInfos[memeId].owner != msg.sender,
            "Sender already owns current meme"
        );
        require(memeInfos[memeId].isForSale, "Meme is NOT for sale");
        require(
            balanceOf(msg.sender, MEME_COIN) >= memeInfos[memeId].price,
            "Insufficient balance to buy meme"
        );
        require(msg.value == memeInfos[memeId].price, "Incorrect meme price");
        // TODO: reetrancy attack

        // transfer meme coins to the seller
        _safeTransferFrom(
            msg.sender,
            memeInfos[memeId].owner,
            MEME_COIN,
            msg.value,
            "CMC_TRANSFER"
        );
        // transfer meme nft to buyer
        _safeTransferFrom(
            memeInfos[memeId].owner,
            msg.sender,
            memeId,
            1,
            "MEME_TRANSFER"
        );
        // change the owner
        memeInfos[memeId].owner = msg.sender;
    }

    /**
     * @dev Set meme price
     * @param memeId token id
     */
    function setMemePrice(uint256 memeId, uint256 price) external {
        require(memeInfos[memeId].owner != address(0), "Meme does not exists");
        require(price > 0, "Starting price should be greater than 0");
        require(
            memeInfos[memeId].owner == msg.sender,
            "Caller is not an owner of the meme"
        );

        memeInfos[memeId].price = price;
    }

    /**
     * @dev Set/unset for sale
     * @param memeId token id
     */
    function setMemeSale(uint256 memeId, bool isForSale) external {
        require(memeInfos[memeId].owner != address(0), "Meme does not exists");
        require(
            memeInfos[memeId].owner == msg.sender,
            "Caller is not an owner of the meme"
        );

        memeInfos[memeId].isForSale = isForSale;
    }

    /**
     * @dev Get all memes in the platform
     */
    function getMemes() external view returns (MemeInfo[] memory) {
        MemeInfo[] memory result = new MemeInfo[](memeIds.length);
        for (uint64 i = 0; i < memeIds.length; i++) {
            result[i] = getMeme(memeIds[i]);
        }
        return result;
    }

    /**
     * @dev Get info about meme
     * @param memeId token id
     */
    function getMeme(uint memeId) public view returns (MemeInfo memory) {
        return memeInfos[memeId];
    }
}
