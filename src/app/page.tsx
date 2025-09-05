"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { useAdvocates } from "./hooks/useAdvocates";
import { filterAdvocates } from "./utils/filterAdvocates";
import { AdvocateRow } from "./components/AdvocateRow";
import { AdvocateHeaderRow } from "./components/AdvocateHeaderRow";
import { Button } from "./components/common/Button";
import { Input } from "./components/common/Input";
import { Panel } from "./components/common/Panel";
import { Page } from "./components/common/Page";

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
    <main>
      <h1 className="site-header">Solace Advocates</h1>
      <Page className="space-y-6">
        <Panel className="flex flex-wrap items-center gap-3">
          <label htmlFor="search" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Search for advocates
          </label>
          <Input
            id="search"
            value={searchTerm}
            onChange={onChangeSearch}
            placeholder="Search advocates..."
            aria-label="Search for advocates"
            className="max-w-xs"
          />
          <Button variant="secondary" onClick={onResetSearch} type="button">
            Reset Search
          </Button>
        </Panel>
        <Panel id="panel">
          <div className="-m-4 sm:-m-6 md:-m-8">
            <table className="my-table w-full">
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
          </div>
        </Panel>
      </Page>
    </main>
  );
}
