import fetch from 'node-fetch';

export async function getAllTasksData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}api/list-task/`)
  );
  const tasks = await res.json();
  const staticFilterTasks = tasks.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return staticFilterTasks;
}

export async function getAllTaskIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}api/list-task/`)
  );
  const tasks = await res.json();
  return tasks.map((task) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });
}
export async function getTaskData(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}api/detail-task/${id}/`)
  );
  const task = await res.json();

  return task;
}
