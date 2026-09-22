import { useState } from "react";
import {
  courses,
  currentStudent,
  enrollments as initialEnrollments,
} from "@/lib/mock-data";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import type { Enrollment } from "@/lib/types";

export default function EnrollmentPage() {
  const [enrollmentList, setEnrollmentList] =
    useState<Enrollment[]>(initialEnrollments);

  const studentEnrollments = enrollmentList.filter(
    (e) => e.studentId === currentStudent.studentId,
  );

  const enrolledCourseIds = new Set(studentEnrollments.map((e) => e.courseId));
  const availableCourses = courses.filter(
    (c) => !enrolledCourseIds.has(c.courseId),
  );

  function handleEnroll(courseId: string, time: string) {
    const newEntry: Enrollment = {
      studentId: currentStudent.studentId,
      courseId,
      enrolledAt: time,
    };
    setEnrollmentList([...enrollmentList, newEntry]);
  }

  function handleUnenroll(courseId: string) {
    setEnrollmentList(
      enrollmentList.filter(
        (e) =>
          !(
            e.studentId === currentStudent.studentId && e.courseId === courseId
          ),
      ),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ระบบลงทะเบียนเรียน</h1>
        <RegisterDialog
          student={currentStudent}
          availableCourses={availableCourses}
          onEnroll={handleEnroll}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => {
          const enrollment = studentEnrollments.find(
            (e) => e.courseId === course.courseId,
          );
          const isEnrolled = !!enrollment;

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              isEnrolled={isEnrolled}
              enrolledAt={enrollment?.enrolledAt}
              student={currentStudent}
              onUnenroll={handleUnenroll}
            />
          );
        })}
      </div>
    </div>
  );
}
