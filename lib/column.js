import { Chip } from "@mui/material"
import dayjs from 'dayjs'

export const DT_CATEGORY_COLUMN = [
    {
        accessorKey: 'name',
        header: 'Category Name',
    },
    {
        accessorKey: 'slug',
        header: 'Slug',
    },
]

export const DT_PRODUCT_COLUMN = [
    {
        accessorKey: 'name',
        header: 'Product Name',
    },
    {
        accessorKey: 'slug',
        header: 'Slug',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'mrp',
        header: 'MRP',
    },
    {
        accessorKey: 'sellingPrice',
        header: 'Selling Price',
    },
    {
        accessorKey: 'discountPercentage',
        header: 'Discount Percentage',
    },
]

export const DT_PRODUCT_VARIANT_COLUMN = [
    {
        accessorKey: 'product',
        header: 'Product Name',
    },

    {
        accessorKey: 'size',
        header: 'Size',
    },
    {
        accessorKey: 'color',
        header: 'Color',
    },

    {
        accessorKey: 'mrp',
        header: 'MRP',
    },
    {
        accessorKey: 'sellingPrice',
        header: 'Selling Price',
    },
    {
        accessorKey: 'discountPercentage',
        header: 'Discount Percentage',
    },

    {
        accessorKey: 'sku',
        header: 'SKU',
    },
]

export const DT_COUPON_COLUMN = [
    {
        accessorKey: 'code',
        header: 'Code name',
    },
    
    {
        accessorKey: 'discountPercentage',
        header: 'Discount Percentage',
    },
    
    {
        accessorKey: 'minShoppingAmount',
        header: 'Min Shopping Amount',
    },

    {
        accessorKey: 'validity',
        header: 'Validity',
        Cell: ({renderedCellValue}) => (
            new Date() > new Date(renderedCellValue) ? <Chip color='error' label={dayjs(renderedCellValue).format('DD/MM/YYYY')}/> : <Chip color='success' label={dayjs(renderedCellValue).format('DD/MM/YYYY')}/>
        )
    },
]