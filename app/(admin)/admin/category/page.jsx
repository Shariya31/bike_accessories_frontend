'use client'
import { QUERY_KEYS } from '@/api/queryKeys'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import DataTableWrapper from '@/components/application/admin/DataTableWrapper'
import DeleteAction from '@/components/application/admin/DeleteAction'
import EditAction from '@/components/application/admin/EditAction'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DT_CATEGORY_COLUMN } from '@/lib/column'
import { columnConfig } from '@/lib/helperFunction'
import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_EDIT, ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_TRASH } from '@/routes/AdminPannelRoute'
import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'


const breadcrumbData = [
    {
        href: ADMIN_DASHBOARD, label: 'Home',
    },
    {
        href: ADMIN_CATEGORY_SHOW, label: 'Category',
    }
]
const ShowCategory = () => {

  const columns = useMemo(() => {
    return columnConfig(DT_CATEGORY_COLUMN)
  }, [])

  const action = useCallback((row, deleteType, handleDelete) => {
    let actionMenu = []

    actionMenu.push(<EditAction key='edit' href={ADMIN_CATEGORY_EDIT(row.original._id)}/>)
    actionMenu.push(<DeleteAction key='delete' handleDelete={handleDelete} row={row} deleteType={deleteType}/>)
    return actionMenu
  }, [])

  return (
    <div>
       <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card className='py-0 rounded shadow-sm'>
                <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
                  <div className='flex justify-between items-center'>

                    <h4 className='text-semibold text-xl'>Show Category</h4>
                    <Button>
                      <FiPlus/>
                      <Link href={ADMIN_CATEGORY_ADD}>New Category</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className='pb-5'>
                   <DataTableWrapper
                    queryKey={QUERY_KEYS.CATEGORY}
                    fetchUrl="/api/category"
                    initialPageSize={10}
                    columnsConfig={columns}
                    exportEndpoint="/api/category/export"
                    deleteEndpoint="/api/category/delete"
                    deleteType="SD"
                    trashView={`${ADMIN_TRASH}?trashof=category`}   
                    createAction={action}
                   />
                </CardContent>
            </Card>
    </div>
  )
}

export default ShowCategory
