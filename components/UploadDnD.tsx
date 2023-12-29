'use client';
import '@uploadthing/react/styles.css';
import { UploadDropzone } from '@/utils/uploadthing';
import { Download } from 'lucide-react';

export default function UploadDnD({ updateImage, imageUrl }: any) {
  return (
    <main>
      {!imageUrl ? (
        <div className="upload-dnd">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(uploadResults) => {
              if (uploadResults && uploadResults.length > 0) {
                updateImage(uploadResults[0].url);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
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
}
