export const GUIDED_TOPICS = ["Something is down", "Security concern", "Project enquiry", "Planning ahead", "Something else"] as const;
export const GUIDED_URGENCIES = ["Business currently affected", "Within a few days", "Planned project", "Other / unsure"] as const;
export const GUIDED_DESCRIPTION_MAX = 4000;
export const GUIDED_FIELD_MAX = { company: 100, location: 120, systems: 250 } as const;

export type GuidedTopic = typeof GUIDED_TOPICS[number];
export type GuidedUrgency = typeof GUIDED_URGENCIES[number];

export type GuidedBrief = {
  topic: GuidedTopic;
  urgency: GuidedUrgency;
  company: string;
  location: string;
  systems: string;
  description: string;
};

const line = (value: string) => value.replace(/\s+/g, " ").trim();
const provided = (value: string) => line(value) || "Not provided";

export function formatGuidedBrief(value: GuidedBrief): string {
  if (!GUIDED_TOPICS.includes(value.topic) || !GUIDED_URGENCIES.includes(value.urgency)) throw new Error("Choose a topic and urgency.");
  if (value.company.length > GUIDED_FIELD_MAX.company || value.location.length > GUIDED_FIELD_MAX.location || value.systems.length > GUIDED_FIELD_MAX.systems) throw new Error("Shorten the company, location, or systems field.");
  const description = value.description.trim();
  if (description.length < 20 || description.length > GUIDED_DESCRIPTION_MAX) throw new Error("Describe the issue or goal in 20 to 4,000 characters.");
  const result = `Topic: ${line(value.topic)}\nUrgency: ${line(value.urgency)}\nCompany: ${provided(value.company)}\nLocation: ${provided(value.location)}\nCurrent systems: ${provided(value.systems)}\n\nDescription:\n${description}`;
  if (result.length > 5000) throw new Error("Shorten your enquiry and try again.");
  return result;
}
