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
import summaryAgents from '../../my career data/summaries/Course 12_ Agents, RAG, langchain.pdf';
import summaryFoundationalNlp from '../../my career data/summaries/Course_8_Gen_AI_Foundational_Models_For_NLP_&_Language_Understanding.pdf';
import summaryGenerativeAi from '../../my career data/summaries/Course_7_Generative_AI_and_LLMs_Architecture_And_Data_Preparation.pdf';
import summaryIntroNlp from '../../my career data/summaries/Course 4_ Introduction To Neural Networks And PyTorch.pdf';
import summaryIntroDl from '../../my career data/summaries/Course_2_Introduction_To_Deep_Learning_&_Neural_Networks.pdf';
import summaryMachineLearning from '../../my career data/summaries/Course 1_ Machine Learning.pdf';
import summaryDataAnalysis from '../../my career data/summaries/IBM_ Data Analysis With Python.pdf';
import summaryPromptEngineering from '../../my career data/summaries/IBM Prompt Engineering.pdf';
import gpuImage1 from '../../my career data/summaries/the_GPU_1.png';
import gpuImage2 from '../../my career data/summaries/the_GPU_2.png';

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
  extraSrcs?: string[];
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
  { label: 'Stack', value: 'Python-first AI engineering' },
  { label: 'Scale', value: 'Production & operational systems' },
];

const experienceBlocks: ExperienceBlock[] = [
  {
    id: 'rag',
    kicker: 'Priority for AI roles',
    title: 'RAG & Vector DB Pipelines',
    summary:
      'End-to-end retrieval systems: embeddings, vector search, and grounded LLM answering.',
    bullets: [
      'Built full RAG pipelines — ingestion, embedding, vector search, and grounded generation.',
      'Worked with dense vector representations and semantic similarity at query time.',
      'Shipped a personal knowledge assistant with live semantic search and Q&A.',
    ],
  },
  {
    id: 'llm',
    kicker: 'Applied LLM engineering',
    title: 'LLM & NLP Systems',
    summary:
      'Hands-on with language models, retrieval integration, and production-oriented inference.',
    bullets: [
      'Built and deployed NLP architectures for real applied use cases.',
      'Integrated open-source LLMs into working inference pipelines.',
      'Worked across prompting, retrieval, and model serving infrastructure.',
    ],
  },
  {
    id: 'infra',
    kicker: 'Serving and deployment',
    title: 'Inference Infrastructure & GPU Optimization',
    summary:
      'Production deployment work around inference stability, concurrency, and local GPU constraints.',
    bullets: [
      'Deployed LLM inference using vLLM on local GPU hardware.',
      'Managed concurrent multi-model workloads under real memory pressure.',
      'Debugged CUDA OOM errors and tuned inference with Hugging Face and vLLM.',
      'Containerized AI services with Docker across Linux-based environments.',
    ],
  },
  {
    id: 'systems',
    kicker: 'Full pipeline ownership',
    title: 'End-to-End AI Systems',
    summary:
      'Full lifecycle ownership from data ingestion to production serving.',
    bullets: [
      'Owned complete AI system pipelines: data in, inference out, deployed.',
      'Built across ingestion, preprocessing, embedding, retrieval, and serving.',
      'Operated under real deployment constraints — not just notebook experiments.',
    ],
  },
  {
    id: 'training',
    kicker: 'Model work',
    title: 'Model Training, Fine-Tuning & Applied ML',
    summary:
      'Practical ML grounded in infrastructure — real models, real constraints.',
    bullets: [
      'Fine-tuned models for domain-specific tasks under GPU constraints.',
      'Completed IBM AI Engineering track: ML, deep learning, NLP, GenAI, and prompt engineering.',
      'Model work paired with deployment considerations — not isolated experiments.',
    ],
  },
  {
    id: 'python',
    kicker: 'Language foundation',
    title: 'Python Engineering',
    summary:
      'Python backed by both formal training and applied AI engineering across retrieval, ML, and backend systems.',
    bullets: [
      'Used Python across RAG pipelines, model integration, and AI backend systems.',
      'Completed formal Python training in a 1,500+ hour intensive technical program.',
      'Applied across real AI workflows — retrieval, inference, serving, and orchestration.',
    ],
  },
  {
    id: 'impact',
    kicker: 'Operational signal',
    title: 'Production Impact & Recognition',
    summary:
      'AI systems shipped at scale, formally recognized.',
    bullets: [
      'Built AI systems adopted at large operational scale within the IDF.',
      'Contributed to production tools used broadly across units.',
      'Received a formal commendation for engineering contribution and impact.',
    ],
  },
];

