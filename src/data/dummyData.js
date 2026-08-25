export const studentProfile = {
  name: "Aarav Sharma",
  portal: "Student / Parent Portal",
  studentId: "STD1001",
  school: "NOORIA CHILDREN ACADEMY",
  classSection: "Class X-A",
  rollNumber: "12",
  admissionNo: "MSP/2022/451",
  email: "student@mspsgonda.com",
  phone: "+91 9876543210",
  academicYear: "2025-2026",
  bloodGroup: "O+",
  dob: "14 Aug 2010",
  guardianName: "Rakesh Sharma",
  guardianPhone: "+91 9812345678",
  address: "House No. 42, Civil Lines, Gonda, UP"
};

export const quickModules = [
  { id: "attendance", name: "Attendance", icon: "Check", badge: null, bg: "#e6f9f0", iconColor: "#10b981", route: "attendance" },
  { id: "timetable", name: "Time Table", icon: "Clock", badge: null, bg: "#f0f0fe", iconColor: "#6366f1", modal: "timetable" },
  { id: "notice", name: "Notice", icon: "Bell", badge: 3, bg: "#fff4e6", iconColor: "#f59e0b", modal: "notice" },
  { id: "course", name: "Course", icon: "BookOpen", badge: null, bg: "#eef2ff", iconColor: "#3b82f6", modal: "course" },
  { id: "syllabus", name: "Syllabus", icon: "FileText", badge: null, bg: "#f3e8ff", iconColor: "#a855f7", modal: "syllabus" },
  { id: "exammarks", name: "Exam Marks", icon: "BarChart3", badge: null, bg: "#fae8ff", iconColor: "#d946ef", modal: "exammarks" },
  { id: "holiday", name: "Holiday List", icon: "Palmtree", badge: null, bg: "#e6fdf5", iconColor: "#14b8a6", modal: "holiday" },
  { id: "activity", name: "Activity", icon: "CalendarCheck", badge: null, bg: "#fff7ed", iconColor: "#f97316", modal: "activity" },
  { id: "homework", name: "Home Work", icon: "FileCheck", badge: 4, bg: "#fef2f2", iconColor: "#ef4444", route: "homework" },
  { id: "datesheet", name: "Date Sheet", icon: "ClipboardList", badge: null, bg: "#f5f3ff", iconColor: "#8b5cf6", modal: "datesheet" },
  { id: "feereport", name: "Fee Report", icon: "CreditCard", badge: null, bg: "#ecfdf5", iconColor: "#059669", modal: "feereport" },
  { id: "classmates", name: "Classmates", icon: "Users", badge: null, bg: "#eff6ff", iconColor: "#2563eb", modal: "classmates" },
];

export const attendanceSummary = {
  dateRange: "01/04/2026 to 27/04/2026",
  presentCount: 4,
  absentCount: 1,
  holidayCount: 2,
};

export const attendanceMonths = ["Apr 2026", "Mar 2026", "Feb 2026", "Jan 2026"];

export const dailyAttendance = [
  { id: 1, dateStr: "Apr 26, Sun", status: "Not Marked", statusClass: "not-marked" },
  { id: 2, dateStr: "Apr 25, Sat", status: "Holiday", statusClass: "holiday" },
  { id: 3, dateStr: "Apr 24, Fri", status: "Not Marked", statusClass: "not-marked" },
  { id: 4, dateStr: "Apr 23, Thu", status: "Not Marked", statusClass: "not-marked" },
  { id: 5, dateStr: "Apr 22, Wed", status: "Not Marked", statusClass: "not-marked" },
  { id: 6, dateStr: "Apr 21, Tue", status: "Present", statusClass: "present" },
  { id: 7, dateStr: "Apr 20, Mon", status: "Present", statusClass: "present" },
  { id: 8, dateStr: "Apr 19, Sun", status: "Holiday", statusClass: "holiday" },
  { id: 9, dateStr: "Apr 18, Sat", status: "Present", statusClass: "present" },
  { id: 10, dateStr: "Apr 17, Fri", status: "Absent", statusClass: "absent" },
  { id: 11, dateStr: "Apr 16, Thu", status: "Present", statusClass: "present" },
];

