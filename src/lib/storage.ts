import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './firebase';

export interface UploadProgressCallback {
  (progress: number): void;
}

/**
 * Uploads a file to Firebase Storage under a designated path (default: 'products')
 * and returns the public download URL.
 */
export async function uploadImageToFirebase(
  file: File,
  folder = 'products',
  onProgress?: UploadProgressCallback
): Promise<string> {
  if (!isFirebaseConfigured() || !storage) {
    throw new Error(
      'Firebase is not configured yet. Please add your Firebase configuration to .env before uploading.'
    );
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files (JPEG, PNG, WebP, etc.) are supported.');
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('Image size must be less than 10MB.');
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${folder}/${Date.now()}_${cleanName}`;
  const storageRef = ref(storage, filePath);

  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: file.type,
  });

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (onProgress) {
          onProgress(progress);
        }
      },
      (error) => {
        console.error('Firebase Storage upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}
