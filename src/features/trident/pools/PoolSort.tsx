import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { PoolSortOption, selectTridentPools, setPoolsSort } from 'app/features/trident/pools/poolsSlice'
import { classNames } from 'app/functions/styling'
import { useAppDispatch, useAppSelector } from 'app/state/hooks'
import React, { FC, Fragment } from 'react'

export const PoolSort: FC = () => {
  const { sort } = useAppSelector(selectTridentPools)
  const dispatch = useAppDispatch()

  return (
    <div className="flex items-center gap-2">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="w-full px-4 py-2.5 text-sm font-bold bg-transparent border rounded shadow-sm text-primary border-dark-800 hover:bg-dark-900">
            <div className="flex flex-row">
              {sort}
              <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="absolute w-full mt-2 border rounded shadow-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-dark-800 bg-dark-1000"
          >
            {Object.values(PoolSortOption)
              .filter((title): title is PoolSortOption => title !== sort)
              .map((title, i) => {
                return (
                  <Menu.Item key={i}>
                    {({ active }) => {
                      return (
                        <div
                          className={classNames(
                            active ? 'bg-dark-700 text-high-emphesis' : 'text-primary',
                            'group flex items-center px-4 py-2 text-sm hover:bg-dark-900 hover:cursor-pointer focus:bg-dark-900 rounded font-bold'
                          )}
                          onClick={() => {
                            dispatch(setPoolsSort(title))
                          }}
                        >
                          {title}
                        </div>
                      )
                    }}
                  </Menu.Item>
                )
              })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
