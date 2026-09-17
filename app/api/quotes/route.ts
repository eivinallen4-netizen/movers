import { NextRequest, NextResponse } from "next/server";

interface QuoteData {
  fromAddress: string;
  toAddress: string;
  moveDate: string;
  pickupTime: string;
  moveType: string;
  moveSize: string;
  inPersonQuote: string;
  storageNeeded: string;
  fromAddressType: string;
  toAddressType: string;
  toFloorLevel: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  hearAboutUs: string;
  additionalNotes: string;
  items: Array<{
    category: string;
    hasImage: boolean;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: QuoteData = await request.json();

    const apiKey = process.env.HOUSECALL_PRO_API_KEY;
    const baseUrl = process.env.HOUSECALL_PRO_BASE_URL;

    if (!apiKey || !baseUrl) {
      console.error("Missing HouseCall Pro API credentials");
      return NextResponse.json(
        { error: "CRM integration not configured" },
        { status: 500 }
      );
    }

    // Format the data for HouseCall Pro's customer/lead creation endpoint
    const housecallPayload = {
      first_name: body.firstName,
      last_name: body.lastName,
      phone: body.phone,
      email: body.email,
      custom_fields: {
        from_address: body.fromAddress,
        to_address: body.toAddress,
        move_date: body.moveDate,
        preferred_time: body.pickupTime,
        move_type: body.moveType,
        move_size: body.moveSize,
        in_person_quote: body.inPersonQuote,
        storage_needed: body.storageNeeded,
        from_access_type: body.fromAddressType,
        to_access_type: body.toAddressType,
        to_floor_level: body.toFloorLevel,
        heard_about_us: body.hearAboutUs,
        additional_notes: body.additionalNotes,
        items_count: body.items.length,
      },
      note: formatQuoteNotes(body),
    };

    // Create lead/customer in HouseCall Pro
    const response = await fetch(`${baseUrl}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(housecallPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("HouseCall Pro API error:", errorData);
      return NextResponse.json(
        { error: "Failed to create quote in CRM" },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      customerId: result.id || result.customer_id,
      message: "Quote submitted successfully",
    });
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}

function formatQuoteNotes(data: QuoteData): string {
  return `
Moving Quote Request
====================
From: ${data.fromAddress}
To: ${data.toAddress}

Move Details:
- Date: ${data.moveDate}
- Type: ${data.moveType}
- Size: ${data.moveSize}
- Preferred Time: ${data.pickupTime}

Access Details:
- From: ${data.fromAddressType}
- To: ${data.toAddressType} (Floor: ${data.toFloorLevel})

Services:
- In-person quote: ${data.inPersonQuote}
- Storage needed: ${data.storageNeeded}

Items to Move: ${data.items.length}
${data.items.map((item) => `  - ${item.category}${item.hasImage ? " (with photo)" : ""}`).join("\n")}

${data.additionalNotes ? `\nNotes: ${data.additionalNotes}` : ""}
`.trim();
}
