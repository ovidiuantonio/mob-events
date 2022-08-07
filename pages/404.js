import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <div className="sponsorships">
      <h1 className="categoryTitle">Nothing to see here...</h1>
      <h2 className="categoryTitle categoryTitle-sub">
        You will be redirected to homepage in 3 seconds...
      </h2>
    </div>
  );
}

export default NotFound;
