import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req: any) {
    // console.log(req.nextauth.token);
    return NextResponse.next();
  },

  {
    callbacks: {
      authorized: ({ token }) => token?.role === 'admin',
    },
  },
);

export const config = { matcher: ['/admin', '/admin/edituser', ] };