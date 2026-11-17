import React from 'react';

function UserCard({ user }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm">
            #{user.id}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            @{user.username}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mb-4">{user.name}</h2>

        <ul className="space-y-2.5 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="font-medium text-slate-800 min-w-[70px]">Email:</span>
            <a
              href={`mailto:${user.email}`}
              className="text-indigo-600 hover:underline break-all"
            >
              {user.email}
            </a>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium text-slate-800 min-w-[70px]">Phone:</span>
            <span>{user.phone}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium text-slate-800 min-w-[70px]">Website:</span>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              {user.website}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserCard;