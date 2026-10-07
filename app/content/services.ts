export const site = {
  name: "State of Ashes", url: "https://stateofashes.com", email: "info@stateofashes.com",
  person: "Lucian Joubert",
};

export const services = [
  {
    slug: "microsoft-365-google-workspace", title: "Microsoft 365 & Google Workspace",
    subtitle: "Keep your team connected.", text: "Email, accounts and workplace tools, set up and managed around the people who use them.",
    tags: ["MICROSOFT 365", "GOOGLE WORKSPACE"], focus: "Workplace and tenant operations",
    detail: "Set up a new tenant, sort out an existing environment or arrange ongoing administration. We review your users, licences and current configuration before agreeing on the work.",
    examples: ["Tenant setup and configuration", "User accounts, access and licences", "Email and collaboration administration"],
    situations: ["Your business needs professional email and shared files.", "Staff changes have left accounts or permissions out of date.", "You need someone to manage your existing Microsoft 365 or Google Workspace environment."],
    scope: "Migrations, security hardening and ongoing support can be included where needed. Licence costs and any third-party tools are discussed before work begins.",
    startingPoint: "Tell us which platform you use, roughly how many people need access, and what is working or causing trouble.",
  },
  {
    slug: "domains-business-networks", title: "Domains & business networks",
    subtitle: "Keep the connections working.", text: "Domain records, business networks and the infrastructure connecting your systems.",
    tags: ["DOMAINS", "NETWORKS"], focus: "Domains, networks, and infrastructure",
    detail: "Trace a connection problem, review a network or plan an infrastructure change. Domain and DNS work includes checking the services already using the domain before making changes.",
    examples: ["Domain and DNS management", "Network assessment and management", "Infrastructure improvements"],
    situations: ["Email or a website stopped working after a domain change.", "Wi-Fi or network connections are unreliable.", "You are moving premises or changing how your systems connect."],
    scope: "Equipment, internet providers and on-site requirements affect the approach. We establish what can be done remotely and discuss any local work or hardware costs.",
    startingPoint: "Share your location, the services affected and the network equipment you know about. Please leave credentials out of the enquiry.",
  },
  {
    slug: "security-backups", title: "Security & backup foundations",
    subtitle: "Protect what you rely on.", text: "Workspace hardening, identity and access, backups and endpoint protection.",
    tags: ["IDENTITY", "BACKUPS"], focus: "Security foundations",
    detail: "Review the controls around your accounts, devices and business data. We agree on the protections that fit your environment and identify any additional tools or specialist support needed.",
    examples: ["Microsoft 365 and Google Workspace hardening", "Identity and access controls", "Backup and endpoint protection planning"],
    situations: ["An account or email incident has raised concerns.", "You are unsure whether your backups can restore the data you need.", "Staff access and device protection need a review."],
    scope: "The security stack and scope are agreed for your business. This enquiry form is not a monitored incident-response channel; for an active incident, use your existing administrator or security contact.",
    startingPoint: "Describe the concern and the systems involved. Do not include passwords, recovery codes, confidential records or suspected malicious attachments.",
  },
  {
    slug: "websites-custom-software", title: "Websites & custom software",
    subtitle: "Built for how you work.", text: "Websites, custom applications, internal tools and connections between existing systems.",
    tags: ["WEBSITES", "CUSTOM TOOLS"], focus: "Websites and custom software",
    detail: "Use existing products where they fit. When they do not, design a website, application or integration around the work your business needs to do.",
    examples: ["Business website development", "Custom applications and internal tools", "Software integrations"],
    situations: ["Your website needs to explain your services and make enquiries easier.", "A spreadsheet or manual process has become difficult to manage.", "Your systems need to exchange information without repeated data entry."],
    scope: "We define the users, essential functions and launch requirements together. Hosting, ongoing maintenance and third-party services are scoped alongside the build.",
    startingPoint: "Tell us what people need to accomplish, what they use today and where the process gets stuck. A plain-language description is enough to begin.",
  },
  {
    slug: "automation-ai", title: "Automation & AI architecture",
    subtitle: "Less repetitive work. More control.", text: "Workflow automation and AI integration built around a real operational need.",
    tags: ["WORKFLOWS", "AI ARCHITECTURE"], focus: "Automation and AI architecture",
    detail: "Map the process before choosing the tools. Automate predictable steps and define where people must review decisions, exceptions or AI-generated output.",
    examples: ["Workflow mapping and automation", "Integration between business systems", "AI architecture with human oversight"],
    situations: ["Staff repeatedly copy information between systems.", "Requests need routing, checking or tracking.", "You want to assess whether AI can help a particular business process."],
    scope: "Data access, privacy, model behaviour and running costs are part of the design. We discuss API and software charges before committing to an approach.",
    startingPoint: "Describe the repetitive work, the systems involved and the decisions that need a person's judgment.",
  },
  {
    slug: "technology-planning-vcio", title: "Technology planning & vCIO",
    subtitle: "Make the next move deliberate.", text: "Technology roadmaps, solutions architecture and vCIO guidance for business decisions.",
    tags: ["VCIO", "ROADMAPS"], focus: "Technology direction",
    detail: "Review where your technology stands and what the business needs next. Turn that into priorities, dependencies and a plan you can use to make decisions.",
    examples: ["Technology roadmaps", "Solutions architecture", "vCIO guidance"],
    situations: ["You need a plan for growth, a move or a change in operations.", "Technology spending is happening without a clear direction.", "You want a technical view before choosing a platform or supplier."],
    scope: "Advice can support a single decision or an ongoing relationship. The depth of assessment and involvement in implementation are agreed around your needs.",
    startingPoint: "Tell us what the business is trying to achieve, the decisions ahead and any constraints you already know about.",
  },
] as const;

export type Service = typeof services[number];
export const findService = (slug: string) => services.find(service => service.slug === slug);