export const homeworkList = [
  {
    id: 1,
    subject: "English",
    subjectBg: "#ffedd5",
    subjectColor: "#c2410c",
    type: "Holiday Home Work",
    date: "30 Dec 2024",
    title: "Parts of speech",
    description: "Noun and its kinds with 5 examples each in notebook.",
    assignedBy: "Mr. Rajesh Kumar",
    classSec: "Class 10-A",
    completed: false
  },
  {
    id: 2,
    subject: "G.Science",
    subjectBg: "#dcfce7",
    subjectColor: "#15803d",
    type: "Class Work",
    date: "20 Dec 2024",
    title: "Complete your note book",
    description: "Make a clean labeled diagram of leaf respiration process.",
    assignedBy: "Mrs. Anita Verma",
    classSec: "Class 10-A",
    completed: true
  },
  {
    id: 3,
    subject: "Mathematics",
    subjectBg: "#e0f2fe",
    subjectColor: "#0369a1",
    type: "Home Work",
    date: "15 Dec 2024",
    title: "Quadratic Equations",
    description: "Solve Exercise 4.2 Questions 1 to 10 from NCERT textbook.",
    assignedBy: "Mr. S. K. Singh",
    classSec: "Class 10-A",
    completed: false
  },
  {
    id: 4,
    subject: "Social Science",
    subjectBg: "#f3e8ff",
    subjectColor: "#7e22ce",
    type: "Home Work",
    date: "12 Dec 2024",
    title: "Rise of Nationalism in Europe",
    description: "Write short notes on Giuseppe Garibaldi and Otto von Bismarck.",
    assignedBy: "Mr. V. P. Sharma",
    classSec: "Class 10-A",
    completed: false
  }
];

export const noticesList = [
  {
    id: 1,
    title: "Annual Sports Meet Registration Open",
    date: "25 Apr 2026",
    category: "Events",
    content: "Students interested in participating in 100m, 400m, Long Jump, and Badminton must register with the Sports Teacher by Friday.",
    unread: true
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting (PTM) Schedule",
    date: "20 Apr 2026",
    category: "Academic",
    content: "PTM for Class 10th will be conducted on Saturday from 9:00 AM to 12:30 PM. Attendance of parents is mandatory.",
    unread: true
  },
  {
    id: 3,
    title: "Summer Vacation Schedule Announcement",
    date: "15 Apr 2026",
    category: "General",
    content: "The academy will remain closed for summer break from 20th May to 30th June 2026. Holiday homework will be uploaded on the portal.",
    unread: true
  }
];

export const timetableData = [
  { time: "08:00 AM - 08:45 AM", period: "1st Period", mon: "Mathematics", tue: "Science", wed: "English", thu: "Mathematics", fri: "Social Science", sat: "Hindi" },
  { time: "08:45 AM - 09:30 AM", period: "2nd Period", mon: "Science", tue: "Mathematics", wed: "Social Science", thu: "Science", fri: "Mathematics", sat: "English" },
  { time: "09:30 AM - 10:15 AM", period: "3rd Period", mon: "English", tue: "Hindi", wed: "Computer", thu: "English", fri: "Science", sat: "Social Science" },
  { time: "10:15 AM - 10:45 AM", period: "RECESS", mon: "Break", tue: "Break", wed: "Break", thu: "Break", fri: "Break", sat: "Break" },
  { time: "10:45 AM - 11:30 AM", period: "4th Period", mon: "Social Science", tue: "English", wed: "Science", thu: "Hindi", fri: "Computer", sat: "Mathematics" },
  { time: "11:30 AM - 12:15 PM", period: "5th Period", mon: "Hindi", tue: "Computer", wed: "Mathematics", thu: "Social Science", fri: "English", sat: "Sports/Library" },
];

export const examMarksData = {
  term: "First Term Examination 2025-26",
  totalObtained: 462,
  totalMax: 500,
  percentage: "92.4%",
  grade: "A1",
  subjects: [
    { name: "Mathematics", marks: 95, max: 100, grade: "A1" },
    { name: "Science", marks: 92, max: 100, grade: "A1" },
    { name: "English", marks: 88, max: 100, grade: "A2" },
    { name: "Social Science", marks: 94, max: 100, grade: "A1" },
    { name: "Hindi", marks: 93, max: 100, grade: "A1" },
  ]
};

export const feeReportData = {
  studentName: "Aarav Sharma",
  rollNo: "12",
  totalFee: "₹45,000",
  paidFee: "₹35,000",
  dueFee: "₹10,000",
  transactions: [
    { receiptNo: "REC-2026-004", date: "10 Apr 2026", amount: "₹15,000", mode: "Online UPI", status: "Paid" },
    { receiptNo: "REC-2025-982", date: "05 Jan 2026", amount: "₹10,000", mode: "Net Banking", status: "Paid" },
    { receiptNo: "REC-2025-410", date: "12 Sep 2025", amount: "₹10,000", mode: "Cash", status: "Paid" },
  ]
};

