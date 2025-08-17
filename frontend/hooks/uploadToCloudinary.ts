export const uploadToCloudinary = async (
  file: File,
  folder: "categories" | "products",
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ecommerce"); // your unsigned preset
  formData.append("folder", `ecommerce/${folder}`);

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/ddxlr1r86/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();
  if (data.secure_url) {
    return data.secure_url;
  } else {
    throw new Error("Upload failed");
  }
};
