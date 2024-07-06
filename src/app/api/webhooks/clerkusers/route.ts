import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import ApiError from "@/utils/apiError";

export const POST = TryCatchBlock(async (req: NextRequest) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new ApiError(
      400,
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature)
    throw new ApiError(400, "Error occured -- no svix headers");

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers

  evt = wh.verify(body, {
    "svix-id": svix_id,
    "svix-timestamp": svix_timestamp,
    "svix-signature": svix_signature,
  }) as WebhookEvent;

  // Get the ID and type
  const eventType = evt.type;
  console.log(evt);
  // CREATE
  if (eventType === "user.created") {
    const { id, email_addresses, username, image_url } = evt.data;

    await createUser({
      username: username,
      avatar: image_url || "",
      email: email_addresses[0].email_address,
      clerkId: id,
    });

    return new ApiResponse(true, "User Created Successfully!", 200);
  }

  // UPDATE
  if (eventType === "user.updated") {
    const { id, image_url, username, email_addresses } = evt.data;

    await updateUser(id, {
      username: username,
      avatar: image_url,
      email: email_addresses[0].email_address,
      clerkId: id,
    });

    return new ApiResponse(true, "User Updated Successfully!", 200);
  }

  // DELETE
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    await deleteUser(id);
    return new ApiResponse(true, "User Deleted SuccessFully!", 200);
  }

  return new ApiResponse(true, "User created!", 200);
}, "/api/webhooks/clerk");
