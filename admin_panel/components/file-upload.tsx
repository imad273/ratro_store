'use client';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from './ui/use-toast';
import { useState } from 'react';

interface ImageUploadProps {
  onChange?: any;
  value: any;
}

export default function FileUpload({
  onChange,
  value
}: ImageUploadProps) {
  const { toast } = useToast();

  const [previewsImages, setPreviewsImages] = useState<string[]>([]);

  const onUpdateFile = (newFiles: any) => {
    if (value === undefined) {
      onChange([newFiles]);
    } else {
      onChange([...value, ...newFiles]);
    }

    // image previews
    const imageUrls = Array.from(newFiles).map((file: any) => URL.createObjectURL(file));
    setPreviewsImages([...previewsImages, ...imageUrls]);

    toast({
      description: "Images uploaded Successfully.",
    })
  };

  const onDeleteFile = (index: number) => {
    let newValue = value.filter((_: any, i: any) => i !== index);;
    let newPreview = previewsImages.filter((_, i) => i !== index);;

    onChange(newValue);
    setPreviewsImages(newPreview);

    toast({
      description: "Images Deleted Successfully.",
    })
  };

  return (
    <div>
      <div>
        <div className='w-full'>
          <label htmlFor="dropzone-file" className="flex flex-col items-center w-full p-5 mx-auto mt-2 text-center border-2 border-gray-700 border-dashed cursor-pointer bg-card rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>

            <h2 className="mt-1 font-medium tracking-wide text-gray-200">Payment File</h2>

            <p className="mt-2 text-xs tracking-wide text-gray-400">Upload or darg & drop your file SVG, PNG, JPG or GIF. </p>

            <input id="dropzone-file" onChange={(e) => onUpdateFile(e.target.files)} type="file" className="hidden" />
          </label>
        </div>
      </div>

      {/* Previews */}
      <div>
        <div className='flex items-center gap-5 my-2'>
          {previewsImages.map((image, index) => (
            <div key={image} className='flex flex-col items-center gap-2 p-1 border rounded-md border-input'>
              <Image width={80} height={80} className='w-20 h-20 bg-cover rounded-md' src={image} alt='image' />
              <Trash2 onClick={() => onDeleteFile(index)} size={18} className='text-red-600 cursor-pointer' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
