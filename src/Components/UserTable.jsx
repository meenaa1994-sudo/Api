import React from 'react';

function UserTable({ users }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-xs uppercase text-slate-600 font-semibold">
              <th className="py-3.5 px-4">ID</th>
              <th className="py-3.5 px-4">Name</th>
              <th className="py-3.5 px-4">Username</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4">Website</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition">
                <td className="py-3.5 px-4 font-semibold text-indigo-600">
                  #{user.id}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-900">
                  {user.name}
                </td>
                <td className="py-3.5 px-4 text-slate-500">@{user.username}</td>
                <td className="py-3.5 px-4">
                  <a
                    href={`mailto:${user.email}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {user.email}
                  </a>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">{user.phone}</td>
                <td className="py-3.5 px-4">
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {user.website}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;