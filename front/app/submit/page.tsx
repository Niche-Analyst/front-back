import NavBar from "@/components/layout/NavBar";
import { SubmissionForm } from "@/components/domain/submit/SubmissionForm";

// /submit 경로에 대한 메인 페이지 컴포넌트입니다.
export default function SubmitPage() {
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-4 py-24">
        <SubmissionForm />
      </main>
    </>
  );
}
