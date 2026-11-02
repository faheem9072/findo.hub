import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './firebase';

export interface UploadProgressCallback {
  (progress: number): void;
}

/**
 * Compresses an image file in the browser using HTML5 Canvas.
 * Produces a high-quality, lightweight Base64 data URL (JPEG ~70-120KB).
 * Requires zero external cloud setup and persists directly in PostgreSQL.
 */
export function compressImageToBase64(
  file: File,
  maxWidth = 1200,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Only image files (JPEG, PNG, WebP) are supported.'));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Scale down if larger than maxWidth
          if (width > maxWidth || height > maxWidth) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxWidth) / height);
              height = maxWidth;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return resolve(img.src);
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Convert to compressed JPEG data URL
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch {
          resolve(img.src);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image for processing.'));
    };

    reader.onerror = () => reject(new Error('Failed to read image file.'));
  });
}

/**
 * Universal image upload function:
 * - If Firebase Storage is configured, uploads to Firebase.
 * - Otherwise (zero-config default), compresses image in browser into a fast,
 *   high-quality Base64 data URL that saves directly into the database.
 */
export async function uploadImage(
  file: File,
  folder = 'products',
  onProgress?: UploadProgressCallback
): Promise<string> {
  return await uploadImageToFirebase(file, folder, onProgress);
}

/**
 * Uploads a file to Firebase Storage if configured, or gracefully
 * compresses it to Base64 so the admin is NEVER blocked by missing credentials.
 */
export async function uploadImageToFirebase(
  file: File,
  folder = 'products',
  onProgress?: UploadProgressCallback
): Promise<string> {
  // If Firebase is not configured, automatically fall back to fast, high-quality browser compression!
  if (!isFirebaseConfigured() || !storage) {
    if (onProgress) onProgress(40);
    const dataUrl = await compressImageToBase64(file);
    if (onProgress) onProgress(100);
    return dataUrl;
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files (JPEG, PNG, WebP, etc.) are supported.');
  }

  try {
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${folder}/${Date.now()}_${cleanName}`;
    const storageRef = ref(storage, filePath);

    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });

    return await new Promise((resolve, reject) => {
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
        async (error) => {
          console.warn('Firebase Storage upload error, falling back to local compression:', error);
          try {
            const fallback = await compressImageToBase64(file);
            resolve(fallback);
          } catch (err) {
            reject(err);
          }
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          } catch {
            const fallback = await compressImageToBase64(file);
            resolve(fallback);
          }
        }
      );
    });
  } catch (err) {
    console.warn('Firebase upload initialization failed, falling back to local compression:', err);
    return await compressImageToBase64(file);
  }
}
