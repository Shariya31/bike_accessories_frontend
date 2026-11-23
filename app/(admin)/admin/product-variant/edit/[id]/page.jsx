'use client'
import React, { use, useEffect, useState } from 'react'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import ButtonLoading from '@/components/application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_VARIANT_SHOW } from '@/routes/AdminPannelRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import { zSchema } from '@/lib/zodSchema'
import slugify from 'slugify'
import { showToast } from '@/lib/showToast'
import Select from '@/components/application/Select/Select'
import Editor from '@/components/application/admin/Editor'
import MediaModal from '@/components/application/admin/MediaModal'
import Image from 'next/image'
import { useCreateProduct } from '@/hooks/product/useCreateProduct'
import { useGetProductById } from '@/hooks/product/useGetProductById'
import { useUpdateProductVariant } from '@/hooks/product-variant/useUpdateProductVariant'
import { useGetProductVariantById } from '@/hooks/product-variant/useGetProductVariantById'
import { useGetProduct } from '@/hooks/product/useGetProduct'
import { sizes } from '@/lib/utils'

const breadcrumbData = [
  {
    href: ADMIN_DASHBOARD, label: 'Home',
  },
  {
    href: ADMIN_PRODUCT_VARIANT_SHOW, label: 'Product Variant',
  },
  {
    href: '', label: 'Edit Product Variant',
  }
]

const EditProductVariant = ({ params }) => {
  const { id } = use(params)
  const [loading, setLoading] = useState(false)
  const [productOptions, setProductOptions] = useState([])
  const { mutateAsync: createProduct, isPending } = useCreateProduct()
  const { data: productList, isLoading, isError, } = useGetProduct({ limit: 100, deleteType: 'SD' })

  // media modal states
  const [open, setOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState([])

  const updateMutation = useUpdateProductVariant()
  const { data: productVariantData, isLoading: productVariantDataLoading } = useGetProductVariantById(id)

  const formSchema = zSchema.pick({
    _id: true,
    product: true,
    sku: true,
    color: true,
    size: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: id,
      product: '',
      sku: '',
      color: '',
      size: '',
      mrp: '',
      sellingPrice: '',
      discountPercentage: '',
    },
  });

  useEffect(() => {
    if (productVariantData && productVariantData?.data?.success) {
      const data = productVariantData?.data?.data
      form.reset({
        _id: data?._id,
        product: data?.product,
        sku: data?.sku,
        color: data?.color,
        size: data?.size,
        mrp: data?.mrp,
        sellingPrice: data?.sellingPrice,
        discountPercentage: data?.discountPercentage,
      })

      if (data?.media) {
        const media = data?.media.map((media) => (
          {
            _id: media._id,
            url: media.secure_url
          }
        ))
        setSelectedMedia(media)
      }

    }
  }, [productVariantData])

  // discount percentage calculation

  useEffect(() => {
    const mrp = form.getValues('mrp') || 0
    const sellingPrice = form.getValues('sellingPrice') || 0

    if (mrp > 0 && sellingPrice > 0) {
      const discountPercentage = ((mrp - sellingPrice) / mrp) * 100
      form.setValue('discountPercentage', Math.round(discountPercentage))
    }
  }, [form.watch('mrp'), form.watch('sellingPrice')])

  useEffect(() => {
    if (productList && productList.pages[0].success) {
      const data = productList.pages[0].data
      const options = data.map((product) => ({
        label: product.name,
        value: product._id
      }))

      setProductOptions(options)
    }
    console.log(productOptions, '74')

  }, [productList]);

  const editor = (event, editor) => {
    const data = editor.getData()
    form.setValue('description', data)
  }

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      if (selectedMedia.length <= 0) {
        return showToast('error', 'Please select a media')
      }

      const mediaIds = selectedMedia.map(media => media._id)

      values.media = mediaIds

      // const { data: response } = await createProduct({
      //   payload: values
      // })

      updateMutation.mutate(values, {
        onSettled: () => {
          setLoading(false)
        }
      })

      // if (!response.success) {
      //   throw new Error(response.message, 'Unable to update product')
      // }
      form.reset()
      // showToast('success', response.message)
    } catch (error) {
      showToast('error',
        error?.response?.data?.message || error.message || 'Failed to update product')
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories</div>;
  }

  return (
    <div className='w-full'>
      Edit Product
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className='py-0 rounded shadow-sm'>
        <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
          <h4 className='text-semibold text-xl'>Edit Product</h4>
        </CardHeader>
        <CardContent className='pb-5'>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
          >

            <div className='grid md:grid-cols-2 gap-5'>
              <div className='grid grid-cols-2 md:grid-cols-2 gap-5'>

                {/* Product */}
                <FieldGroup>
                  <Controller
                    name="product"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Product<span className='text-red-500'>*</span></FieldLabel>
                        <Select
                          options={productOptions}
                          selected={field.value}
                          setSelected={field.onChange}
                          isMulti={false}
                        />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                {/* SKU */}
                <FieldGroup>
                  <Controller
                    name="sku"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>SKU <span className='text-red-500'>*</span></FieldLabel>
                        <Input {...field} type="text" placeholder='Enter SKU' />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                {/* COLOR */}
                <FieldGroup>
                  <Controller
                    name="color"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Color<span className='text-red-500'>*</span></FieldLabel>
                        <Input {...field} type="text" placeholder='Enter Color' />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                {/* SIZE */}
                <FieldGroup>
                  <Controller
                    name="size"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Size<span className='text-red-500'>*</span></FieldLabel>
                        <Select
                          options={sizes}
                          selected={field.value}
                          setSelected={field.onChange}
                          isMulti={false}
                        />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                {/* MRP*/}
                <FieldGroup>
                  <Controller
                    name="mrp"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>MRP<span className='text-red-500'>*</span></FieldLabel>
                        <Input {...field} type="number" placeholder='Enter MRP' />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>


                {/* Selling Price*/}
                <FieldGroup>
                  <Controller
                    name="sellingPrice"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Selling Price<span className='text-red-500'>*</span></FieldLabel>
                        <Input {...field} type="number" placeholder='Enter Selling Price' />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                {/* Discount Percentage*/}
                <FieldGroup>
                  <Controller
                    name="discountPercentage"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Discount Percentage<span className='text-red-500'>*</span></FieldLabel>
                        <Input {...field} type="number" placeholder='Enter Discount Percentage' readOnly />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>

            </div>

            <div className='md:col-span-2 border border-dashed rounded p-5 text-center'>
              <MediaModal
                open={open}
                setOpen={setOpen}
                selectedMedia={selectedMedia}
                setSelectedMedia={setSelectedMedia}
                isMultiple={true}
              />

              {selectedMedia.length > 0 &&
                <div className='flex justify-center items-center flex-wrap gap-2'>
                  {selectedMedia.map(media => (
                    <div key={media._id} className='h-24 w-24 border'>
                      <Image
                        src={media.url}
                        alt={media.alt || ''}
                        height={50}
                        width={50}
                        className='size-full object-cover'
                      />
                    </div>
                  ))}
                </div>}

              <div className='bg-gray-50 dark:bg-card border w-50 mx-auto p-5 cursor-pointer' onClick={() => setOpen(true)}>
                <span className='w-[5rem] font-semibold'>Select Media</span>
              </div>
            </div>

            {/* Submit */}
            <ButtonLoading
              type="submit"
              text="Save Changes"
              loading={loading}
              className="cursor-pointer"
            />

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditProductVariant
