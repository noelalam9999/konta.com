import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import InputForm from "./shared/InputForm";
import Planets from "./Planets";

const SEARCH = gql`
  query Search($match: String) {
    planets(order_by: { Name: asc }, where: { Name: { _ilike: $match } }) {
      Cuisine
      Name
      id
    }
  }
`;

const PlanetSearch = () => {
  const [inputVal, setInputVal] = useState("");
  const [search, { loading, error, data }] = useLazyQuery(SEARCH);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <InputForm
        inputVal={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onSubmit={() => search({ variables: { match: `%${inputVal}%` } })}
      />
      <Planets newPlanets={data ? data.planets : null} />
    </div>
  );
};

export default PlanetSearch;
