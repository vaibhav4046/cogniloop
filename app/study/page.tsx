import { Session } from "@/components/Session";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Study · Cogniloop",
  description: "Active recall session — Cogniloop asks, you explain, it grades. Loop until mastered.",
};

export default function StudyPage() {
  return <Session />;
}
