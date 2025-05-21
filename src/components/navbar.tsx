import Link from "next/link";

export default function Navbar(){
  return(
    <nav className="bg-white border-b  shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">TalkAtive</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-900 hover:text-blue-600 font-medium">Login</Link>
              <Link href="/register" className="text-gray-900 hover:text-blue-600 font-medium">Register</Link>
            </div>

          </div>
        </div>
      </nav>
  )
}