export const holidayList = [
  { date: "14 Apr 2026", name: "Ambedkar Jayanti", type: "Gazetted Holiday" },
  { date: "21 Apr 2026", name: "Mahavir Jayanti", type: "Gazetted Holiday" },
  { date: "01 May 2026", name: "Labor Day / May Day", type: "Institutional Holiday" },
  { date: "20 May - 30 Jun 2026", name: "Summer Break", type: "Vacation" },
  { date: "15 Aug 2026", name: "Independence Day", type: "National Holiday" },
];

export const classmatesData = [
  { roll: 1, name: "Aaditya Patel", avatarBg: "#dbeafe", initial: "AP" },
  { roll: 2, name: "Ananya Roy", avatarBg: "#fce7f3", initial: "AR" },
  { roll: 3, name: "Devansh Gupta", avatarBg: "#dcfce7", initial: "DG" },
  { roll: 4, name: "Ishita Singh", avatarBg: "#fef3c7", initial: "IS" },
  { roll: 5, name: "Kabir Mehta", avatarBg: "#f3e8ff", initial: "KM" },
  { roll: 12, name: "Aarav Sharma (You)", avatarBg: "#ccfbf1", initial: "AS", isCurrent: true },
  { roll: 13, name: "Riya Kapoor", avatarBg: "#fee2e2", initial: "RK" },
  { roll: 14, name: "Vihaan Joshi", avatarBg: "#e0e7ff", initial: "VJ" },
];

export const coursesData = [
  { name: "Mathematics Class 10", code: "MATH-10", teacher: "Mr. S. K. Singh", chapters: 15, completedChapters: 12, progress: 80 },
  { name: "Science (Physics, Chem, Bio)", code: "SCI-10", teacher: "Mrs. Anita Verma", chapters: 18, completedChapters: 14, progress: 78 },
  { name: "English Language & Lit", code: "ENG-10", teacher: "Mr. Rajesh Kumar", chapters: 12, completedChapters: 10, progress: 83 },
  { name: "Social Science", code: "SST-10", teacher: "Mr. V. P. Sharma", chapters: 20, completedChapters: 15, progress: 75 },
];

export const dateSheetData = [
  { subject: "Mathematics", date: "12 May 2026", time: "09:00 AM - 12:00 PM", room: "Hall A" },
  { subject: "Science", date: "15 May 2026", time: "09:00 AM - 12:00 PM", room: "Hall B" },
  { subject: "Social Science", date: "18 May 2026", time: "09:00 AM - 12:00 PM", room: "Hall A" },
  { subject: "English", date: "21 May 2026", time: "09:00 AM - 12:00 PM", room: "Room 102" },
  { subject: "Hindi", date: "24 May 2026", time: "09:00 AM - 12:00 PM", room: "Room 104" },
];

// ----------------------------------------------------
// TEACHER & ADMIN DATA STRUCTURES
// ----------------------------------------------------

export const teacherProfile = {
  name: "Mrs. Sunita Sharma",
  portal: "Teacher / Faculty Portal",
  staffId: "TCH2001",
  school: "NOORIA CHILDREN ACADEMY",
  designation: "Senior Science & Math Teacher",
  department: "Science & Mathematics",
  email: "sunita.sharma@nooria.edu.in",
  phone: "+91 9876501234",
  assignedClass: "Class X-A (Class Teacher)",
  otherClasses: ["Class IX-B", "Class XI-A"],
  qualification: "M.Sc. Physics, B.Ed.",
  experience: "8+ Years",
  joinedYear: "2018"
};

export const adminProfile = {
  name: "Dr. Ramesh Chandra",
  portal: "Administrator & Management Portal",
  adminId: "ADM3001",
  school: "NOORIA CHILDREN ACADEMY",
  designation: "Principal / Director",
  department: "School Management & Operations",
  email: "principal@nooria.edu.in",
  phone: "+91 9800011223",
  accessLevel: "Super Admin (Full Access)",
  office: "Administrative Block, Room 101"
};

export const teacherQuickModules = [
  { id: "teacher_attendance", name: "Mark Attendance", icon: "CheckSquare", badge: "Class 10-A", bg: "#e0f2fe", iconColor: "#0284c7", modal: "teacher_attendance" },
  { id: "teacher_homework", name: "Assign Homework", icon: "PlusCircle", badge: null, bg: "#fef3c7", iconColor: "#d97706", modal: "teacher_homework" },
  { id: "teacher_marks", name: "Enter Exam Marks", icon: "Award", badge: null, bg: "#fae8ff", iconColor: "#c026d3", modal: "teacher_marks" },
  { id: "teacher_timetable", name: "Class Timetable", icon: "Clock", badge: null, bg: "#f0fdf4", iconColor: "#16a34a", modal: "timetable" },
  { id: "teacher_notices", name: "Post Class Notice", icon: "Send", badge: null, bg: "#fff1f2", iconColor: "#e11d48", modal: "notice" },
  { id: "teacher_students", name: "Student Directory", icon: "Users", badge: "32 Students", bg: "#f3e8ff", iconColor: "#9333ea", modal: "teacher_students" }
];

