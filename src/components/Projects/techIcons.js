import {
  FaArrowPointer,
  FaClock,
  FaCode,
  FaHeart,
  FaServer,
} from 'react-icons/fa6'
import {
  SiAmazons3,
  SiClaude,
  SiExpress,
  SiFastify,
  SiFlutter,
  SiLaravel,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiPwa,
  SiPython,
  SiReact,
  SiSupabase,
} from 'react-icons/si'

// logo + brand colour per technology; anything missing falls back to a code icon
const techIcons = {
  'Next.js': { Icon: SiNextdotjs, color: '#ffffff' },
  Supabase: { Icon: SiSupabase, color: '#3ecf8e' },
  Lovable: { Icon: FaHeart, color: '#ff6b8b' },
  'Claude Code': { Icon: SiClaude, color: '#d97757' },
  'Cron Jobs': { Icon: FaClock, color: '#ffd700' },
  Flutter: { Icon: SiFlutter, color: '#47c5fb' },
  Python: { Icon: SiPython, color: '#4b8bbe' },
  PostgreSQL: { Icon: SiPostgresql, color: '#6b9bd2' },
  MongoDB: { Icon: SiMongodb, color: '#47a248' },
  'Cursor AI': { Icon: FaArrowPointer, color: '#ffffff' },
  Laravel: { Icon: SiLaravel, color: '#ff2d20' },
  PWA: { Icon: SiPwa, color: '#a78bfa' },
  Fastify: { Icon: SiFastify, color: '#ffffff' },
  'Express.js': { Icon: SiExpress, color: '#ffffff' },
  React: { Icon: SiReact, color: '#61dafb' },
  Linode: { Icon: FaServer, color: '#00a95c' },
  'AWS S3': { Icon: SiAmazons3, color: '#e25444' },
}

export const iconFor = (tech) =>
  techIcons[tech] || { Icon: FaCode, color: '#00ff7f' }
