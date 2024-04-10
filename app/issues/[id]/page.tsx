import axios from "axios";
import React from "react";
import { IssueResponse } from "../page";
import { notFound } from "next/navigation";

import delay from "delay";

interface Props {
  params: { id: number };
}

const IssueDetailPage = async ({ params }: Props) => {
  let issue: IssueResponse | null = null;
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/get_issues/${params.id}`
    );
    issue = response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      notFound();
    }
  }
  await delay(2000);
  if (!issue) {
    notFound();
  }

  const date = new Date(issue?.createdAt);
  return (
    <div>
      <p>{issue?.title}</p>
      <p>{issue?.status}</p>
      <p>{date.toDateString()}</p>
      <p>{issue?.description}</p>
    </div>
  );
};

export default IssueDetailPage;
