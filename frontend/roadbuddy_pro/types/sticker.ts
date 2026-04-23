export type StickerCreateResponse = {
  id: string;
  public_code: string;
  status: string;
  qr_value: string;
};


export type PublicStickerResponse = {
  public_code: string;
  status: string;
  is_active: boolean;
};
