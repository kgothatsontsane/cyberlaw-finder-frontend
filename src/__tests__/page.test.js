import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

jest.mock('framer-motion', () => {
  const createMockComponent = (tag) =>
    React.forwardRef(({ children, whileHover, whileTap, animate, initial, exit, transition, variants, onMouseMove, onMouseEnter, onMouseLeave, onClick, className, style, disabled, layout, ...props }, ref) => {
      const Tag = tag;
      return React.createElement(Tag, { ref, className, style, onClick, disabled, ...props }, children);
    });

  return {
    motion: new Proxy({}, {
      get: (_, key) => {
        if (key === 'div') return createMockComponent('div');
        if (key === 'button') return createMockComponent('button');
        if (key === 'nav') return createMockComponent('nav');
        if (key === 'span') return createMockComponent('span');
        if (key === 'p') return createMockComponent('p');
        if (key === 'h1') return createMockComponent('h1');
        if (key === 'h2') return createMockComponent('h2');
        if (key === 'h3') return createMockComponent('h3');
        return createMockComponent('div');
      },
    }),
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
    useAnimate: () => [jest.fn(() => ({ current: null })), jest.fn()],
    stagger: () => 0,
  };
});

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
  IconAlertTriangle: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-alert-triangle' }),
  IconX: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-x' }),
  IconBrain: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-brain' }),
  IconReport: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-report' }),
  IconHome: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-home' }),
  IconLoader2: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-loader' }),
  IconSun: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-sun' }),
  IconMoon: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-moon' }),
  IconHelp: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-help' }),
  IconDatabase: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-database' }),
  IconBooks: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-books' }),
  IconKeyboard: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-keyboard' }),
  IconWorld: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-world' }),
  IconFilter: (props) => React.createElement('span', { ...props, 'data-testid': 'icon-filter' }),
}));

jest.mock('@/components/ui/floating-navbar', () => ({
  FloatingNavbar: ({ onReset, onHelp }) =>
    React.createElement('div', { 'data-testid': 'floating-navbar' },
      React.createElement('button', { onClick: onReset, 'data-testid': 'navbar-reset' }, 'Home'),
      onHelp && React.createElement('button', { onClick: onHelp, 'data-testid': 'navbar-help' }, '?')
    ),
}));

jest.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ resolved: 'dark', toggleTheme: jest.fn() }),
}));

jest.mock('@/components/LandingPage', () => ({
  LandingPage: ({ onEnter }) =>
    React.createElement('div', { 'data-testid': 'landing-page' },
      React.createElement('button', { onClick: onEnter, 'data-testid': 'landing-enter' }, 'Enter')
    ),
}));

jest.mock('@/components/ui/vanish-input', () => ({
  VanishInput: ({ onSubmit }) => {
    const ref = React.useRef(null);
    return React.createElement('div', { 'data-testid': 'vanish-input' },
      React.createElement('input', {
        ref,
        'data-testid': 'search-input-field',
        placeholder: 'Type your incident...',
        onKeyDown: (e) => {
          if (e.key === 'Enter' && e.target.value) onSubmit(e.target.value);
        },
      }),
      React.createElement('button', {
        'data-testid': 'submit-button',
        onClick: () => { if (ref.current && ref.current.value) onSubmit(ref.current.value); },
      })
    );
  },
}));

jest.mock('@/components/ui/multi-step-loader', () => ({
  MultiStepLoader: () => React.createElement('div', { 'data-testid': 'multi-step-loader' }, 'Loading...'),
}));

jest.mock('@/components/JurisdictionSelector', () => ({
  JurisdictionSelector: ({ jurisdictions, onSelect }) =>
    React.createElement('div', { 'data-testid': 'jurisdiction-selector' },
      jurisdictions.map((jur) =>
        React.createElement('button', {
          key: jur.id,
          'data-testid': `jurisdiction-${jur.id}`,
          onClick: () => onSelect(jur),
        }, `${jur.name} (${jur.laws} laws)${jur.primary ? ' Primary' : ''}`)
      )
    ),
}));

jest.mock('@/components/SearchInput', () => ({
  SearchInput: ({ jurisdiction, onSearch, onBack }) =>
    React.createElement('div', { 'data-testid': 'search-input' },
      React.createElement('span', { 'data-testid': 'jurisdiction-name' }, jurisdiction.name),
      React.createElement('button', { 'data-testid': 'back-button', onClick: onBack }, 'Change jurisdiction'),
      React.createElement('button', {
        'data-testid': 'search-button',
        onClick: () => onSearch('test query about hacking'),
      }, 'Submit Search')
    ),
}));

jest.mock('@/components/SampleScenarios', () => ({
  SampleScenarios: () => React.createElement('div', { 'data-testid': 'sample-scenarios' }),
}));

jest.mock('@/components/LoadingState', () => ({
  LoadingState: () => React.createElement('div', { 'data-testid': 'loading-state' }, 'Analyzing your query...'),
}));

jest.mock('@/components/ResultsPanel', () => ({
  ResultsPanel: ({ results, query, jurisdiction, onNewSearch }) =>
    React.createElement('div', { 'data-testid': 'results-panel' },
      results && results.length > 0
        ? React.createElement('div', null,
            React.createElement('span', { 'data-testid': 'results-count' }, `${results.length} matches`),
            results.map((law) =>
              React.createElement('div', { key: law.id, 'data-testid': `result-${law.id}` },
                React.createElement('h3', null, law.title),
                React.createElement('p', null, law.law_name)
              )
            )
          )
        : React.createElement('div', null,
            React.createElement('p', null, 'No matching laws found'),
            React.createElement('button', { onClick: onNewSearch }, 'New Search')
          )
    ),
}));

