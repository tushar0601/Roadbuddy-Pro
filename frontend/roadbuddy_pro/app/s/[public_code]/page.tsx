import { PublicPingScreen } from "@/components/public/public-ping-screen";

type PageProps = {
  params: Promise<{
    public_code: string;
  }>;
};

export default async function PublicPingPage({ params }: PageProps) {
  const { public_code } = await params;

  return <PublicPingScreen publicCode={public_code} />;
}