const experienceToolNotes: ExperienceToolNote[] = [
  {
    name: 'PyTorch',
    safe: 'Experience with Python-based deep learning workflows and AI model integration.',
    onlyIfTrue: 'Used for model training, fine-tuning, inference, and tensor-based deep learning workflows.',
  },
  {
    name: 'vLLM',
    safe: 'Experience with LLM inference infrastructure and GPU-based serving environments.',
    onlyIfTrue: 'Deployed LLM inference servers with vLLM; managed concurrent requests and GPU memory constraints.',
  },
  {
    name: 'Hugging Face',
    safe: 'Worked with open-source model ecosystems and transformer-based architectures.',
    onlyIfTrue: 'Used transformers and the model hub for loading, fine-tuning, and deploying open-source LLMs.',
  },
  {
    name: 'pandas',
    safe: 'Worked with Python for data handling, ML workflows, and AI pipeline development.',
    onlyIfTrue: 'Used for data manipulation, preprocessing, analysis, and dataset preparation in AI pipelines.',
  },
];

export const portfolioData = {
  profilePhoto,
  profilePoster,
  degreeSnapshot,
  name: 'Ori Zion',
  role: 'AI Engineer',
  availability: 'Open to AI internships, junior engineering roles, and strong technical collaborations',
  institution: 'The Open University of Israel',
  location: 'Israel',
  recordIssuedAt: '15 Apr 2026',
  studentId: '326593506',
  tagline:
    'RAG, retrieval, and production-minded AI systems.',
  biography:
    'CS and physics student building RAG systems and local LLM tooling during active service.',
  focusAreas: [
    'RAG',
    'Vector DBs',
    'LLM inference',
    'vLLM',
    'Systems',
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
      label: 'LinkedIn',
      value: 'linkedin.com/in/ori-zion-0387a4316',
      href: 'https://www.linkedin.com/in/ori-zion-0387a4316/',
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
      items: ['Python', 'JavaScript', 'Java', 'C'],
    },
    {
      title: 'AI',
      items: ['RAG', 'LLMs', 'PyTorch', 'Transformers'],
    },
    {
      title: 'Infra',
      items: ['vLLM', 'Docker', 'Linux', 'Hugging Face'],
    },
    {
      title: 'Systems',
      items: ['Vector DBs', 'REST APIs', 'CUDA', 'System Design'],
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
      id: 'course-summaries',
      chip: 'Summaries',
      title: 'Self-Written Course Summaries',
      shortTitle: 'Summaries',
      issuer: 'Self-written',
      period: '2025',
      status: 'Completed',
      summary: 'Comprehensive study notes covering machine learning, deep learning, PyTorch, generative AI, NLP, RAG, data analysis, prompt engineering, and GPU architecture.',
      highlights: [
        { label: 'PDFs', value: '8' },
        { label: 'GPU Notes', value: '2 pages' },
      ],
      details: [
        'Machine Learning, Deep Learning & Neural Networks, PyTorch, Generative AI & LLMs, Foundational Models for NLP, Agents & RAG, Data Analysis, Prompt Engineering',
        'GPU architecture and CUDA fundamentals notes',
        'All self-written during online course completion',
      ],
      assets: [
        {
          id: 'summary-ml',
          label: 'Machine Learning',
          kind: 'pdf',
          src: summaryMachineLearning,
          caption: 'Self-written course summary covering ML fundamentals.',
        },
        {
          id: 'summary-dl',
          label: 'Deep Learning & Neural Networks',
          kind: 'pdf',
          src: summaryIntroDl,
          caption: 'Self-written course summary on deep learning basics.',
        },
        {
          id: 'summary-nn-pytorch',
          label: 'Neural Networks & PyTorch',
          kind: 'pdf',
          src: summaryIntroNlp,
          caption: 'Self-written course summary on neural networks with PyTorch.',
        },
        {
          id: 'summary-gen-ai',
          label: 'Generative AI & LLMs',
          kind: 'pdf',
          src: summaryGenerativeAi,
          caption: 'Self-written course summary on generative AI and LLMs.',
        },
        {
          id: 'summary-foundational-nlp',
          label: 'Foundational Models for NLP',
          kind: 'pdf',
          src: summaryFoundationalNlp,
          caption: 'Self-written course summary on foundational NLP models.',
        },
        {
          id: 'summary-agents-rag',
          label: 'Agents, RAG & LangChain',
          kind: 'pdf',
          src: summaryAgents,
          caption: 'Self-written course summary on agents and RAG systems.',
        },
        {
          id: 'summary-data-analysis',
          label: 'Data Analysis with Python',
          kind: 'pdf',
          src: summaryDataAnalysis,
          caption: 'Self-written course summary on data analysis with Python.',
        },
        {
          id: 'summary-prompt-eng',
          label: 'Prompt Engineering',
          kind: 'pdf',
          src: summaryPromptEngineering,
          caption: 'Self-written course summary on prompt engineering.',
        },
        {
          id: 'gpu-notes',
          label: 'GPU Architecture Notes',
          kind: 'image',
          src: gpuImage1,
          extraSrcs: [gpuImage2],
          caption: 'Self-written GPU architecture and CUDA learning notes.',
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
    'RAG systems, vector databases, LLM inference, and deployment-grade GPU infrastructure — Python-first, production-minded.',
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
