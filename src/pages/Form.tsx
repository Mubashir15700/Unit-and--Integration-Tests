import { useState } from "react";
import Display from "../components/Display";
import Input from "../components/Input";
import Button from "../components/Button";
import { searchData, userData } from "../types/types";
import {
  errors,
  placeholders,
  inputTypes,
  inputNames,
  emptyString,
} from "../constants/constants";
import {
  fetchUserData,
  initialSearchData,
  initialUserData,
} from "../utils/formUtils";
import { containerStyles, formStyles, displayStyles } from "../styles/styles";

const Form = () => {
  const [searchData, setSearchData] = useState<searchData>(initialSearchData);
  const [userData, setUserData] = useState<userData>(initialUserData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(emptyString);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    if (!searchData.userName && !searchData.phone) {
      return alert(errors.validationError);
    }
    setError(emptyString);
    setUserData(initialUserData);
    setLoading(true);

    try {
      const user = await fetchUserData(searchData);
      user ? setUserData(user) : setError(errors.noUserFound);
    } catch (err) {
      setError(errors.fetchingError);
      console.error(err);
    } finally {
      setLoading(false);
      setSearchData(initialSearchData);
    }
  };

  return (
    <div style={containerStyles}>
      <div style={formStyles}>
        <div style={displayStyles}>
          <Display userData={userData} loading={loading} error={error} />
        </div>
        <div>
          <Input
            type={inputTypes.text}
            placeholder={placeholders.userName}
            name={inputNames.userName}
            value={searchData.userName}
            handleChange={handleChange}
          />
          <Input
            type={inputTypes.number}
            placeholder={placeholders.phone}
            name={inputNames.phone}
            value={searchData.phone}
            handleChange={handleChange}
          />
        </div>
        <div>
          <Button loading={loading} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Form;
