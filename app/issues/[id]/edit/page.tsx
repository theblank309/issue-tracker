import { IssueResponse } from "@/app/schema";
import axios from "axios";
import { notFound } from "next/navigation";
import IssueForm from "@/app/issues/_components/IssueForm";

interface Props {
  params: { id: number };
}

const EditIssuePage = async ({ params }: Props) => {
  let issue: IssueResponse | null = null;
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/get_issues/${params.id}`
    );
    issue = response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) notFound();
  }
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
