import Select from "react-select";
import { CountryFlag } from "react-flag-kit";

const CustomSelect = ({ options, onChange, value }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: "8px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: "8px",
    }),
  };

  const CustomOption = ({ value, label, data }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <CountryFlag
        countryCode={data.countryCode}
        style={{ marginRight: "8px" }}
      />
      {label}
    </div>
  );

  return (
    <Select
      options={options}
      components={{ Option: CustomOption, SingleValue: CustomOption }}
      styles={customStyles}
      isSearchable
      onChange={onChange}
      value={value}
    />
  );
};

export default CustomSelect;
