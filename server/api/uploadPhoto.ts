import { put } from '@vercel/blob';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  console.log("BLOB_READ_WRITE_TOKEN:", token);

  // Parse the request body
  const body = await readBody(event);
  const { filename, folder } = body;
  const targetFolder = folder || 'default-folder';

  const fileData = await readRawBody(event);
  if (!fileData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file data provided',
    });
  }

  const filePath = `${targetFolder}/${filename}`;

  // Upload the file to Vercel Blob with the token explicitly passed
  const blob = await put(filePath, fileData, {
    access: 'public',
    token, // Use the token from process.env
  });

  return {
    statusCode: 200,
    body: blob,
  };
});
