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
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: "32px", fontWeight: 700 }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#a78bfa",
              marginRight: "16px",
            }}
          />
          Cogniloop
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "120px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: "1040px",
            }}
          >
            <span>The AI tutor that&nbsp;</span>
            <span style={{ color: "#a78bfa" }}>refuses</span>
            <span>&nbsp;to give you the answer.</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "#8a8f96",
              marginTop: "40px",
              maxWidth: "1000px",
            }}
          >
            Active recall · Feynman technique · 8 curriculum packs · Free, no signup
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "auto",
            fontSize: "20px",
            color: "#565b62",
          }}
        >
          <div style={{ display: "flex" }}>github.com/vaibhav4046/cogniloop</div>
          <div style={{ display: "flex" }}>cogniloop · 2026</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
