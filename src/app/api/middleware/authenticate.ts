// app/api/middleware/authenticate.ts
import jwt from "jsonwebtoken";

export const authenticate = (handler: any) => async (request: any) => {
  const token = request.headers.get("Authorization");

  if (!token) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const decodedToken: any = jwt.verify(
      token,
      "dhdhdhdhdhjjhdjdfdjfdjfdfdfdhf"
    );
    request.userId = decodedToken.userId;
    return handler(request);
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid token" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
