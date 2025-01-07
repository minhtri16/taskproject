import { useEffect, useState } from 'react';
import { DataTable } from './data-table/data-table';
import { UserNav } from './data-table/user-nav';
import { columns } from './data-table/columns';

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://673ce3064db5a341d8334cc9.mockapi.io/tasks')
      .then((response) => response.json())
      .then((fetchedTasks) => {
        setTasks(fetchedTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <>
      <div className="md:hidden">
        {/* Image components */}
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
