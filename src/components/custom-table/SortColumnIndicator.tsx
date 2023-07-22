import { SortOption } from "../../types";
import { DownIcon, UpIcon } from "../icons";

interface ISortColumnIndicatorProps {
  sortType: SortOption | null;
}
export const SortColumnIndicator = ({
  sortType,
}: ISortColumnIndicatorProps) => {
  if (sortType === SortOption.ASC) return <UpIcon />;
  if (sortType === SortOption.DESC) return <DownIcon />;
  return sortType;
};
