import { NextResponse } from "next/server";

export function ApiSuccess(message: string, data: any = {}, status: number = 200, cookie?: { name: string; value: string; options?: any }) {
  const response = NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: status }
  );
  if (cookie) {
    response.cookies.set(cookie.name, cookie.value, cookie.options || {});
  }
  return response;
}


export function ApiError(message:string, error?:any , status:number=500){

  console.log("api error message in services -> ",error?.message);

  return NextResponse.json({
    success:false,
    error:error?.message || "Internal Server Error",
  },
  {status:status}
)
}
