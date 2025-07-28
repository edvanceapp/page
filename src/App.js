import React, { useState, useEffect, useRef } from 'react';
import { FileText, Settings, BarChart2, BookOpen, MessageSquare, User, Shield, Clock, Flag, Type, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, CheckSquare, Mic, Mail, Upload, Download, Calendar, Video, ArrowRight, X, Menu } from 'lucide-react';

// Mock Data
const mockExams = [
  { id: 1, title: 'HSC English Advanced - Paper 1', status: 'Active', submissions: 25, totalStudents: 30 },
  { id: 2, title: 'HSC Mathematics Standard 2 - Trial', status: 'Marking', submissions: 28, totalStudents: 28 },
  { id: 3, title: 'Year 11 Physics - End of Term', status: 'Draft', submissions: 0, totalStudents: 22 },
  { id: 4, title: 'HSC Chemistry - Module 5 Quiz', status: 'Marked', submissions: 32, totalStudents: 32 },
];

const mockQuestions = [
  { id: 1, type: 'Multiple Choice', content: 'Which of the following is a key theme in T.S. Eliot\'s "The Love Song of J. Alfred Prufrock"?' },
  { id: 2, type: 'Extended Response', content: 'Analyse how the novel "Nineteen Eighty-Four" explores the dangers of totalitarianism. (1000 words)' },
  { id: 3, type: 'Stimulus Based', content: 'Referencing the provided image, discuss the use of visual language to convey meaning.' },
];

const mockStudentSubmission = {
  student: { name: 'Alex Doe', id: 'S12345' },
  answers: [
    { questionId: 1, answer: 'C) Alienation and paralysis.' },
    { questionId: 2, answer: 'George Orwell\'s "Nineteen Eighty-Four" serves as a profound warning against the perils of totalitarian regimes. The novel meticulously constructs a dystopian society where the Party, led by the enigmatic Big Brother, exerts absolute control over every aspect of human life. This is primarily achieved through three key mechanisms: pervasive surveillance, the manipulation of language and history, and psychological control...' },
    { questionId: 3, answer: 'The stimulus image employs a stark contrast between light and shadow to create a somber mood...' }
  ],
  flags: [2],
};

const mockRubric = [
    { criteria: 'Understanding of Text', maxMark: 5, score: 4, comment: 'Good grasp of the core concepts.' },
    { criteria: 'Analysis of Techniques', maxMark: 10, score: 8, comment: 'Strong analysis, but could explore more examples.' },
    { criteria: 'Structure and Expression', maxMark: 5, score: 4, comment: 'Well-structured response.' },
];

const mockMarkbookData = [
    { studentId: 'S12345', name: 'Alex Doe', examId: 2, score: '16/20', status: 'Marked' },
    { studentId: 'S67890', name: 'Jane Smith', examId: 2, score: 'Pending', status: 'Submitted' },
    { studentId: 'S11223', name: 'Peter Jones', examId: 2, score: '19/20', status: 'Marked' },
];

const mockTutorials = [
    { title: 'Mastering the Exam Builder', type: 'video' },
    { title: 'Effective Feedback Strategies', type: 'guide' },
    { title: 'Using the Markbook Efficiently', type: 'video' },
    { title: 'Advanced Question Types', type: 'guide' },
];

// Helper Components
const Icon = ({ name, className }) => {
    const icons = {
        FileText, Settings, BarChart2, BookOpen, MessageSquare, User, Shield, Clock, Flag, Type, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, CheckSquare, Mic, Mail, Upload, Download, Calendar, Video, ArrowRight, X, Menu
    };
    const LucideIcon = icons[name];
    return LucideIcon ? <LucideIcon className={`${className || "w-5 h-5"} flex items-center justify-center`} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} /> : null;
};

const Card = ({ children, className }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
        {children}
    </div>
);

