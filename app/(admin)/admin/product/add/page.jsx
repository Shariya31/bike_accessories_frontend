'use client'
import React, { useEffect, useState } from 'react'
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
import { useCreateCategory } from '@/hooks/category/useCreateCategory'
import { showToast } from '@/lib/showToast'
import { useGetCategory } from '@/hooks/category/useGetCategory'
import Select from '@/components/application/Select/Select'
import Editor from '@/components/application/admin/Editor'

const breadcrumbData = [
    {
        href: ADMIN_DASHBOARD, label: 'Home',
    },
    {
        href: ADMIN_PRODUCT_SHOW, label: 'Product',
    },
    {
        href: '', label: 'Add Product',
    }
]

const AddProduct = () => {
    const [loading, setLoading] = useState(false)
    const [categoryOptions, setCategoryOptions] = useState([])
    const { mutateAsync: createCategory, isPending } = useCreateCategory()
    const { data: categoryList, isLoading, isError, } = useGetCategory({ limit: 100, deleteType: 'SD' })
    const formSchema = zSchema.pick({
        name: true,
        slug: true,
        category: true,
        mrp: true,
        sellingPrice: true,
        discountPercentage: true,
        description: true
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
            category: '',
            mrp: '',
            sellingPrice: '',
            discountPercentage: '',
            description: '',
        },
    });

    useEffect(() => {
        const name = form.getValues('name');
        if (name) {
            form.setValue('slug', slugify(name).toLowerCase())
        }
    }, [form.watch('name')])

    useEffect(() => {
        if (categoryList && categoryList.pages[0].success) {
            const data = categoryList.pages[0].data
            const options = data.map((cat) => ({
                label: cat.name,
                value: cat._id
            }))

            setCategoryOptions(options)
        }
        console.log(categoryOptions, '74')

    }, [categoryList]);

    const editor = (event, editor) => {
        const data = editor.getData()
        form.setValue('description', data)
    }

    const onSubmit = async (values) => {
        try {
            setLoading(true)
            const { data: response } = await createCategory({
                payload: values
            })

            if (!response.success) {
                throw new Error(response.message, 'Unable to create category')
            }
            form.reset()
            showToast('success', response.message)
        } catch (error) {
            showToast('error',
                error?.response?.data?.message || error.message || 'Failed to create category')
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
            Add Product
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card className='py-0 rounded shadow-sm'>
                <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
                    <h4 className='text-semibold text-xl'>Add Product</h4>
                </CardHeader>
                <CardContent className='pb-5'>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-6"
                    >

                        <div className='grid md:grid-cols-2 gap-5'>

                        <FieldGroup>
                            {/* Name */}
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Name <span className='text-red-500'>*</span></FieldLabel>
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
                                        <FieldLabel>Slug<span className='text-red-500'>*</span></FieldLabel>
                                        <Input {...field} type="text" placeholder='Enter Slug' />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        {/* category */}
                        <FieldGroup>
                            <Controller
                                name="category"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Category<span className='text-red-500'>*</span></FieldLabel>
                                        <Select
                                            options={categoryOptions}
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

                        {/* Description*/}
                        <FieldGroup>
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Description<span className='text-red-500'>*</span></FieldLabel>
                                        <Editor onChange={editor} initialData={field.value} />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        </div>

                        {/* Submit */}
                        <ButtonLoading
                            type="submit"
                            text="Add Product"
                            loading={loading}
                            className="cursor-pointer"
                        />

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddProduct
