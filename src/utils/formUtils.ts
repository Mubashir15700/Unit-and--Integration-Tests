import {
  inputNames,
  emptyString,
  ampersand,
  questionMark,
} from "../constants/constants";

export const initialSearchData = { userName: emptyString, phone: 0 };
export const initialUserData = {
  id: 0,
  name: emptyString,
  username: emptyString,
  phone: 0,
};

export const fetchUserData = async (searchData: {
  userName: string;
  phone: number;
}) => {
  const queryParams = [
    searchData.userName && `${inputNames.userName}=${searchData.userName}`,
    searchData.phone && `${inputNames.phone}=${searchData.phone}`,
  ]
    .filter(Boolean)
    .join(ampersand);

  const url = `${import.meta.env.VITE_USERS_API}${
    queryParams ? `${questionMark}${queryParams}` : emptyString
  }`;

  const response = await fetch(url);
  const data = await response.json();

  if (Array.isArray(data) && data.length > 0) {
    const { id, name, username, phone } = data[0];
    return { id, name, username, phone };
  }

  return null;
};
