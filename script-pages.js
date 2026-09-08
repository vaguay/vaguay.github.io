// script-pages.js

// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  if (!cursor) return;
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Project Modal (runs only on portfolio page where elements exist)
const projectCards = document.querySelectorAll('.project-card:not(.project-link)');
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

const projectData = {
  'mars-rover': {
    title: 'NASA Mars Rover Architecture',
    description: 'Led hardware design team for a comprehensive Mars rover mission concept under NASA L\'SPACE Mission Concept Academy. Developed power subsystem architecture optimizing efficiency by 15% while maintaining redundancy requirements.',
    details: [
      'Systems engineering for $450M mission concept',
      'CEH 4.0 risk modeling and mitigation strategies',
      'Cross-functional team leadership (12 members)',
      'Technical documentation and presentation to NASA reviewers'
    ],
    tech: ['Systems Engineering', 'Power Systems', 'Risk Analysis', 'CAD']
  },
  'quantum-laser': {
    title: 'Quantum Laser Synchronization',
    description: 'Developed Python-based automation system for Yale Quantum Institute, improving laser timing precision for quantum networking experiments. System enables real-time adjustments with 95% accuracy improvement.',
    details: [
      'Real-time data acquisition and processing',
      'Automated calibration algorithms',
      'Integration with existing lab equipment',
      'Performance optimization reducing manual intervention'
    ],
    tech: ['Python', 'Data Analysis', 'Automation', 'Quantum Systems']
  },
  'ai-literacy': {
    title: 'Hola Mundo: AI for Kids',
    description: 'Authored bilingual children\'s book introducing artificial intelligence concepts to Latin American youth. Reached 120,000+ readers globally, making technical concepts accessible through culturally relevant storytelling.',
    details: [
      'Bilingual content development (English/Spanish)',
      'Age-appropriate technical explanations',
      'Cultural representation in STEM education',
      'Community partnerships for distribution'
    ],
    tech: ['Technical Writing', 'Education', 'Community Outreach']
  },
  'ai-literacy': {
    title: 'Hola Mundo: AI for Kids',
    description: 'Authored bilingual children\'s book introducing artificial intelligence concepts to Latin American youth. Reached 120,000+ readers globally, making technical concepts accessible through culturally relevant storytelling.',
    details: [
      'Bilingual content development (English/Spanish)',
      'Age-appropriate technical explanations',
      'Cultural representation in STEM education',
      'Community partnerships for distribution'
    ],
    tech: ['Technical Writing', 'Education', 'Community Outreach']
  },

  'iwv-space': {
    title: 'Impact-Weighted Space Investment',
    description: 'Research and replication code for an Impact-Weighted Valuation framework modeling how workforce development and societal benefit reshape space-sector capital allocation.',
    details: [
      'Built replication code for capital concentration and portfolio simulation analysis',
      'Modeled resilience under venture-capital contraction scenarios',
      'Integrated workforce impact and societal benefit into investment valuation',
      'Connected space commercialization, finance, and policy analysis'
    ],
    tech: ['Python', 'Monte Carlo Simulation', 'Finance', 'Space Policy']
  },

  'venezuela-risk': {
    title: 'Emerging Markets Risk Pipeline',
    description: 'ETL and Neo4j system integrating geopolitical news, commodity prices, and sovereign debt data to model emerging-market oil risk signals.',
    details: [
      'Built multi-source ETL pipelines for economic and geopolitical datasets',
      'Modeled supply shocks and propagation into market volatility',
      'Used graph relationships to connect events, actors, and commodities',
      'Designed around decision-making under uncertainty'
    ],
    tech: ['Python', 'Neo4j', 'ETL', 'NLP']
  },

  'investment-banking': {
    title: 'Investment Banking Analyst 2.0',
    description: 'Hybrid quant-analyst recommendation system combining financial scoring, machine-learning precedent comparison, and portfolio logic.',
    details: [
      'Built financial scoring workflows using Python',
      'Integrated precedent transaction and valuation analysis',
      'Combined growth, income, and ESG portfolio logic',
      'Generated buy/hold recommendation outputs'
    ],
    tech: ['Python', 'Finance', 'Machine Learning', 'Data Analysis']
  },

  'motor-controller': {
    title: 'PWM Motor Controller',
    description: 'PCB-based PWM motor controller and IR beam motor activation system designed and tested in ECE labs.',
    details: [
      'Built comparator-based PWM control system',
      'Analyzed duty-cycle behavior through oscilloscope measurements',
      'Implemented IR beam interruption motor switching',
      'Tested PCB soldering and hardware debugging workflows'
    ],
    tech: ['PCB Design', 'PWM', 'Motor Control', 'Electronics']
  },

  'advanced-filters': {
    title: 'Advanced Filters & Oscillators',
    description: 'Circuit analysis and experimental testing of notch filters, phase-shift filters, and oscillators.',
    details: [
      'Measured notch-filter attenuation and phase behavior',
      'Analyzed phase-shift oscillator loop gain conditions',
      'Compared theoretical and experimental frequency response',
      'Performed oscilloscope and Bode-plot analysis'
    ],
    tech: ['Signal Processing', 'Filters', 'Oscillators', 'Circuit Analysis']
  },

  'quantum-design': {
    title: 'Quantum Network Design Tool',
    description: 'Interactive visualization platform modeling neutral-atom quantum networking systems and atomic interactions.',
    details: [
      'Built interactive optical-tweezer visualization system',
      'Modeled Rydberg-state interactions between atoms',
      'Designed educational quantum-network simulations',
      'Created browser-based TypeScript interface'
    ],
    tech: ['TypeScript', 'Quantum Computing', 'Visualization', 'Simulation']
  },

  'device-recommender': {
    title: 'Device Recommender Goal Model',
    description: 'Python recommendation engine aligning user goals, constraints, and device characteristics.',
    details: [
      'Built user-goal recommendation logic',
      'Modeled tradeoffs between device performance and usability',
      'Integrated scoring systems for personalized outputs',
      'Explored interpretable recommendation-system design'
    ],
    tech: ['Python', 'Recommendation Systems', 'Data Modeling']
  },

  'blackjack-monte-carlo': {
    title: 'Blackjack Monte Carlo',
    description: 'Simulation-based blackjack decision engine learning optimal policies through Monte Carlo state estimation.',
    details: [
      'Implemented simulation-based reinforcement workflows',
      'Estimated state-value probabilities through repeated sampling',
      'Optimized blackjack hit/stand strategy decisions',
      'Stored and evaluated simulation outcomes'
    ],
    tech: ['Python', 'Monte Carlo Methods', 'Probability', 'Simulation']
  },

  'radio-fm': {
  title: 'FM Radio Transmission Circuit',
  description: 'Built and soldered a working FM radio transmission system using oscillators, transformers, and audio-jack circuitry for signal modulation experiments.',
  details: [
    'Constructed oscillator and transformer circuits on perf boards',
    'Generated and analyzed 1MHz carrier signals using oscilloscopes and spectrum analyzers',
    'Soldered and integrated audio-jack input for AM signal transmission',
    'Tested live signal broadcasting and waveform envelope behavior'
  ],
  tech: ['Circuit Design', 'Soldering', 'Signal Processing', 'Oscilloscopes']
},

  'llm-decision': {
  title: 'LLM Decision Invariance Study',
  description: 'Experimental cognitive-science and AI reasoning study testing whether large language models maintain stable decisions when only the intended audience changes.',
  details: [
    'Designed bounded decision-making experiments across hiring, loans, scholarships, triage, and discipline scenarios',
    'Tested decision invariance under audience framing using ChatGPT 5.3',
    'Analyzed how explanation and judgment diverge in ambiguous or moral domains',
    'Connected findings to Theory of Mind, ELIZA effect, and AI reasoning debates'
  ],
  tech: ['LLMs', 'Cognitive Science', 'Prompt Engineering', 'AI Evaluation']
  },

  'loan-decision': {
  title: 'Loan Decision System',
  description: 'AI-driven lending and decision-analysis system exploring approval logic, fairness tradeoffs, and counterfactual reasoning in automated financial systems.',
  details: [
    'Built machine-learning loan approval workflows using structured applicant data',
    'Analyzed fairness, decision boundaries, and feature importance across applicant groups',
    'Implemented counterfactual testing to examine how small profile changes alter outcomes',
    'Connected AI decision systems to questions of ethics, risk, and interpretable reasoning'
  ],
  tech: ['Python', 'Machine Learning', 'Fairness Analysis', 'Decision Systems']
  }

};


