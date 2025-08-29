// front/app/(auth)/signin/page.tsx

import SigninForm from "@/components/domain/auth/SigninForm";

const SigninPage = () => {
  return (
    <div className="flex justify-center min-h-screen pt-40">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg h-fit">
        <SigninForm />
      </div>
    </div>
  );
};

export default SigninPage;