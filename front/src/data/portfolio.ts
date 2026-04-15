import degreeSnapshot from '../../my career data/degree data.png';
import profilePhoto from '../../my career data/profile-picture.jpeg';

export type ProfileFact = {
  label: string;
  value: string;
};

export type ChatMessage = {
  id: number;
  sender: 'assistant' | 'user';
  text: string;
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

export const portfolioData = {
  profilePhoto,
  degreeSnapshot,
  name: 'Ori Zion',
  role: 'Computer science student with a math-heavy academic track',
  availability: 'Open to internships, junior roles, and portfolio collaborations',
  institution: 'The Open University of Israel',
  location: 'Israel',
  recordIssuedAt: '15 Apr 2026',
  studentId: '326593506',
  tagline:
    'A black-and-white academic portfolio designed around clarity, structure, and future AI interaction.',
  biography:
    'This page turns your academic record into a portfolio surface: concise profile context on the left, a central assistant space in the middle, and verified coursework with results on the right.',
  profileFacts: [
    {
      label: 'Completed credits',
      value: `${completedCredits}`,
    },
    {
      label: 'Weighted average',
      value: `${weightedAverage}`,
    },
    {
      label: 'Highest score',
      value: '95',
    },
    {
      label: 'Active courses',
      value: `${courseRecords.filter((course) => course.status === 'Enrolled').length}`,
    },
  ] satisfies ProfileFact[],
  focusAreas: [
    'Systems programming',
    'Statistics for computer science',
    'Discrete mathematics',
    'Calculus',
    'Linear algebra',
  ],
  chatMessages: [
    {
      id: 1,
      sender: 'assistant',
      text: 'Hi, I am the portfolio chatbot. Start with one of the questions below.',
    },
  ] satisfies ChatMessage[],
  promptSuggestions: [
    'Who is Ori Zion?',
    'What are his strongest grades?',
    'What is he studying?',
    'Summarize his academic profile',
  ],
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