if (projectCards.length && modal && modalClose && modalBody) {
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      const project = projectData[projectId];

      if (project) {
        modalBody.innerHTML = `
          <h2>${project.title}</h2>
          <p style="color: var(--light-gray); margin: 1.5rem 0; line-height: 1.7;">${project.description}</p>
          <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Key Contributions</h3>
          <ul style="color: var(--light-gray); line-height: 2; margin-bottom: 2rem;">
            ${project.details.map(detail => `<li>${detail}</li>`).join('')}
          </ul>
          <h3 style="margin-bottom: 1rem;">Technologies</h3>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            ${project.tech.map(tech => `
              <span style="padding: 0.5rem 1rem; border: 1px solid var(--white); font-size: 0.85rem;">${tech}</span>
            `).join('')}
          </div>
        `;
        modal.classList.add('active');
      }
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}


// Project walkthroughs for repositories with a deeper case-study page
Object.assign(projectData, {
  'gpt-from-scratch': {
    title: 'GPT Built from Scratch',
    description: 'A ground-up implementation of the components that lead from neural-network fundamentals to GPT training and text generation.',
    details: [
      'Built neural-network primitives including neurons, backpropagation, MLPs, activations, and training loops.',
      'Implemented the language-model pipeline: vocabulary, tokenization, batching, dataset preparation, and embeddings.',
      'Built attention heads, multi-head attention, transformer blocks, normalization layers, a KV cache, grouped-query attention, and the GPT model.',
      'Included training and generation entry points to connect the individual components into a working language model.'
    ],
    tech: ['Python', 'PyTorch', 'Transformers', 'Attention', 'Tokenization', 'Neural Networks']
  },
  replaylab: {
    title: 'ReplayLab',
    description: 'A prototype for evaluating action-taking enterprise agents against historical workflows before they are allowed to touch production systems.',
    details: [
      'Built an interactive workflow-replay prototype around customer-support refund scenarios.',
      'Compared an agent’s proposed tool-call trace with a verified human outcome, including evidence, permissions, and escalation requirements.',
      'Included controlled variations for tool outages, approval thresholds, and security conflicts.',
      'Surfaced release recommendations from outcome, action, policy/safety, and operational-quality signals.'
    ],
    tech: ['JavaScript', 'HTML', 'CSS', 'Agent Evaluation', 'Workflow Design', 'AI Safety']
  }
});

