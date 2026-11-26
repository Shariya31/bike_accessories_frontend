'use client'
import { QUERY_KEYS } from '@/api/queryKeys'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import DataTableWrapper from '@/components/application/admin/DataTableWrapper'
import DeleteAction from '@/components/application/admin/DeleteAction'
import EditAction from '@/components/application/admin/EditAction'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DT_COUPON_COLUMN } from '@/lib/column'
import { columnConfig } from '@/lib/helperFunction'
import { ADMIN_COUPON_ADD, ADMIN_COUPON_EDIT, ADMIN_COUPON_SHOW, ADMIN_DASHBOARD, ADMIN_TRASH } from '@/routes/AdminPannelRoute'
import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'


const breadcrumbData = [
    {
        href: ADMIN_DASHBOARD, label: 'Home',
    },
    {
        href: ADMIN_COUPON_SHOW, label: 'Coupon',
    }
]
const ShowCoupon = () => {

  const columns = useMemo(() => {
    return columnConfig(DT_COUPON_COLUMN)
  }, [])

  const action = useCallback((row, deleteType, handleDelete) => {
    let actionMenu = []

    actionMenu.push(<EditAction key='edit' href={ADMIN_COUPON_EDIT(row.original._id)}/>)
    actionMenu.push(<DeleteAction key='delete' handleDelete={handleDelete} row={row} deleteType={deleteType}/>)
    return actionMenu
  }, [])

  return (
    <div>
       <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card className='py-0 rounded shadow-sm gap-0'>
                <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
                  <div className='flex justify-between items-center'>

                    <h4 className='text-semibold text-xl'>Show Coupon</h4>
                    <Button>
                      <FiPlus/>
                      <Link href={ADMIN_COUPON_ADD}>New Coupon</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className='px-0'>
                   <DataTableWrapper
                    queryKey={[...QUERY_KEYS.COUPON, 'SD']}
                    fetchUrl="/api/v1/coupon"
                    initialPageSize={10}
                    columnsConfig={columns}
                    exportEndpoint="/api/v1/coupon/export"
                    deleteEndpoint="/api/v1/coupon"
                    deleteType="SD"
                    trashView={`${ADMIN_TRASH}?trashof=coupon`}   
                    createAction={action}
                   />
                </CardContent>
            </Card>
    </div>
  )
}

export default ShowCoupon
