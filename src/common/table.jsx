import React, { Component } from "react";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";

const Table = ({ columns, sortColumn, data, onSort }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
