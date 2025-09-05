"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { useAdvocates } from "./hooks/useAdvocates";
import { filterAdvocates } from "./utils/filterAdvocates";
import { AdvocateRow } from "./components/AdvocateRow";
import { AdvocateHeaderRow } from "./components/AdvocateHeaderRow";

export default function Home() {
  const advocates = useAdvocates();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredAdvocates = useMemo(() => filterAdvocates(advocates, searchTerm), [advocates, searchTerm])

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onResetSearch = () => {
    setSearchTerm("");
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} value={searchTerm} onChange={onChangeSearch} />
        <button onClick={onResetSearch}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <AdvocateHeaderRow />
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, i) => {
            return (
              <tr key={i}>
                <AdvocateRow advocate={advocate} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
