import { useLingui } from '@lingui/react'

export function Buy() {
  const { i18n } = useLingui()
  return (
    <iframe
      allow="accelerometer; autoplay; camera; gyroscope; payment"
      frameBorder="0"
      height="100%"
      src="https://buy.moonpay.com?apiKey=pk_live_mRrydrPDifC0d6Vv1E3q05wJZ5YTGIXA"
      width="100%"
      scrolling="no"
    />
  )
}

export function Sell() {
  const { i18n } = useLingui()
  return (
    <iframe
      allow="accelerometer; autoplay; camera; gyroscope; payment"
      frameBorder="0"
      height="100%"
      src="https://sell.moonpay.com?apiKey=pk_live_mRrydrPDifC0d6Vv1E3q05wJZ5YTGIXA"
      width="100%"
      scrolling="no"
    />
  )
}
