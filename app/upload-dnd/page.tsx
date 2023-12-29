'use client';
import '@uploadthing/react/styles.css';
import { UploadDropzone } from '@uploadthing/react';
import { OurFileRouter } from '../api/uploadthing/core';
import { FC } from 'react';
import { Download } from 'lucide-react';

interface UploadDnDProps {
  updateImage: (src: string) => void;
  imageUrl?: string;
}
const UploadDnD: FC<UploadDnDProps> = ({ updateImage, imageUrl }) => {
  return (
    <main>
      {!imageUrl ? (
        <div className="upload-dnd">
          <UploadDropzone<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(uploadResults) => {
              if (uploadResults && uploadResults.length > 0) {
                updateImage(uploadResults[0].url);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          >
            <p className="text-white">Drop an image here</p>
          </UploadDropzone>
        </div>
      ) : (
        <div className="flex items-center flex-col">
          <img src={imageUrl} className="upload-img" />
          <button
            className="button-default mt-5 flex items-center justify-center"
            style={{ width: '50%' }}
            onClick={() => updateImage('')}
          >
            Change image <Download className="ms-4" />
          </button>
        </div>
      )}
    </main>
  );
};

export default UploadDnD;
