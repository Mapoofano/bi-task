import { Tab } from '@headlessui/react';
import Mint from './mintToken';
import Transfer from './transferToken';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Box() {
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 font-medium leading-5 ',
                selected
                  ? 'bg-gray-600 shadow text-gray-100'
                  : 'hover:bg-white/[0.12]'
              )
            }
          >
            Mint
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 font-medium leading-5',
                selected
                  ? 'bg-gray-600 shadow text-gray-100'
                  : 'hover:bg-white/[0.12]'
              )
            }
          >
            Transfer
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <Mint />
          </Tab.Panel>
          <Tab.Panel>
            <Transfer />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
