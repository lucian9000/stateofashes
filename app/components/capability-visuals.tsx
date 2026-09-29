type VisualProps = { index: number };

function WorkplaceVisual() {
  return <svg viewBox="0 0 320 160" role="presentation">
    <path className="cv-faint" d="M32 125H288M75 34V17H245V34M160 26V16" />
    <rect className="cv-panel cv-panel-left" x="30" y="37" width="103" height="83" rx="3" />
    <rect className="cv-panel cv-panel-right" x="187" y="37" width="103" height="83" rx="3" />
    <path className="cv-faint" d="M30 58H133M187 58H290" />
    <circle className="cv-dot" cx="43" cy="48" r="2" /><circle className="cv-dot" cx="51" cy="48" r="2" />
    <circle className="cv-dot" cx="200" cy="48" r="2" /><circle className="cv-dot" cx="208" cy="48" r="2" />
    <text className="cv-label" x="42" y="76">M365 / TENANT</text>
    <text className="cv-label" x="199" y="76">GOOGLE / SPACE</text>
    <path className="cv-muted" d="M44 88H98M44 97H86M201 88H258M201 97H244" />
    <path className="cv-flow" d="M133 80H147M173 80H187" />
    <circle className="cv-core" cx="160" cy="80" r="14" />
    <circle className="cv-dot" cx="160" cy="76" r="3" />
    <path className="cv-line" d="M153 86Q160 81 167 86" />
    <path className="cv-muted" d="M90 120V135H230V120" />
    <text className="cv-small" x="160" y="150" textAnchor="middle">ONE WORKPLACE / CLEAR ACCESS</text>
  </svg>;
}

function NetworkVisual() {
  return <svg viewBox="0 0 320 160" role="presentation">
    <path className="cv-faint" d="M19 31H80M19 128H92M241 29H302M241 129H302" />
    <path className="cv-muted" d="M59 76H103L133 47H176L216 77H262M109 112L135 94H181L213 112" />
    <path className="cv-flow" d="M58 76H103L133 47H176L216 77H263" />
    <circle className="cv-node" cx="59" cy="76" r="11" />
    <circle className="cv-node" cx="158" cy="47" r="18" />
    <circle className="cv-node" cx="263" cy="77" r="11" />
    <circle className="cv-node" cx="109" cy="112" r="8" />
    <circle className="cv-node" cx="213" cy="112" r="8" />
    <circle className="cv-dot" cx="158" cy="47" r="4" />
    <path className="cv-line" d="M147 47H169M158 36V58" />
    <text className="cv-label" x="158" y="18" textAnchor="middle">DOMAIN / ROUTING</text>
    <text className="cv-small" x="20" y="100">EDGE</text>
    <text className="cv-small" x="245" y="101">UPLINK</text>
    <text className="cv-small" x="160" y="145" textAnchor="middle">CONNECTED / OBSERVABLE</text>
  </svg>;
}

function SecurityVisual() {
  return <svg viewBox="0 0 320 160" role="presentation">
    <path className="cv-faint" d="M25 31H104M216 31H295M25 126H104M216 126H295" />
    <circle className="cv-orbit" cx="160" cy="77" r="57" />
    <circle className="cv-orbit-inner" cx="160" cy="77" r="42" />
    <path className="cv-shield" d="M160 39L190 50V75C190 96 177 110 160 118C143 110 130 96 130 75V50Z" />
    <path className="cv-check" d="M147 78L157 88L175 67" />
    <path className="cv-muted" d="M97 77H119M201 77H223M160 12V27M160 127V142" />
    <circle className="cv-dot" cx="97" cy="77" r="2.5" /><circle className="cv-dot" cx="223" cy="77" r="2.5" />
    <text className="cv-small" x="25" y="48">IDENTITY</text>
    <text className="cv-small" x="251" y="48">ACCESS</text>
    <text className="cv-small" x="25" y="146">BACKUP</text>
    <text className="cv-small" x="248" y="146">ENDPOINT</text>
  </svg>;
}

