type PriceRange = (number | null)[];

interface Course {
  name: string,
  prices: PriceRange,
}

let courses: Course[] = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];

const filteredCourses = (courses: Course[], range: PriceRange): Course[] => {
  const nullToNInf = (num1: number, num2: number): number[] => {
    if (num1 === null) num1 = -Infinity;
    if (num2 === null) num2 = Infinity;

    return [num1, num2];
  }
  const InfToNull = (num1: number, num2: number): number[] => {
    if (num1 === -Infinity) num1 = null;
    if (num2 === Infinity) num2 = null;

    return [num1, num2];
  }
  const [start, end] = nullToNInf(range[0], range[1]);


  return courses
    .map(course => ({ ...course, prices: nullToNInf(course.prices[0], course.prices[1]) }))
    .filter(course => {
      const [courseStart, courseEnd] = course.prices;
      return courseStart >= start && courseEnd <= end;
    })
    .map(course => ({ ...course, prices: InfToNull(course.prices[0], course.prices[1]) }));
}

console.log(filteredCourses(courses, [200, null]));
