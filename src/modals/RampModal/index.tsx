import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import HeadlessUiModal from 'app/components/Modal/HeadlessUIModal'
import Buy from 'app/features/on-ramp/moonpay'
import { useModalOpen, useRampModalToggle } from 'app/state/application/hooks'
import { ApplicationModal } from 'app/state/application/reducer'
import React, { FC } from 'react'

const RampModal: FC = () => {
  const { i18n } = useLingui()
  const rampModalOpen = useModalOpen(ApplicationModal.RAMP)
  const toggleRampModal = useRampModalToggle()

  return (
    <HeadlessUiModal.Controlled isOpen={rampModalOpen} onDismiss={toggleRampModal}>
      <div className="flex flex-col gap-2 h-500">
        <HeadlessUiModal.Header header={i18n._(t`Buy cryptocurrency`)} onClose={toggleRampModal} />
        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2"></div>
        <Buy />
      </div>
    </HeadlessUiModal.Controlled>
  )
}

export default RampModal
