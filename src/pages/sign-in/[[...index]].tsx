import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="my-20 flex w-full flex-col items-center justify-center">
      <SignIn />
    </div>
  );
}
