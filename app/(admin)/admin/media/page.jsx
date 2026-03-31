import BreadCrumb from '@/components/application/admin/BreadCrumb'
import UploadMedia from '@/components/application/admin/UploadMedia'
import { ADMIN_DASHBOARD } from '@/routes/AdminPannelRoute'
import React from 'react'

const breadcrumbData = [
    {
        href: ADMIN_DASHBOARD, label: 'Home',
    },
    {
        href: '', label: 'Media',
    }
]
const MediaPage = () => {

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData}/>
      <UploadMedia/>
    </div>
  )
}

export default MediaPage
