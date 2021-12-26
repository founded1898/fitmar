import React from "react";
import dynamic from "next/dynamic";

const Drawer = dynamic(
  () => import("../components/Drawer").then((mod) => mod.Drawer),
  { ssr: false, loading: () => <span>Loading...</span> }
);

export default function Home() {
  return (
    <div>
      <Drawer />
    </div>
  );
}
