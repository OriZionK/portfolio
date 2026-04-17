import armyFinalScore from '../../my career data/army-course/final-score.jpg';
import armyProgramOverview from '../../my career data/army-course/program-overview.jpg';
import bagrutCertificate from '../../my career data/bagrut/bagrut-certificate-1.png';
import bagrutCertificatePageTwo from '../../my career data/bagrut/bagrut-certificate-2.png';
import degreeSnapshot from '../../my career data/degree/degree-record.png';
import ibmGenerativeAi from '../../my career data/ibm/generative-ai-and-llms-1.png';
import ibmIntroDl from '../../my career data/ibm/introduction-to-deep-learning-1.png';
import ibmMachineLearning from '../../my career data/ibm/machine-learning-with-python-1.png';
import ibmNlp from '../../my career data/ibm/nlp-and-language-understanding-1.png';
import ibmPromptEngineering from '../../my career data/ibm/prompt-engineering-1.png';
import profilePoster from '../../my career data/profile/portrait-alt.png';
import profilePhoto from '../../my career data/profile/profile-picture.jpeg';

export type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ChatMessage = {
  id: number;
  sender: 'assistant' | 'user';
  text: string;
};

export type CredentialHighlight = {
  label: string;
  value: string;
};

export type CredentialAsset = {
  id: string;
  label: string;
  kind: 'image' | 'pdf';
  src: string;
  alt?: string;
  caption: string;
};

export type CredentialRecord = {
  id: string;
  chip: string;
  title: string;
  shortTitle: string;
  issuer: string;
  period: string;
  status: string;
  summary: string;
  highlights: CredentialHighlight[];
  details: string[];
  assets: CredentialAsset[];
};

export type CourseRecord = {
  code: string;
  semester: string;
  title: string;
  originalTitle: string;
  finalScore?: number;
  examScore?: number;
  credits?: number;
  status: 'Passed' | 'Enrolled';
};

export type ExperienceSignal = {
  label: string;
  value: string;
};

export type ExperienceBlock = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  bullets: string[];
};

export type ExperienceToolNote = {
  name: string;
  safe: string;
  onlyIfTrue: string;
};

const courseRecords: CourseRecord[] = [
  {
    code: '20465',
    semester: '2026B',
    title: 'Systems Programming Lab',
    originalTitle: 'מעבדה בתכנות מערכות',
    status: 'Enrolled',
  },
  {
    code: '20215',
    semester: '2026B',
    title: 'Mechanics',
    originalTitle: 'מכניקה',
    status: 'Enrolled',
  },
  {
    code: '20280',
    semester: '2026A',
    title: 'Differential Equations I',
    originalTitle: 'משוואות דיפרנציאליות רגילות 1',
    finalScore: 91,
    examScore: 91,
    credits: 4,
    status: 'Passed',
  },
  {
    code: '20423',
    semester: '2026A',
    title: 'Calculus B',
    originalTitle: 'חשבון דיפרנציאלי ואינטגרלי ב',
    finalScore: 95,
    examScore: 95,
    credits: 5,
    status: 'Passed',
  },
  {
    code: '20425',
    semester: '2025B',
    title: 'Probability and Intro to Statistics for CS',
    originalTitle: 'הסתברות ומבוא לסטטיסטיקה למדעי המחשב',
    finalScore: 92,
    examScore: 92,
    credits: 5,
    status: 'Passed',
  },
  {
    code: '20475',
    semester: '2025B',
    title: 'Infinitesimal Calculus II',
    originalTitle: 'חשבון אינפיניטסימלי 2',
    finalScore: 76,
    examScore: 73,
    credits: 7,
    status: 'Passed',
  },
  {
    code: '20474',
    semester: '2025A',
    title: 'Infinitesimal Calculus I',
    originalTitle: 'חשבון אינפיניטסימלי 1',
    finalScore: 78,
    examScore: 73,
    credits: 7,
    status: 'Passed',
  },
  {
    code: '20109',
    semester: '2025A',
    title: 'Linear Algebra I',
    originalTitle: 'אלגברה לינארית 1',
    finalScore: 67,
    examScore: 60,
    credits: 7,
    status: 'Passed',
  },
  {
    code: '20476',
    semester: '2024B',
    title: 'Discrete Mathematics',
    originalTitle: 'מתמטיקה בדידה',
    finalScore: 94,
    examScore: 93,
    credits: 4,
    status: 'Passed',
  },
];

const completedCourses = courseRecords.filter((course) => course.status === 'Passed');
const completedCredits = completedCourses.reduce(
  (sum, course) => sum + (course.credits ?? 0),
  0,
);
const weightedAverage = (
  completedCourses.reduce(
    (sum, course) => sum + (course.finalScore ?? 0) * (course.credits ?? 0),
    0,
  ) / completedCredits
).toFixed(1);

