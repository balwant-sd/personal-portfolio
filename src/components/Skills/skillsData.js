export const skillGroups = {
  Frontend: ['React', 'Next.js', 'PWA', 'Flutter', 'HTML5', 'CSS3', 'JavaScript'],
  Backend: ['Node.js', 'Fastify', 'Laravel', 'PHP', 'Python', 'REST APIs', 'Microservices'],
  Databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'Supabase'],
  'Cloud & DevOps': ['AWS', 'Vercel', 'Netlify', 'Heroku', 'Git', 'Sentry', 'New Relic'],
  Integrations: [
    'Stripe',
    'Razorpay',
    'Telr',
    'Cardknox',
    'Twilio',
    'SendGrid',
    'Brevo',
    'Firebase',
    'Google Maps',
  ],
  'AI Tools': ['Claude Code', 'Codex', 'Cursor', 'Lovable', 'Claude Co-work'],
  Delivery: [
    'Agile',
    'Scrum',
    'Kanban',
    'Jira',
    'Azure Boards',
    'Roadmaps',
    'Mentoring',
    'Stakeholders',
  ],
}

export const skillCategories = ['All', ...Object.keys(skillGroups)]

export const skillsFor = (category) =>
  category === 'All'
    ? Object.values(skillGroups).flat()
    : skillGroups[category]