// Main Components
const Sidebar = ({ user, setPage, isSidebarOpen, setSidebarOpen }) => {
    const menuItems = {
        Teacher: [
            { icon: 'FileText', label: 'Exam Builder', page: 'ExamBuilder' },
            { icon: 'CheckSquare', label: 'Marking Workspace', page: 'MarkingWorkspace' },
            { icon: 'BarChart2', label: 'Markbook', page: 'Markbook' },
            { icon: 'BookOpen', label: 'PL Hub', page: 'PLHub' },
        ],
        Admin: [
            { icon: 'Shield', label: 'Role Management', page: 'AdminPanel' },
            { icon: 'MessageSquare', label: 'Chat Transcripts', page: 'ChatTranscripts' },
        ],
        Student: [
            { icon: 'FileText', label: 'Take Exam', page: 'StudentExamView' },
            { icon: 'BookOpen', label: 'Practice Exams', page: 'PracticeExams' },
        ]
    };

    const commonItems = [
        { icon: 'MessageSquare', label: 'Live Chat', action: () => alert('Live Chat opened!') }
    ];

    const items = menuItems[user.role] || [];

    return (
        <div className={`fixed top-0 left-0 h-full bg-slate-800 text-white transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-64 z-30 flex flex-col`}>
            <div className="p-6 flex items-center justify-between border-b border-slate-700">
                <h1 className="text-2xl font-bold text-white">Edvance</h1>
                <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white">
                    <Icon name="X" />
                </button>
            </div>
            <nav className="flex-grow p-4">
                <ul>
                    {items.map(item => (
                        <li key={item.label} className="mb-2">
                            <a href="#" onClick={() => setPage(item.page)} className="flex items-center p-3 rounded-lg hover:bg-slate-700 transition-colors">
                                <Icon name={item.icon} className="w-5 h-5 mr-3" />
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-slate-700">
                 <ul>
                    {commonItems.map(item => (
                        <li key={item.label} className="mb-2">
                            <a href="#" onClick={item.action} className="flex items-center p-3 rounded-lg hover:bg-slate-700 transition-colors">
                                <Icon name={item.icon} className="w-5 h-5 mr-3" />
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mt-4">
                    <div className="flex items-center p-3 bg-slate-700 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold mr-3">{user.name.charAt(0)}</div>
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-slate-400">{user.role}</p>
                        </div>
                    </div>
                     <button onClick={() => setPage('Login')} className="w-full mt-4 text-left flex items-center p-3 rounded-lg hover:bg-slate-700 transition-colors">
                        <Icon name="ChevronLeft" className="w-5 h-5 mr-3" />
                        <span>Switch Role</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const TeacherDashboard = ({ setPage }) => (
    <div>
        <h2 className="text-3xl font-bold mb-6">Teacher Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-blue-500 text-white">
                <h3 className="text-2xl font-bold">Welcome back!</h3>
                <p className="mt-2">Ready to empower your students? Create a new exam or continue marking.</p>
                <button onClick={() => setPage('ExamBuilder')} className="mt-4 bg-white text-blue-500 font-bold py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors">
                    Create New Exam
                </button>
            </Card>
            <Card className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Active Exams</h3>
                <div className="space-y-4">
                    {mockExams.map(exam => (
                        <div key={exam.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                                <p className="font-semibold">{exam.title}</p>
                                <p className="text-sm text-slate-500">{exam.status}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{exam.submissions}/{exam.totalStudents}</p>
                                <p className="text-sm text-slate-500">Submissions</p>
                            </div>
                            <button onClick={() => setPage(exam.status === 'Marking' || exam.status === 'Marked' ? 'MarkingWorkspace' : 'ExamBuilder')} className="text-blue-500 hover:underline">
                                <Icon name="ArrowRight" />
                            </button>
                        </div>
                    ))}
                </div>
            </Card>
            <Card>
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                    <button onClick={() => setPage('MarkingWorkspace')} className="w-full text-left p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">Continue Marking</button>
                    <button onClick={() => setPage('Markbook')} className="w-full text-left p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">View Markbook</button>
                    <button onClick={() => setPage('PLHub')} className="w-full text-left p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">Access PL Hub</button>
                </div>
            </Card>
        </div>
    </div>
);

const ExamBuilder = ({ setPage }) => {
    const [questions, setQuestions] = useState(mockQuestions);
    const [examTitle, setExamTitle] = useState("New HSC Trial Exam");

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Exam Builder</h2>
                <button onClick={() => alert('Exam Published!')} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    Publish to Students
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <input 
                            type="text" 
                            value={examTitle} 
                            onChange={(e) => setExamTitle(e.target.value)}
                            className="text-2xl font-bold w-full p-2 border-b-2 border-slate-200 focus:border-blue-500 outline-none mb-6"
                        />
                        <div className="space-y-4">
                            <p className="text-sm text-slate-500 mb-4">Drag & drop question cards to build your exam.</p>
                            {questions.map((q, index) => (
                                <div key={q.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50 cursor-grab active:cursor-grabbing">
                                    <h4 className="font-bold">{`Question ${index + 1}: ${q.type}`}</h4>
                                    <p className="mt-2 text-slate-700">{q.content}</p>
                                </div>
                            ))}
                        </div>
                        <button className="mt-6 w-full text-center p-3 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors">
                            + Add New Question Card
                        </button>
                    </Card>
                </div>
                <div>
                    <Card>
                        <h3 className="text-xl font-bold mb-4 flex items-center"><Icon name="Settings" className="mr-2"/>Exam Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="font-semibold block mb-1">Timer</label>
                                <input type="text" defaultValue="2 hours 10 mins" className="w-full p-2 border border-slate-300 rounded-lg"/>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">Flag Question Toggle</span>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                             <div className="flex items-center justify-between">
                                <span className="font-semibold">Word Count</span>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">Zoom Controls</span>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                             <div className="flex items-center justify-between">
                                <span className="font-semibold">Lockdown Browser</span>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const StudentExamView = ({ setPage }) => {
    const [fontSize, setFontSize] = useState(16);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [isFlagged, setIsFlagged] = useState(false);

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col">
            {/* Fixed Header */}
            <header className="sticky top-0 bg-white shadow-md z-10 p-3 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <h3 className="font-bold text-lg hidden sm:block">HSC English Extension 1 Sample</h3>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1 rounded-lg">
                        <Icon name="Clock" className="text-red-500"/>
                        <span className="font-mono font-bold text-red-500">01:58:32</span>
                    </div>
                    <button onClick={() => setIsFlagged(!isFlagged)} className={`p-2 rounded-lg ${isFlagged ? 'bg-yellow-400 text-white' : 'bg-slate-200'}`}>
                        <Icon name="Flag" />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-200 hidden sm:block"><Icon name="Type" /></button>
                    <button onClick={() => setFontSize(fz => fz + 1)} className="p-2 rounded-lg bg-slate-200 hidden sm:block"><Icon name="ZoomIn" /></button>
                    <button onClick={() => setFontSize(fz => Math.max(12, fz - 1))} className="p-2 rounded-lg bg-slate-200 hidden sm:block"><Icon name="ZoomOut" /></button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-4 sm:p-8" style={{ fontSize: `${fontSize}px` }}>
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4" style={{ fontSize: `${fontSize * 1.5}px` }}>
                        Question {currentQuestion} - Literary Worlds (25 marks)
                    </h2>
                    <p className="mb-6 text-slate-600">
                        Compare how the authors have created texts that invite readers to question the role of the individual in the world. In your response, refer closely to both extracts.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="border p-4 rounded-lg bg-slate-50">
                            <h4 className="font-bold mb-2">Text 1: Film extract</h4>
                            <div className="aspect-video bg-black text-white flex items-center justify-center rounded">
                                <p>(Video player placeholder)</p>
                            </div>
                        </div>
                        <div className="border p-4 rounded-lg bg-slate-50">
                            <h4 className="font-bold mb-2">Text 2: Fiction extract</h4>
                            <p className="italic">"Now the rumbling of the great organ swelled to a roar, pressing, like a rising giant, against the vaulted ceiling, to burst through it..."</p>
                        </div>
                    </div>

                    <textarea
                        className="w-full h-96 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Type your response here..."
                        style={{ fontSize: `${fontSize}px` }}
                    ></textarea>
                     <div className="text-right mt-2 text-slate-500 font-mono">
                        0/1000 words
                    </div>
                </div>
            </main>

            {/* Fixed Footer */}
            <footer className="sticky bottom-0 bg-white shadow-top p-3 flex justify-between items-center">
                <button className="flex items-center font-bold py-2 px-4 rounded-lg bg-slate-200 hover:bg-slate-300">
                    <Icon name="ChevronLeft" className="mr-2"/> Previous
                </button>
                <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4].map(q => (
                        <button key={q} onClick={() => setCurrentQuestion(q)} className={`w-8 h-8 rounded-full font-bold ${currentQuestion === q ? 'bg-blue-500 text-white' : 'bg-slate-200'} ${isFlagged && q === 2 ? 'ring-2 ring-yellow-400' : ''}`}>
                            {q}
                        </button>
                    ))}
                </div>
                <button className="flex items-center font-bold py-2 px-4 rounded-lg bg-slate-200 hover:bg-slate-300">
                    Next <Icon name="ChevronRight" className="ml-2"/>
                </button>
            </footer>
        </div>
    );
};

const MarkingWorkspace = ({ setPage }) => (
    <div>
        <h2 className="text-3xl font-bold mb-6">Marking Workspace</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Student List */}
            <div className="lg:col-span-3">
                <Card>
                    <h3 className="text-xl font-bold mb-4">Submissions</h3>
                    <div className="space-y-2">
                        <div className="p-3 bg-blue-100 border-l-4 border-blue-500 rounded-r-lg">
                            <p className="font-bold">{mockStudentSubmission.student.name}</p>
                            <p className="text-sm text-slate-600">Status: In Progress</p>
                        </div>
                        {mockMarkbookData.filter(s => s.studentId !== mockStudentSubmission.student.id).map(s => (
                             <div key={s.studentId} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                                <p className="font-semibold">{s.name}</p>
                                <p className="text-sm text-slate-500">Status: {s.status}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Grading Canvas */}
            <div className="lg:col-span-6">
                <Card>
                    <h3 className="text-xl font-bold mb-4">Grading: {mockStudentSubmission.student.name} ({mockStudentSubmission.student.id})</h3>
                    <div className="space-y-6 bg-slate-50 p-4 rounded-lg h-[600px] overflow-y-auto">
                        {mockStudentSubmission.answers.map((ans, index) => (
                            <div key={ans.questionId}>
                                <h4 className="font-bold text-blue-600">Question {ans.questionId}</h4>
                                <p className="mt-2 whitespace-pre-wrap">{ans.answer}</p>
                                <div className="mt-2 text-right">
                                    <button className="text-sm text-blue-500 hover:underline">Add Inline Comment</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Feedback Tools */}
            <div className="lg:col-span-3">
                <Card>
                    <h3 className="text-xl font-bold mb-4">Feedback Tools</h3>
                     {/* Rubric */}
                     <div className="mb-6">
                        <h4 className="font-semibold mb-2">Marking Rubric</h4>
                        <div className="space-y-2">
                            {mockRubric.map(item => (
                                <div key={item.criteria} className="text-sm">
                                    <div className="flex justify-between items-center">
                                        <span>{item.criteria}</span>
                                        <span className="font-bold">{item.score}/{item.maxMark}</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-2.5 mt-1">
                                        <div className="bg-blue-500 h-2.5 rounded-full" style={{width: `${(item.score/item.maxMark)*100}%`}}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-right font-bold text-lg mt-2">Total: 16/20</p>
                    </div>
                    {/* Comments */}
                    <div>
                        <h4 className="font-semibold mb-2">Overall Feedback</h4>
                        <textarea className="w-full p-2 border rounded-lg h-24" placeholder="Type overall feedback..."></textarea>
                        <div className="flex space-x-2 mt-2">
                            <button className="flex-1 flex items-center justify-center p-2 bg-slate-200 hover:bg-slate-300 rounded-lg"><Icon name="Mic" className="mr-2"/>Voice Memo</button>
                            <button className="flex-1 flex items-center justify-center p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"><Icon name="Mail" className="mr-2"/>Email Feedback</button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
);

const Markbook = ({ setPage }) => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Markbook: HSC Mathematics Standard 2</h2>
            <div className="flex space-x-2">
                <button className="flex items-center font-bold py-2 px-4 rounded-lg bg-slate-200 hover:bg-slate-300"><Icon name="Upload" className="mr-2"/>Import CSV</button>
                <button className="flex items-center font-bold py-2 px-4 rounded-lg bg-slate-200 hover:bg-slate-300"><Icon name="Download" className="mr-2"/>Export CSV</button>
            </div>
        </div>
        <Card>
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="p-3">Student ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Score</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mockMarkbookData.map(row => (
                        <tr key={row.studentId} className="border-b hover:bg-slate-50">
                            <td className="p-3 font-mono">{row.studentId}</td>
                            <td className="p-3">{row.name}</td>
                            <td className="p-3 font-semibold">{row.score}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${row.status === 'Marked' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {row.status}
                                </span>
                            </td>
                            <td className="p-3">
                                <button onClick={() => setPage('MarkingWorkspace')} className="text-blue-500 hover:underline">View Submission</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    </div>
);

const PLHub = ({ setPage }) => (
    <div>
        <h2 className="text-3xl font-bold mb-6">Professional Learning Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-4">Tutorials & Guides</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mockTutorials.map(tut => (
                         <Card key={tut.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                            <Icon name={tut.type === 'video' ? 'Video' : 'FileText'} className="w-8 h-8 text-blue-500 mb-3"/>
                            <h4 className="font-bold">{tut.title}</h4>
                            <p className="text-sm text-blue-500 mt-2">Start Learning &rarr;</p>
                        </Card>
                    ))}
                </div>
            </div>
            <div>
                <Card>
                    <h3 className="text-xl font-bold mb-4 flex items-center"><Icon name="Calendar" className="mr-2"/>Book a Session</h3>
                    <p className="text-slate-600 mb-4">Select a date to book a live training session for your school.</p>
                    <div className="bg-slate-50 p-3 rounded-lg">
                        {/* Placeholder for a calendar component */}
                        <div className="text-center font-semibold">July 2025</div>
                        <div className="grid grid-cols-7 text-center text-sm mt-2">
                            <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                            <span className="text-slate-400">30</span><span>1</span><span>2</span><span>3</span><span className="bg-blue-200 rounded-full">4</span><span>5</span><span>6</span>
                            <span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
);

const AdminPanel = () => (
    <div>
        <h2 className="text-3xl font-bold mb-6">Admin Panel: Role Management</h2>
        <Card>
             <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mock admin data */}
                    <tr className="border-b hover:bg-slate-50">
                        <td className="p-3">John Teacher</td>
                        <td className="p-3">j.teacher@school.edu</td>
                        <td className="p-3"><span className="font-semibold">Teacher</span></td>
                        <td className="p-3"><button className="text-blue-500 hover:underline">Edit</button></td>
                    </tr>
                     <tr className="border-b hover:bg-slate-50">
                        <td className="p-3">Jane Admin</td>
                        <td className="p-3">j.admin@school.edu</td>
                        <td className="p-3"><span className="font-semibold">Admin</span></td>
                        <td className="p-3"><button className="text-blue-500 hover:underline">Edit</button></td>
                    </tr>
                </tbody>
            </table>
        </Card>
    </div>
);

const LoginScreen = ({ setUser, setPage }) => {
    const selectUser = (role, name) => {
        setUser({ role, name });
        if (role === 'Teacher') setPage('TeacherDashboard');
        if (role === 'Admin') setPage('AdminPanel');
        if (role === 'Student') setPage('StudentExamView');
    };

    return (
        <div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Edvance</h1>
                <p className="text-slate-300 mb-12">Empowering Teachers. Advancing Education.</p>
                <Card className="text-left">
                    <h2 className="text-xl font-bold mb-6 text-slate-800">Select a role to continue:</h2>
                    <div className="space-y-4">
                        <button onClick={() => selectUser('Teacher', 'Ms. Davison')} className="w-full flex items-center p-4 bg-slate-100 hover:bg-blue-100 border border-transparent hover:border-blue-300 rounded-lg transition-all">
                            <Icon name="User" className="w-6 h-6 mr-4 text-blue-500"/>
                            <div>
                                <p className="font-bold text-slate-800">Teacher</p>
                                <p className="text-sm text-slate-500">Build, assign, and grade exams.</p>
                            </div>
                        </button>
                         <button onClick={() => selectUser('Student', 'Alex')} className="w-full flex items-center p-4 bg-slate-100 hover:bg-green-100 border border-transparent hover:border-green-300 rounded-lg transition-all">
                            <Icon name="BookOpen" className="w-6 h-6 mr-4 text-green-500"/>
                            <div>
                                <p className="font-bold text-slate-800">Student</p>
                                <p className="text-sm text-slate-500">Take exams and access materials.</p>
                            </div>
                        </button>
                         <button onClick={() => selectUser('Admin', 'Mr. Smith')} className="w-full flex items-center p-4 bg-slate-100 hover:bg-purple-100 border border-transparent hover:border-purple-300 rounded-lg transition-all">
                            <Icon name="Shield" className="w-6 h-6 mr-4 text-purple-500"/>
                            <div>
                                <p className="font-bold text-slate-800">Admin</p>
                                <p className="text-sm text-slate-500">Manage roles and oversee support.</p>
                            </div>
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default function App() {
    const [page, setPage] = useState('Login');
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const pages = {
        TeacherDashboard: <TeacherDashboard setPage={setPage} />,
        ExamBuilder: <ExamBuilder setPage={setPage} />,
        StudentExamView: <StudentExamView setPage={setPage} />,
        MarkingWorkspace: <MarkingWorkspace setPage={setPage} />,
        Markbook: <Markbook setPage={setPage} />,
        PLHub: <PLHub setPage={setPage} />,
        AdminPanel: <AdminPanel />,
        Login: <LoginScreen setUser={setUser} setPage={setPage} />,
    };

    const currentPage = pages[page] || <TeacherDashboard setPage={setPage} />;

    if (!user || page === 'Login') {
        return <LoginScreen setUser={setUser} setPage={setPage} />;
    }
    
    // The Student Exam View needs a different layout (no sidebar)
    if (page === 'StudentExamView') {
        return <StudentExamView setPage={setPage} />;
    }

    return (
        <>
            <style>{`
                .switch { position: relative; display: inline-block; width: 34px; height: 20px; }
                .switch input { opacity: 0; width: 0; height: 0; }
                .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; }
                .slider:before { position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; transition: .4s; }
                input:checked + .slider { background-color: #2563eb; }
                input:checked + .slider:before { transform: translateX(14px); }
                .slider.round { border-radius: 34px; }
                .slider.round:before { border-radius: 50%; }
                .shadow-top { box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1); }
            `}</style>
            <div className="flex h-screen bg-slate-50">
                <Sidebar user={user} setPage={setPage} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="bg-white shadow-sm p-4 md:hidden">
                        <button onClick={() => setSidebarOpen(true)}>
                            <Icon name="Menu" />
                        </button>
                    </header>
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6 md:p-8">
                        {currentPage}
                    </main>
                </div>
            </div>
        </>
    );
} 