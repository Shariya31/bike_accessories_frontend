'use client'
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { Button } from '@/components/ui/button'
import { FiPlus } from 'react-icons/fi'
import { showToast } from '@/lib/showToast'
const UploadMedia = ({ isMultiple }) => {

    const handleOnError = (error) => {
        showToast('error', error.statusText)
    }

    const handleOnQueuesEnd = async(results) => {
        console.log(results, 'results')
    }
    return (
        <CldUploadWidget
            signatureEndpoint={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/media/cloudinary-signature`}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onError={handleOnError}
            onQueuesEnd={handleOnQueuesEnd}
            config={{
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                apikey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
            }}

            options={{
                multiple: isMultiple,
                sources: ['local', 'url', 'unsplash', 'google_drive'],
                maxFiles: 5
            }}
        >

            {({ open }) => {
                return (
                    <Button className="button" onClick={() => open()}>
                        <FiPlus />
                        Upload Media
                    </Button>
                );
            }}
        </CldUploadWidget>
    )
}

export default UploadMedia
