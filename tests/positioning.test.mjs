import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import test from 'node:test';

// Offline source contract: SITE_SOURCE_ROOT allows checking a historical tree.
// No forms, booking providers, or payment endpoints are contacted.
const root = resolve(process.env.SITE_SOURCE_ROOT || '.');
const read = (path) => readFileSync(join(root, path), 'utf8');
const page = (route = '') => read(`src/app/${route ? `${route}/` : ''}page.tsx`);
const normalize = (text) => text.replace(/\s+/g, ' ');
const routes = ['', 'mcp-access-audit', 'ai-policy-review', 'agent-ops-retainer', 'aios', 'fusional-canvas', 'agentstack', 'tools', 'writing'];

test('all existing page routes remain, with no direct payment enrollment', () => {
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
  assert.equal(walk(join(root, 'src/app')).filter((p) => p.endsWith('/page.tsx')).length, routes.length);
  for (const route of routes) {
    assert.doesNotMatch(page(route), /STRIPE_LINKS|buy\.stripe\.com|checkout|\$97\b|\$497\b|\$1,497\b|\$3,000\b|\$15,000\b|\$4,000\b|\$750\b|\$99\b/i, route || '/');
  }
});

test('home and shared metadata lead with lower-risk workflow services', () => {
  const home = normalize(page());
  const layout = read('src/app/layout.tsx');
  assert.match(home, /workflow review and integration for small software teams/);
  assert.match(home, /confirm fit and scope before payment/);
  assert.match(home, /No MCP setup is required for this conversation/);
  assert.match(home, /own agreed scope, effort, price, and payment path/);
  assert.match(home, /id="contact"/);
  assert.match(home, /do not send credentials, customer records, or confidential data/i);
  assert.match(layout, /Practical AI Workflow Services/);
  assert.doesNotMatch(layout, /Governed AI for Regulated Industries/);
  const nav = layout.slice(layout.indexOf('const nav ='), layout.indexOf('export default'));
  assert.doesNotMatch(nav, /aios|fusional-canvas|ai-policy-review/);
  assert.match(nav, /\/#offers/);
  assert.doesNotMatch(home, /ai-policy-review|smaller regulated operators/);
});

test('current prices, prerequisites and limits remain explicit', () => {
  const audit = normalize(page('mcp-access-audit'));
  assert.match(audit, /\$2,500/);
  assert.match(audit, /live or imminently deployed agent\/MCP workflow and a named owner are required/);
  assert.match(audit, /Five business days start after/);
  assert.match(audit, /read-only/);
  assert.match(audit, /not observable/);
  assert.match(audit, /before arranging payment/);
  const ops = normalize(page('agent-ops-retainer'));
  assert.match(ops, /\$2,000/);
  assert.match(ops, /8 total hours each month across evidence review, the note, the call, and advisory work/);
  assert.match(ops, /usable existing baseline is required/);
  assert.match(ops, /recurring changes that justify the review/);
  assert.match(ops, /not continuous monitoring/);
  assert.match(ops, /before arranging payment/);
  const policy = normalize(page('ai-policy-review'));
  assert.match(policy, /no longer offered for new engagements/);
  assert.match(policy, /index: false/);
  assert.doesNotMatch(policy, /BOOKING_URL|\$3,500|smaller regulated operators/);
  assert.match(normalize(page()), /MCP implementation starts from \$5,000/);
  assert.match(normalize(page()), /After a paid audit or review/);
});

test('legacy projects are historical, not current priced enrollment', () => {
  for (const route of ['aios', 'fusional-canvas', 'agentstack']) {
    const source = normalize(page(route));
    assert.match(source, /historical|exploratory/i);
    assert.match(source, /not current fixed-price enrollment/i);
    assert.match(source, /individually agreed legacy terms remain unchanged/i);
  }
  const form = read('src/components/agentstack-email-form.tsx');
  assert.doesNotMatch(form, /one business day|free 30-min|Book free review/);
  assert.match(form, /Request a conversation/);
});

test('historical payment URLs remain intact without marketing imports', () => {
  const links = read('src/lib/links.ts');
  for (const token of ['8x25kC3QE8qWgOt2d533W05', 'dRmbJ00EsePk69PeZR33W06', 'aFabJ05YM8qW2XD19133W07', '7sY4gyevi22y41HcRJ33W00', '28E8wO2MA4aGaq5bNF33W02', '14A9AScnafTo7dT04X33W01', 'bJeaEWbj6cHc7dT3h933W04', '00w4gycnagXs2XDeZR33W03']) {
    assert.ok(links.includes(`https://buy.stripe.com/${token}`));
  }
});

test('hero loading and font performance choices are preserved', () => {
  const home = page();
  assert.match(home, /ReactDOM\.preload/);
  assert.match(home, /imageSrcSet: HERO_STILL.avif/);
  assert.match(home, /srcSet=\{HERO_STILL.avif\}/);
  assert.match(home, /<HeroVideo \/>/);
  assert.match(read('src/app/layout.tsx'), /preload: false/);
});
