import { CreateDeveloperForm } from "./_components";

export default function NewDeveloperPage() {
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <h1 className="text-lg font-bold">New Developer</h1>
      <CreateDeveloperForm />
    </div>
  );
}
