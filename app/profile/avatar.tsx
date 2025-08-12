'use client'
import React, { useEffect, useState } from 'react'
import {createClient} from "@/utils/supabase/client"
import Image from 'next/image'
import { Upload } from "lucide-react";

export default function Avatar({
  uid,
  url,
  size,
  onUpload
                               }: {
  uid: string | null,
  url: string | null
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        throw error
        // console.log('Error downloading image', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      // alert('Error uploading avatar!')
      throw error
    } finally {
      setUploading(false)
    }
  }

  return(
    <div>
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{height: size, width: size }} />
      )}
      <div style={{width: size }} className="my-4">
        <label htmlFor="uploadFile"
               className="flex bg-gray-800 hover:bg-gray-700 text-white text-base font-medium px-4 py-2.5 outline-none rounded w-max cursor-pointer mx-auto">
          <div className="flex gap-2 items-center">
            <Upload /> {uploading ? 'Uploading ...' : 'Select File'}
          </div>
          <input type="file" id="uploadFile"  accept="image/*" onChange={uploadAvatar} disabled={uploading} className="hidden"/>
        </label>
      </div>
    </div>
  )
}
