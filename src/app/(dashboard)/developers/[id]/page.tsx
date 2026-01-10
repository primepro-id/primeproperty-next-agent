import { EditDeveloperForm } from "./_components/edit-developer-form";

type EditDeveloperPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditDeveloperPage({
  params,
}: EditDeveloperPageProps) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <h1 className="text-lg font-bold">Edit Developer</h1>
      <EditDeveloperForm id={id} />
    </div>
  );
}
