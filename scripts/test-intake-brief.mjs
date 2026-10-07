import assert from 'node:assert/strict';
import test from 'node:test';
import { formatGuidedBrief, GUIDED_DESCRIPTION_MAX } from '../app/components/intake-brief.ts';

const complete = {
  topic: 'Security concern',
  urgency: 'Business currently affected',
  company: '',
  location: 'Worcester',
  systems: 'Microsoft 365',
  description: 'A staff account may have been accessed unexpectedly.',
};

test('guided enquiry keeps context and marks skipped fields clearly', () => {
  const result = formatGuidedBrief(complete);
  assert.match(result, /^Topic: Security concern\nUrgency: Business currently affected\nCompany: Not provided\nLocation: Worcester\nCurrent systems: Microsoft 365\n\nDescription:\nA staff account/m);
  assert.ok(result.length <= 5000);
});

test('urgency captures timing independently of the enquiry topic', () => {
  for (const urgency of ['Business currently affected', 'Within a few days', 'Planned project', 'Other / unsure']) {
    assert.match(formatGuidedBrief({ ...complete, urgency }), new RegExp(`Urgency: ${urgency}`));
  }
  for (const urgency of ['Something is down', 'Security concern', 'Project enquiry', 'Planning ahead']) {
    assert.throws(() => formatGuidedBrief({ ...complete, urgency }), /Choose a topic and urgency/);
  }
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