jest.mock('@/components/HowToGuide', () => ({
  HowToGuide: ({ onClose }) =>
    React.createElement('div', { 'data-testid': 'how-to-guide' },
      React.createElement('span', null, 'How to Use CyberLaw Finder'),
      React.createElement('button', { onClick: onClose, 'data-testid': 'close-guide' }, 'Close')
    ),
}));

jest.mock('@/components/IncidentResponsePanel', () => ({
  IncidentResponsePanel: () => React.createElement('div', { 'data-testid': 'incident-response-panel' }),
}));

import Home from '@/app/page';

const SAMPLE_RESULTS = [
  {
    id: 'sa-001',
    title: 'Unauthorized Access to Computer Data',
    law_name: 'Cybercrimes Act 19 of 2020',
    score: 0.89,
  },
  {
    id: 'sa-002',
    title: 'Computer Fraud',
    law_name: 'Cybercrimes Act 19 of 2020',
    score: 0.72,
  },
];

describe('Home Page', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the FloatingNavbar', () => {
    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    expect(screen.getByTestId('floating-navbar')).toBeInTheDocument();
  });

  it('renders landing page initially (step 0)', () => {
    render(React.createElement(Home, null));
    expect(screen.getByTestId('landing-page')).toBeInTheDocument();
  });

  it('renders jurisdiction selector after entering (step 1)', () => {
    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    expect(screen.getByTestId('jurisdiction-selector')).toBeInTheDocument();
    expect(screen.getByText('South Africa (35 laws) Primary')).toBeInTheDocument();
    expect(screen.getByText('United States (22 laws)')).toBeInTheDocument();
    expect(screen.getByText('Germany / EU (18 laws)')).toBeInTheDocument();
  });

  it('shows HowToGuide on first visit', () => {
    render(React.createElement(Home, null));
    expect(screen.getByTestId('how-to-guide')).toBeInTheDocument();
  });

  it('transitions to search input after jurisdiction selection', () => {
    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    fireEvent.click(screen.getByTestId('jurisdiction-south_africa'));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('jurisdiction-name')).toHaveTextContent('South Africa');
  });

  it('does not show jurisdiction selector after selection', () => {
    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    fireEvent.click(screen.getByTestId('jurisdiction-south_africa'));
    expect(screen.queryByTestId('jurisdiction-selector')).not.toBeInTheDocument();
  });

  it('transitions to loading state during search', async () => {
    global.fetch.mockImplementation(() =>
      new Promise((resolve) =>
        setTimeout(() =>
          resolve({
            ok: true,
            json: async () => ({ results: SAMPLE_RESULTS }),
          }), 100
        )
      )
    );

    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    fireEvent.click(screen.getByTestId('jurisdiction-south_africa'));
    fireEvent.click(screen.getByTestId('search-button'));

    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
  });

  it('renders results after successful search', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: SAMPLE_RESULTS }),
    });

    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    fireEvent.click(screen.getByTestId('jurisdiction-south_africa'));
    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.getByTestId('results-panel')).toBeInTheDocument();
    });

    expect(screen.getByTestId('results-count')).toHaveTextContent('2 matches');
    expect(screen.getByText('Unauthorized Access to Computer Data')).toBeInTheDocument();
    expect(screen.getByText('Computer Fraud')).toBeInTheDocument();
  });

  it('handles empty results from API', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    fireEvent.click(screen.getByTestId('jurisdiction-south_africa'));
    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.getByTestId('results-panel')).toBeInTheDocument();
    });

    expect(screen.getByText('No matching laws found')).toBeInTheDocument();
  });

  it('handles API fetch error gracefully', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network failure'));

    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    fireEvent.click(screen.getByTestId('jurisdiction-south_africa'));
    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.getByTestId('results-panel')).toBeInTheDocument();
    });

    expect(screen.getByText('No matching laws found')).toBeInTheDocument();
  });

  it('resets to step 1 when navbar reset is clicked', () => {
    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    fireEvent.click(screen.getByTestId('jurisdiction-south_africa'));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('navbar-reset'));
    expect(screen.getByTestId('jurisdiction-selector')).toBeInTheDocument();
  });

  it('hides HowToGuide when close button is clicked', () => {
    render(React.createElement(Home, null));
    expect(screen.getByTestId('how-to-guide')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('close-guide'));
    expect(screen.queryByTestId('how-to-guide')).not.toBeInTheDocument();
  });

  it('returns to jurisdiction selector from search input', () => {
    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    fireEvent.click(screen.getByTestId('jurisdiction-south_africa'));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('back-button'));
    expect(screen.getByTestId('jurisdiction-selector')).toBeInTheDocument();
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });

  it('sends correct fetch request with jurisdiction and query', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: SAMPLE_RESULTS }),
    });

    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    fireEvent.click(screen.getByTestId('jurisdiction-south_africa'));
    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const fetchCall = global.fetch.mock.calls[0];
    expect(fetchCall[0]).toContain('/api/search');
    expect(fetchCall[1].method).toBe('POST');

    const body = JSON.parse(fetchCall[1].body);
    expect(body.query).toBe('test query about hacking');
    expect(body.jurisdiction).toBe('south_africa');
    expect(body.top_k).toBe(10);
  });

  it('selects a different jurisdiction (USA) and transitions to search', () => {
    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    fireEvent.click(screen.getByTestId('jurisdiction-usa'));
    expect(screen.getByTestId('jurisdiction-name')).toHaveTextContent('United States');
  });

  it('resets to initial state via results panel new search', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    render(React.createElement(Home, null));
    fireEvent.click(screen.getByTestId('landing-enter'));
    fireEvent.click(screen.getByTestId('jurisdiction-south_africa'));
    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.getByTestId('results-panel')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('New Search'));
    expect(screen.getByTestId('jurisdiction-selector')).toBeInTheDocument();
  });
});