const projectStories = {
  "replaylab": {
    "repository": "https://github.com/vaguay/replaylab",
    "sections": [
      [
        "Starting with the workflow, not the chat",
        "I began with a gap I kept noticing in the way enterprise agents are evaluated. A polished final answer can look convincing while the underlying workflow has done something unsafe: called the wrong tool, skipped a required approval, relied on missing evidence, or failed to recover from an outage. For action-taking agents, response quality is only part of the question.",
        "ReplayLab treats the workflow as the unit of evaluation. The initial prototype uses customer-support refunds because the outcome is easy to make concrete: did the agent collect the right evidence, follow the threshold and permission rules, use tools safely, and arrive at the verified resolution?"
      ],
      [
        "Turning a concern into something testable",
        "The system replays a historical-style case through an agent's proposed tool-call plan. It compares that trace with a verified human outcome, the evidence the workflow required, the actions that were permitted, and the escalation path. That made the question operational: not “does this agent sound helpful?” but “would I let this workflow reach a customer?”",
        "I deliberately started with fictional data and controlled scenarios. That gives the prototype room to introduce one change at a time—an unavailable tool, a refund that crosses an approval threshold, or a security conflict—and observe whether the agent's plan remains safe."
      ],
      [
        "The central design choice",
        "I chose not to collapse performance into one generic score. The replay surfaces where a trace is incomplete, unsafe, or missing a handoff, then produces a release recommendation from those checks. This keeps a reviewer close to the evidence instead of asking them to trust an opaque benchmark number.",
        "It also makes the prototype useful as a product conversation. A team can see which policy constraint broke, not just that a model “failed.”"
      ],
      [
        "How I checked the idea",
        "The initial suite includes a baseline refund case alongside tool-outage, approval-threshold, and security-conflict variations. Each is intended to test a different part of the workflow: resilience, authorization, and safety boundaries.",
        "This is a prototype, not a claim of benchmark validity. The repository makes that limitation explicit and lays out the next practical steps: versioned policies, imported traces, scorecards, release gates, and sandbox connectors."
      ]
    ]
  },
  "venezuela-risk": {
    "repository": "https://github.com/vaguay/venezuelan-market-risk-data-pipelines",
    "sections": [
      [
        "A market question with a data-modeling problem",
        "The starting question was how political events and commodity-export controls around Venezuela might become observable market risk. The harder part was not finding a headline or a price series; it was preserving enough context to explain what happened, who had influence, and how an event lined up with a market move.",
        "That pushed the project beyond a single dashboard. I designed it as a pipeline that can retain raw source material, create a normalized analytical layer, and connect events to assets and control relationships."
      ],
      [
        "Building the system in layers",
        "The pipeline follows a Bronze–Silver–Gold pattern. It ingests RSS, JSONL, and price feeds through Redpanda; stores raw records in BigQuery; applies classification and entity processing with spaCy and keyword logic; and then serves curated event windows and metrics.",
        "Neo4j holds the relationship layer, while BigQuery supports the event-window analysis. The Streamlit interface brings together the price series, event-sensitivity view, heatmap, and control-network view. Each layer has a distinct job, which made the data flow easier to inspect and extend."
      ],
      [
        "The decision that mattered",
        "I modeled ownership separately from control. In an emerging-market setting, an actor may influence cash flows or operational decisions without appearing as the legal owner of an asset. Treating those ideas as interchangeable would make the graph simpler, but less useful for the question the project is trying to answer.",
        "I also kept the ingestion, warehouse, graph, and dashboard concerns separate rather than asking one tool to do everything. That tradeoff supports clearer debugging and a more believable path from prototype to a maintained system."
      ],
      [
        "How I made it reproducible",
        "The repository includes sample historical events, a local Docker Compose environment, unit tests, and CI checks that lint, test, and parse the Airflow DAG. Those choices matter because this kind of analysis is only useful if someone else can follow the lineage from an event source to a chart.",
        "The next useful extension would be more carefully curated event labels and broader coverage, but the current version already demonstrates the end-to-end reasoning: source data becomes structured evidence, structured evidence becomes a relationship-aware view of risk."
      ]
    ]
  },
  "gpt-from-scratch": {
    "repository": "https://github.com/vaguay/gpt-built-from-scratch",
    "sections": [
      [
        "Why build the pieces before using the abstraction",
        "I wanted to understand what a GPT-style model is actually doing at each stage, rather than treating a library call as the whole story. The project begins below the transformer: gradients, backpropagation, neurons, activations, and multilayer perceptrons. From there it moves into the data and modeling machinery required for language generation.",
        "The point was not to reproduce a production foundation model. It was to make the path from simple neural-network primitives to a runnable text-generation loop visible and inspectable."
      ],
      [
        "Following the dependency chain",
        "I built the repository in the order the system needs to exist. The data layer handles vocabulary, tokenization, batching, and dataset preparation. Embedding and normalization layers create the representations the model needs. Attention heads, multi-head attention, transformer blocks, KV caching, and grouped-query attention then build toward the GPT model.",
        "Keeping these components in separate modules means a problem can be located at the right level. If a generated sequence is wrong, the investigation can move from training or sampling back through attention, tokenization, or data loading instead of treating the model as one black box."
      ],
      [
        "The design choice behind the structure",
        "The repository favors small, named implementations over a monolithic notebook. That makes the learning progression clearer, but it also mirrors a real engineering concern: complex systems are easier to reason about when interfaces are narrow and the dependencies are explicit.",
        "I used the training and generation scripts as the integration point. The model is not just a collection of exercises; the pieces have to work together well enough to train and produce text."
      ],
      [
        "How I checked the learning path",
        "The practical check is end to end: the modules connect through runnable training and generation entry points. That is a stronger test than verifying an isolated attention calculation, because it exposes mismatches between the tokenizer, batches, embeddings, model, and decoding loop.",
        "The repository is course work, and I preserve that provenance in the project description. Its value is the transparent record of the concepts I implemented and connected, rather than a claim to have built a novel model architecture."
      ]
    ]
  },
  "investment-banking": {
    "repository": "https://github.com/vaguay/investment_banking_analyst_2.0",
    "sections": [
      [
        "The recommendation had to reflect the investor",
        "A generic buy, hold, or sell label hides a real decision: different investors care about different tradeoffs. A growth-oriented investor may prioritize return potential; an income investor may care much more about dividends and stability; an ESG-focused investor wants a different lens again. I designed this project around that distinction.",
        "The goal became a hybrid quant–analyst tool: use market and company data for the numerical backbone, then make the recommendation legible enough for a person to understand why it changed."
      ],
      [
        "From raw market data to a decision",
        "The system pulls data through yfinance, including beta, market capitalization, dividend information, sector, valuation, growth, margins, return on equity, and longer-horizon price history. It turns those inputs into four interpretable score families: return, stability, income, and an ESG proxy.",
        "A weighted matrix changes how those score families matter for growth, income, and ESG-oriented investor profiles. The model then maps the combined score to buy, hold, or sell thresholds. A K-nearest-neighbors layer adds comparable-company context to the explanation; optional clustering is kept explanatory rather than treated as the recommendation engine."
      ],
      [
        "Choosing transparency over false precision",
        "I deliberately used visible scores and fixed weights rather than a black-box model. That makes the tradeoffs inspectable: a user can see when a recommendation is being driven by growth, income, or stability. It also makes a limitation clear. The ESG component is labeled as a proxy because the selected data source does not provide consistent official ESG coverage.",
        "That honesty matters more than an overly confident label. The output is a structured decision aid, not investment advice or a claim that one score can represent every investor's objectives."
      ],
      [
        "How I checked the system",
        "The repository documents the training universe, score logic, thresholds, investor profiles, and runnable examples. Because the inputs are live market data, the recommendation is designed to change with the data rather than remain a frozen result.",
        "The next iteration I would prioritize is making the evidence behind each factor even more visible in the interface, so a user can move from the recommendation to the specific financial signals and comparable cases that informed it."
      ]
    ]
  },
  "iwv-space": {
    "repository": "https://github.com/vaguay/iwv-space-investment",
    "sections": [
      [
        "Separating what the data says from what a scenario explores",
        "This project grew from a question about resilience in space-sector investment: how concentrated is the current funding landscape, and how might that concentration interact with an impact-weighted approach during a funding shock? I wanted the analysis to be rigorous about the boundary between observed data and a modeled scenario.",
        "The repository supports the supplementary materials for an AIAA ASCEND 2026 paper. It uses a deal-level dataset of 76 funding rounds from January 2023 through December 2025, with disclosed funding amounts for 59 rounds and a nine-category taxonomy."
      ],
      [
        "Measuring the baseline before modeling the alternative",
        "The empirical portion computes concentration through the Gini coefficient, HHI, top-two share, and Lorenz curve. The scripts make the observed concentration visible before any portfolio simulation is introduced. That ordering matters: it gives the scenario model a factual starting point instead of treating the simulation as evidence by itself.",
        "The modeling portion then runs 10,000 Monte Carlo paths over 10 periods. It compares a benchmark portfolio, a diversified portfolio, and an impact-weighted portfolio under a 40% contraction in the third period."
      ],
      [
        "A deliberate guardrail in the interpretation",
        "The most important choice was keeping the empirical analysis and the scenario model distinct. The deal data can support a statement about concentration; the Monte Carlo model can illustrate the structural behavior of specified portfolios under stated assumptions. It is not a forecast of the sector.",
        "That distinction is easy to blur in investment work. Making it explicit lets a reader assess both parts on their own terms: the data preparation and concentration metrics on one side, and the scenario design and portfolio assumptions on the other."
      ],
      [
        "How someone can verify the work",
        "The repository includes the source dataset, scripts for the concentration calculations, generated figures, and expected outputs. A reader can reproduce the table and figure logic without proprietary data, then inspect the assumptions that shape the simulation.",
        "A natural next step is sensitivity analysis across shock timing, allocation rules, and taxonomy choices. The current project establishes the reproducible analytical base needed for that conversation."
      ]
    ]
  },
  "blackjack-monte-carlo": {
    "repository": "https://github.com/vaguay/blackjack_monte_carlo",
    "sections": [
      [
        "Turning a familiar game into a decision problem",
        "Blackjack is a compact way to ask a serious modeling question: how can a system choose an action when the quality of that action depends on uncertainty and repeated outcomes? Rather than hard-code a hit-or-stand table, I framed the project as an offline learning problem.",
        "The system simulates games, estimates how often states lead to successful outcomes under candidate decisions, and converts those estimates into a policy that can be used during play."
      ],
      [
        "Why the work happens before the decision",
        "Simulation is relatively expensive compared with a single hit-or-stand choice. I separated those two concerns: training happens offline, while gameplay reads a cached lookup table. That means the real-time portion is fast and small enough to inspect.",
        "This separation also makes the project easier to reason about. The learning process is where the statistical work happens; the action layer is simply retrieving the learned policy for the current state."
      ],
      [
        "The design decision",
        "I chose a lookup table rather than burying the policy inside a more opaque model. For this problem, transparency is useful: a reviewer can examine the mapping from state to action and understand that it came from estimated win rates rather than an arbitrary rule.",
        "The project is therefore as much about the decision-system architecture as it is about Blackjack. It shows how an offline simulation loop can become a dependable, low-latency decision path."
      ],
      [
        "How I evaluated it",
        "The useful checks are stability and usability. Repeated simulation should settle into a coherent state-to-action policy, and the saved policy should produce quick decisions when the game is running.",
        "A natural extension would be to compare the learned policy with a baseline strategy across a held-out simulation set, then expose uncertainty where the system has seen relatively few examples. The current version focuses on the core loop: simulate, estimate, cache, and act."
      ]
    ]
  }
};

