import { FindAgentsQuery } from "@/lib/api/agents/find-agents";
import { AgentsTable, Filter } from "./_components";

export const revalidate = 0;
type AgensPageProps = {
  searchParams: Promise<FindAgentsQuery>;
};

const AgentsPage = async ({ searchParams }: AgensPageProps) => {
  const query = await searchParams;
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <Filter searchParams={query} />
      <AgentsTable searchParams={query} />
    </div>
  );
};

export default AgentsPage;
