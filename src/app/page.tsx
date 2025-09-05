"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Advocate } from "./types/advocate";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAdvocates = useMemo(() => {
    if (searchTerm === '') {
      return advocates;
    }

    const _searchTerm = searchTerm.toLowerCase()

    return advocates.filter((advocate) => (
      advocate.firstName.toLowerCase().includes(_searchTerm) ||
      advocate.lastName.toLowerCase().includes(_searchTerm) ||
      advocate.city.toLowerCase().includes(_searchTerm) ||
      advocate.degree.toLowerCase().includes(_searchTerm) ||
      advocate.specialties.some(specialty => specialty.toLowerCase().includes(_searchTerm)) ||
      JSON.stringify(advocate.yearsOfExperience).includes(_searchTerm)
    ))
  }, [advocates, searchTerm])

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        <input style={{ border: "1px solid black" }} value={searchTerm} onChange={onChange} />
        <button onClick={onResetSearch}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, i) => {
            return (
              <tr key={i}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, j) => (
                    <div key={j}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
