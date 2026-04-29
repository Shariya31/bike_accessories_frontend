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
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'


const breadcrumbData = [
  {
    href: ADMIN_DASHBOARD, label: 'Home',
  },
  {
    href: ADMIN_TRASH, label: 'Trash',
  }
]

const TRASH_CONFIG = {
  category: {
    title: 'Category Trash',
    columns: DT_CATEGORY_COLUMN,
    fetchUrl: '/api/v1/category',
    exportUrl: '/api/v1/category/export',
    deleteUrl: '/api/v1/category/update-status'
  }
}
const Trash = () => {
  const searchParams = useSearchParams()

  const trashof = searchParams.get('trashof')

  const config = TRASH_CONFIG[trashof]

  const columns = useMemo(() => {
    return columnConfig(config.columns, false, false, true)
  }, [])

  const action = useCallback((row, deleteType, handleDelete) => {
    return [<DeleteAction key='delete' handleDelete={handleDelete} row={row} deleteType={deleteType} />]
  }, [])

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className='py-0 rounded shadow-sm gap-0'>
        <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
          <div className='flex justify-between items-center'>

            <h4 className='text-semibold text-xl'>{config.title}</h4>
            
          </div>
        </CardHeader>
        <CardContent className='px-0'>
          <DataTableWrapper
            queryKey={[...QUERY_KEYS[trashof.toUpperCase()], 'PD']}
            fetchUrl={config.fetchUrl}
            initialPageSize={10}
            columnsConfig={columns}
            exportEndpoint={config.exportUrl}
            deleteEndpoint={config.deleteUrl}
            deleteType="PD"
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default Trash