// Standalone project pages
const projectPageBody = document.getElementById('project-page-body');
const projectImages = {
  'mars-rover': 'assets/images/projects-1.png',
  'quantum-laser': 'assets/images/projects-2.png',
  'ai-literacy': 'assets/images/projects-3.png',
  'iwv-space': 'assets/images/projects-4.png',
  'venezuela-risk': 'assets/images/projects-5.png',
  'investment-banking': 'assets/images/projects-6.png',
  'motor-controller': 'assets/images/projects-7.png',
  'advanced-filters': 'assets/images/projects-8.png',
  'quantum-design': 'assets/images/projects-9.png',
  'device-recommender': 'assets/images/projects-10.png',
  'blackjack-monte-carlo': 'assets/images/projects-11.png',
  'radio-fm': 'assets/images/projects-12.png',
  'llm-decision': 'assets/images/projects-13.png',
  'loan-decision': 'assets/images/projects-14.png'
};

if (projectPageBody) {
  const projectId = new URLSearchParams(window.location.search).get('project');
  const project = projectData[projectId];
  const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[character]));

  if (project) {
    document.title = `${project.title} • Vanesa Aguay Guerra`;
    const image = projectImages[projectId];
    const story = projectStories[projectId];
    const storyMarkup = story ? `
      <section class="project-walkthrough project-story">
        ${story.sections.map(([heading, ...paragraphs]) => `
          <section class="project-story-section">
            <h2>${escapeHtml(heading)}</h2>
            ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
          </section>
        `).join('')}
        <a class="project-repo-link" href="${story.repository}" target="_blank" rel="noopener noreferrer">Read the repository on GitHub ↗</a>
      </section>
    ` : '';
    projectPageBody.innerHTML = `
      <a class="article-back" href="portfolio.html#technical">← Technical Projects</a>
      <p class="project-page-kicker">Technical project</p>
      <h1>${escapeHtml(project.title)}</h1>
      <p class="project-page-dek">${escapeHtml(project.description)}</p>
      ${image ? `<img class="project-page-image" src="${image}" alt="">` : ''}
      ${storyMarkup}
      <h2>What I worked on</h2>
      <ul>${project.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}</ul>
      <h2>Tools and methods</h2>
      <p class="project-page-tools">${project.tech.map(escapeHtml).join(' · ')}</p>
    `;
  } else {
    projectPageBody.innerHTML = `
      <a class="article-back" href="portfolio.html#technical">← Technical Projects</a>
      <h1>Project not found</h1>
      <p class="project-page-dek">Return to the portfolio to choose a project.</p>
    `;
  }
}

