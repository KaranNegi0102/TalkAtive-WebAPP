"use client"
import { Settings } from 'lucide-react'
import { LogOut } from 'lucide-react'
import React ,{useEffect} from 'react'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/app/hooks/hooks'
import { fetchUserData } from '@/app/redux/slices/authSlice'
import profile from '../../../public/profile.png'


export default function UserProfileDetails()  {


  const dispatch = useAppDispatch()
  const {userData} = useAppSelector((state: any) => state.auth)

  useEffect(()=>{
    dispatch(fetchUserData())
  },[dispatch])


  return (
    <>
      {/* User Profile Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={profile}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-blue-500"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {userData?.data?.name || "User Name"}
                </h2>
                {/* <p className="text-sm text-gray-500">
                  {userData?.data?.email || "user@email.com"}
                </p> */}
                <p className="text-sm text-gray-500">
                  {userData?.data?.phone || "1234567890"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
