import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set your credentials here (or use environment variables)
const USERNAME = process.env.BASIC_AUTH_USER || "admin";
const PASSWORD = process.env.BASIC_AUTH_PASSWORD || "password";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const authValue = authHeader.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === USERNAME && pwd === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