const blogCards = document.querySelectorAll('.blog-post-card');
const blogModal = document.getElementById('blog-modal');
const blogModalClose = document.getElementById('blog-modal-close');
const blogModalBody = document.getElementById('blog-modal-body');

const blogData = {
  'ai-infrastructure': {
    title: 'Why AI Infrastructure Will Matter More Than AI Models',
    category: 'AI Systems',
    body: `
      <p>Most people talk about AI as if the model is the product. But the model is only one layer in a much larger system.</p>
      <p>The real leverage is in the infrastructure around it: the data pipelines, evaluation loops, monitoring systems, failure detection, human feedback, and incentives that determine whether an AI system can be trusted in the real world.</p>
      <p>A model can be impressive in isolation and still fail when the data is stale, the objective is wrong, or the downstream decision affects people differently. The future belongs to people who can understand both the technical system and the human system around it.</p>
    `
  },

  'decision-systems': {
    title: 'Prediction Is Not Understanding',
    category: 'Decision Systems',
    body: `
      <p>Prediction can look like intelligence. A system can classify, rank, approve, reject, recommend, and summarize without ever understanding the world it is shaping.</p>
      <p>That distinction matters most in high-stakes domains: loans, hiring, education, healthcare, and finance. The danger is not only that models can be wrong. It is that they can be confidently useful while hiding the assumptions underneath.</p>
      <p>Understanding requires more than accuracy. It requires context, incentives, uncertainty, explanation, and accountability. The systems I am most interested in are not just predictive. They are decision systems.</p>
    `
  },

  'linear-algebra-nfl': {
    title: 'Applying Linear Algebra to NFL Quarterback Performance',
    category: 'Math & Modeling',
    body: `
      <p>This project used ESPN NFL passing statistics from the top 30 quarterbacks in the 2025 season to study performance through linear algebra.</p>
      <p>Using PCA, we treated quarterback statistics as high-dimensional vectors and asked which linear combinations explained the most variance. PC1 captured passing volume through attempts, completions, yards, yards per game, and touchdowns. PC2 captured efficiency through completion percentage, yards per attempt, passer rating, and interceptions.</p>
      <p>Then, using least squares, we modeled total passing yards from games played, yards per attempt, touchdowns, interceptions, and sacks. The model achieved an adjusted R² of 0.858 with an RMSE of about 233 yards, showing how projection and column-space thinking can create interpretable predictions.</p>
      <p>The most interesting insight was rank and multicollinearity: completions and attempts were nearly linearly dependent, so removing redundant columns restored model stability.</p>
    `
  }
};

