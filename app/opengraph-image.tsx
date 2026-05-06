import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cogniloop — The AI tutor that refuses to give you the answer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0b0d",
          color: "#e7e9ea",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "4px solid #a78bfa",
              borderTopColor: "transparent",
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.02em" }}>
            Cogniloop
          </div>
        </div>

        <div style={{ display: "flex", marginTop: "auto", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              maxWidth: "1000px",
            }}
          >
            The AI tutor that{" "}
            <span style={{ color: "#a78bfa" }}>refuses</span> to give you the answer.
          </div>

          <div
            style={{
              fontSize: "26px",
              color: "#8a8f96",
              marginTop: "30px",
              lineHeight: 1.4,
              maxWidth: "950px",
            }}
          >
            Active recall · Feynman technique · 6 curriculum packs · Free, no signup
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            display: "flex",
            gap: "10px",
            fontSize: "18px",
            color: "#565b62",
            fontFamily: "monospace",
          }}
        >
          cogniloop · github.com/vaibhav4046/cogniloop
        </div>
      </div>
    ),
    { ...size }
  );
}
