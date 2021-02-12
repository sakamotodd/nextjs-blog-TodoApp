import { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import Cookie from 'universal-cookie';

const cookie = new Cookie();

export default function TaskForm({ taskCreated }) {
  const { selectTask, setSelectTask } = useContext(StateContext);

  const create = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/tasks/`, {
      method: 'POST',
      body: JSON.stringify({ title: selectTask.title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    setSelectTask({ id: 0, title: '' });
    taskCreated();
  };

  const update = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/tasks/${selectTask.id}/`,
      {
        method: 'PUT',
        body: JSON.stringify({ title: selectTask.title }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    setSelectTask({ id: 0, title: '' });
    taskCreated();
  };
  return (
    <div>
      <form onSubmit={selectTask.id !== 0 ? update : create}>
        <input
          className="text-black mb-8 px-2 py-1"
          type="text"
          value={selectTask.title}
          onChange={(e) =>
            setSelectTask({ ...selectTask, title: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
        >
          {selectTask.id !== 0 ? 'update' : 'create'}
        </button>
      </form>
    </div>
  );
}
