import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

/**
 * Compress an image file into a JPEG base64 Data URL.
 * Keeps image dimensions under maxWidth x maxHeight and quality optimized.
 */
export const compressImageToBase64 = (
  file: File,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.75
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error("Failed to load image for compression"));
      img.src = event.target?.result as string;
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Robustly uploads a product image.
 * Tries Firebase Storage first. If Firebase Storage throws an error (e.g., unauthorized / rules / CORS / missing bucket),
 * falls back to compressed Base64 Data URL so product creation NEVER breaks.
 */
export const uploadProductImage = async (
  file: File,
  folder: string
): Promise<string> => {
  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storageRef = ref(storage, `${folder}/${Date.now()}_${cleanFileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (storageError) {
    console.warn(
      `Firebase Storage upload failed for ${folder}, falling back to base64 encoding:`,
      storageError
    );
    return await compressImageToBase64(file);
  }
};
