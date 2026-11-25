'use client'
import React, { use, useEffect, useState } from 'react'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import ButtonLoading from '@/components/application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from '@/routes/AdminPannelRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import { zSchema } from '@/lib/zodSchema'
import slugify from 'slugify'
import { showToast } from '@/lib/showToast'
import { useGetCategory } from '@/hooks/category/useGetCategory'
import Select from '@/components/application/Select/Select'
import Editor from '@/components/application/admin/Editor'
import MediaModal from '@/components/application/admin/MediaModal'
import Image from 'next/image'
import { useUpdateCoupon } from '@/hooks/coupon/useUpdateCoupon'
import { useGetCouponById } from '@/hooks/coupon/useGetCouponById'

const breadcrumbData = [
    {
        href: ADMIN_DASHBOARD, label: 'Home',
    },
    {
        href: ADMIN_PRODUCT_SHOW, label: 'Product',
    },
    {
        href: '', label: 'Edit Product',
    }
]

const EditCoupon = ({ params }) => {
    const { id } = use(params)
    const [loading, setLoading] = useState(false)

    const updateMutation = useUpdateCoupon()
    const { data: couponData, isLoading: couponDataLoading } = useGetCouponById(id)

    const formSchema = zSchema.pick({
        _id: true,
        code: true,
        discountPercentage: true,
        minShoppingAmount: true,
        validity: true
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: id,
            code: '',
            discountPercentage: '',
            minShoppingAmount: '',
            validity: '',

        },
    });

    useEffect(() => {
        if (couponData && couponData?.data?.success) {
            const data = couponData?.data?.data
            form.reset({
                _id: data?._id,
                code: data?.code,
                discountPercentage: data?.discountPercentage,
                minShoppingAmount: data?.minShoppingAmount,
                validity: data?.validity,
            })
        }
    }, [couponData])


    const onSubmit = async (values) => {
        try {
            setLoading(true)


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

    if (couponDataLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full'>
            Edit Coupon
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card className='py-0 rounded shadow-sm'>
                <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
                    <h4 className='text-semibold text-xl'>Edit Coupon</h4>
                </CardHeader>
                <CardContent className='pb-5'>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-6"
                    >

                        <div className='grid md:grid-cols-2 gap-5'>
                            <div className='grid grid-cols-2 md:grid-cols-2 gap-5'>
                                <FieldGroup>
                                    {/* Code */}
                                    <Controller
                                        name="code"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>Name <span className='text-red-500'>*</span></FieldLabel>
                                                <Input {...field} type="text" placeholder='Enter Code' />
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
                                                <Input {...field} type="number" placeholder='Enter Discount Percentage' />
                                                {fieldState.error && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>

                                {/* Minimum Shopping Amount*/}
                                <FieldGroup>
                                    <Controller
                                        name="minShoppingAmount"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel> Min. Shopping Amount<span className='text-red-500'>*</span></FieldLabel>
                                                <Input {...field} type="number" placeholder='Enter Minimum Shopping Amount' />
                                                {fieldState.error && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>

                                {/* Validity*/}
                                <FieldGroup>
                                    <Controller
                                        name="validity"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>Validity<span className='text-red-500'>*</span></FieldLabel>
                                                <Input {...field} type="date" />
                                                {fieldState.error && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
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

export default EditCoupon
