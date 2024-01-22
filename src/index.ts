import {
  SendMediaParams,
  SendMediaResponse,
  SendTextParams,
  SendTextResponse,
  UploadMediaParams,
  UploadMediaResponse,
} from "./types";

const apiBase = "https://api.zamiapi.com";

export default class Zami {
  apiSecret: string;

  constructor(apiSecret: string) {
    this.apiSecret = apiSecret;
  }

  async sendText(params: SendTextParams) {
    const response = await fetch(`${apiBase}/send-text`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Authorization: `${this.apiSecret}`,
      },
    });
    const data = (await response.json()) as SendTextResponse;

    if (data.success) {
      return data.id;
    } else {
      throw new Error(data.error);
    }
  }

  async uploadMedia(params: UploadMediaParams) {
    const response = await fetch(`${apiBase}/upload-media`, {
      method: "POST",
      headers: {
        Authorization: `${this.apiSecret}`,
        "Content-Type": params.contentType,
      },
      body: params.media,
    });

    if (response.status !== 201) {
      const message = await response.json().then((data) => data.message);
      throw new Error(
        `Failed to upload media, response status code: ${response.status}, message: ${message}`
      );
    }

    const data = (await response.json()) as UploadMediaResponse;

    return data.id;
  }

  async sendMedia(params: SendMediaParams) {
    let mediaId: string | undefined = undefined;
    if (params.media_id) {
      mediaId = params.media_id;
    } else if (params.media) {
      mediaId = await this.uploadMedia({
        media: params.media,
        contentType: params.content_type,
      });
    }

    const responseSend = await fetch(`${apiBase}/send-media`, {
      method: "POST",
      body: JSON.stringify({
        connection_id: params.connection_id,
        recipient: params.recipient,
        reply_to_id: params.reply_to_id,
        media_id: mediaId,
      }),
      headers: {
        Authorization: `${this.apiSecret}`,
      },
    });

    if (responseSend.status != 201) {
      const errorData = (await responseSend.json()) as { message: string };
      throw new Error(errorData.message);
    }

    const dataSend = (await responseSend.json()) as SendMediaResponse;

    return dataSend.id;
  }

  async listen(callback: (message: any) => void) {
    const response = await fetch(`${apiBase}/events`, {
      headers: {
        Authorization: this.apiSecret,
      },
    });

    const reader = response.body?.getReader();

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();

        if (value) {
          const message = new TextDecoder("utf-8").decode(value);
          callback(JSON.parse(message));
        }

        if (done) {
          return;
        }
      }
    }
  }
}

export * from "./types";
