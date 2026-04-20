'use client'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import ButtonLoading from '@/components/application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useGetMediaById } from '@/hooks/media/useGetMediaById'
import { zSchema } from '@/lib/zodSchema'
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '@/routes/AdminPannelRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import imagePlaceholder from '../../../../../../public/assets/images/image-placeholder.webp'
import useUpdateMedia from '@/hooks/media/useUpdateMedia'

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
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { id } = params


  const { data: mediaData } = useGetMediaById(id)
  const updateMutation = useUpdateMedia()
  console.log(id, mediaData, 'dataid')

  const formSchema = zSchema.pick({
    _id: true,
    alt: true,
    title: true
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: "",
      alt: "",
      title: ""
    },
  });

  useEffect(() => {
    if (mediaData && mediaData.success) {
      const data = mediaData.data
      form.reset({
        _id: data._id,
        alt: data.alt,
        title: data.title
      })
    }
  }, [mediaData])

  const onSubmit = (values) => {
    setLoading(true);

    updateMutation.mutate(values, {
      onSettled: () => {
        setLoading(false);
      }
    });
  };


  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData} />
      <Card className='py-0 rounded shadow-sm'>
        <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
          <h4 className='text-semibold text-xl'>Edit Media</h4>
        </CardHeader>
        <CardContent className='pb-5'>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
          >
            <div className='mb-5'>
              {mediaData?.data?.secure_url && (
                <Image
                  src={mediaData.data.secure_url || imagePlaceholder}
                  height={150}
                  width={150}
                  alt={mediaData.data.alt || 'Image'}
                />
              )}
            </div>
            <FieldGroup>
              {/* Alt */}
              <Controller
                name="alt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Alt</FieldLabel>
                    <Input {...field} type="text" placeholder='Enter Alt' />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Title</FieldLabel>
                    <Input {...field} type="text" placeholder='Enter Title' />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Submit */}
            <ButtonLoading
              type="submit"
              text="Update Media"
              loading={loading}
              className="cursor-pointer"
            />

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditMedia
