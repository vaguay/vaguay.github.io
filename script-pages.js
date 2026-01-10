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
