import { useState } from "react";
import type { ActionFunctionArgs } from "react-router";
import { useFetcher } from "react-router";
import { authenticate } from "../shopify.server";
import { saveAnnouncement } from "../models/Announcement.server";

// Handles the POST request when "Save" is clicked
export async function action({ request }: ActionFunctionArgs) {
  const { session, admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const text = formData.get("text") as string;

  // 1) Save to MongoDB
  await saveAnnouncement(session.shop, text);

  // Get actual Shop ID for Metafield Owner
  const shopResponse = await admin.graphql(
    `#graphql
    query {
      shop {
        id
      }
    }`
  );
  const shopData = await shopResponse.json();
  const shopId = shopData.data.shop.id;

  // 2) Sync to Shopify Metafield via Admin API
  await admin.graphql(
    `#graphql
    mutation setAnnouncement($value: String!, $ownerId: ID!) {
      metafieldsSet(metafields: [{
        ownerId: $ownerId,
        namespace: "my_app",
        key: "announcement",
        type: "single_line_text_field",
        value: $value
      }]) { userErrors { field message } }
    }`,
    { variables: { value: text, ownerId: shopId } }
  );

  return { ok: true };
}

export default function Announcement() {
  const fetcher = useFetcher<typeof action>();
  const [text, setText] = useState("");
  const loading = fetcher.state === "submitting";

  const handleSave = () => {
    fetcher.submit({ text }, { method: "post" });
  };

  return (
    <s-page heading="Announcement Manager">
      <s-section heading="Set your store announcement">
        {fetcher.data?.ok && (
          <s-banner tone="success">Announcement saved successfully!</s-banner>
        )}
        <s-text-area
          label="Announcement Text"
          value={text}
          onInput={(e: any) => setText(e.target.value)}
          rows={3}
          autocomplete="off"
          placeholder="e.g. Sale 50% Off this weekend!"
        />
        <s-button
          variant="primary"
          onClick={handleSave}
          {...(loading ? { loading: true } : {})}
        >
          Save
        </s-button>
      </s-section>
    </s-page>
  );
}
