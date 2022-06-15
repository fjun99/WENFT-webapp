export const BadgeTokenABI = [
    'constructor()',
    'event Approval(address indexed,address indexed,uint256 indexed)',
    'event ApprovalForAll(address indexed,address indexed,bool)',
    'event Transfer(address indexed,address indexed,uint256 indexed)',
    'function approve(address,uint256)',
    'function balanceOf(address) view returns (uint256)',
    'function getApproved(uint256) view returns (address)',
    'function isApprovedForAll(address,address) view returns (bool)',
    'function mintTo(uint256)',
    'function name() view returns (string)',
    'function ownerOf(uint256) view returns (address)',
    'function safeTransferFrom(address,address,uint256)',
    'function safeTransferFrom(address,address,uint256,bytes)',
    'function setApprovalForAll(address,bool)',
    'function supportsInterface(bytes4) view returns (bool)',
    'function symbol() view returns (string)',
    'function tokenURI(uint256) view returns (string)',
    'function transferFrom(address,address,uint256)'
  ];


/* == get Minimal Human-Readable ABI using ethers.js ==

abifile = require("./artifacts/contracts/BadgeToken.sol/BadgeToken.json")

const iface = new ethers.utils.Interface(abifile.abi)

iface.format(ethers.utils.FormatTypes.minimal)

*/
