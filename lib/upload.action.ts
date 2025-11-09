"use server";

import cloudinary from "./cloudinary";

async function fileToBuffer(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer;
}

export async function uploadImage(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  const file = formData.get("file") as File;

  if (!file) {
    return { success: false, error: "No file provided." };
  }

  const buffer = await fileToBuffer(file);

  try {
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "ambassadors",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    const result = uploadResult as { secure_url: string };

    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error(error);
    const errorMessage = (error as Error).message || "Failed to upload image.";
    return { success: false, error: errorMessage };
  }
}
