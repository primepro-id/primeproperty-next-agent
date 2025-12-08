import { FindLeadsQuery } from "@/lib/api/leads/find-leads";
import { Table } from "./_components";
import { Filter } from "./_components/filter";

type LeadsPageProps = {
  searchParams: Promise<FindLeadsQuery>;
};

const LeadsPage = async ({ searchParams }: LeadsPageProps) => {
  const query = await searchParams;
  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <Filter searchParams={query} />
      <Table searchParams={query} />
    </div>
  );
};

export default LeadsPage;
