import { ChainId } from '@exoda/core-sdk'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
// import Button from 'app/components/Button'
import ExternalLink from 'app/components/ExternalLink'
import Search from 'app/components/Search'
import Typography from 'app/components/Typography'
import { Feature } from 'app/enums'
import { Chef } from 'app/features/onsen/enum'
import FarmList from 'app/features/onsen/FarmList'
import OnsenFilter from 'app/features/onsen/FarmMenu'
import NetworkGuard from 'app/guards/Network'
import useFarmRewards from 'app/hooks/useFarmRewards'
import useFuse from 'app/hooks/useFuse'
import { TridentBody, TridentHeader } from 'app/layouts/Trident'
import { useUserPools } from 'app/services/graph'
import { useActiveWeb3React } from 'app/services/web3'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import React from 'react'

function Farm(): JSX.Element {
  const { i18n } = useLingui()

  const { account } = useActiveWeb3React()

  const router = useRouter()

  const type = !router.query.filter ? 'all' : (router.query.filter as string)

  // const queryOrActiveAccount = useMemo(
  //   () => (router.query.account ? (router.query.account as string) : account),
  //   [account, router.query.account]
  // )

  // console.log({ queryOrActiveAccount })

  const chainId = Number(router.query.chainId)
  const userPools = useUserPools({
    chainId,
    variables: { where: { address: account?.toLowerCase() } },
  })

  const FILTER = {
    // @ts-ignore TYPE NEEDS FIXING
    all: (farm) => farm.allocPoint !== '0' && farm.chef !== Chef.OLD_FARMS,
    // @ts-ignore TYPE NEEDS FIXING
    portfolio: (farm) => userPools.includes(farm.id),
    // @ts-ignore TYPE NEEDS FIXING
    // sushi: (farm) => farm.pair.type === PairType.SWAP && farm.allocPoint !== '0',
    // @ts-ignore TYPE NEEDS FIXING
    // kashi: (farm) => farm.pair.type === PairType.KASHI && farm.allocPoint !== '0',
    // @ts-ignore TYPE NEEDS FIXING
    // '2x': (farm) =>
    //   (farm.chef === Chef.MASTERCHEF_V2 || farm.chef === Chef.MINICHEF) &&
    //   farm.rewards.length > 1 &&
    //   farm.allocPoint !== '0',
    // @ts-ignore TYPE NEEDS FIXING
    // old: (farm) => farm.chef === Chef.OLD_FARMS,
  }

  const rewards = useFarmRewards({ chainId })

  const data = rewards.filter((farm) => {
    // @ts-ignore TYPE NEEDS FIXING
    return type in FILTER ? FILTER[type](farm) : true
  })

  const options = {
    keys: ['pair.id', 'pair.token0.symbol', 'pair.token1.symbol'],
    threshold: 0,
  }

  const { result, term, search } = useFuse({
    data,
    options,
  })

  return (
    <>
      <NextSeo title="Farm" description="Farm SUSHI" />
      <TridentHeader className="sm:!flex-row justify-between items-center">
        <div>
          <Typography variant="h2" className="text-high-emphesis" weight={700}>
            {i18n._(t`Dyson Sphere`)}
          </Typography>
          <Typography variant="sm" weight={400}>
            {i18n._(t`Earn fees and rewards by depositing and staking your tokens to the Dyson Sphere.`)}
          </Typography>
        </div>
        <div className="flex gap-3">
          {/* <Button id="btn-create-new-pool" size="sm">
            <a
              href="https://docs.google.com/document/d/1VcdrqAn1sR8Wa0BSSU-jAl68CfoECR62LCzIyzUpZ_U"
              target="_blank"
              rel="noreferrer"
            >
              {i18n._(t`Apply for Onsen`)}
            </a>
          </Button> */}
        </div>
      </TridentHeader>
      <TridentBody>
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Search search={search} term={term} />
            <OnsenFilter account={account} chainId={chainId} />
          </div>
          <FarmList farms={result} term={term} />
          {chainId && chainId === ChainId.CELO && (
            <Typography variant="xs" weight={700} className="italic text-center text-secondary">
              {i18n._(t`Users can now bridge back to Celo using a new version of Optics.`)}{' '}
              <ExternalLink
                color="blue"
                id={`celo-optics-info-link`}
                href="https://medium.com/@0xJiro/celo-farms-update-migrating-to-the-optics-v2-bridge-e8075d1c9ea"
              >
                {i18n._(t`Click for more info on Optics V1 Migration.`)}
              </ExternalLink>
            </Typography>
          )}
        </div>
      </TridentBody>
    </>
  )
}

Farm.Guard = NetworkGuard(Feature.LIQUIDITY_MINING)
export default Farm
