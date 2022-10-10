import { useLingui } from '@lingui/react'

export default function Buy() {
  const { i18n } = useLingui()
  return (
    <iframe
      allow="accelerometer; autoplay; camera; gyroscope; payment"
      frameBorder="0"
      height="100%"
      src="https://buy-sandbox.moonpay.com?apiKey=pk_test_d11ELg96c0pv45LtJnxRuYz1WFnX7i"
      width="100%"
      scrolling="no"
    />
  )
}
