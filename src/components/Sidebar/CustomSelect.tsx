import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import React, { Fragment } from "react";
import { FaCheck } from "react-icons/fa6";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <div className="relative z-20 w-1/2">
      <Listbox value={value} onChange={onChange}>
        <div className="relative ">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border border-black bg-white py-2 pl-3 pr-8 text-left focus:outline-none ">
            <span className="block truncate">Sort By</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown className="h-4 w-4" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-black bg-white drop-shadow-xl focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-8 ${
                      active ? "bg-northeastern-red text-white" : "text-black"
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomSelect;