import { CreateBankForm } from "./_components";

export default function NewBankPage() {
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <h1 className="text-lg font-bold">New Bank</h1>
      <CreateBankForm />
    </div>
  );
}
