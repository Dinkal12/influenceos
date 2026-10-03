// S3-compatible file storage integration
export async function uploadFile(key: string, body: Buffer, contentType: string) {
  // TODO: Implement S3 upload
  throw new Error('Not implemented')
}

export async function getFileUrl(key: string): Promise<string> {
  // TODO: Return a presigned URL
  throw new Error('Not implemented')
}