const experienceSignals: ExperienceSignal[] = [
  { label: 'Focus', value: 'RAG + vector DB systems' },
  { label: 'Infra', value: 'vLLM, Docker, Linux, GPU serving' },
  { label: 'Core lang', value: 'Python-first AI engineering' },
  { label: 'Profile', value: 'Resume-safe and source-backed' },
];

const experienceBlocks: ExperienceBlock[] = [
  {
    id: 'rag',
    kicker: 'Priority for AI roles',
    title: 'RAG, Semantic Retrieval, and Vector DB Pipelines',
    summary:
      'Strongest positioning for AI-facing roles: retrieval pipelines that connect embeddings, vector search, and grounded answering.',
    bullets: [
      'Built RAG systems for semantic retrieval and question answering.',
      'Worked with dense embeddings, vector databases, semantic search, and grounded response generation.',
      'Designed retrieval pipelines that connect embeddings, search, and LLM-based answering.',
      'Built a personal knowledge RAG system for semantic search and Q&A over structured knowledge.',
    ],
  },
  {
    id: 'llm',
    kicker: 'Applied LLM engineering',
    title: 'LLM and NLP Systems',
    summary:
      'Hands-on AI engineering work centered on language models, retrieval, and production-oriented serving.',
    bullets: [
      'Hands-on experience with LLM inference pipelines.',
      'Built and deployed NLP architectures for applied use cases.',
      'Integrated open-source language models into working systems.',
      'Worked on applied AI engineering problems involving language models, retrieval, and serving infrastructure.',
    ],
  },
  {
    id: 'infra',
    kicker: 'Serving and deployment',
    title: 'Inference Infrastructure, Deployment, and GPU Optimization',
    summary:
      'Production-minded deployment work around inference stability, concurrency, and local GPU constraints.',
    bullets: [
      'Deployed LLM inference pipelines using vLLM.',
      'Worked on scalable inference infrastructure and production-ready serving environments for AI models.',
      'Supported concurrent multi-model workloads on local GPU systems.',
      'Resolved GPU out-of-memory issues and worked on CUDA memory optimization, model sharding, and inference tuning with Hugging Face and vLLM.',
      'Worked in Linux-based environments and containerized services with Docker.',
    ],
  },
  {
    id: 'systems',
    kicker: 'Full pipeline ownership',
    title: 'End-to-End AI Systems',
    summary:
      'Experience spans the full lifecycle from ingestion and preprocessing to retrieval, inference, and operational serving.',
    bullets: [
      'Experience designing and deploying end-to-end AI systems in real operational environments.',
      'Built systems spanning data ingestion, preprocessing, embedding generation, retrieval, inference, and serving.',
      'Worked on production-grade AI infrastructure under real deployment constraints.',
      'Combined system design, implementation, optimization, and integration in practical environments.',
    ],
  },
  {
    id: 'training',
    kicker: 'Model work',
    title: 'Model Training, Fine-Tuning, and Applied ML',
    summary:
      'Practical ML background paired with infrastructure considerations rather than isolated notebook work.',
    bullets: [
      'Experience fine-tuning and training models for domain-specific tasks.',
      'Worked under resource constraints and combined practical model work with infrastructure and deployment considerations.',
      'Completed structured study in Machine Learning with Python, Deep Learning basics, Generative AI foundations, LLM architecture, data preparation, and prompt engineering.',
    ],
  },
  {
    id: 'python',
    kicker: 'Language foundation',
    title: 'Python Engineering',
    summary:
      'Python is backed by both formal training and applied AI engineering work across retrieval, ML, and backend-oriented systems.',
    bullets: [
      'Completed formal Python training as part of an intensive technical program.',
      'Strong programming foundations supported by coursework in algorithms, data structures, object-oriented programming, backend systems, and software engineering workflows.',
      'Used Python in practical AI workflows involving retrieval pipelines, model integration, semantic search systems, inference infrastructure, and end-to-end AI system orchestration.',
      'Python experience is not just academic; it is tied to real deployment and engineering work.',
    ],
  },
  {
    id: 'impact',
    kicker: 'Operational signal',
    title: 'Production Impact and Recognition',
    summary:
      'Resume-safe impact framing for large operational environments and formal recognition.',
    bullets: [
      'Built AI systems adopted at large operational scale.',
      'Contributed to production AI tools used broadly across units.',
      'Work contributed to major cost savings at scale.',
      'Received formal recognition for contribution to AI systems development.',
    ],
  },
];

