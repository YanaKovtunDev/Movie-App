import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeId' });

const fileSize = '4MB';
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: fileSize } })
    .middleware(async ({ req }) => {
      const user = auth(req);

      if (!user) throw new Error('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
