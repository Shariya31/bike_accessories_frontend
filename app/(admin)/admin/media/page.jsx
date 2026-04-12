'use client'
import React, { useEffect, useState } from 'react'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import UploadMedia from '@/components/application/admin/UploadMedia'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useGetMedia } from '@/hooks/media/useGetMedia'
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '@/routes/AdminPannelRoute'
import Media from '@/components/application/admin/Media'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import useDeleteMedia from '@/hooks/media/useDeleteMedia'

const breadcrumbData = [
  {
    href: ADMIN_DASHBOARD, label: 'Home',
  },
  {
    href: '', label: 'Media',
  }
]
const MediaPage = () => {
  const [deleteType, setDeleteType] = useState('SD');
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const searchParams = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status
  } = useGetMedia({
    limit: 10,
    deleteType,
  });


  const deleteMutation = useDeleteMedia()

  const handleDelete = (ids, deleteType) => {
    console.log(deleteType, 'deleteType')
    const deleteEndpoint = deleteType === 'PD' ? '/api/v1/media/delete' : '/api/v1/media/update-status'
    let c = true
    if(deleteType === "PD"){
      c = confirm("Are you sure you want to delete the media permanently")
    }

    if(c){
      deleteMutation.mutate({ids, deleteType, deleteEndpoint})
    }

    setSelectAll(false);
    setSelectedMedia([])
  }

  const handleSelectAll = () => {
    setSelectAll(!selectAll);

  }

  useEffect(() => {
    if (searchParams) {
      const trashOf = searchParams.get('trashof')
      setSelectedMedia([])
      if (trashOf) {
        setDeleteType('PD')
      } else {
        setDeleteType('SD')
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (selectAll) {
      const ids = data.pages.flatMap(page => page.media.map(media => media._id))
      setSelectedMedia(ids);
    } else {
      setSelectedMedia([]);

    }
  }, [selectAll])

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className='py-0 rounded shadow-sm'>
        <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
          <div className='flex justify-between items-center'>
            <h4 className='font-semibold uppercase text-xl'>
              {deleteType === 'SD' ? 'Media' : 'Media Trash'}
            </h4>
            <div className='flex items-center gap-5'>
              {deleteType === 'SD' && <UploadMedia />}
              <div className='flex gap-3'>
                {
                  deleteType === 'SD' ?
                    <Button type='button' variant='destructive'>
                      <Link href={`${ADMIN_MEDIA_SHOW}?trashof=media`}>
                        Trash
                      </Link>
                    </Button>
                    :
                    <Button type='button'>
                      <Link href={`${ADMIN_MEDIA_SHOW}`}>
                        Back To Media
                      </Link>
                    </Button>
                }
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedMedia.length > 0 &&
            <div className='py-2 px-3 mb-2 rounded flex justify-between items-center'>
              <label>
                <Checkbox
                  className='border border-red-600'
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
                Select All
              </label>

              <div className='flex gap-2'>
                {deleteType === 'SD' ?
                  <Button className='cursor-pointer' variant='destructive' onClick={() => handleDelete(selectedMedia, deleteType)}>
                    Move Into Trash
                  </Button>
                  :
                  <>
                    <Button className='bg-green-500 hover:bg-green-600 cursor-pointer' onClick={() => handleDelete(selectedMedia, 'RSD')}>
                      Restore
                    </Button>

                    <Button variant='destructive' onClick={() => handleDelete(selectedMedia, deleteType)}>
                      Delete Permanently
                    </Button>
                  </>
                }
              </div>
            </div>
          }

          {status === 'pending' ?
            <>
              <div>Loading...</div>
            </>
            :
            status === 'error' ?
              <>
                <div className='text-red-500'>{error.message}</div>
              </>
              :
              <>
              {data.pages.flatMap(page => page.media.map(media => media._id)).length === 0 && 
              <div className='text-center'>
                No Data Found
                </div>}
                <div className='grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-2 mb-5'>
                  {data?.pages?.map((page, index) => (
                    <React.Fragment key={index}>
                      {
                        page?.media?.map((item) => (
                          
                          <Media key={item._id}
                            media={item}
                            handleDelete={handleDelete}
                            deleteType={deleteType}
                            selectedMedia={selectedMedia}
                            setSelectedMedia={setSelectedMedia}
                          />
                        ))
                      }
                    </React.Fragment>
                  ))}
                </div>
              </>
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default MediaPage
