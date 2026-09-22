import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Course, Student } from "@/lib/types";

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  enrolledAt?: string;
  student: Student;
  onUnenroll: (courseId: string) => void;
}

export function CourseCard({
  course,
  isEnrolled,
  enrolledAt,
  student,
  onUnenroll,
}: CourseCardProps) {
  return (
    <Card className="relative flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">
              {course.courseId} - {course.courseTitle}
            </CardTitle>
            <CardDescription className="mt-1">
              ผู้สอน: {course.instructors.join(", ")}
            </CardDescription>
          </div>
          <Badge
            className={
              isEnrolled
                ? "bg-[var(--badge-enrolled-bg)] text-[var(--badge-enrolled-fg)] border-none"
                : "bg-[var(--badge-pending-bg)] text-[var(--badge-pending-fg)] border-none"
            }
          >
            {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {isEnrolled && (
          <div className="text-sm space-y-1 text-muted-foreground">
            <p>
              นักศึกษา: {student.firstName} {student.lastName} (
              {student.studentId})
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>
              ลงทะเบียนเมื่อ:{" "}
              {new Date(enrolledAt || "").toLocaleString("th-TH")}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end">
        {isEnrolled && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUnenroll(course.courseId)}
            className="text-destructive hover:text-destructive/90"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