const experienceToolNotes: ExperienceToolNote[] = [
  {
    name: 'PyTorch',
    safe: 'Experience with Python-based deep learning workflows and AI model integration.',
    onlyIfTrue: 'Worked with PyTorch for model training, fine-tuning, inference, and tensor-based workflows.',
  },
  {
    name: 'pandas',
    safe: 'Worked with Python for data handling, ML workflows, and AI pipeline development.',
    onlyIfTrue: 'Used pandas for data manipulation, preprocessing, analysis, and dataset preparation.',
  },
  {
    name: 'Tensors',
    safe: 'Studied deep learning and worked on AI systems involving training, fine-tuning, and model inference.',
    onlyIfTrue: 'Worked with tensor-based operations in deep learning workflows.',
  },
  {
    name: 'Flask',
    safe: 'Backend and API development experience as part of fullstack and AI systems work.',
    onlyIfTrue: 'Built backend services and AI APIs with Flask.',
  },
];

export const portfolioData = {
  profilePhoto,
  profilePoster,
  degreeSnapshot,
  name: 'Ori Zion',
  role: 'AI Engineer',
  availability: 'Open to internships, junior roles, and portfolio collaborations',
  institution: 'The Open University of Israel',
  location: 'Israel',
  recordIssuedAt: '15 Apr 2026',
  studentId: '326593506',
  tagline:
    'AI systems builder with a strong math-heavy CS foundation and a bias toward practical engineering.',
  biography:
    'Computer science and physics student focused on RAG systems, LLM tooling, and production-minded machine learning while completing a degree during active military service.',
  focusAreas: [
    'Systems programming',
    'Statistics for computer science',
    'Discrete mathematics',
    'Calculus',
    'Linear algebra',
  ],
  contactItems: [
    {
      label: 'Location',
      value: 'Israel',
    },
    {
      label: 'Phone',
      value: '+972-58-607-0060',
      href: 'tel:+972586070060',
    },
    {
      label: 'Email',
      value: 'orizionk@gmail.com',
      href: 'mailto:orizionk@gmail.com',
    },
    {
      label: 'GitHub',
      value: 'github.com/OriZionK',
      href: 'https://github.com/OriZionK',
    },
    {
      label: 'Website',
      value: 'orizion.dev',
      href: 'https://orizion.dev',
    },
  ] satisfies ContactItem[],
  education: {
    degree: 'B.Sc. CS & Physics',
    institution: 'Open University of Israel',
    note: 'Pursuing degree during full-time active service',
  },
  skillGroups: [
    {
      title: 'Languages',
      items: ['Python (primary)', 'JavaScript', 'Java | C'],
    },
    {
      title: 'AI / ML',
      items: ['NLPs', 'RAG Architectures', 'LLMs', 'PyTorch', 'Transformers', 'Model Fine-tuning'],
    },
    {
      title: 'Tools & Infra',
      items: ['vLLM', 'Docker', 'CUDA / GPU Opt.', 'Hugging Face', 'Linux | Git'],
    },
    {
      title: 'Other',
      items: ['Vector Databases', 'REST APIs', 'System Design', 'GPU Memory Opt.'],
    },
  ] satisfies SkillGroup[],
  chatMessages: [] satisfies ChatMessage[],
  promptSuggestions: [
    'Who is Ori Zion?',
    'What are his strongest grades?',
    'What is he studying?',
    'Summarize his academic profile',
  ],
  credentials: [
    {
      id: 'degree',
      chip: 'Degree',
      title: 'B.Sc. in Computer Science and Physics',
      shortTitle: 'Degree',
      issuer: 'The Open University of Israel',
      period: 'Ongoing',
      status: 'In progress',
      summary:
        'The degree is being completed during full-time military service, including periods of basic training and wartime service.',
      highlights: [
        { label: 'Credits', value: `${completedCredits}` },
        { label: 'Average', value: `${weightedAverage}` },
        { label: 'Top grade', value: '95' },
        {
          label: 'Active',
          value: `${courseRecords.filter((course) => course.status === 'Enrolled').length} courses`,
        },
      ],
      details: [
        'Strongest completed courses include Calculus B (95), Discrete Mathematics (94), Probability and Statistics (92), and Differential Equations I (91).',
        'Current enrolled courses are Systems Programming Lab and Mechanics.',
        'The degree started during military service and reflects consistent academic progress under a demanding schedule.',
      ],
      assets: [
        {
          id: 'degree-record',
          label: 'Academic record snapshot',
          kind: 'image',
          src: degreeSnapshot,
          alt: 'Imported university degree record snapshot',
          caption: 'Imported from the academic record image stored in the project.',
        },
      ],
    },
    {
      id: 'ibm-certificate',
      chip: 'Certificate',
      title: 'IBM AI Engineering Professional Certificate',
      shortTitle: 'IBM Cert',
      issuer: 'IBM',
      period: '2024',
      status: 'Completed',
      summary:
        'Structured AI coursework covering machine learning, deep learning, NLP foundations, generative AI, and prompt engineering.',
      highlights: [
        { label: 'Issuer', value: 'IBM' },
        { label: 'Track', value: 'AI Engineering' },
        { label: 'Topics', value: 'ML + GenAI' },
        { label: 'Year', value: '2024' },
      ],
      details: [
        'Included Machine Learning with Python and deep learning fundamentals.',
        'Covered generative AI foundational models for NLP and language understanding.',
        'Included LLM architecture, data preparation, and prompt engineering basics.',
      ],
      assets: [
        {
          id: 'ibm-ml',
          label: 'Machine Learning with Python',
          kind: 'image',
          src: ibmMachineLearning,
          caption: 'IBM certificate file for the machine learning course in the certificate track.',
        },
        {
          id: 'ibm-dl',
          label: 'Introduction to Deep Learning',
          kind: 'image',
          src: ibmIntroDl,
          caption: 'IBM certificate file covering deep learning fundamentals.',
        },
        {
          id: 'ibm-genai',
          label: 'Generative AI and LLMs',
          kind: 'image',
          src: ibmGenerativeAi,
          caption: 'IBM certificate file focused on generative AI, LLMs, and foundational model concepts.',
        },
        {
          id: 'ibm-nlp',
          label: 'NLP and Language Understanding',
          kind: 'image',
          src: ibmNlp,
          caption: 'IBM certificate file for NLP and language understanding studies.',
        },
        {
          id: 'ibm-prompt',
          label: 'Prompt Engineering',
          kind: 'image',
          src: ibmPromptEngineering,
          caption: 'IBM certificate file for prompt engineering fundamentals.',
        },
      ],
    },
    {
      id: 'bagrut',
      chip: 'School Record',
      title: 'Bagrut',
      shortTitle: 'Bagrut',
      issuer: 'Yeshiva high school',
      period: '2019-2023',
      status: 'Completed',
      summary:
        'High school record with strong results in math, physics, and computer science, establishing the early academic baseline.',
      highlights: [
        { label: 'Average', value: '114' },
        { label: 'Points', value: '43' },
        { label: 'Math', value: '95 / 5 units' },
        { label: 'CS project', value: '100 / 5 units' },
      ],
      details: [
        'Physics was completed at 5 units with a grade of 93.',
        'Computer science was completed at 5 units with a grade of 90.',
        'The additional computer science project involved building a Java application with Firebase.',
      ],
      assets: [
        {
          id: 'bagrut-certificate',
          label: 'Bagrut certificate 1',
          kind: 'image',
          src: bagrutCertificate,
          caption: 'First uploaded page of the bagrut certification document from the career data folder.',
        },
        {
          id: 'bagrut-certificate-page-two',
          label: 'Bagrut certificate 2',
          kind: 'image',
          src: bagrutCertificatePageTwo,
          caption: 'Second uploaded page of the bagrut certification document from the career data folder.',
        },
      ],
    },
    {
      id: 'army-course',
      chip: 'Army Course',
      title: 'IDF Technical Fullstack Training Program',
      shortTitle: 'Army Course',
      issuer: 'IDF Air Force / Intelligence ecosystem',
      period: '06 Feb 2024 - 31 Dec 2024',
      status: 'Completed with distinction',
      summary:
        'An intensive military technical program focused on fullstack engineering, databases, algorithms, and production-oriented development.',
      highlights: [
        { label: 'Hours', value: '1511' },
        { label: 'Outcome', value: 'Distinction' },
        { label: 'Final project', value: '100' },
        { label: 'Cert exam', value: '99' },
      ],
      details: [
        'Covered fullstack client, fullstack server, UI, SQL databases, MongoDB, Node.js, Python, PHP, Git, and information security.',
        'The 400-hour extended final project Appsflyer Demo Extension received a grade of 100.',
        'A documented Algorithms and Programming certification exam in Java and C# was completed on 16/09/2024 with a grade of 99.',
      ],
      assets: [
        {
          id: 'army-program-overview',
          label: 'Program overview',
          kind: 'image',
          src: armyProgramOverview,
          alt: 'Army course program overview document',
          caption: 'Uploaded overview image summarizing the technical program content and structure.',
        },
        {
          id: 'army-final-score',
          label: 'Final score sheet',
          kind: 'image',
          src: armyFinalScore,
          alt: 'Army course final score image',
          caption: 'Uploaded score image showing the final results from the army technical course.',
        },
      ],
    },
  ] satisfies CredentialRecord[],
  experienceSignals,
  experienceSummary:
    'AI engineering profile centered on RAG systems, vector databases, retrieval pipelines, LLM inference, and deployment-grade GPU infrastructure, with Python as the core implementation language.',
  experienceBlocks,
  experienceToolNotes,
  records: courseRecords,
  documents: [
    {
      title: 'Official student status and grades record',
      issuedAt: '15 Apr 2026',
      description:
        'Imported from the document placed in "my career data" and used as the source for the academic sidebar.',
      image: degreeSnapshot,
    },
  ],
};
