function calcGrade(gpa) {
  if (gpa >= 97) return "A+";
  if (gpa >= 93) return "A";
  if (gpa >= 90) return "A-";
  if (gpa >= 87) return "B+";
  if (gpa >= 83) return "B";
  if (gpa >= 80) return "B-";
  if (gpa >= 77) return "C+";
  if (gpa >= 73) return "C";
  if (gpa >= 70) return "C-";
  if (gpa >= 67) return "D+";
  if (gpa >= 63) return "D";
  if (gpa >= 60) return "D-";
  return "F";
}

export default function Grade({ gpa }) {
  return <p>Grade: {calcGrade(gpa)}</p>;
}
