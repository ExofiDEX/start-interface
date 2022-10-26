import { BigNumber } from '@ethersproject/bignumber'
import { NATIVE, ZERO } from '@exoda/core-sdk'
import ExclamationIcon from '@heroicons/react/outline/ExclamationIcon'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'app/components/Input'
import Typography from 'app/components/Typography'
import { Feature } from 'app/enums'
import { classNames } from 'app/functions'
import { tryParseAmount } from 'app/functions/parse'
import NetworkGuard from 'app/guards/Network'
import { useBentoOrWalletBalance } from 'app/hooks/useBentoOrWalletBalance'
import useFermionReactor from 'app/hooks/useFermionReactor'
import { TridentBody, TridentHeader } from 'app/layouts/Trident'
import { useActiveWeb3React } from 'app/services/web3'
import { useWalletModalToggle } from 'app/state/application/hooks'
import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import { fromWei } from 'web3-utils'

const INPUT_CHAR_LIMIT = 18

const sendTx = async (txFunc: () => Promise<any>): Promise<boolean> => {
  let success = true
  try {
    const ret = await txFunc()
    if (ret?.error) {
      success = false
    }
  } catch (e) {
    console.error(e)
    success = false
  }
  return success
}

const FermionReactor = () => {
  const { chainId, account } = useActiveWeb3React()
  const [input, setInput] = useState<string>('')
  const { i18n } = useLingui()
  const { buy, purchaseRate, minimumLimit, maximumLimit } = useFermionReactor()
  const [usingBalance, setUsingBalance] = useState(true)
  const [pendingTx, setPendingTx] = useState(false)
  // @ts-ignore TYPE NEEDS FIXING
  const currency = NATIVE[chainId]
  const balance = useBentoOrWalletBalance(account ? account : undefined, currency, true)
  const parsedAmount = usingBalance ? balance : tryParseAmount(input, balance?.currency)
  // @ts-ignore TYPE NEEDS FIXING
  const insufficientFunds = (balance && balance.equalTo(ZERO)) || parsedAmount?.greaterThan(balance)
  const lowerLimit = (balance && balance.lessThan(minimumLimit)) || parsedAmount?.lessThan(minimumLimit)
  const upperLimit = parsedAmount?.greaterThan(maximumLimit)
  const walletConnected = !!account
  const buttonStyle =
    'flex justify-center items-center w-full h-14 rounded font-bold md:font-medium md:text-lg mt-5 text-sm focus:outline-none focus:ring'
  const buttonStyleEnabled = `${buttonStyle} text-high-emphesis bg-gradient-to-r from-pink-red to-light-brown hover:opacity-90`
  const buttonStyleInsufficientFunds = `${buttonStyleEnabled} opacity-60`
  const buttonStyleDisabled = `${buttonStyle} text-secondary bg-dark-900/80`
  const buttonStyleConnectWallet = `${buttonStyle} text-high-emphesis bg-blue hover:bg-opacity-90`

  const buttonDisabled = !input || pendingTx || (parsedAmount && parsedAmount.equalTo(ZERO))
  const formattedBalance = balance?.toSignificant(4)
  const [outputAmount, setOutputAmount] = useState('0')
  const handleInput = (v: string) => {
    if (v.length <= INPUT_CHAR_LIMIT) {
      setUsingBalance(false)
      setInput(v)
      const out = calculateOutputAmount(v.toBigNumber(18))
      setOutputAmount(fromWei(out?.toString()))
    }
  }

  const calculateOutputAmount = (amt: BigNumber) => {
    if (purchaseRate) return amt.mul(purchaseRate).toString()
  }

  const handleClickMax = () => {
    setUsingBalance(true)
    // @ts-ignore TYPE NEEDS FIXING
    setInput(parsedAmount ? parsedAmount.toSignificant(balance.currency.decimals).substring(0, INPUT_CHAR_LIMIT) : '')
    const out = calculateOutputAmount(input.toBigNumber(18))
    setOutputAmount(fromWei(out?.toString()))
  }
  const toggleWalletModal = useWalletModalToggle()
  const handleClickButton = async () => {
    if (buttonDisabled) return

    if (!walletConnected) {
      toggleWalletModal()
    } else {
      setPendingTx(true)
      const success = await sendTx(() => buy(parsedAmount))
      if (!success) {
        setPendingTx(false)
        // setModalOpen(true)
        return
      }
      handleInput('')
      setPendingTx(false)
    }
  }
  const inputError = insufficientFunds || lowerLimit || upperLimit
  return (
    <>
      <NextSeo
        title={`Buy EXOFI`}
        description={`Buy EXOFI by sending in ETH coin at a flat rate during this pre-sale event`}
        openGraph={{
          images: [{ url: 'https://app.sushi.com/images/xsushi-sign.png' }],
          url: 'https://app.exofi.com/stake',
        }}
        twitter={{
          site: 'https://app.exofi.com/stake',
        }}
      />
      <TridentHeader className="sm:!flex-row justify-between items-center">
        <div>
          <Typography variant="h2" className="text-high-emphesis" weight={700}>
            {i18n._(t`Fermion Reactor`)}
          </Typography>
          <Typography variant="sm" weight={400}>
            {i18n._(t`Buy EXOFI by sending in ETH coin at a flat rate during this pre-sale event`)}
          </Typography>
        </div>
      </TridentHeader>
      <TridentBody>
        <div className="flex flex-col w-full min-h-full">
          <div className="flex flex-col justify-center md:flex-row">
            <div className="flex flex-col w-full max-w-xl mx-auto mb-4 md:m-0">
              <div className="w-full max-w-xl px-3 pt-2 pb-6 rounded backdrop-blur md:pb-9 md:pt-4 md:px-8">
                <Input.Numeric
                  value={input}
                  onUserInput={handleInput}
                  className={classNames(
                    'w-full h-14 px-3 md:px-5 mt-5 rounded backdrop-blur-input text-sm md:text-lg font-bold text-dark-800 whitespace-nowrap caret-high-emphesis',
                    inputError ? ' pl-9 md:pl-12' : ''
                  )}
                  placeholder=" "
                />

                <div className="relative w-full h-0 pointer-events-none bottom-14">
                  <div
                    className={`flex justify-between items-center h-14 rounded px-3 md:px-5 ${
                      inputError ? ' border border-red' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {inputError && <ExclamationIcon color="red" width={20} />}
                      <p
                        className={`text-sm md:text-lg font-bold whitespace-nowrap ${
                          input ? 'text-high-emphesis' : 'text-secondary'
                        }`}
                      >
                        {`${input ? input : '0'} ${currency.symbol}`}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-secondary md:text-base">
                      <div className={input ? 'hidden md:flex md:items-center' : 'flex items-center'}>
                        <p>{i18n._(t`Balance`)}:&nbsp;</p>
                        <p className="text-base font-bold">{formattedBalance}</p>
                      </div>
                      <button
                        className="px-2 py-1 ml-3 text-xs font-bold border pointer-events-auto focus:outline-none focus:ring hover:bg-opacity-40 md:bg-blue md:bg-opacity-30 border-secondary md:border-blue rounded-2xl md:py-1 md:px-3 md:ml-4 md:text-sm md:font-normal md:text-blue"
                        onClick={handleClickMax}
                      >
                        {i18n._(t`MAX`)}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className={
                    buttonDisabled
                      ? buttonStyleDisabled
                      : !walletConnected
                      ? buttonStyleConnectWallet
                      : inputError
                      ? buttonStyleInsufficientFunds
                      : buttonStyleEnabled
                  }
                  onClick={handleClickButton}
                  disabled={buttonDisabled || inputError}
                >
                  {!walletConnected
                    ? i18n._(t`Connect Wallet`)
                    : !input
                    ? i18n._(t`Enter Amount`)
                    : insufficientFunds
                    ? i18n._(t`Insufficient Balance`)
                    : lowerLimit
                    ? i18n._(t`Order size too low`)
                    : upperLimit
                    ? i18n._(t`Order size too high`)
                    : i18n._(t`Purchase Fermions`)}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 py-2 rounded">
            <div className="items-center justify-center w-full max-w-xl px-3 pt-2 pb-2 rounded backdrop-blur md:pb-4 md:pt-4 md:px-8">
              <Typography variant="xs" weight={700} className="flex gap-1 tracking-[0.06em] text-primary pb-1">
                {i18n._(t`You will get `)} <span className="text-white">{outputAmount}</span> EXOFI {i18n._(t`with`)}{' '}
                <span className="text-white">{parsedAmount ? parsedAmount?.toSignificant(4) : 0}</span> ETH
              </Typography>
              <Typography variant="xs" weight={700} className="flex gap-1 tracking-[0.06em] text-primary pb-1">
                1 {currency.symbol} <span className="text-primary">=</span> {purchaseRate} EXOFI
              </Typography>
              <Typography variant="xs" weight={700} className="flex gap-1 tracking-[0.06em] text-primary pb-1">
                {i18n._(t`Minimum order size`)}: {fromWei(minimumLimit)} ETH
              </Typography>
              <Typography variant="xs" weight={700} className="flex gap-1 tracking-[0.06em] text-primary">
                {i18n._(t`Maximum order size`)}: {fromWei(maximumLimit)} ETH
              </Typography>
            </div>
          </div>
        </div>
      </TridentBody>
    </>
  )
}

FermionReactor.Guard = NetworkGuard(Feature.FERMION_REACTOR)
export default FermionReactor
