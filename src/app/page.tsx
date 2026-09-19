'use client';

import { useMemo, useState } from 'react';

type ServiceTab = 'Electrical' | 'Plumbing' | 'Solar' | 'Summary';
type Package = 'Standard' | 'Premium' | 'Luxury';

const electricalDefaults = [
  ['Lights', 24, 0.10],
  ['Fans', 8, 0.075],
  ['5A Sockets', 18, 0.10],
  ['15A Sockets', 6, 0.50],
  ['AC Points', 4, 1.50],
  ['Geyser / Water Heater', 2, 1.50],
  ['Kitchen Appliances', 6, 0.18],
];

const cableRows = [
  ['Lighting circuits', '1.5 sq mm'],
  ['5A socket circuits', '1.5 sq mm'],
  ['15A socket circuits', '2.5 sq mm'],
  ['AC (1.5 ton)', '4.0 sq mm'],
  ['AC (2 ton)', '6.0 sq mm'],
  ['Geyser (3 kW)', '4.0 sq mm'],
  ['Main incomer (3 phase)', '10.0 sq mm'],
];

const plumbingItems = [
  ['WC / commode', 4, 4200],
  ['Wash basin', 4, 2600],
  ['Shower', 4, 3200],
  ['Health faucet', 4, 900],
  ['Kitchen sink', 1, 6500],
  ['Floor drain', 6, 550],
];

