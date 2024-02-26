import MultiStepperForm from "@/components/MultiStepperForm";

export default function Home() {
  return (
    <>
      <div className="">
        <div className="max-w-screen-lg mx-auto py-[60px]">
          <p className="text-center font-bold text-3xl hidden sm:block">
            Fill this form to check your eligibility
          </p>
          <div className="mt-6 sm:px-2 px-4">
            <MultiStepperForm />
          </div>
        </div>
      </div>
    </>
  );
}
