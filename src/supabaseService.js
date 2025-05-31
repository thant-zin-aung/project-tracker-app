import { supabase } from "./supabase";

export async function uploadImage(file) {
  if (!file) {
    alert("Please select a file.");
    return;
  }

  const IMAGE_FOLDER = "project-tracker-app";
  const BUCKET_ID = "testing";
  const filePath = `${IMAGE_FOLDER}/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_ID) // Replace with your bucket name
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    alert("Image upload failed: " + error.message);
    return;
  }
  console.log("Image upload successful:", data);
  const { publicUrl } = supabase.storage
    .from(BUCKET_ID)
    .getPublicUrl(filePath).data;

  return publicUrl;
}
