"use client";
import React , {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { fetchUserData } from '@/app/redux/slices/authSlice'

export default function TestingPage() {

  const dispatch = useAppDispatch();
  const { isLoggedIn ,userData } = useAppSelector((state:any)=>state.auth);

  useEffect(()=>{
    dispatch(fetchUserData());
  },[dispatch])

  return (
    <div>
      <h1>Testing Page</h1>
      {/* fetching user data after login */}
      {isLoggedIn && <h1>User is logged in</h1>}
      {userData && <h1>User data: {userData.data.name}</h1>}
      {userData && <h1>User data: {userData.data.phone}</h1>}

    </div>
  )
}
