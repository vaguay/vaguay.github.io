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
