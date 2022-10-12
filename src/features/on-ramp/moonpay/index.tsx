import { useLingui } from '@lingui/react'

export function Buy() {
  const { i18n } = useLingui()
  return (
    <iframe
      allow="accelerometer; autoplay; camera; gyroscope; payment"
      frameBorder="0"
      height="100%"
      src="https://buy-staging.moonpay.io?apiKey=pk_test_d11ELg96c0pv45LtJnxRuYz1WFnX7i"
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
      src="https://sell-staging.moonpay.io?apiKey=pk_test_d11ELg96c0pv45LtJnxRuYz1WFnX7i"
      width="100%"
      scrolling="no"
    />
  )
}
