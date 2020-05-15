
export const abi = [
  {
    type: 'function',
    name: 'balanceOf',
    constant: true,
    inputs: [
      { type: 'address' }
    ],
    outputs: [
      { type: 'uint256' }
    ],
    payable: false,
    stateMutability: 'view'
  }, {
    type: 'function',
    name: 'name',
    constant: true,
    inputs: [],
    outputs: [
      { type: 'string' }
    ],
    payable: false,
    stateMutability: 'view'
  }, {
    type: 'function',
    name: 'symbol',
    constant: true,
    inputs: [],
    outputs: [
      { type: 'string' }
    ],
    payable: false,
    stateMutability: 'view'
  }, {
    type: 'function',
    name: 'decimals',
    constant: true,
    inputs: [],
    outputs: [
      { type: 'uint256' }
    ],
    payable: false,
    stateMutability: 'view'
  }
]