if (blogCards.length && blogModal && blogModalClose && blogModalBody) {
  blogCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const blogId = card.getAttribute('data-blog');
      const post = blogData[blogId];

      if (post) {
        blogModalBody.innerHTML = `
          <span class="blog-category">${post.category}</span>
          <h2>${post.title}</h2>
          <div style="color: var(--light-gray); margin-top: 1.5rem; line-height: 1.8;">
            ${post.body}
          </div>
        `;
        blogModal.classList.add('active');
      }
    });
  });

  blogModalClose.addEventListener('click', () => {
    blogModal.classList.remove('active');
  });

  blogModal.addEventListener('click', (e) => {
    if (e.target === blogModal) {
      blogModal.classList.remove('active');
    }
  });
}


// Experience detail modal
const experienceEntries = document.querySelectorAll('.experience-entry');
const experienceModal = document.getElementById('experience-modal');
const experienceModalClose = document.getElementById('experience-modal-close');
const experienceModalBody = document.getElementById('experience-modal-body');

const experienceData = {
  honeywell: {
    organization: 'Honeywell Technologies',
    role: 'Applied AI Engineering Intern · Buenos Aires, Argentina · June 2026 - present',
    summary: 'I am defining an AI-enabled reliability solution for battery energy storage systems, from the customer and engineering problem through the data reality and a practical implementation plan.',
    details: [
      'Translated stakeholder needs, operating constraints, and technical dependencies into product requirements, data specifications, and a five-phase roadmap.',
      'Reviewed 7 use cases, 6 analytical approaches, and 2 possible MVPs to identify where AI could add value now and where the necessary capability was not yet in place.',
      'Standardized 12,000 telemetry records from 16 historian exports and reconciled 31 required tags against 3,717 SCADA points.',
      'Presented build-versus-integrate recommendations to sales, engineering, and management, helping align the near-term MVP with the data actually available.'
    ],
    focus: 'Product definition, data readiness, technical strategy, and stakeholder alignment.'
  },
  cornell: {
    organization: 'Cornell Tech / Break Through Tech',
    role: 'AI/ML Fellow · New York, NY · March 2026 - present',
    summary: 'A selective applied machine-learning program focused on taking models from an initial question through data preparation, evaluation, and communication.',
    details: [
      'Built end-to-end machine-learning workflows with Python, scikit-learn, and TensorFlow.',
      'Practiced feature engineering, training, evaluation, and model debugging on real-world datasets.',
      'Worked in a 50+ student cohort to test assumptions, compare model choices, and explain results clearly.',
      'Selected from more than 3,000 applicants for the national fellowship.'
    ],
    focus: 'Applied machine learning, model evaluation, and clear technical communication.'
  },
  shpe: {
    organization: 'Society of Hispanic Professional Engineers',
    role: 'National Undergraduate Representative, Region 4 · May 2026 - present',
    summary: 'An elected national role representing SHPE students across 13 Northeastern states and Puerto Rico.',
    details: [
      'Represent undergraduate needs and priorities across regional chapters.',
      'Build relationships that expand mentorship, professional development, and career-access opportunities.',
      'Coordinate across a broad student network while keeping local chapter realities visible in national conversations.'
    ],
    focus: 'Leadership across a distributed community, relationship building, and student opportunity.'
  },
  'yale-engineering': {
    organization: 'Yale Engineering',
    role: 'Systems Engineer, Quantum Laser Across the Sound · New Haven, CT · August 2025 - present',
    summary: 'I work on measurement and synchronization systems for distributed quantum-networking experiments, where small timing errors can change whether a result is trustworthy.',
    details: [
      'Engineered automated measurement and synchronization systems for quantum-networking experiments.',
      'Built Python and R data-acquisition workflows to detect timing drift and improve measurement reliability by 90%.',
      'Automated signal-synchronization calibration, reducing data-acquisition latency by 40%.',
      'Lead recurring design reviews with JPMorgan Chase engineers on requirements, risk, cost allocation, and performance tradeoffs.'
    ],
    focus: 'Experimental systems, data acquisition, reliability, and decisions under technical uncertainty.'
  },
  openai: {
    organization: 'OpenAI ChatGPT Lab',
    role: 'Fellow · New York, NY · August 2025 - May 2026',
    summary: 'I studied how students actually use generative AI: the workflows they create, the places they hesitate, and the conditions that make a tool useful in practice.',
    details: [
      'Evaluated AI product experiences through user feedback, workflows, and learning behavior.',
      'Synthesized adoption barriers and product observations for generative-AI capabilities reaching more than one million students.',
      'Worked with product managers and engineers through iterative testing and cross-functional feedback.'
    ],
    focus: 'User research, product judgment, and translating behavior into product insight.'
  },
  buildify: {
    organization: 'Buildify',
    role: 'Software Engineer Intern · New Haven, CT · October 2025 - December 2025',
    summary: 'A product-engineering role centered on making the data behind AI workflows and internal decisions easier to trust.',
    details: [
      'Built structured data-ingestion pipelines that improved the reliability of AI workflows supporting more than 1,000 daily users.',
      'Designed internal analytics systems that integrated third-party APIs for engineering and product decisions.',
      'Worked across data intake, workflow reliability, and the practical needs of non-technical users.'
    ],
    focus: 'Data pipelines, product operations, and usable internal systems.'
  },
  its: {
    organization: 'Yale Information Technology Services',
    role: 'Technician · New Haven, CT · October 2025 - present',
    summary: 'Front-line technical support has been a direct way to learn how people experience systems when they fail, especially under time pressure.',
    details: [
      'Provide software and network support for Yale’s 12,000+ user campus.',
      'Diagnose macOS system failures and repair Windows hardware through structured troubleshooting.',
      'Resolve high-volume technology problems while communicating clearly with people who have different levels of technical comfort.'
    ],
    focus: 'Root-cause analysis, service, and the human side of technical systems.'
  },
  tsai: {
    organization: 'Tsai Center for Innovative Thinking at Yale',
    role: 'Strategy Fellow · New Haven, CT · September 2025 - May 2026',
    summary: 'I supported early-stage teams as they moved from interesting ideas to clearer choices about users, growth, and what to do next.',
    details: [
      'Advised venture teams on product strategy, venture evaluation, and data-informed growth recommendations.',
      'Worked with founders and cross-functional stakeholders to prioritize cross-campus growth opportunities.',
      'Connected customer needs, available evidence, and resource constraints in practical strategic work.'
    ],
    focus: 'Venture strategy, customer discovery, and prioritization.'
  },
  lacasa: {
    organization: 'La Casa Latino Cultural Center at Yale',
    role: 'Peer Liaison · New Haven, CT · February 2025 - present',
    summary: 'A peer-support and community-building role focused on making the transition to Yale more navigable for first-generation students.',
    details: [
      'Support a cohort of 21 first-year, first-generation students through academic and social programming.',
      'Created a professional-insight series that reached more than 190 Latino students nationwide through cross-campus partnerships.',
      'Build programming around specific student needs rather than treating belonging as an abstract goal.'
    ],
    focus: 'Community design, mentorship, and programs that create access.'
  },
  nasa: {
    organization: "NASA L'SPACE",
    role: 'Systems Engineering Intern · May 2025 - September 2025',
    summary: 'I worked with a multidisciplinary team on a Mars rover concept, learning how technical decisions change a system’s cost, risk, and operations.',
    details: [
      'Led systems analysis for a $450M Mars rover concept with a 15-engineer team.',
      'Integrated power and operational constraints into the mission concept and its technical tradeoffs.',
      'Built a Python cost-and-risk model with NASA CEH 4.0 to evaluate failure modes and response strategies.',
      'Reduced modeled mission risk by 8% and helped prepare the Preliminary Design Review for a NASA panel.'
    ],
    focus: 'Systems engineering, quantitative risk analysis, and technical communication.'
  },
  fulcrum: {
    organization: 'FulcrumCare',
    role: 'Data Intern · New Haven, CT · August 2024 - May 2025',
    summary: 'An early health-tech data role that made the value of reliable, connected information concrete.',
    details: [
      'Built API-based pipelines that linked clinical and dental records for longitudinal patient analysis.',
      'Contributed to interoperability infrastructure for value-based-care systems serving underserved populations.',
      'Learned how data structure and integration choices determine what questions a team can answer later.'
    ],
    focus: 'Data integration, health-tech infrastructure, and real-world information flow.'
  },
  dwight: {
    organization: 'Dwight Hall Socially Responsible Investment Fund',
    role: 'Portfolio Analyst · New Haven, CT · October 2024 - present',
    summary: 'I use financial, governance, and ESG information to support decisions for an undergraduate-managed investment portfolio.',
    details: [
      'Evaluate a $200K+ portfolio using financial, ESG, and quantitative analysis.',
      'Research shareholder proposals, governance initiatives, and portfolio performance.',
      'Turn mixed financial and non-financial evidence into recommendations for the fund.'
    ],
    focus: 'Financial analysis, governance, and decision-making with multiple objectives.'
  },
  'latina-women': {
    organization: 'Latina Women at Yale',
    role: 'Treasurer · New Haven, CT · August 2024 - present',
    summary: 'I reworked how a 120-member organization allocated resources so programming could better reflect what members used and needed.',
    details: [
      'Restructured budget allocation around programs with measurable engagement and retention.',
      'Launched a mentorship-focused operating model that helped increase funding by 200% in two months.',
      'Balanced finance, programming, and member experience rather than treating budgeting as a back-office task.'
    ],
    focus: 'Resource allocation, organizational operations, and community-led growth.'
  },
  'capital-one': {
    organization: 'Capital One',
    role: 'Tech Summit Participant · Plano, TX · May 2026',
    summary: 'A selective technical program where I worked through workshops and case studies with Capital One mentors.',
    details: [
      'Selected as 1 of 35 students nationwide.',
      'Participated in technical workshops and collaborative case work.',
      'Learned from practitioners about how technical teams approach business and product problems.'
    ],
    focus: 'Technical problem-solving, case work, and learning from practitioners.'
  },
  'girls-vc': {
    organization: 'Girls in VC',
    role: 'Venture Fellow · May 2026',
    summary: 'A ten-week program focused on how investors evaluate early-stage companies and emerging opportunities.',
    details: [
      'Selected for a competitive venture-capital fellowship.',
      'Worked through investment simulations and experiential projects.',
      'Built a clearer view of how market, team, and product signals are considered together.'
    ],
    focus: 'Venture evaluation, investment thinking, and startup analysis.'
  },
  mlt: {
    organization: 'Management Leadership for Tomorrow',
    role: 'Career Prep Fellow · November 2025 - present',
    summary: 'An 18-month professional-development program for high-achieving, diverse talent.',
    details: [
      'Work through business case studies that develop structured problem-solving and communication.',
      'Build technical and professional skills alongside exposure to industry leaders.',
      'Participate in a long-term community focused on career preparation and leadership.'
    ],
    focus: 'Business cases, career development, and professional community.'
  },
  goldman: {
    organization: 'Goldman Sachs',
    role: 'Investment Banking Track Emerging Leaders Fellow · Jersey City, NJ · November 2025',
    summary: 'A competitive insight program exploring the work and decision-making behind investment banking.',
    details: [
      'Completed investment-banking workshops and M&A case studies.',
      'Learned directly from bankers through mentorship and technical exercises.',
      'Practiced connecting financial analysis to a client and transaction context.'
    ],
    focus: 'M&A analysis, financial decision-making, and industry exposure.'
  },
  att: {
    organization: 'AT&T Technology Academy',
    role: 'Technology Program Fellow · June 2025 - August 2025',
    summary: 'A selective technology and professional-development program that broadened my foundation across technical systems.',
    details: [
      'Completed coursework in Azure cloud, AI/ML fundamentals, REST APIs, cloud computing, Agile, and network systems.',
      'Connected those topics through applied exercises and professional-development programming.',
      'Used the program to build a more practical vocabulary for the infrastructure behind software products.'
    ],
    focus: 'Cloud systems, APIs, AI/ML foundations, and Agile delivery.'
  },
  'jane-street': {
    organization: 'Jane Street',
    role: 'FOCUS and UNBOXED Fellow · New York, NY · May 2024 and May 2025',
    summary: 'A set of immersive programs that connected mathematical and engineering thinking with market-making problems.',
    details: [
      'Applied SQL, probabilistic reasoning, and Python to solve structured market-making challenges.',
      'Worked with engineers and mentors on collaborative technical problem-solving.',
      'Explored the connection between quantitative models, uncertainty, and real-time decisions.'
    ],
    focus: 'Probability, programming, market-making, and structured reasoning.'
  },
  'outdoor-leader': {
    organization: 'Yale First-Year Outdoor Orientation Trips',
    role: 'Trip Leader · January 2025 - present',
    summary: 'A leadership role centered on helping incoming students navigate a demanding shared experience before they begin at Yale.',
    details: [
      'Selected and trained to co-lead 7 to 8 incoming students on a four-day, phone-free backpacking trip.',
      'Manage logistics, safety, group dynamics, and changing conditions in the field.',
      'Adapt responsibilities to individual strengths while helping a group build trust quickly.'
    ],
    focus: 'Team leadership, logistics, safety, and group dynamics.'
  },
  ecuadorianos: {
    organization: 'Ecuatorianos Unidos y Amigos',
    role: 'President · Yale University',
    summary: 'I lead a student community that creates cultural programming around Ecuadorian identity, heritage, and traditions at Yale.',
    details: [
      'Plan and lead events that make Ecuadorian culture visible and shared on campus.',
      'Build community among students and friends of Ecuador.',
      'Create opportunities for cultural connection alongside academic and professional life.'
    ],
    focus: 'Community leadership, cultural programming, and event design.'
  }
};

