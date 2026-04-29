'use client'
import React, { use, useEffect, useState } from 'react'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import ButtonLoading from '@/components/application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from '@/routes/AdminPannelRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import { zSchema } from '@/lib/zodSchema'
import slugify from 'slugify'
import { showToast } from '@/lib/showToast'
import { useGetCategoryById } from '@/hooks/category/useGetCategoryById'
import { useUpdateCategory } from '@/hooks/category/useUpdateCategory'

const breadcrumbData = [
    {
        href: ADMIN_DASHBOARD, label: 'Home',
    },
    {
        href: ADMIN_CATEGORY_SHOW, label: 'Category',
    },
    {
        href: '', label: 'Edit Category',
    }
]

const EditCategory = ({ params }) => {
    const { id } = use(params)
    const [loading, setLoading] = useState(false)

    const updateMutation = useUpdateCategory()
    const { data: categoryData } = useGetCategoryById(id)
    const formSchema = zSchema.pick({
        _id: true,
        name: true,
        slug: true,
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: id,
            name: "",
            slug: "",
        },
    });

    useEffect(() => {
        if (categoryData && categoryData?.data?.success) {
            const data = categoryData?.data?.data
            form.reset({
                _id: data?._id,
                name: data?.name,
                slug: data?.slug
            })
        }
    }, [categoryData])

    useEffect(() => {
        const name = form.getValues('name');
        if (name) {
            form.setValue('slug', slugify(name).toLowerCase())
        }
    }, [form.watch('name')])

    const onSubmit = async (values) => {
        setLoading(true)
        updateMutation.mutate(values, {
            onSettled: () => {
                setLoading(false)
            }
        })
    }

    return (
        <div>
            Edit Category
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card className='py-0 rounded shadow-sm'>
                <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
                    <h4 className='text-semibold text-xl'>Edit Category</h4>
                </CardHeader>
                <CardContent className='pb-5'>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-6"
                    >
                        <FieldGroup>
                            {/* Name */}
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Name</FieldLabel>
                                        <Input {...field} type="text" placeholder='Enter Name' />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <FieldGroup>
                            {/* Slug */}
                            <Controller
                                name="slug"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Slug</FieldLabel>
                                        <Input {...field} type="text" placeholder='Enter Slug' />
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
                            text="Update Category"
                            loading={loading}
                            className="cursor-pointer"
                        />

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditCategory
