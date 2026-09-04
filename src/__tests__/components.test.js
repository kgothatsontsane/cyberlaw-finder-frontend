import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';

jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  const createMockComponent = (tag) =>
    React.forwardRef(({ children, whileHover, whileTap, animate, initial, exit, transition, variants, onMouseMove, onMouseEnter, onMouseLeave, onClick, className, style, disabled, layout, ...props }, ref) => {
      const Tag = tag;
      return React.createElement(Tag, { ref, className, style, onClick, disabled, ...props }, children);
    });

  return {
    ...actual,
    motion: new Proxy(
      {},
      {
        get: (_, key) => {
          if (key === 'div') return createMockComponent('div');
          if (key === 'button') return createMockComponent('button');
          if (key === 'nav') return createMockComponent('nav');
          if (key === 'span') return createMockComponent('span');
          if (key === 'p') return createMockComponent('p');
          if (key === 'h1') return createMockComponent('h1');
          if (key === 'h2') return createMockComponent('h2');
          if (key === 'h3') return createMockComponent('h3');
          if (key === 'a') return createMockComponent('a');
          if (key === 'li') return createMockComponent('li');
          if (key === 'ul') return createMockComponent('ul');
          if (key === 'circle') return createMockComponent('circle');
          if (key === 'svg') return createMockComponent('svg');
          return createMockComponent('div');
        },
      }
    ),
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
    useAnimate: () => [jest.fn(() => ({ current: null })), jest.fn()],
    stagger: () => 0,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
    useMotionValue: () => ({ get: () => 0, set: jest.fn() }),
  };
});

jest.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ resolved: 'dark', toggleTheme: jest.fn() }),
}));

jest.mock('@tabler/icons-react', () => ({
  IconArrowRight: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-arrow-right' }),
  IconArrowLeft: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-arrow-left' }),
  IconSearch: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-search' }),
  IconBulb: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-bulb' }),
  IconScale: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-scale' }),
  IconGavel: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-gavel' }),
  IconTag: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-tag' }),
  IconChevronDown: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-chevron-down' }),
  IconChevronUp: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-chevron-up' }),
  IconShield: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-shield' }),
  IconShieldLock: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-shield-lock' }),
  IconExternalLink: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-external-link' }),
  IconPhone: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-phone' }),
  IconMail: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-mail' }),
  IconGlobe: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-globe' }),
  IconCheck: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-check' }),
  IconAlertTriangle: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-alert-triangle' }),
  IconClock: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-clock' }),
  IconListCheck: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-list-check' }),
  IconX: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-x' }),
  IconBrain: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-brain' }),
  IconReport: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-report' }),
  IconHome: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-home' }),
  IconLoader2: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-loader' }),
  IconDatabase: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-database' }),
  IconChartBar: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-chart-bar' }),
  IconFileCertificate: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-file-certificate' }),
  IconBuildingBank: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-building-bank' }),
  IconChevronRight: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-chevron-right' }),
  IconBooks: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-books' }),
  IconKeyboard: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-keyboard' }),
  IconWorld: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-world' }),
  IconFilter: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-filter' }),
  IconHome: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-home' }),
  IconSun: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-sun' }),
  IconMoon: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-moon' }),
}));

jest.mock('@/components/ui/vanish-input', () => ({
  VanishInput: ({ onSubmit }) => {
    const [value, setValue] = React.useState('');
    return React.createElement('div', { 'data-testid': 'vanish-input' },
      React.createElement('input', {
        'data-testid': 'search-text-input',
        value,
        placeholder: 'Someone hacked into my email account...',
        onChange: (e) => setValue(e.target.value),
        onKeyDown: (e) => { if (e.key === 'Enter') onSubmit(value); },
      }),
      React.createElement('button', {
        'data-testid': 'submit-search',
        onClick: () => onSubmit(value),
      })
    );
  },
}));

jest.mock('@/components/ui/multi-step-loader', () => ({
  MultiStepLoader: ({ loadingStates }) =>
    React.createElement('div', { 'data-testid': 'multi-step-loader' },
      loadingStates.map((step, i) =>
        React.createElement('div', { key: i, 'data-testid': `loader-step-${i}` }, step.text)
      )
    ),
}));

import { JurisdictionSelector } from '@/components/JurisdictionSelector';
import { SearchInput } from '@/components/SearchInput';
import { SampleScenarios } from '@/components/SampleScenarios';
import { LoadingState } from '@/components/LoadingState';
import { ResultsPanel } from '@/components/ResultsPanel';
import { ResultCard } from '@/components/ResultCard';
import { IncidentResponsePanel } from '@/components/IncidentResponsePanel';
import { HowToGuide } from '@/components/HowToGuide';
import { FloatingNavbar } from '@/components/ui/floating-navbar';
import { JURISDICTIONS, SAMPLE_LAW, SAMPLE_LAW_MEDIUM_SCORE, SAMPLE_LAW_LOW_SCORE, SAMPLE_LAW_NO_REPORTING, RESULTS } from './test-data.helper';

describe('JurisdictionSelector', () => {
  it('renders all jurisdictions', () => {
    render(React.createElement(JurisdictionSelector, { jurisdictions: JURISDICTIONS, onSelect: jest.fn(), onBrowse: jest.fn() }));
    expect(screen.getByText('South Africa')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Germany / EU')).toBeInTheDocument();
  });

  it('shows law counts for each jurisdiction', () => {
    render(React.createElement(JurisdictionSelector, { jurisdictions: JURISDICTIONS, onSelect: jest.fn(), onBrowse: jest.fn() }));
    expect(screen.getByText('35 statutes indexed')).toBeInTheDocument();
    expect(screen.getByText('22 statutes indexed')).toBeInTheDocument();
    expect(screen.getByText('18 statutes indexed')).toBeInTheDocument();
  });

  it('calls onSelect when a jurisdiction card is clicked', () => {
    const onSelect = jest.fn();
    render(React.createElement(JurisdictionSelector, { jurisdictions: JURISDICTIONS, onSelect, onBrowse: jest.fn() }));
    fireEvent.click(screen.getByText('South Africa'));
    expect(onSelect).toHaveBeenCalledWith(JURISDICTIONS[0]);
  });

  it('shows "Primary" badge for primary jurisdiction', () => {
    render(React.createElement(JurisdictionSelector, { jurisdictions: JURISDICTIONS, onSelect: jest.fn(), onBrowse: jest.fn() }));
    expect(screen.getByText('Primary')).toBeInTheDocument();
  });

  it('renders the primary badge', () => {
    render(React.createElement(JurisdictionSelector, { jurisdictions: JURISDICTIONS, onSelect: jest.fn(), onBrowse: jest.fn() }));
    expect(screen.getByText('Primary')).toBeInTheDocument();
  });

  it('renders the title text', () => {
    render(React.createElement(JurisdictionSelector, { jurisdictions: JURISDICTIONS, onSelect: jest.fn(), onBrowse: jest.fn() }));
    expect(screen.getByText('Finder')).toBeInTheDocument();
  });

  it('shows the selection prompt text', () => {
    render(React.createElement(JurisdictionSelector, { jurisdictions: JURISDICTIONS, onSelect: jest.fn(), onBrowse: jest.fn() }));
    expect(screen.getByText(/Select jurisdiction/)).toBeInTheDocument();
  });

  it('calls onSelect with correct jurisdiction when USA clicked', () => {
    const onSelect = jest.fn();
    render(React.createElement(JurisdictionSelector, { jurisdictions: JURISDICTIONS, onSelect, onBrowse: jest.fn() }));
    fireEvent.click(screen.getByText('United States'));
    expect(onSelect).toHaveBeenCalledWith(JURISDICTIONS[1]);
  });
});

describe('SearchInput', () => {
  const jurisdiction = JURISDICTIONS[0];

  it('renders jurisdiction info', () => {
    render(React.createElement(SearchInput, { jurisdiction, onSearch: jest.fn(), onBack: jest.fn() }));
    expect(screen.getByText('South Africa')).toBeInTheDocument();
    expect(screen.getByText('35 laws indexed')).toBeInTheDocument();
    expect(screen.getByText('AI semantic search active')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    const onBack = jest.fn();
    render(React.createElement(SearchInput, { jurisdiction, onSearch: jest.fn(), onBack }));
    fireEvent.click(screen.getByText('Change jurisdiction'));
    expect(onBack).toHaveBeenCalled();
  });

  it('renders SampleScenarios component', () => {
    render(React.createElement(SearchInput, { jurisdiction, onSearch: jest.fn(), onBack: jest.fn() }));
    expect(screen.getByText('Sample Scenarios')).toBeInTheDocument();
  });

  it('calls onSearch when a sample scenario is clicked', () => {
    const onSearch = jest.fn();
    render(React.createElement(SearchInput, { jurisdiction, onSearch, onBack: jest.fn() }));
    const scenario = screen.getByText('Someone guessed my password and logged into my bank account');
    fireEvent.click(scenario);
    expect(onSearch).toHaveBeenCalledWith('Someone guessed my password and logged into my bank account');
  });

  it('renders the vanish input component', () => {
    render(React.createElement(SearchInput, { jurisdiction, onSearch: jest.fn(), onBack: jest.fn() }));
    expect(screen.getByTestId('vanish-input')).toBeInTheDocument();
  });
});

describe('SampleScenarios', () => {
  it('renders all 6 sample scenarios', () => {
    render(React.createElement(SampleScenarios, { onSelect: jest.fn() }));
    expect(screen.getByText('Someone guessed my password and logged into my bank account')).toBeInTheDocument();
    expect(screen.getByText('I received a phishing email asking me to click a link and enter my details')).toBeInTheDocument();
    expect(screen.getByText('My computer was infected with ransomware demanding payment')).toBeInTheDocument();
    expect(screen.getByText('Someone is posting threatening messages about me on social media')).toBeInTheDocument();
    expect(screen.getByText('A former employee stole our customer database')).toBeInTheDocument();
    expect(screen.getByText('Someone is using my identity to open credit accounts online')).toBeInTheDocument();
  });

  it('calls onSelect when a scenario is clicked', () => {
    const onSelect = jest.fn();
    render(React.createElement(SampleScenarios, { onSelect }));
    fireEvent.click(screen.getByText('My computer was infected with ransomware demanding payment'));
    expect(onSelect).toHaveBeenCalledWith('My computer was infected with ransomware demanding payment');
  });

  it('renders the header with bulb icon', () => {
    render(React.createElement(SampleScenarios, { onSelect: jest.fn() }));
    expect(screen.getByTestId('icon-bulb')).toBeInTheDocument();
    expect(screen.getByText('Sample Scenarios')).toBeInTheDocument();
  });

  it('calls onSelect with the last scenario', () => {
    const onSelect = jest.fn();
    render(React.createElement(SampleScenarios, { onSelect }));
    fireEvent.click(screen.getByText('Someone is using my identity to open credit accounts online'));
    expect(onSelect).toHaveBeenCalledWith('Someone is using my identity to open credit accounts online');
  });
});

describe('LoadingState', () => {
  it('renders the multi-step loader with all steps', () => {
    render(React.createElement(LoadingState, null));
    expect(screen.getByTestId('multi-step-loader')).toBeInTheDocument();
    expect(screen.getByText('Analyzing query semantics...')).toBeInTheDocument();
    expect(screen.getByText('Extracting key entities with spaCy...')).toBeInTheDocument();
    expect(screen.getByText('Encoding to 384-dim vector space...')).toBeInTheDocument();
    expect(screen.getByText('Cosine similarity against 75 laws...')).toBeInTheDocument();
    expect(screen.getByText('Ranking by semantic relevance...')).toBeInTheDocument();
    expect(screen.getByText('Preparing forensic guidance...')).toBeInTheDocument();
  });
});

describe('ResultsPanel', () => {
  const jurisdiction = JURISDICTIONS[0];

  it('shows "No matching laws found" empty state', () => {
    render(React.createElement(ResultsPanel, {
      results: [],
      query: 'test query',
      jurisdiction,
      onNewSearch: jest.fn(),
    }));
    expect(screen.getByText('No matching laws found')).toBeInTheDocument();
    expect(screen.getByText('New Search')).toBeInTheDocument();
  });

  it('shows empty state when results is null', () => {
    render(React.createElement(ResultsPanel, {
      results: null,
      query: 'test query',
      jurisdiction,
      onNewSearch: jest.fn(),
    }));
    expect(screen.getByText('No matching laws found')).toBeInTheDocument();
  });

  it('shows results count when results exist', () => {
    render(React.createElement(ResultsPanel, {
      results: RESULTS,
      query: 'someone hacked my account',
      jurisdiction,
      onNewSearch: jest.fn(),
    }));
    expect(screen.getByText('3 statutes matched')).toBeInTheDocument();
  });

  it('renders result cards for each result', () => {
    render(React.createElement(ResultsPanel, {
      results: RESULTS,
      query: 'someone hacked my account',
      jurisdiction,
      onNewSearch: jest.fn(),
    }));
    const cards = screen.getAllByTestId('result-card');
    expect(cards).toHaveLength(3);
  });

  it('renders the query text in search results header', () => {
    render(React.createElement(ResultsPanel, {
      results: [SAMPLE_LAW],
      query: 'someone hacked my account',
      jurisdiction,
      onNewSearch: jest.fn(),
    }));
    expect(screen.getByText(/someone hacked my account/)).toBeInTheDocument();
  });

  it('shows jurisdiction name in search results header', () => {
    render(React.createElement(ResultsPanel, {
      results: [SAMPLE_LAW],
      query: 'test',
      jurisdiction,
      onNewSearch: jest.fn(),
    }));
    expect(screen.getByText(/South Africa/)).toBeInTheDocument();
  });

  it('calls onNewSearch when empty-state button is clicked', () => {
    const onNewSearch = jest.fn();
    render(React.createElement(ResultsPanel, {
      results: [],
      query: 'test',
      jurisdiction,
      onNewSearch,
    }));
    fireEvent.click(screen.getByText('New Search'));
    expect(onNewSearch).toHaveBeenCalled();
  });

  it('renders AI confidence percentage in report header', () => {
    render(React.createElement(ResultsPanel, {
      results: [SAMPLE_LAW],
      query: 'test',
      jurisdiction,
      onNewSearch: jest.fn(),
    }));
    expect(screen.getByText(/AI confidence/)).toBeInTheDocument();
    expect(screen.getByText(/89%/)).toBeInTheDocument();
  });
});

describe('ResultCard', () => {
  it('shows law title, section, category, and score', () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    expect(screen.getByText('Unauthorized Access to Computer Data')).toBeInTheDocument();
    expect(screen.getByText(/Cybercrimes Act 19 of 2020/)).toBeInTheDocument();
    const sectionMatches = screen.getAllByText(/Section 2\(1\)/);
    expect(sectionMatches.length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('unauthorized access').length).toBeGreaterThanOrEqual(1);
  });

  it('displays the match percentage from score via ScoreRing', () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    expect(screen.getByText('89')).toBeInTheDocument();
  });

  it('shows the penalty information', () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    expect(screen.getByText('Fine or imprisonment up to 15 years')).toBeInTheDocument();
  });

  it('shows the summary text', () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    expect(screen.getByText('Prohibits any person from unlawfully and intentionally accessing data, a computer program, a computer data storage medium, or a computer system.')).toBeInTheDocument();
  });

  it('shows expand button with full label', () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    expect(screen.getByText('View full law, AI analysis & reporting info')).toBeInTheDocument();
  });

  it('shows "Incident Response" section when expanded', async () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    fireEvent.click(screen.getByText('View full law, AI analysis & reporting info'));
    expect(await screen.findByText('Incident Response')).toBeInTheDocument();
  });

  it('shows primary authority contact in expanded view', async () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    fireEvent.click(screen.getByText('View full law, AI analysis & reporting info'));
    expect(await screen.findByText('SAPS Cybercrime Unit')).toBeInTheDocument();
  });

  it('shows phone contact in expanded view', async () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    fireEvent.click(screen.getByText('View full law, AI analysis & reporting info'));
    expect(await screen.findByText('0860 010 111')).toBeInTheDocument();
  });

  it('shows email contact in expanded view', async () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    fireEvent.click(screen.getByText('View full law, AI analysis & reporting info'));
    expect(await screen.findByText('cybercrime@saps.gov.za')).toBeInTheDocument();
  });

  it('renders the reporting portal link when present', async () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    fireEvent.click(screen.getByText('View full law, AI analysis & reporting info'));
    const link = await screen.findByText('Online Reporting Portal');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://report.saps.gov.za');
  });

  it('shows AI match explanation when expanded', async () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    fireEvent.click(screen.getByText('View full law, AI analysis & reporting info'));
    expect(await screen.findByText('AI Analysis')).toBeInTheDocument();
    expect(await screen.findByText(/Your query mentioned unauthorized account access/)).toBeInTheDocument();
  });

  it('shows default AI notes when ai_notes is undefined', async () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW_MEDIUM_SCORE, index: 1 }));
    fireEvent.click(screen.getByText('View full law, AI analysis & reporting info'));
    expect(await screen.findByText(/Semantic similarity detected/)).toBeInTheDocument();
  });

  it('renders keywords in expanded view when present', async () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    fireEvent.click(screen.getByText('View full law, AI analysis & reporting info'));
    expect(await screen.findByText('hacking')).toBeInTheDocument();
    expect(await screen.findByText('computer system')).toBeInTheDocument();
    expect(await screen.findByText('data')).toBeInTheDocument();
    const accessElements = screen.getAllByText('unauthorized access');
    expect(accessElements.length).toBeGreaterThanOrEqual(2);
  });

  it('does not render keywords when undefined', async () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW_MEDIUM_SCORE, index: 1 }));
    fireEvent.click(screen.getByText('View full law, AI analysis & reporting info'));
    await waitFor(() => {});
    expect(screen.queryByText('unauthorized access')).not.toBeInTheDocument();
  });

  it('shows evidence preservation items in expanded view', async () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    fireEvent.click(screen.getByText('View full law, AI analysis & reporting info'));
    expect(await screen.findByText('Evidence checklist:')).toBeInTheDocument();
    expect(await screen.findByText('Take screenshots of any suspicious activity')).toBeInTheDocument();
  });

  it('toggles to "Collapse details" when expanded', () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    fireEvent.click(screen.getByText('View full law, AI analysis & reporting info'));
    expect(screen.getByText('Collapse details')).toBeInTheDocument();
  });

  it('does not show reporting info when reporting_info is undefined', () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW_NO_REPORTING, index: 0 }));
    fireEvent.click(screen.getByText('View full law, AI analysis & reporting info'));
    expect(screen.queryByText('Incident Response')).not.toBeInTheDocument();
  });

  it('uses teal stroke color for high score (>0.7) via ScoreRing', () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW, index: 0 }));
    const highScoreText = screen.getByText('89');
    expect(highScoreText.style.color).toBe('rgb(var(--cyber-accent-2))');
  });

  it('uses cyan stroke color for medium score (0.5-0.7) via ScoreRing', () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW_MEDIUM_SCORE, index: 0 }));
    const medScoreText = screen.getByText('55');
    expect(medScoreText.style.color).toBe('rgb(var(--cyber-accent))');
  });

  it('uses amber stroke color for low score (<0.5) via ScoreRing', () => {
    render(React.createElement(ResultCard, { law: SAMPLE_LAW_LOW_SCORE, index: 0 }));
    const lowScoreText = screen.getByText('35');
    expect(lowScoreText.style.color).toBe('rgb(var(--cyber-warn))');
  });
});

describe('IncidentResponsePanel', () => {
  it('returns null when results array is empty', () => {
    const { container } = render(React.createElement(IncidentResponsePanel, {
      results: [],
      jurisdiction: JURISDICTIONS[0],
    }));
    expect(container.innerHTML).toBe('');
  });

  it('returns null when results is null', () => {
    const { container } = render(React.createElement(IncidentResponsePanel, {
      results: null,
      jurisdiction: JURISDICTIONS[0],
    }));
    expect(container.innerHTML).toBe('');
  });

  it('returns null when result has no reporting_info', () => {
    const { container } = render(React.createElement(IncidentResponsePanel, {
      results: [SAMPLE_LAW_NO_REPORTING],
      jurisdiction: JURISDICTIONS[0],
    }));
    expect(container.innerHTML).toBe('');
  });

  it('renders primary authority info', () => {
    render(React.createElement(IncidentResponsePanel, {
      results: [SAMPLE_LAW],
      jurisdiction: JURISDICTIONS[0],
    }));
    expect(screen.getByText('Incident Response Guide')).toBeInTheDocument();
    expect(screen.getByText('Primary Authority')).toBeInTheDocument();
    expect(screen.getByText('SAPS Cybercrime Unit')).toBeInTheDocument();
  });

  it('shows contact phone number', () => {
    render(React.createElement(IncidentResponsePanel, {
      results: [SAMPLE_LAW],
      jurisdiction: JURISDICTIONS[0],
    }));
    expect(screen.getByText('0860 010 111')).toBeInTheDocument();
  });

  it('shows email when present', () => {
    render(React.createElement(IncidentResponsePanel, {
      results: [SAMPLE_LAW],
      jurisdiction: JURISDICTIONS[0],
    }));
    expect(screen.getByText('cybercrime@saps.gov.za')).toBeInTheDocument();
  });

  it('renders evidence checklist with checkable items', () => {
    render(React.createElement(IncidentResponsePanel, {
      results: [SAMPLE_LAW],
      jurisdiction: JURISDICTIONS[0],
    }));
    expect(screen.getByText('Evidence Preservation')).toBeInTheDocument();
    expect(screen.getByText('Take screenshots of any suspicious activity')).toBeInTheDocument();
    expect(screen.getByText('Save email headers and full source of phishing emails')).toBeInTheDocument();
    expect(screen.getByText('Do not turn off or restart the affected device')).toBeInTheDocument();
  });

  it('toggles checklist item when clicked', () => {
    render(React.createElement(IncidentResponsePanel, {
      results: [SAMPLE_LAW],
      jurisdiction: JURISDICTIONS[0],
    }));
    const item = screen.getByText('Take screenshots of any suspicious activity');
    expect(item.className).not.toContain('line-through');

    fireEvent.click(item);
    const toggled = screen.getByText('Take screenshots of any suspicious activity');
    expect(toggled.className).toContain('line-through');

    fireEvent.click(toggled);
    const untoggled = screen.getByText('Take screenshots of any suspicious activity');
    expect(untoggled.className).not.toContain('line-through');
  });

  it('renders additional authorities when present', () => {
    render(React.createElement(IncidentResponsePanel, {
      results: [SAMPLE_LAW],
      jurisdiction: JURISDICTIONS[0],
    }));
    expect(screen.getByText('Additional Authorities')).toBeInTheDocument();
    expect(screen.getByText('NPA')).toBeInTheDocument();
    expect(screen.getByText('EC-CSIRT')).toBeInTheDocument();
  });

  it('shows when_to_contact information', () => {
    render(React.createElement(IncidentResponsePanel, {
      results: [SAMPLE_LAW],
      jurisdiction: JURISDICTIONS[0],
    }));
    expect(screen.getByText('Contact within 48 hours of the incident to preserve digital evidence.')).toBeInTheDocument();
  });
});

describe('HowToGuide', () => {
  it('renders all 4 steps', () => {
    render(React.createElement(HowToGuide, { onClose: jest.fn() }));
    expect(screen.getByText('How to Use CyberLaw Finder')).toBeInTheDocument();
    expect(screen.getByText('AI-powered cybercrime law search in 4 steps')).toBeInTheDocument();
  });

  it('shows step 1 initially', () => {
    render(React.createElement(HowToGuide, { onClose: jest.fn() }));
    expect(screen.getByText('1. Select Jurisdiction')).toBeInTheDocument();
    expect(screen.getByText(/Choose the country/)).toBeInTheDocument();
  });

  it('navigates to step 2 when Next is clicked', () => {
    render(React.createElement(HowToGuide, { onClose: jest.fn() }));
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('2. Describe Your Incident')).toBeInTheDocument();
  });

  it('navigates back with Previous button', () => {
    render(React.createElement(HowToGuide, { onClose: jest.fn() }));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Back'));
    expect(screen.getByText('1. Select Jurisdiction')).toBeInTheDocument();
  });

  it('shows Get Started button on last step', () => {
    render(React.createElement(HowToGuide, { onClose: jest.fn() }));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('4. Take Action')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });

  it('calls onClose when close button (X) is clicked', () => {
    const onClose = jest.fn();
    render(React.createElement(HowToGuide, { onClose }));
    const closeButton = screen.getByTestId('icon-x').closest('button');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Get Started is clicked on last step', () => {
    const onClose = jest.fn();
    render(React.createElement(HowToGuide, { onClose }));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Get Started'));
    expect(onClose).toHaveBeenCalled();
  });

  it('disables Back button on first step', () => {
    render(React.createElement(HowToGuide, { onClose: jest.fn() }));
    const backButton = screen.getByText('Back');
    expect(backButton).toBeDisabled();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    render(React.createElement(HowToGuide, { onClose }));
    const outerContainer = document.querySelector('.fixed.inset-0');
    if (outerContainer) {
      fireEvent.click(outerContainer);
      expect(onClose).toHaveBeenCalled();
    }
  });

  it('shows step dots for all 4 steps', () => {
    render(React.createElement(HowToGuide, { onClose: jest.fn() }));
    const dots = document.querySelectorAll('[data-testid="step-dots"] > span');
    expect(dots).toHaveLength(4);
  });

  it('renders step 3 content correctly', () => {
    render(React.createElement(HowToGuide, { onClose: jest.fn() }));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('3. Review Matching Laws')).toBeInTheDocument();
    expect(screen.getByText(/The NLP engine finds/)).toBeInTheDocument();
  });
});