function SoftwareVisual() {
  return <svg viewBox="0 0 320 160" role="presentation">
    <rect className="cv-panel cv-window-back" x="83" y="19" width="200" height="109" rx="3" />
    <rect className="cv-panel cv-window-front" x="37" y="36" width="205" height="106" rx="3" />
    <path className="cv-faint" d="M37 57H242M83 39H283" />
    <circle className="cv-dot" cx="51" cy="47" r="2" /><circle className="cv-dot" cx="59" cy="47" r="2" /><circle className="cv-dot" cx="67" cy="47" r="2" />
    <path className="cv-line cv-code" d="M56 78L48 86L56 94M67 94L74 78M84 78L92 86L84 94" />
    <path className="cv-muted" d="M110 79H191M110 91H174M110 103H204M53 119H124" />
    <rect className="cv-cursor" x="178" y="88" width="5" height="9" />
    <path className="cv-line" d="M253 70H278V104H253M263 80L273 87L263 94" />
    <text className="cv-small" x="282" y="148" textAnchor="end">BUILT / TO FIT</text>
  </svg>;
}

function AutomationVisual() {
  return <svg viewBox="0 0 320 160" role="presentation">
    <path className="cv-faint" d="M22 78H300M160 15V44M160 113V143" />
    <path className="cv-flow" d="M25 78H129M191 78H295" />
    <rect className="cv-panel" x="23" y="58" width="57" height="40" rx="2" />
    <rect className="cv-panel" x="240" y="58" width="57" height="40" rx="2" />
    <path className="cv-muted" d="M36 71H66M36 79H58M36 87H63M254 70H282M254 79H276M254 88H281" />
    <path className="cv-core-shape" d="M160 44L190 61V95L160 112L130 95V61Z" />
    <circle className="cv-dot" cx="160" cy="78" r="8" />
    <circle className="cv-dot cv-satellite" cx="144" cy="67" r="2" /><circle className="cv-dot cv-satellite" cx="176" cy="67" r="2" /><circle className="cv-dot cv-satellite" cx="160" cy="96" r="2" />
    <path className="cv-muted" d="M144 67L160 78L176 67M160 78V96" />
    <text className="cv-small" x="25" y="116">INPUT</text>
    <text className="cv-small" x="160" y="132" textAnchor="middle">HUMAN / IN THE LOOP</text>
    <text className="cv-small" x="295" y="116" textAnchor="end">OUTPUT</text>
  </svg>;
}

function DirectionVisual() {
  return <svg viewBox="0 0 320 160" role="presentation">
    <path className="cv-faint" d="M22 132H298M31 29V132M95 132V142M162 132V142M229 132V142" />
    <path className="cv-path-shadow" d="M36 116C76 116 81 86 117 91S170 104 197 68S247 69 281 37" />
    <path className="cv-path" d="M36 116C76 116 81 86 117 91S170 104 197 68S247 69 281 37" />
    <circle className="cv-milestone" cx="36" cy="116" r="5" />
    <circle className="cv-milestone" cx="117" cy="91" r="5" />
    <circle className="cv-milestone" cx="197" cy="68" r="5" />
    <circle className="cv-milestone cv-destination" cx="281" cy="37" r="9" />
    <path className="cv-line" d="M281 21V14M281 60V53M265 37H258M304 37H297" />
    <text className="cv-small" x="36" y="105">NOW</text>
    <text className="cv-small" x="119" y="80">01</text>
    <text className="cv-small" x="198" y="57">02</text>
    <text className="cv-small" x="227" y="20">NEXT</text>
    <text className="cv-small" x="298" y="151" textAnchor="end">A CLEAR ROUTE FORWARD</text>
  </svg>;
}

const visuals = [WorkplaceVisual, NetworkVisual, SecurityVisual, SoftwareVisual, AutomationVisual, DirectionVisual];
export const visualNames = ["workplace", "network", "security", "software", "automation", "direction"] as const;

export function CapabilityVisual({ index }: VisualProps) {
  const Visual = visuals[index];
  return <div className={`capability-visual visual-${visualNames[index]}`} aria-hidden="true"><Visual /></div>;
}
