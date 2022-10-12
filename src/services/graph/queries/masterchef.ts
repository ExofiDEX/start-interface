import gql from 'graphql-tag'

export const poolsQuery = gql`
  query poolsQuery(
    $first: Int! = 1000
    $skip: Int! = 0
    $orderBy: String! = "id"
    $orderDirection: String! = "desc"
    $block: Block_height # $where: Pool_filter! = { allocPoint_gt: 0, accFermionPerShare_gt: 0 }
  ) {
    pools(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, block: $block) {
      id
      pair
      allocPoint
      lastRewardBlock
      accFermionPerShare
      balance
      userCount
      magneticFieldGenerator {
        id
        fermionPerBlock
        totalAllocPoint
      }
    }
  }
`

export const masterChefV1PairAddressesQuery = gql`
  query masterChefV1PairAddresses(
    $first: Int! = 1000
    $skip: Int! = 0
    $orderBy: String! = "id"
    $orderDirection: String! = "desc" # $where: Pool_filter! = { allocPoint_gt: 0, accFermionPerShare_gt: 0 }
  ) {
    pools(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {
      id
      allocPoint
      accFermionPerShare
      pair {
        id
      }
    }
  }
`

export const masterChefV1TotalAllocPointQuery = gql`
  query masterChefV1TotalAllocPoint($id: String! = "0xe4b36518a12339422D1E12f567E4Fa203088e000") {
    magneticFieldGenerator(id: $id) {
      id
      totalAllocPoint
    }
  }
`

export const masterChefV1SushiPerBlockQuery = gql`
  query masterChefV1SushiPerBlock($id: String! = "0xe4b36518a12339422D1E12f567E4Fa203088e000") {
    magneticFieldGenerator(id: $id) {
      id
      fermionPerBlock
    }
  }
`

export const userPoolsQuery = gql`
  query userPools($where: User_filter) {
    users(where: $where) {
      id
      pool {
        id
      }
    }
  }
`
