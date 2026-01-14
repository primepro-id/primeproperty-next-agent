import { EditBankForm } from "./_components/edit-bank-form";

type EditBankPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBankPage({ params }: EditBankPageProps) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <h1 className="text-lg font-bold">Edit Bank</h1>
      <EditBankForm id={id} />
    </div>
  );
}
