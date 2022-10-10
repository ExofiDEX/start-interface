import RampModel from 'app/modals/RampModal'
import { useRampModalToggle } from 'app/state/application/hooks'

function Ramp(): JSX.Element | null {
  const toggleRampModal = useRampModalToggle()

  return (
    <div
      className="flex items-center text-sm font-bold cursor-pointer pointer-events-auto select-none whitespace-nowrap"
      onClick={() => toggleRampModal()}
    >
      <div className="grid items-center grid-flow-col justify-center h-[36px] text-sm rounded pointer-events-auto auto-cols-max mr-2 bg-blue px-3">
        {/*@ts-ignore TYPE NEEDS FIXING*/}
        <span className="text-white">Buy Crypto</span>
      </div>
      <RampModel />
    </div>
  )
}

export default Ramp
