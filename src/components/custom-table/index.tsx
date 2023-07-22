import { ReactNode, useState } from "react";
import { ISort, ITableHeader, SortOption } from "../../types";
import "./style.sass";
import { SortColumnIndicator } from "./SortColumnIndicator";

interface ICustomTableProps {
  rows: Array<Record<string, ReactNode>>;
  heads: Array<ITableHeader>;
  onSort?: (data: ISort | null) => void;
  loading?: boolean;
}

export const CustomTable = ({
  heads,
  rows,
  onSort,
  loading,
}: ICustomTableProps) => {
  const [sortType, setSortType] = useState<SortOption | null>(null);
  const [sortedColumn, setSortedColumn] = useState<string>("");
  return (
    <div>
      <table>
        <thead>
          <tr>
            {heads.map((head) => (
              <th
                onClick={() => {
                  if (head.sortable === false) return;
                  let sort: SortOption | null = null;

                  if (sortType == null) sort = SortOption.ASC;
                  if (sortType === SortOption.ASC) sort = SortOption.DESC;
                  if (sortType === SortOption.DESC) sort = null;
                  onSort?.(
                    sort != null
                      ? {
                          key: head.key,
                          sort,
                          type: head.type,
                        }
                      : null
                  );
                  setSortType(sort);
                  setSortedColumn(sort != null ? head.key : "");
                }}
                key={head.key}
                style={head.style}
              >
                {head.label}
                {(head.sortable ?? true) && sortedColumn === head.key && (
                  <div style={{ marginLeft: 16, display: "inline" }}>
                    <SortColumnIndicator sortType={sortType} />
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                style={{ textAlign: "center", padding: "16px" }}
                colSpan={heads.length}
              >
                Loading...
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index}>
                {heads.map((head) => (
                  <td key={head.key} style={head.style}>
                    {row[head.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
