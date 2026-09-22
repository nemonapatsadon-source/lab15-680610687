import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-full p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-xl">
            ระบบลงทะเบียนเรียน CPE & ISNE
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-4">
          <Link to="/enrollment">
            <Button>ไปหน้าลงทะเบียนเรียน</Button>
          </Link>
          <p className="text-xs text-muted-foreground">
            จัดทำโดย Napatsadon Jampa รหัสนักศึกษา 680610687
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
