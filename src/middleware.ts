import {NextResponse , NextRequest} from "next/server";

const protectedRoutes = ["/chattingPage"];
const publicRoutes = ["/aboutus","/login","/register"];

export function middleware(req:NextRequest){
  const token = req.cookies.get("AuthToken")?.value;

  if(!token && protectedRoutes.includes(req.nextUrl.pathname)){
    return NextResponse.redirect(new URL("/",req.url));
  }
  if(token && publicRoutes.includes(req.nextUrl.pathname)){
    return NextResponse.redirect(new URL("/chattingPage",req.url));
  }

  return NextResponse.next();
}

export const config ={
  matcher: ["/chattingPage","/login","/register","/aboutus"],
}