import { Card } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

function index() {
  const router = useRouter();
  const { scheduleId } = router.query;
  return (
    <div>
      <Card />
      <h1>{scheduleId}</h1>
    </div>
  );
}

export default index;
