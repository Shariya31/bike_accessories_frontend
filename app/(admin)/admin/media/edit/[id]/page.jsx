'use client'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useGetMediaById } from '@/hooks/media/useGetMediaById'
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '@/routes/AdminPannelRoute'
import { useParams } from 'next/navigation'
import { use } from 'react'

const breadCrumbData = [
  {
    href: ADMIN_DASHBOARD,
    label: 'Home',
  },

  {
    href: ADMIN_MEDIA_SHOW,
    label: 'Media',
  },
  {
    label: 'Edit-Media',
  },
]

const EditMedia = () => {
  const params = useParams()
  const { id } = params


  const { data } = useGetMediaById(id)

  console.log(id, data, 'dataid')
  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData} />
      <Card className='py-0 rounded shadow-sm'>
        <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
           <h4 className = 'text-semibold text-xl'>Edit Media</h4>
        </CardHeader>
        <CardContent className='pb-5'>
           
        </CardContent>
      </Card>
    </div>
  )
}

export default EditMedia
