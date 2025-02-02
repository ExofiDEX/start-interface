import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { DiscordIcon, RedditIcon, TelegramIcon, TwitterIcon } from 'app/components/Icon'
import { Logo } from 'app/components/Icon'
import LanguageSwitch from 'app/components/LanguageSwitch'
import Typography from 'app/components/Typography'
import { Feature } from 'app/enums'
import { featureEnabled } from 'app/functions'
import { useActiveWeb3React } from 'app/services/web3'
import Link from 'next/link'
import React from 'react'

import Container from '../Container'

const Footer = () => {
  const { chainId } = useActiveWeb3React()
  const { i18n } = useLingui()

  return (
    <div className="z-10 w-full footer-bg">
      <Container maxWidth="7xl" className="px-6 mx-auto">
        <div className="grid grid-cols-2 gap-10 pt-8 mb-10 md:grid-cols-3 lg:grid-cols-6 xs:px-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-start gap-2">
              <div className="flex items-center mr-4 w-28">
                <Logo width="200px" height="50px" />
                {/* <Image src="https://app.sushi.com/images/logo.svg" alt="Exofi logo" width="28px" height="28px" /> */}
              </div>
              {/* <Typography variant="h2" weight={700} className="tracking-[0.02em] scale-y-90 hover:text-high-emphesis">
                EXOFI
              </Typography> */}
            </div>
            <Typography variant="xs">
              {i18n._(t`Our community is building a comprehensive decentralized trading platform for the future of finance. Join
              us!`)}
            </Typography>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/ExofiOfficial" target="_blank" rel="noreferrer">
                <TwitterIcon width={16} className="text-low-emphesis" />
              </a>
              <a href="https://t.me/EXOFI3" target="_blank" rel="noreferrer">
                <TelegramIcon width={16} className="text-low-emphesis" />
              </a>
              <a href="https://www.reddit.com/r/EXOFI3/" target="_blank" rel="noreferrer">
                <RedditIcon width={16} className="text-low-emphesis" />
              </a>
              <a href="https://discord.gg/Gs4QQUVVWX" target="_blank" rel="noreferrer">
                <DiscordIcon width={16} className="text-low-emphesis" />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              {i18n._(t`Products`)}
            </Typography>
            <Link href="/swap" passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Quantum Flip`)}
              </Typography>
            </Link>
            <Link href={featureEnabled(Feature.TRIDENT, chainId) ? '/trident/pools' : '/legacy/pool'} passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Fusion Reactor`)}
              </Typography>
            </Link>
            <Link href="/farms" passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Dyson Sphere`)}
              </Typography>
            </Link>
            {/* <Link href="/kashi" passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Kashi Lending`)}
              </Typography>
            </Link> */}
            {/* <Link href="/miso" passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`MISO Launchpad`)}
              </Typography>
            </Link> */}
            {/* <a href="https://shoyunft.com" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Shoyu NFT`)}
              </Typography>
            </a> */}
            {/* <Link href="/tools" passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Tools`)}
              </Typography>
            </Link> */}
          </div>
          <div className="flex flex-col gap-1 md:text-right lg:text-right">
            <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              {i18n._(t`Help`)}
            </Typography>
            <a href="https://docs.exofi.com" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Documentation`)}
              </Typography>
            </a>
            <a href="https://discord.gg/Gs4QQUVVWX" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Ask on Discord`)}
              </Typography>
            </a>
            <a href="https://twitter.com/EXOFI3" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Ask on Twitter`)}
              </Typography>
            </a>
            <a href="https://www.reddit.com/r/EXOFI3/" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Ask on Reddit`)}
              </Typography>
            </a>
            {/* <a href="https://forum.sushi.com" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Ask on Forum`)}
              </Typography>
            </a> */}
          </div>
          <div className="flex flex-col gap-1 text-right xs:text-right md:text-left lg:text-right">
            <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              {i18n._(t`Developers`)}
            </Typography>
            <a href="https://docs.exofi.com" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`GitBook`)}
              </Typography>
            </a>
            <a href="https://github.com/ExofiDEX" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`GitHub`)}
              </Typography>
            </a>
            {/* <a href="https://dev.sushi.com" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Development`)}
              </Typography>
            </a>
            <a href="https://docs.openmev.org" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`SushiGuard`)}
              </Typography>
            </a> */}
          </div>
          {/* <div className="flex flex-col gap-1 md:text-right lg:text-right">
            <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              {i18n._(t`Governance`)}
            </Typography>
            <a href="https://forum.sushi.com" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Forum & Proposals`)}
              </Typography>
            </a>
            <a href="https://snapshot.org/#/sushigov.eth" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Vote`)}
              </Typography>
            </a>
          </div> */}
          {/* <div className="flex flex-col gap-1 text-right">
            <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              {i18n._(t`Protocol`)}
            </Typography>
            <a
              href="https://docs.google.com/document/d/1VcdrqAn1sR8Wa0BSSU-jAl68CfoECR62LCzIyzUpZ_U"
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Apply for Onsen`)}
              </Typography>
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSecahmrXOJytn-wOUB8tEfONzOTP4zjKqz3sIzNzDDs9J8zcA/viewform"
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Apply for Miso`)}
              </Typography>
            </a>

            <Link href="/vesting" passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Vesting`)}
              </Typography>
            </Link>
          </div> */}
          <div className="flex flex-col gap-1">
            <LanguageSwitch />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
