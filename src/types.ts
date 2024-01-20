export interface SendTextParams {
  connection_id: string;
  recipient: string;
  body: string;
  reply_to_id?: string | undefined;
}

export interface UploadMediaParams {
  media: Buffer;
  contentType: string;
}

export type SendMediaParams = {
  content_type: string;
  connection_id: string;
  recipient: string;
  reply_to_id?: string | undefined;
} & (
  | { media: Buffer; media_id: undefined }
  | { media_id: string; media: undefined }
);

export type SendTextResponse =
  | { success: true; id: string }
  | { success: false; error: string };

export type SendMediaResponse = { id: string };

export interface UploadMediaResponse {
  id: string;
}
