import SignIn from "@/src/app/components/sign-in";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col bg-white justify-center items-center rounded-xl py-5 px-3 gap-3">
        <h2 className="text-xl">まずはログインして始めましょう</h2>
        <SignIn />
      </div>
    </div>
  );
};

export default page;
