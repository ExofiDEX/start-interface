import Container from 'app/components/Container'
import DoubleGlowShadow from 'app/components/DoubleGlowShadow'
import { classNames } from 'app/functions'
import React, { FC } from 'react'

import DefaultLayout from './Default'

export interface Layout {
  id: string
}

export const SwapLayoutCard: FC<{ className?: string }> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        'flex flex-col gap-3 p-2 md:p-4 pt-4 rounded-[12px] backdrop-blur backdrop-blur-input',
        className
      )}
    >
      {children}
    </div>
  )
}

export const Layout: FC<Layout> = ({ children, id }) => {
  return (
    <DefaultLayout>
      <Container id={id} className="py-4 md:py-12 lg:py-[120px] px-2" maxWidth="md">
        <DoubleGlowShadow>{children}</DoubleGlowShadow>
      </Container>
    </DefaultLayout>
  )
}

type SwapLayout = (id: string) => FC

export const SwapLayout: SwapLayout = (id: string) => {
  return (props) => <Layout id={id} {...props} />
}
