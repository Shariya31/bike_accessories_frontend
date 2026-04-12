'use client'
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { Button } from '@/components/ui/button'
import { FiPlus } from 'react-icons/fi'
import { showToast } from '@/lib/showToast'
import { useCreateMedia } from '@/hooks/media/useCreateMedia'
const UploadMedia = ({ isMultiple }) => {
    const { mutateAsync: createMedia, isPending } = useCreateMedia();
    const handleOnError = (error) => {
        showToast('error', error.statusText)
    }

    const handleOnQueuesEnd = async (results) => {
        console.log(results, 'results')
        const files = results.info.files

        const uploadedFiles = files.filter(file => file.uploadInfo).map(file => ({
            asset_id: file.uploadInfo.asset_id,
            public_id: file.uploadInfo.public_id,
            secure_url: file.uploadInfo.secure_url,
            path: file.uploadInfo.path,
            thumbnail_url: file.uploadInfo.thumbnail_url,
            etag: file.uploadInfo.etag, 
        }))

        if (uploadedFiles.length > 0) {
            try {
                console.log(uploadedFiles, "uploadedFiles");
                const response = await createMedia({
                    payload: uploadedFiles,
                });

                showToast(
                    'success',
                    response?.data?.message || response?.message || 'Media uploaded successfully'
                );
            } catch (error) {
                console.error('Media save error:', error);

                showToast(
                    'error',
                    error?.response?.data?.message || 'Failed to save media'
                );
            }
        }
    }
    return (
        <CldUploadWidget
            signatureEndpoint={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cloud/cloudinary-signature`}
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
            }}
        >

            {({ open }) => {
                return (
                    <Button type="button" className="button" onClick={() => open()}>
                        <FiPlus />
                        Upload Media
                    </Button>
                );
            }}
        </CldUploadWidget>
    )
}

export default UploadMedia
