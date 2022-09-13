import gql from 'graphql-tag'

const blockFieldsQuery = gql`
  fragment blockFields on StatisticBlock {
    id
    lastBlockNumber
    lastTimestamp
    slidingBlockTimeMs
  }
`

export const blockQuery = gql`
  query blockQuery {
    statisticBlock(id: "Summary") {
      ...blockFields
    }
  }
  ${blockFieldsQuery}
`
