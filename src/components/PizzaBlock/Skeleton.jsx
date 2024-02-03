import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={4}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="120" r="120" />
    <rect x="0" y="255" rx="12" ry="12" width="280" height="27" />
    <rect x="-1" y="296" rx="12" ry="12" width="280" height="86" />
    <rect x="0" y="419" rx="10" ry="10" width="111" height="33" />
    <rect x="138" y="410" rx="20" ry="20" width="140" height="48" />
  </ContentLoader>
);
