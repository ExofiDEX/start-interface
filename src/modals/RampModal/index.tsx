import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import HeadlessUiModal from 'app/components/Modal/HeadlessUIModal'
import ToggleButtonGroup from 'app/components/ToggleButton'
import { RampModalView } from 'app/features/on-ramp/enum'
import { Buy, Sell } from 'app/features/on-ramp/moonpay'
import { selectRamp, setRampModalView } from 'app/features/on-ramp/rampSlice'
import { classNames } from 'app/functions'
import { useModalOpen, useRampModalToggle } from 'app/state/application/hooks'
import { ApplicationModal } from 'app/state/application/reducer'
import { useAppDispatch, useAppSelector } from 'app/state/hooks'
import React, { FC } from 'react'

const COLUMN_CONTAINER = 'flex flex-col flex-grow gap-4'

const RampModal: FC = () => {
  const { i18n } = useLingui()
  const rampModalOpen = useModalOpen(ApplicationModal.RAMP)
  const toggleRampModal = useRampModalToggle()
  const { view } = useAppSelector(selectRamp)
  const dispatch = useAppDispatch()

  return (
    <HeadlessUiModal.Controlled isOpen={rampModalOpen} onDismiss={toggleRampModal}>
      <div className="flex flex-col gap-2 h-500">
        <HeadlessUiModal.Header
          header={view == RampModalView.Buy ? i18n._(t`Buy cryptocurrency`) : i18n._(t`Sell cryptocurrency`)}
          onClose={toggleRampModal}
        />
        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2"></div>
        <ToggleButtonGroup
          size="sm"
          value={view}
          onChange={(view: RampModalView) => dispatch(setRampModalView(view))}
          variant="filled"
        >
          <ToggleButtonGroup.Button value={RampModalView.Buy}>{i18n._(t`Buy`)}</ToggleButtonGroup.Button>
          <ToggleButtonGroup.Button value={RampModalView.Sell}>{i18n._(t`Sell`)}</ToggleButtonGroup.Button>
        </ToggleButtonGroup>

        {/*Dont unmount following components to make modal more react faster*/}
        <div className={classNames(COLUMN_CONTAINER, view === RampModalView.Buy ? 'block' : 'hidden')}>
          <Buy />
        </div>
        <div className={classNames(COLUMN_CONTAINER, view === RampModalView.Sell ? 'block' : 'hidden')}>
          <Sell />
        </div>
      </div>
    </HeadlessUiModal.Controlled>
  )
}

export default RampModal
