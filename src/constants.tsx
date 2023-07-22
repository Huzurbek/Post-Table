import { ETableHeaderType, ITableHeader } from "./types";

export const POSTS_TABLE_HEADS: ITableHeader[] = [
  {
    key: "id",
    label: "ID",
    type: ETableHeaderType.Number,
    style: {
      width: 114,
      textAlign: "center",
      fontWeight: "bold",
    },
  },
  {
    key: "title",
    label: "Заголовок",
    type: ETableHeaderType.Text,
    style: {
      width: 529,
    },
  },
  {
    key: "body",
    label: "Описание",
    type: ETableHeaderType.Text,
    style: {
      width: 433,
    },
  },
];
