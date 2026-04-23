import { PublicPingScreen } from "@/components/public/public-ping-screen";
import { fetchPublicSticker } from "@/services/ping-service";

type PageProps = {
  params: Promise<{
    public_code: string;
  }>;
};

export default async function PublicPingPage({ params }: PageProps) {
  const { public_code } = await params;

  let sticker;

  try {
    sticker = await fetchPublicSticker(public_code);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // 404 or API failure → treat as invalid
    sticker = {
      status: "INVALID",
      is_active: false,
    };
  }

  return <PublicPingScreen publicCode={public_code} sticker={sticker} />;
}
