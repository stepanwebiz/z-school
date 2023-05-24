export interface LessonItem {
  id: number;
  subject: string;
  type: string;
  teacherName: string;
  teacherAvatar: string;
  hour: string;
  date: string;
  day: string;
  zoomUrl: string;
}

export interface LessonItemTeacher {
  id: number;
  subject: string;
  type: string;
  hour: string;
  day: string;
  date: string;
  studentNames:string[];
  zoomUrl: string;
}
