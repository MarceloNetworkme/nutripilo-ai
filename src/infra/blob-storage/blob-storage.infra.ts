import { BlobServiceClient, type ContainerClient } from "@azure/storage-blob";

const containerName = "default";
const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-11-22T21:05:01Z&st=2024-11-22T13:05:01Z&spr=https&sig=IPtgCElR57gnkW73zjiA9oDZh4zQDMXsfdTsBWTWzao%3D";
const storageAccountName = 'nutripilot';

interface UploadFileResult {
  success: boolean;
  imageUrl?: string;
}

const normalizeString = (str: string) => {
  let normalizedStr = str.split(".")[0];
  normalizedStr = normalizedStr
    .normalize("NFD")
    // biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z1-9 ]/g, "")
    .replace(/ /gi, "_");
  return normalizedStr;
};

const getExtension = (file: File) => {
  const extension = file.name.split(".").pop();
  const extByType = file.type.split("/").pop();
  return `.${extension || extByType}`;
};

const createBlobInContainer = async (containerClient: ContainerClient, file: File, filePath: string, setProgress?: (progress: number) => void) => {
  const blobClient = containerClient.getBlockBlobClient(filePath);

  const options = {
    blobHTTPHeaders: { blobContentType: file.type },
    onProgress: ({ loadedBytes }: { loadedBytes: number }) => {
      if (setProgress) setProgress(loadedBytes / file.size);
    },
  };

  await blobClient.uploadBrowserData(file, options);
};

type UploadFileParams = {
  file: File;
  containerCustomName?: string;
  userName: string;
  useRandomString?: boolean;
  setProgress?: (progress: number) => void;
  containerPath?: string;
};

const uploadFile = async ({ file, containerCustomName = "", userName, useRandomString = true, setProgress, containerPath }: UploadFileParams): Promise<UploadFileResult> => {
  if (!file) return { success: false };

  const randomString = Math.random().toString(36).split(".").pop();
  const fileName = normalizeString(userName + file.name);

  const filePath = `${containerPath ? `${containerPath}/` : ""}${useRandomString ? `${fileName}_${randomString}` : file.name}${getExtension(file)}`;
  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`);

  containerCustomName = containerCustomName || containerName;
  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerCustomName);

  const existContainer = await containerClient.exists();
  if (!existContainer) {
    await containerClient.createIfNotExists({
      access: "container",
    });
  }

  // upload file
  try {
    await createBlobInContainer(containerClient, file, filePath, setProgress);
    const imageUrl = `https://${storageAccountName}.blob.core.windows.net/${containerCustomName}/${filePath}`;
    return {
      success: true,
      imageUrl,
    };
  } catch (_error) {
    return {
      success: false,
    };
  }
};

export const BlobStorageAPI = {
  uploadFile,
};
