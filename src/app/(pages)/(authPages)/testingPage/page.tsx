"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { fetchUserData } from "@/app/redux/slices/authSlice";
import axios from "axios";

export default function TestingPage() {
  const dispatch = useAppDispatch();
  const { isLoggedIn, userData } = useAppSelector((state: any) => state.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/chatPageApis/getUsers");
        // console.log("this is response in testing page",response)

        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.log("this is error in page.tsx", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Testing Page</h1>
      {/* fetching user data after login */}
      {isLoggedIn && <h1>User is logged in</h1>}
      {userData && <h1>User data: {userData.data.name}</h1>}
      {userData && <h1>User data: {userData.data.phone}</h1>}
      {userData && <h1>UserFriends data: {userData.data.friends} </h1>}
      <br></br>

      {/* Display users */}
      <div>
        <h2>All Users:</h2>
        {users.map((user: any) => (
          <div key={user._id}>
            <p>Name: {user.name}</p>
            <p>Phone: {user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
