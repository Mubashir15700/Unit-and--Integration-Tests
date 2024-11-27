import { DisplayProps } from "../types/types";
import { placeholders, emptyString } from "../constants/constants";
import { displayContainerStyles, errorStyles } from "../styles/styles";

const Display = ({ userData, loading, error }: DisplayProps) => {
  return (
    <div style={displayContainerStyles}>
      {loading ? (
        <span>{placeholders.loading}</span>
      ) : error ? (
        <span style={errorStyles}>{error}</span>
      ) : userData.username === emptyString && userData.phone === 0 ? (
        placeholders.search
      ) : (
        <>
          <span>
            Id: {userData.id}, {emptyString}
          </span>
          <span>Name: {userData.name}</span>
          <br />
          <span>Username: {userData.username}</span>
          <br />
          <span>Phone: {userData.phone}</span>
        </>
      )}
    </div>
  );
};

export default Display;
