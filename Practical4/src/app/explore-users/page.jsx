"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/userService";

export default function ExploreUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  return (
    <div>
      <h1>Explore Users</h1>

      {users.map((user) => (
        <div key={user.id}>
          {user.username}
        </div>
      ))}
    </div>
  );
}