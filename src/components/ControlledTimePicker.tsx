import { TimePicker } from "antd";
import dayjs from "dayjs";
import { ReactNode, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { OnboardingFormInputs } from "../pages/profile";
import { EntryLabel, ErrorDisplay } from "../styles/profile";

interface ControlledTimePickerProps {
  control: Control<OnboardingFormInputs>;
  label?: string;
  name: "startTime" | "endTime";
  placeholder?: string;
}

const ControlledTimePicker = (props: ControlledTimePickerProps) => {
  const [displayedTime, setDisplayedTime] = useState<dayjs.Dayjs | null>(null);

  const customSuffixIcon = (): ReactNode => {
    return (
      <div className="w-1/12 h-1/12 text-xs flex justify-center text-northeastern-red text-center">
        ▼
      </div>
    );
  };

  const convertInputDateToUTC = (inputDate: Date): Date => {
    const inputHours = inputDate.getHours();
    /**
     * this will be the hours difference between GMT-0 and the inputDate's timezone
     * eg: utcOffset for inputDate's that are EST will either -5 or -4 depending on Daylight savings
     *  */
    const utcOffset: number = parseInt(dayjs(inputDate).format("Z"));
    let utcHours: number;
    if (inputHours + utcOffset < 0) {
      utcHours = inputHours + utcOffset + 24;
    } else {
      utcHours = inputHours + utcOffset;
    }
    const result = dayjs(`2022-2-2 ${utcHours}:${inputDate.getMinutes()}`);
    return result.toDate();
  };
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { ref, ...fieldProps }, fieldState }) => (
        <div className={"flex flex-col"}>
          <EntryLabel error={!!fieldState.error}>{props.label}</EntryLabel>
          <TimePicker
            className="form-input w-full rounded-lg"
            format="h:mm A"
            suffixIcon={customSuffixIcon()}
            ref={ref}
            status={fieldState.error ? "error" : undefined}
            placeholder={props.placeholder}
            showNow={false}
            minuteStep={15}
            use12Hours={true}
            value={displayedTime}
            onBlur={fieldProps.onBlur}
            onSelect={(date) => {
              setDisplayedTime(dayjs(date.valueOf()));
              const convertedDate = convertInputDateToUTC(date.toDate());
              fieldProps.onChange(convertedDate);
            }}
          />
          {fieldState.error && (
            <ErrorDisplay>{fieldState.error.message}</ErrorDisplay>
          )}
        </div>
      )}
    />
  );
};

export default ControlledTimePicker;