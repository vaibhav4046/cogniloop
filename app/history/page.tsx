import { HistoryView } from "@/components/HistoryView";

export const metadata = {
  title: "History · Cogniloop",
  description: "Your past Cogniloop sessions, streak, and lifetime stats.",
};

export const dynamic = "force-dynamic";

export default function HistoryPage() {
  return <HistoryView />;
}