function PlanSvg({ points }: { points: number }) {
  const markers = [
    [75, 75, 'light'], [270, 75, 'light'], [455, 75, 'socket'], [640, 75, 'light'],
    [75, 225, 'socket'], [270, 225, 'fan'], [455, 225, 'socket'], [640, 225, 'socket'],
    [75, 390, 'light'], [270, 390, 'socket'], [455, 390, 'fan'], [640, 390, 'socket'],
    [75, 545, 'socket'], [270, 545, 'socket'], [455, 545, 'light'], [640, 545, 'socket'],
  ];
  return (
    <svg viewBox="0 0 760 650" className="plan-svg" role="img" aria-label="Sample 2D floor plan with detected service points">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e8edf4" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="760" height="650" rx="12" fill="url(#grid)" />
      <text x="380" y="28" textAnchor="middle" className="plan-dim">32 ft</text>
      <text x="18" y="330" transform="rotate(-90 18 330)" textAnchor="middle" className="plan-dim">32 ft</text>
      <g fill="#fff" stroke="#26364a" strokeWidth="7">
        <rect x="42" y="48" width="208" height="175" />
        <rect x="250" y="48" width="260" height="175" />
        <rect x="510" y="48" width="208" height="175" />
        <rect x="42" y="223" width="468" height="225" />
        <rect x="510" y="223" width="208" height="225" />
        <rect x="42" y="448" width="208" height="155" />
        <rect x="250" y="448" width="260" height="155" />
        <rect x="510" y="448" width="208" height="155" />
      </g>
      <g fill="#edf5ff" stroke="#6ca7ed" strokeWidth="5">
        <rect x="105" y="44" width="80" height="9" />
        <rect x="345" y="44" width="95" height="9" />
        <rect x="575" y="44" width="80" height="9" />
        <rect x="38" y="285" width="9" height="80" />
        <rect x="713" y="285" width="9" height="80" />
        <rect x="105" y="599" width="80" height="9" />
        <rect x="575" y="599" width="80" height="9" />
      </g>
      <g className="room-label">
        <text x="146" y="130" textAnchor="middle">BEDROOM 1</text><text x="146" y="151" textAnchor="middle">12' × 11'</text>
        <text x="380" y="130" textAnchor="middle">LIVING ROOM</text><text x="380" y="151" textAnchor="middle">16' × 12'</text>
        <text x="614" y="130" textAnchor="middle">BEDROOM 2</text><text x="614" y="151" textAnchor="middle">12' × 11'</text>
        <text x="275" y="315" textAnchor="middle">DINING</text><text x="275" y="336" textAnchor="middle">10' × 12'</text>
        <text x="614" y="315" textAnchor="middle">KITCHEN</text><text x="614" y="336" textAnchor="middle">12' × 10'</text>
        <text x="146" y="525" textAnchor="middle">POOJA</text><text x="146" y="546" textAnchor="middle">8' × 6'</text>
        <text x="380" y="525" textAnchor="middle">STAIR / LOBBY</text>
        <text x="614" y="525" textAnchor="middle">TOILET</text><text x="614" y="546" textAnchor="middle">5' × 7'</text>
      </g>
      {markers.map(([x, y, kind], index) => (
        <g key={index} transform={`translate(${x},${y})`} className={`point point-${kind}`}>
          {kind === 'fan' ? <><circle r="13" fill="#fff" stroke="#667085" strokeWidth="2"/><path d="M0-3 C18-17 22 1 4 4 C18 18 1 22-4 4 C-18 18-22 1-4-4 C-18-18-1-22 4-4Z" fill="none" stroke="#667085" strokeWidth="2"/></> : <><circle r="10"/><path d="M-5 0h10M0-5v10" stroke="#fff" strokeWidth="2"/></>}
        </g>
      ))}
      <rect x="320" y="604" width="120" height="28" rx="14" fill="#17345c" />
      <text x="380" y="623" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">MAIN ENTRY</text>
      <text x="380" y="646" textAnchor="middle" className="plan-note">{points} editable service points shown</text>
    </svg>
  );
}

export default function Home() {
  const [tab, setTab] = useState<ServiceTab>('Electrical');
  const [pkg, setPkg] = useState<Package>('Premium');
  const [pointAdjust, setPointAdjust] = useState(48);
  const [uploaded, setUploaded] = useState(false);
  const [showSolar, setShowSolar] = useState(true);

  const totalLoad = useMemo(() => {
    const base = electricalDefaults.reduce((sum, [, qty, kw]) => sum + Number(qty) * Number(kw), 0);
    return +(base + Math.max(0, pointAdjust - 48) * 0.03).toFixed(1);
  }, [pointAdjust]);

  const monthlyUnits = Math.round(totalLoad * 18.5);
  const estimatedPrice = pkg === 'Standard' ? 485000 : pkg === 'Premium' ? 612000 : 785000;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span>Build</span><b>X</b><small>Plan&nbsp; | &nbsp;Estimate&nbsp; | &nbsp;Build</small></div>
        <button className="new-project">⌂ <span>New Project</span></button>
        <nav>
          {['Dashboard','2D Plan & Estimate','BOQ & Costs','Electrical Design','Plumbing Design','Material Options','Solar & Energy','Reports','My Projects','Settings'].map((item, i) => (
            <div className={`nav-item ${i === 1 ? 'active' : ''}`} key={item}><span>{['⌂','▣','▤','⚡','♧','◈','☀','▥','□','⚙'][i]}</span>{item}</div>
          ))}
        </nav>
        <div className="help-card"><div className="help-icon">?</div><strong>Need Help?</strong><span>Chat with our expert</span><button>Chat Now</button></div>
        <div className="profile"><div className="avatar">TR</div><div><strong>Thulasi Reddy</strong><span>EpohTech Solutions</span></div></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div><div className="project-title">Sample Residence <span>✎</span></div><div className="project-meta">Kadapa, Andhra Pradesh <i/> Plot Size: 32 × 47 ft <i/> Built-up: 32 × 32 ft (G+1) <i/> 3 BHK Duplex</div></div>
          <div className="top-actions"><button>⇩&nbsp; Save</button><button>⌁&nbsp; Share</button><button className="primary">Generate Estimate&nbsp; →</button></div>
        </header>

        <div className="steps">{['Upload Plan','Review & Edit','Engineering Analysis','Material Selection','Final Estimate'].map((s, i) => <div className={`step ${i === 0 ? 'current' : ''}`} key={s}><span>{i + 1}</span>{s}{i < 4 && <b>····</b>}</div>)}</div>

        <div className="content-grid">
          <section className="plan-card card">
            <div className="card-head"><div><h2>2D Floor Plan <small>(Ground Floor)</small></h2><p>Auto-detected dimensions and service points</p></div><div className="plan-actions"><select defaultValue="Ground Floor"><option>Ground Floor</option><option>First Floor</option></select><button onClick={() => setUploaded(true)}>↑ {uploaded ? 'Plan Uploaded' : 'Upload Plan'}</button><button>✦ Auto Detect</button><button>⌕</button><button>⌕</button></div></div>
            <div className="plan-frame"><PlanSvg points={pointAdjust}/>{uploaded && <div className="upload-toast">✓ Plan ready for review</div>}</div>
            <div className="legend"><span><b className="dot yellow"/>Light Point</span><span><b className="dot fan"/>Fan Point</span><span><b className="dot red"/>Power Outlet</span><span><b className="dot green"/>Switch Board</span><span><b className="dot blue"/>Water Point</span><span><b className="dot drain"/>Drain Point</span></div>
          </section>

          <section className="analysis-card card">
            <div className="analysis-tabs">{(['Electrical','Plumbing','Solar','Summary'] as ServiceTab[]).map(t => <button className={tab === t ? 'selected' : ''} onClick={() => setTab(t)} key={t}>{t}</button>)}</div>
            {tab === 'Electrical' && <>
              <div className="section-title"><div><h2>Electrical Load Analysis</h2><span>Calculated from detected plan + configurable appliance assumptions</span></div><span className="verified">✓ Engineering model</span></div>
              <div className="metric-grid">
                <div className="metric"><span>⚡ Total Connected Load</span><strong>{totalLoad} kW</strong></div>
                <div className="metric"><span>⌂ Total Points</span><strong>{pointAdjust}</strong><small>Lights, fans, sockets, AC, etc.</small></div>
                <div className="metric good"><span>⌁ Recommended Supply</span><strong>3 Phase</strong><small>Recommended for calculated load</small></div>
                <div className="metric"><span>▥ Estimated Monthly Consumption</span><strong>{monthlyUnits}–{monthlyUnits + 60} Units</strong></div>
              </div>
              <div className="two-tables">
                <div><h3>Load Breakdown</h3><table><thead><tr><th>Type</th><th>Qty</th><th>Load</th></tr></thead><tbody>{electricalDefaults.map(([name, qty, kw]) => <tr key={name}><td>{name}</td><td>{qty}</td><td>{(Number(qty)*Number(kw)).toFixed(1)} kW</td></tr>)}<tr className="total"><td>Total</td><td>{pointAdjust}</td><td>{totalLoad} kW</td></tr></tbody></table></div>
                <div><h3>Cable Size Guidance</h3><table><thead><tr><th>Application</th><th>Guidance</th></tr></thead><tbody>{cableRows.map(([a,b]) => <tr key={a}><td>{a}</td><td><b>{b}</b></td></tr>)}</tbody></table></div>
              </div>
              <div className="edit-strip"><div><strong>Client adjustment</strong><span>Change point quantity and regenerate calculations</span></div><div className="stepper"><button onClick={() => setPointAdjust(Math.max(1, pointAdjust - 1))}>−</button><strong>{pointAdjust}</strong><button onClick={() => setPointAdjust(pointAdjust + 1)}>+</button></div></div>
            </>}
            {tab === 'Plumbing' && <><div className="section-title"><div><h2>Plumbing Fixture Schedule</h2><span>Every fixture is editable before quotation</span></div><span className="verified">✓ Catalog ready</span></div><div className="package-tabs">{(['Standard','Premium','Luxury'] as Package[]).map(p => <button className={pkg === p ? 'selected' : ''} onClick={() => setPkg(p)} key={p}>{p}</button>)}</div><table className="wide-table"><thead><tr><th>Fixture</th><th>Qty</th><th>Reference price</th><th>Action</th></tr></thead><tbody>{plumbingItems.map(([name,qty,price]) => <tr key={name}><td><b>{name}</b><small>General catalogue item</small></td><td>{qty}</td><td>₹{(Number(price) * (pkg === 'Standard' ? 1 : pkg === 'Premium' ? 1.35 : 1.85)).toLocaleString('en-IN')}</td><td><button className="link">Edit</button></td></tr>)}</tbody></table><div className="option-note">+ Add glass partition, mixer upgrades, premium sanitaryware or any custom item</div></>}
            {tab === 'Solar' && <><div className="section-title"><div><h2>Solar & Energy Analysis</h2><span>Optional recommendation based on estimated consumption</span></div><span className="verified">✓ Advisory</span></div><div className="solar-grid"><div className="solar-main"><div className="sun">☀</div><div><span>Recommended Solar Capacity</span><strong>5 kW</strong><p>Estimated generation: 20–22 units/day</p></div></div><div className="solar-main saving"><div className="sun">₹</div><div><span>Estimated Monthly Savings</span><strong>₹2,000–₹2,500</strong><p>Illustrative payback: 4–5 years</p></div></div></div><div className="disclaimer">Final solar sizing, subsidy eligibility and payback will be recalculated using location, tariff, roof area and the selected system quotation.</div></>}
            {tab === 'Summary' && <><div className="section-title"><div><h2>Project Estimate Summary</h2><span>Transparent, editable and ready for client review</span></div></div><div className="summary-list"><div><span>Electrical</span><strong>₹{Math.round(estimatedPrice * .34).toLocaleString('en-IN')}</strong></div><div><span>Plumbing · {pkg}</span><strong>₹{Math.round(estimatedPrice * .31).toLocaleString('en-IN')}</strong></div><div><span>Painting</span><strong>₹{Math.round(estimatedPrice * .23).toLocaleString('en-IN')}</strong></div><div><span>Optional solar analysis</span><strong>Advisory</strong></div><div className="grand"><span>Indicative project estimate</span><strong>₹{estimatedPrice.toLocaleString('en-IN')}</strong></div></div></>}
            <div className="bottom-bar"><label><input type="checkbox" checked={showSolar} onChange={e => setShowSolar(e.target.checked)}/> Include solar analysis</label><button className="secondary">View Assumptions</button><button className="primary">Generate Estimate →</button></div>
          </section>
        </div>

        <footer className="footer-note"><span>● Prototype data only</span><span>Engineering recommendations are guidance and require qualified professional verification before execution.</span><span>v0.1 Estimator</span></footer>
      </section>
    </main>
  );
}
