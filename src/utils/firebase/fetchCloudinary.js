import { v2 as cloudinary } from "cloudinary";

// Configurás Cloudinary (deberías hacerlo en un archivo de config separado en la vida real)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function setImageCloudinary(file, folder) {
  if (!file) {
    throw new Error("No se proporcionó ningún archivo");
  }

  try {
    // Subís el archivo
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folder, // Pone la imagen en una carpeta específica
      use_filename: true, // Usa el nombre original del archivo
      unique_filename: true, // Le agrega algo para que no se pise si ya existe
      overwrite: false, // No pisa archivos existentes
    });

    return result.secure_url; // Devolvés la URL segura de la imagen
  } catch (error) {
    console.error("Error durante la carga del archivo:", error);
    throw error;
  }
}
