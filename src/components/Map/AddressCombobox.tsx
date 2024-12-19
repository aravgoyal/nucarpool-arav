import { Combobox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CarpoolFeature, CarpoolAddress } from "../../utils/types";

interface AddressComboboxProps {
  name: "startAddress" | "companyAddress";
  className: string;
  addressSelected: CarpoolAddress;
  addressSetter: (val: CarpoolAddress) => void;
  addressUpdater: (val: string) => void;
  addressSuggestions: CarpoolFeature[];
  error?: string;
  placeholder: string;
}

const AddressCombobox = ({
  className,
  addressSelected,
  addressSetter,
  addressUpdater,
  addressSuggestions,
  placeholder,
  error,
}: AddressComboboxProps) => {
  return (
    <div className={className}>
      <Combobox
        value={addressSelected}
        onChange={(val: CarpoolFeature) => {
          addressSetter(val);
        }}
        as="div"
      >
        <Combobox.Input
          className={`h-12 w-full rounded-md px-3 py-2 shadow-sm ${
            error ? "border-red-500" : "border-black"
          }`}
          displayValue={(feat: CarpoolAddress) => feat.place_name}
          onChange={(e) => addressUpdater(e.target.value)}
          placeholder={placeholder}
        />
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="absolute w-full rounded-md bg-white text-base shadow-lg focus:outline-none">
            {addressSuggestions.length === 0 ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              addressSuggestions.map((feat) => (
                <Combobox.Option
                  key={feat.id}
                  className={({ active }) =>
                    `cursor-default select-none border-black p-3 ${
                      active ? "bg-blue-400 text-white" : "text-gray-900"
                    }`
                  }
                  value={feat}
                >
                  {feat.place_name}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
};

export default AddressCombobox;
