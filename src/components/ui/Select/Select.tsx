import { theme } from "../../../features/Inflations/constants/theme";

type SelectProps<TOption> = {
    options: TOption[];
    value: TOption;
    onChange: (value: TOption) => void;
    isOptionEqualValue?: (option: TOption, value: TOption) => boolean;
    getOptionLabel?: (option: TOption) => string;
};

function defaultGetOptionLabel<T>(option: T): string {
    if (typeof option === "string") return option;

    if (
        option != null &&
        typeof option === "object" &&
        "label" in option &&
        typeof option.label === "string"
    )
        return option.label;

    throw new Error(
        "Option must be a string or an object with a label property, otherwise provide a custom getOptionLabel function",
    );
}

function defaultIsOptionEqualValue<TOption>(
    option: TOption,
    value: TOption,
): boolean {
    if (typeof option === "string") return option === value;

    if (option != null && typeof option === "object" && "value" in option)
        return option.value === value;

    throw new Error(
        "Option must be a string or an object with a value property, otherwise provide a custom isOptionEqualValue function",
    );
}

export function Select<TOption>({
    options,
    value,
    onChange,
    getOptionLabel: getOptionLabelProp = defaultGetOptionLabel,
    isOptionEqualValue: isOptionEqualValueProp = defaultIsOptionEqualValue,
}: SelectProps<TOption>) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newKey = e.target.value;

        const newValue = options.find(
            (option) => getOptionLabelProp(option) === newKey,
        );

        if (!newValue) {
            return;
        }

        onChange(newValue);
    };

    const currentOption = options.find((option) =>
        isOptionEqualValueProp(option, value),
    );

    if (!currentOption) {
        throw new Error("Value does not match any option");
    }

    return (
        <select
            onChange={handleChange}
            value={getOptionLabelProp(currentOption)}
            style={{
                padding: "0.5rem",
                border: "none",
                borderRadius: theme.border.borderRadius.primary,
                backgroundColor: theme.typography.primary,
            }}
        >
            {options.map((option) => (
                <option
                    key={getOptionLabelProp(option)}
                    value={getOptionLabelProp(option)}
                >
                    {getOptionLabelProp(option)}
                </option>
            ))}
        </select>
    );
}
