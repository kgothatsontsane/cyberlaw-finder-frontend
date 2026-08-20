export const JURISDICTIONS = [
  { id: 'south_africa', name: 'South Africa', flag: '🇿🇦', laws: 35, primary: true },
  { id: 'usa', name: 'United States', flag: '🇺🇸', laws: 22 },
  { id: 'germany', name: 'Germany / EU', flag: '🇪🇺', laws: 18 },
];

export const SAMPLE_LAW = {
  id: 'sa-001',
  title: 'Unauthorized Access to Computer Data',
  law_name: 'Cybercrimes Act 19 of 2020',
  section: 'Section 2(1)',
  category: 'unauthorized_access',
  score: 0.89,
  summary:
    'Prohibits any person from unlawfully and intentionally accessing data, a computer program, a computer data storage medium, or a computer system.',
  penalty: 'Fine or imprisonment up to 15 years',
  full_text:
    'Any person who unlawfully and intentionally accesses data, a computer program, a computer data storage medium, or a computer system, or any part thereof, is guilty of an offence.',
  ai_notes:
    'Your query mentioned unauthorized account access which semantically matches the access provisions in Section 2(1) of the Cybercrimes Act.',
  keywords: ['unauthorized access', 'hacking', 'computer system', 'data'],
  reporting_info: {
    primary_authority: 'SAPS Cybercrime Unit',
    contact: '0860 010 111',
    email: 'cybercrime@saps.gov.za',
    reporting_portal: 'https://report.saps.gov.za',
    evidence_preservation: [
      'Take screenshots of any suspicious activity',
      'Save email headers and full source of phishing emails',
      'Do not turn off or restart the affected device',
    ],
    additional_authorities: [
      { name: 'NPA', role: 'Prosecution', contact: '012 845 6000' },
      { name: 'EC-CSIRT', role: 'Incident Response', contact: '012 841 2000' },
    ],
    when_to_contact: 'Contact within 48 hours of the incident to preserve digital evidence.',
  },
};

export const SAMPLE_LAW_MEDIUM_SCORE = {
  ...SAMPLE_LAW,
  id: 'sa-002',
  score: 0.55,
  title: 'Computer Fraud',
  law_name: 'Cybercrimes Act 19 of 2020',
  section: 'Section 8',
  category: 'computer_fraud',
  ai_notes: undefined,
  keywords: undefined,
  reporting_info: {
    ...SAMPLE_LAW.reporting_info,
  },
};

export const SAMPLE_LAW_LOW_SCORE = {
  ...SAMPLE_LAW,
  id: 'sa-003',
  score: 0.35,
  title: 'Malicious Communications',
  section: 'Section 14',
  category: 'malicious_communications',
};

export const SAMPLE_LAW_NO_REPORTING = {
  id: 'sa-004',
  title: 'Cyber Harassment',
  law_name: 'Protection from Harassment Act',
  section: 'Section 2',
  category: 'harassment',
  score: 0.72,
  summary: 'Protects against harassment including electronic communications.',
  penalty: 'Fine or imprisonment up to 5 years',
  full_text: 'Full legal text here...',
  ai_notes: 'Matched based on harassment keywords.',
  reporting_info: undefined,
};

export const RESULTS = [SAMPLE_LAW, SAMPLE_LAW_MEDIUM_SCORE, SAMPLE_LAW_LOW_SCORE];
