'use client';

import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import AvatarEditor from 'react-avatar-editor';
import { Slider } from "@/components/ui/slider"
import { uploadProfileImage } from '@/queries';
import { toast } from 'sonner';

type Props = {
  closeModal: () => void
  selectedFile: File
  selectedFileUrl: string
  setSelectedFile: (file: File) => void
  setSelectedFileUrl: (url: string) => void
}

const EditPictureModal = ({ closeModal, selectedFile, selectedFileUrl, setSelectedFile, setSelectedFileUrl }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profilePictureRef = useRef<AvatarEditor>(null);
  const [imageScale, setImageScale] = useState<number[]>();
  const [modalPicture, setModalPicture] = useState<string | null>(selectedFileUrl);
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setModalPicture(URL.createObjectURL(file));
      console.log('typeof', typeof selectedFileUrl);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleButtonUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('write before upload', profilePictureRef.current?.getImage().toDataURL())
    if (!profilePictureRef.current) return;
    const dataUrl = profilePictureRef.current.getImageScaledToCanvas().toDataURL();
    const file = new File([dataUrl], 'profile.png', { type: 'image/png' });
    console.log('dataUrl', dataUrl);
    console.log('file', file);
    // setSelectedFile(file);
    // setSelectedFileUrl(profilePictureRef.current?.getImage().toDataURL());
    // try {
    //   await uploadProfileImage(dataUrl);
    //   toast('Profile picture updated!', { position: 'top-center' });
    //   closeModal();
    // } catch (error) {
    //   console.error('error', error);
    // }
  };

  return (
    <div
      className="relative z-40"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div className="relative w-[450px] sm:w-[450px] my-auto rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all z-50">
            <div className="px-5 py-4 flex flex-col items-center justify-center">
              <Button
                type="button"
                className="rounded-full p-[1px] w-10 h-10 box-content inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none absolute top-4 right-4"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <X className='' />
              </Button>
              <h2 className="text-2xl font-bold mb-4 self-start">Edit Profile Picture</h2>
            </div>
            <form onSubmit={(e) => handleButtonUpload(e)} className='flex flex-col w-full justify-center'>
              <AvatarEditor
                ref={profilePictureRef}
                className='rounded-lg mx-auto object-cover w-[187px] !h-[300px] xs:w-[280px] xs:h-[280px]'
                image={modalPicture || '/profile.jpg'}
                border={0}
                color={[0, 0, 0, 0.6]} // RGBA
                scale={imageScale ? imageScale[0] : 1}
                rotate={0}
              />
              <input type="file" id="file" className="hidden" accept='image/*' ref={fileInputRef} onChange={onFileChange} />
              <Slider className="w-[50%] mx-auto mt-10" defaultValue={[1.2]} min={1} max={1.5} step={.1} onValueChange={(e) => setImageScale(e)} />
              <div className='flex justify-around my-10'>
                <Button type="button" className='bg-card-bg-dark w-20 xs:w-40' onClick={onButtonClick}>Change</Button>
                <Button type="submit" className='bg-card-bg-dark w-20 xs:w-40'>Save</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default EditPictureModal