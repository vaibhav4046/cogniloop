import { SettingsView } from "@/components/SettingsView";

export const metadata = {
  title: "Settings · Cogniloop",
  description:
    "Bring your own API key for higher quality + speed. Configure voice, TTS, and provider preference. All settings live in your browser.",
};

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return <SettingsView />;
}
