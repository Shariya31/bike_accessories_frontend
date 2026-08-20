'use client'
import { QUERY_KEYS } from '@/api/queryKeys'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import DataTableWrapper from '@/components/application/admin/DataTableWrapper'
import DeleteAction from '@/components/application/admin/DeleteAction'
import EditAction from '@/components/application/admin/EditAction'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DT_PRODUCT_COLUMN } from '@/lib/column'
import { columnConfig } from '@/lib/helperFunction'
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_EDIT, ADMIN_PRODUCT_SHOW, ADMIN_TRASH } from '@/routes/AdminPannelRoute'
import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'


const breadcrumbData = [
    {
        href: ADMIN_DASHBOARD, label: 'Home',
    },
    {
        href: ADMIN_PRODUCT_SHOW, label: 'Product',
    }
]
const ShowProduct = () => {

  const columns = useMemo(() => {
    return columnConfig(DT_PRODUCT_COLUMN)
  }, [])

  const action = useCallback((row, deleteType, handleDelete) => {
    let actionMenu = []

    actionMenu.push(<EditAction key='edit' href={ADMIN_PRODUCT_EDIT(row.original._id)}/>)
    actionMenu.push(<DeleteAction key='delete' handleDelete={handleDelete} row={row} deleteType={deleteType}/>)
    return actionMenu
  }, [])

  return (
    <div>
       <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card className='py-0 rounded shadow-sm gap-0'>
                <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
                  <div className='flex justify-between items-center'>

                    <h4 className='text-semibold text-xl'>Show Product</h4>
                    <Button>
                      <FiPlus/>
                      <Link href={ADMIN_PRODUCT_ADD}>New Product</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className='px-0'>
                   <DataTableWrapper
                    queryKey={[...QUERY_KEYS.PRODUCTS, 'SD']}
                    fetchUrl="/api/v1/product"
                    initialPageSize={10}
                    columnsConfig={columns}
                    exportEndpoint="/api/v1/product/export"
                    deleteEndpoint="/api/v1/product/update-status"
                    deleteType="SD"
                    trashView={`${ADMIN_TRASH}?trashof=product`}   
                    createAction={action}
                   />
                </CardContent>
            </Card>
    </div>
  )
}

export default ShowProduct
