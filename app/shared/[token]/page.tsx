import { SharedView } from "@/components/SharedView";

export const metadata = {
  title: "Shared session · Cogniloop",
};

export default async function SharedPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <SharedView token={token} />;
}
