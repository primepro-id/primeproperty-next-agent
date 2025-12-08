import { DynamicProperty } from "./_components";

export const revalidate = 0;
type DynamicPropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const DynamicPropertyPage = async ({ params }: DynamicPropertyPageProps) => {
  const { id } = await params;
  return (
    <div className="p-4">
      <DynamicProperty id={id} />
    </div>
  );
};

export default DynamicPropertyPage;