if (experienceEntries.length && experienceModal && experienceModalClose && experienceModalBody) {
  const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[character]));

  const closeExperienceModal = () => {
    experienceModal.classList.remove('active');
    experienceEntries.forEach((entry) => entry.classList.remove('is-selected'));
    experienceModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  experienceEntries.forEach((entry) => {
    entry.addEventListener('click', () => {
      experienceEntries.forEach((item) => item.classList.remove('is-selected'));
      entry.classList.add('is-selected');
      const item = experienceData[entry.dataset.experience];
      if (!item) return;

      experienceModalBody.innerHTML = `
        <p class="experience-modal-kicker">${escapeHtml(item.organization)}</p>
        <h2 id="experience-modal-title">${escapeHtml(item.organization)}</h2>
        <p class="experience-modal-role">${escapeHtml(item.role)}</p>
        <p>${escapeHtml(item.summary)}</p>
        <h3>What I worked on</h3>
        <ul>${item.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}</ul>
        <p class="experience-modal-focus"><span>Focus:</span> ${escapeHtml(item.focus)}</p>
      `;
      experienceModal.classList.add('active');
      experienceModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      experienceModalClose.focus();
    });
  });

  experienceModalClose.addEventListener('click', closeExperienceModal);

  experienceModal.addEventListener('click', (event) => {
    if (event.target === experienceModal) closeExperienceModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && experienceModal.classList.contains('active')) {
      closeExperienceModal();
    }
  });
}


