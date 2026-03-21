import React, { forwardRef, useId, useState, useEffect } from "react";
import ReactSelect, { Props as ReactSelectProps } from "react-select";

export interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends Omit<ReactSelectProps, 'value' | 'onChange' | 'options'> {
  options: Option[];
  value?: string | number;
  onChange?: (value: string | number | null) => void;
  error?: boolean;
  hint?: string;
  id?: string;
  name?: string;
}

const Select = forwardRef<any, SelectProps>(({
  options,
  value,
  onChange,
  error = false,
  hint,
  placeholder = "Select an option...",
  isDisabled,
  className = "",
  ...props
}, ref) => {
  const reactSelectId = useId();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || null;

  const handleChange = (selected: any) => {
    if (onChange) {
      // react-select passes null if clearable and cleared
      onChange(selected ? selected.value : null);
    }
  };

  if (!isMounted) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 dark:bg-gray-900 dark:border-gray-700"></div>
        {hint && (
          <p className={`mt-1.5 text-xs ${error ? "text-error-500" : "text-gray-500"}`}>
            {hint}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <ReactSelect
        ref={ref}
        instanceId={props.id || reactSelectId}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        unstyled
        classNames={{
          control: (state) =>
            `flex h-11 w-full appearance-none rounded-lg border px-3 text-sm shadow-theme-xs transition-colors duration-200 ` +
            (isDisabled
              ? "bg-gray-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
              : error
              ? "bg-white border-error-500 text-error-800 ring-0 focus-within:ring-3 focus-within:ring-error-500/10 dark:bg-gray-900 dark:text-error-400 dark:border-error-500"
              : state.isFocused
              ? "bg-white border-brand-300 ring-3 ring-brand-500/10 dark:bg-gray-900 dark:border-brand-800 dark:text-white/90"
              : "bg-white border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white/90"),
          menu: () => "mt-1 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900 z-50",
          option: (state) =>
            `px-4 py-2.5 text-sm cursor-pointer transition-colors ` +
            (state.isSelected
              ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 font-medium"
              : state.isFocused
              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              : "text-gray-700 dark:text-gray-300"),
          singleValue: () => "text-gray-800 dark:text-white/90",
          placeholder: () => "text-gray-400 dark:text-white/30",
          input: () => "text-gray-800 dark:text-white/90",
          valueContainer: () => "flex gap-1",
          indicatorsContainer: () => "text-gray-400 dark:text-gray-500",
        }}
        {...props}
      />

      {/* Optional Hint Text */}
      {hint && (
        <p className={`mt-1.5 text-xs ${error ? "text-error-500" : "text-gray-500"}`}>
          {hint}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";
export default Select;
