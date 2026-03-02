"use client";

import { useEffect } from "react";

export default function UnicornScene() {
  useEffect(() => {
    if (window.UnicornStudio?.init) {
      window.UnicornStudio.init();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.3/dist/unicornStudio.umd.js";
    script.async = true;

    script.onload = () => {
      window.UnicornStudio.init();
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <div
        data-us-project="YpC2ERpId4SqPSACwfMb"
        style={{
          width: "768px",
          height: "1084px",
        }}
      />
    </div>
  );
}
