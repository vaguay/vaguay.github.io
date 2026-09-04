// script-pages.js

// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  if (!cursor) return;
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Project Modal (runs only on portfolio page where elements exist)
const projectCards = document.querySelectorAll('.project-card');
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
    experienceModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  experienceEntries.forEach((entry) => {
    entry.addEventListener('click', () => {
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