export const adminQuickModules = [
  { id: "admin_fees", name: "Fee Management", icon: "CreditCard", badge: "₹7.5L Due", bg: "#ecfdf5", iconColor: "#059669", modal: "admin_fees" },
  { id: "admin_staff", name: "Staff Directory", icon: "UserCheck", badge: "42 Staff", bg: "#eef2ff", iconColor: "#4f46e5", modal: "admin_staff" },
  { id: "admin_broadcast", name: "Broadcast Notice", icon: "Megaphone", badge: null, bg: "#fff7ed", iconColor: "#ea580c", modal: "admin_broadcast" },
  { id: "admin_reports", name: "School Analytics", icon: "PieChart", badge: null, bg: "#f0f9ff", iconColor: "#0284c7", modal: "admin_reports" },
  { id: "admin_classes", name: "Class & Subjects", icon: "Layers", badge: null, bg: "#fae8ff", iconColor: "#d946ef", modal: "datesheet" },
  { id: "admin_holidays", name: "Academic Calendar", icon: "Calendar", badge: null, bg: "#fdf4ff", iconColor: "#a21caf", modal: "holiday" }
];

export const studentsInClass = [
  { id: "STD1001", roll: 1, name: "Aaditya Patel", status: "Present", parentName: "Sanjay Patel", phone: "+91 9811223344", feeStatus: "Paid", termMark: 88 },
  { id: "STD1002", roll: 2, name: "Ananya Roy", status: "Present", parentName: "Deepak Roy", phone: "+91 9822334455", feeStatus: "Paid", termMark: 92 },
  { id: "STD1003", roll: 3, name: "Devansh Gupta", status: "Absent", parentName: "Manoj Gupta", phone: "+91 9833445566", feeStatus: "Pending ₹5,000", termMark: 76 },
  { id: "STD1004", roll: 4, name: "Ishita Singh", status: "Present", parentName: "Vikram Singh", phone: "+91 9844556677", feeStatus: "Paid", termMark: 95 },
  { id: "STD1005", roll: 5, name: "Kabir Mehta", status: "Late", parentName: "Amit Mehta", phone: "+91 9855667788", feeStatus: "Paid", termMark: 84 },
  { id: "STD1006", roll: 12, name: "Aarav Sharma", status: "Present", parentName: "Rakesh Sharma", phone: "+91 9876543210", feeStatus: "Pending ₹10,000", termMark: 92 },
  { id: "STD1007", roll: 13, name: "Riya Kapoor", status: "Present", parentName: "Sunil Kapoor", phone: "+91 9866778899", feeStatus: "Paid", termMark: 90 },
  { id: "STD1008", roll: 14, name: "Vihaan Joshi", status: "Absent", parentName: "Anil Joshi", phone: "+91 9877889900", feeStatus: "Pending ₹2,500", termMark: 79 }
];

export const teachersList = [
  { id: "TCH2001", name: "Mrs. Sunita Sharma", subject: "Physics & Math", classTeacherOf: "Class 10-A", phone: "+91 9876501234", status: "Active", experience: "8 Yrs" },
  { id: "TCH2002", name: "Mr. Rajesh Kumar", subject: "English Lit", classTeacherOf: "Class 9-A", phone: "+91 9876505678", status: "Active", experience: "12 Yrs" },
  { id: "TCH2003", name: "Mrs. Anita Verma", subject: "Biology & Chem", classTeacherOf: "Class 10-B", phone: "+91 9876509012", status: "Active", experience: "6 Yrs" },
  { id: "TCH2004", name: "Mr. S. K. Singh", subject: "Higher Math", classTeacherOf: "Class 11-A", phone: "+91 9876503456", status: "Active", experience: "15 Yrs" },
  { id: "TCH2005", name: "Mr. V. P. Sharma", subject: "Social Science", classTeacherOf: "Class 8-A", phone: "+91 9876507890", status: "On Leave", experience: "10 Yrs" },
];

export const adminStats = {
  totalStudents: 850,
  totalTeachers: 42,
  totalClasses: 24,
  todayAttendanceRate: "94.2%",
  totalFeeExpected: "₹40.0 Lakhs",
  totalFeeCollected: "₹32.5 Lakhs",
  pendingFeeAmount: "₹7.5 Lakhs",
  feeCollectionPercentage: 81.25,
  activeNotices: 5
};