// Portfolio folder navigation
const folderCards = document.querySelectorAll('.folder-card');
const folderGrid = document.getElementById('folder-grid');
const portfolioCollections = document.getElementById('portfolio-collections');
const portfolioCollectionsList = document.querySelectorAll('.portfolio-collection');
const collectionBackButtons = document.querySelectorAll('.collection-back');

if (folderCards.length && folderGrid && portfolioCollections) {
  const showFolder = (folderName, updateHash = true) => {
    const target = document.getElementById(`folder-${folderName}`);
    if (!target) return;

    portfolioCollectionsList.forEach((collection) => {
      collection.hidden = collection !== target;
    });
    folderGrid.hidden = true;

    if (updateHash) {
      history.replaceState(null, '', `#${folderName}`);
    }

    target.querySelector('.collection-back')?.focus();
  };

  const showFolderIndex = () => {
    portfolioCollectionsList.forEach((collection) => {
      collection.hidden = true;
    });
    folderGrid.hidden = false;
    history.replaceState(null, '', window.location.pathname);
  };

  folderCards.forEach((card) => {
    card.addEventListener('click', () => showFolder(card.dataset.folder));
  });

  collectionBackButtons.forEach((button) => {
    button.addEventListener('click', showFolderIndex);
  });

  const requestedFolder = window.location.hash.slice(1);
  if (requestedFolder && document.getElementById(`folder-${requestedFolder}`)) {
    showFolder(requestedFolder, false);
  }
}
