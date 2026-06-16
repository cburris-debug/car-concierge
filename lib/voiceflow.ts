// Voiceflow Dialog Manager API proxy utilities
// API key never leaves the server — this file is server-only

export interface VoiceflowTrace {
  type: string;
  payload?: unknown;
}

export interface VoiceflowTextTrace extends VoiceflowTrace {
  type: "text";
  payload: { message: string };
}

export interface VoiceflowChoiceTrace extends VoiceflowTrace {
  type: "choice";
  payload: { buttons: Array<{ name: string; request: unknown }> };
}

// Canned responses used when MOCK_CHAT=true
const MOCK_RESPONSES: VoiceflowTrace[][] = [
  [
    {
      type: "text",
      payload: {
        message:
          "Hi! I'm your CarSoup Car Concierge assistant. I can help you navigate the car-buying process, understand pricing, and prepare for dealership conversations. What are you looking for today?",
      },
    },
    {
      type: "choice",
      payload: {
        buttons: [
          { name: "Help me find a car", request: {} },
          { name: "Understand pricing", request: {} },
          { name: "Prepare for a dealer visit", request: {} },
        ],
      },
    },
  ],
  [
    {
      type: "text",
      payload: {
        message:
          "Great choice. The Minnesota car market has about 400+ dealerships and thousands of private listings on CarSoup.com. To get started, what's your target budget and are you open to used vehicles?",
      },
    },
  ],
  [
    {
      type: "text",
      payload: {
        message:
          "Dealer invoice prices are usually 2-5% below MSRP. For a $35,000 vehicle, that's $700-$1,750 below sticker. I can help you understand exactly what to offer and when to walk away.",
      },
    },
    {
      type: "choice",
      payload: {
        buttons: [
          { name: "Show me negotiation scripts", request: {} },
          { name: "What fees are negotiable?", request: {} },
        ],
      },
    },
  ],
];

let mockIndex = 0;

export async function sendToVoiceflow(
  userId: string,
  message: string
): Promise<VoiceflowTrace[]> {
  if (process.env.MOCK_CHAT === "true") {
    const response = MOCK_RESPONSES[mockIndex % MOCK_RESPONSES.length];
    mockIndex++;
    // Small artificial delay to feel realistic
    await new Promise((r) => setTimeout(r, 400));
    return response;
  }

  const projectId = process.env.VOICEFLOW_PROJECT_ID!;
  const versionId = process.env.VOICEFLOW_VERSION_ID || "production";
  const apiKey = process.env.VOICEFLOW_API_KEY!;

  // Voiceflow Dialog Manager API
  // Docs: https://www.voiceflow.com/api/dialog-manager
  const url = `https://general-runtime.voiceflow.com/state/user/${encodeURIComponent(
    userId
  )}/interact`;

  const body = {
    action: {
      type: "text",
      payload: message,
    },
    config: {
      tts: false,
      stripSSML: true,
      stopAll: false,
      excludeTypes: ["block", "debug", "flow"],
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
      versionID: versionId,
      // projectID header required for some Voiceflow versions
      ...(projectId ? { projectID: projectId } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Voiceflow API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<VoiceflowTrace[]>;
}

export async function launchVoiceflow(userId: string): Promise<VoiceflowTrace[]> {
  if (process.env.MOCK_CHAT === "true") {
    mockIndex = 0; // Reset for new session
    return MOCK_RESPONSES[0];
  }

  const projectId = process.env.VOICEFLOW_PROJECT_ID!;
  const versionId = process.env.VOICEFLOW_VERSION_ID || "production";
  const apiKey = process.env.VOICEFLOW_API_KEY!;

  const url = `https://general-runtime.voiceflow.com/state/user/${encodeURIComponent(
    userId
  )}/interact`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
      versionID: versionId,
      ...(projectId ? { projectID: projectId } : {}),
    },
    body: JSON.stringify({ action: { type: "launch" } }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Voiceflow launch error ${res.status}: ${text}`);
  }

  return res.json() as Promise<VoiceflowTrace[]>;
}
