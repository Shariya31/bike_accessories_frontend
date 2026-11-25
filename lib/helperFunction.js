import { z } from "zod";

export const columnConfig = (column, isCreatedAt = false, isUpdatedAt = false, isDeletedAt = false) => {
    const newColumn = [...column]

    if (isCreatedAt) {
        newColumn.push({
            accessorKey: 'createdAt',
            header: 'Created At',
            Cell: ({ renderedCellValue }) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    if (isUpdatedAt) {
        newColumn.push({
            accessorKey: 'updatedAt',
            header: 'Updated At',
            Cell: ({ renderedCellValue }) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    if (isDeletedAt) {
        newColumn.push({
            accessorKey: 'deletedAt',
            header: 'Deleted At',
            Cell: ({ renderedCellValue }) => (new Date(renderedCellValue).toLocaleString())
        })
    }

    return newColumn
}

export const numberField = ({ label, min, max, positive = false }) => {
  let schema = z.number({
    error: (issue) =>
      issue.input === undefined
        ? `${label} is required`
        : "Please enter a valid number",
  });

  if (positive) schema = schema.positive(`${label} must be greater than 0`);
  if (min !== undefined) schema = schema.min(min, `${label} must be at least ${min}`);
  if (max !== undefined) schema = schema.max(max, `${label} must be at most ${max}`);

  return z.preprocess((val) => {
    if (typeof val === "string") {
      return val.trim() === "" ? undefined : Number(val);
    }
    return val;
  }, schema);
};