describe('FloatingNavbar', () => {
  it('renders logo text', () => {
    render(React.createElement(FloatingNavbar, { onReset: jest.fn() }));
    expect(screen.getByText(/Cyber/)).toBeInTheDocument();
    expect(screen.getByText(/Law/)).toBeInTheDocument();
  });

  it('renders New Search button', () => {
    render(React.createElement(FloatingNavbar, { onReset: jest.fn() }));
    expect(screen.getByText('New Search')).toBeInTheDocument();
  });

  it('calls onReset when logo is clicked', () => {
    const onReset = jest.fn();
    render(React.createElement(FloatingNavbar, { onReset }));
    const logoButton = screen.getByTestId('logo-mark').closest('button');
    fireEvent.click(logoButton);
    expect(onReset).toHaveBeenCalled();
  });

  it('calls onReset when New Search button is clicked', () => {
    const onReset = jest.fn();
    render(React.createElement(FloatingNavbar, { onReset }));
    const buttons = screen.getAllByText('New Search');
    fireEvent.click(buttons[0]);
    expect(onReset).toHaveBeenCalled();
  });

  it('renders logo mark', () => {
    render(React.createElement(FloatingNavbar, { onReset: jest.fn() }));
    expect(screen.getByTestId('logo-mark')).toBeInTheDocument();
  });
});
