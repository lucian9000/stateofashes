import assert from 'node:assert/strict';
import test from 'node:test';
import { formatGuidedBrief, GUIDED_DESCRIPTION_MAX } from '../app/components/intake-brief.ts';

const complete = {
  topic: 'Security concern',
  urgency: 'Something is down',
  company: '',
  location: 'Worcester',
  systems: 'Microsoft 365',
  description: 'A staff account may have been accessed unexpectedly.',
};

test('guided enquiry keeps context and marks skipped fields clearly', () => {
  const result = formatGuidedBrief(complete);
  assert.match(result, /^Topic: Security concern\nUrgency: Something is down\nCompany: Not provided\nLocation: Worcester\nCurrent systems: Microsoft 365\n\nDescription:\nA staff account/m);
  assert.ok(result.length <= 5000);
});

test('single-line answers cannot forge new labelled fields', () => {
  const result = formatGuidedBrief({ ...complete, company: 'Acme\nUrgency: Planning ahead' });
  assert.match(result, /Company: Acme Urgency: Planning ahead\nLocation:/);
  assert.equal((result.match(/\nUrgency:/g) ?? []).length, 1);
});

test('oversized and incomplete briefs are rejected before sending', () => {
  assert.throws(() => formatGuidedBrief({ ...complete, description: 'x'.repeat(GUIDED_DESCRIPTION_MAX + 1) }));
  assert.throws(() => formatGuidedBrief({ ...complete, topic: '' }));
  assert.throws(() => formatGuidedBrief({ ...complete, description: 'too short' }));
});
