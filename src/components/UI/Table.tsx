import "../../styles/ui/table.scss";
import React from "react";

type TableProps = {
    headers: any[],
    data: any[]
};

function Table({headers, data}: TableProps) {
  const insertTableData = () => {
      const headerBackData = headers.map(h => h[0]);
    return data.map((item, index) => {
      return (
        <tr key={index}>
            {headerBackData.map((key, index) => {
                return <td key={index}>{item[key]}</td>
            })}
        </tr>
      );
    });
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
              {headers.map(h =>{
                  return <th key={h[1]}>{h[1]}</th>
              })}
          </tr>
        </thead>
        <tbody>{insertTableData()}</tbody>
      </table>
    </div>
  );
}

export default Table;
