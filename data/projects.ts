
import { Project } from '../types';
import { storage } from '../services/storage';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Ducati',
    category: 'Automobile',
    year: '2025',
    image: storage.getImage('DUCATI_COLLAGE'),
    video: storage.getVideo('DUCATI_VIDEO'),
    description: 'Ducati is not just a motorcycle brand,  it is a symbol of speed, design, and prestige. A’raf contributed to amplifying Ducati’s presence through content strategies that aligned with its global legacy of performance, innovation, and luxury.',
    technologies: ['HMI Design', 'Telemetry Visualization', 'UI/UX Engineering'],
    client: 'Ducati'
  },
  {
    id: 2,
    title: 'Dizzy Duck',
    category: 'Women Athleisure',
    year: '2025',
    image: storage.getImage('DIZZY_DUCK_COLLAGE'),
    video: storage.getVideo('DIZZY_DUCK_VIDEO'),
    description: 'DizzyDuck is playful, bold, and culturally sharp. We helped the brand bring its personality to life across digital channels  creating content, visuals, and storytelling that connected with younger audiences while maintaining a polished, brand-first identity.',
    technologies: ['Art Direction', 'Digital Strategy', 'Fashion Marketing'],
    client: 'Dizzy Duck'
  },
  {
    id: 3,
    title: 'IVYN',
    category: "Men's Apparel",
    year: '2025',
    image: storage.getImage('IVYN_COLLAGE'),
    video: storage.getVideo('IVYN_VIDEO'),
    description: 'IVYN represents the new-age luxuryMen’s fashion brand  that is  modern and aspirational. A’raf worked to shape IVYN’s digital and brand presence, helping it communicate elegance, confidence, and relevance across platforms while building a visual identity that matched its premium positioning.',
    technologies: ['Brand Identity', 'Web Experience', 'Visual Narrative'],
    client: 'IVYN'
  },
  {
    id: 4,
    title: 'Akshay Kala',
    category: 'Fashion',
    year: '2023',
    image: storage.getImage('AKSHAY_KALA_COLLAGE'),
    video: storage.getVideo('AKSHAY_KALA_VIDEO'),
    description: 'Akshay Kala is a name associated with credibility, leadership, and expertise. A’raf supported his personal brand through strategic PR, digital positioning, and storytelling ensuring his voice carried authority, consistency, and influence across both media and digital platforms.',
    technologies: ['Creative Direction', 'E-commerce Design', 'Photography'],
    client: 'Akshay Kala'
  },
];
