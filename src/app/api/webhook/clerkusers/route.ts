/* eslint-disable camelcase */
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

// import { createUser, deleteUser, updateUser } from "./../../../../lib/actions/user.action";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;
  console.log(evt);
  // CREATE
  if (eventType === "user.created") {
    const { id, email_addresses, username, image_url } = evt.data;

    const user = {
      username: username,
      avatar: image_url || "",
      email: email_addresses[0].email_address,
      clerkId: id,
    };

    const newUser = await createUser(user);

    return NextResponse.json({
      message: "User Created Successfully!",
      user: newUser,
    });
  }

  // UPDATE
  if (eventType === "user.updated") {
    const { id, image_url, username, email_addresses } = evt.data;

    const user = {
      username: username,
      avatar: image_url,
      email: email_addresses[0].email_address,
      clerkId: id,
    };

    const updatedUser = await updateUser(id, user);

    return NextResponse.json({
      message: "User Updated Successfully!",
      user: updatedUser,
    });
  }

  // DELETE
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const deletedUser = await deleteUser(id);

    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  return new Response("User Deleted Successfully!", { status: 200 });
}
