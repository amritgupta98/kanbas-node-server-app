// import Database from "../Database/index.js";

// export default function CourseRoutes(app) {
// app.delete("/api/courses/:id", (req, res) => {
//   const { id } = req.params;
//   Database.courses = Database.courses.filter((c) => c._id !== id);
//   res.sendStatus(204);
// });

// app.put("/api/courses/:id", (req, res) => {
//   const { id } = req.params;
//   const course = req.body;
//   Database.courses = Database.courses.map((c) =>
//     c._id === id ? { ...c, ...course } : c
//   );
//   res.sendStatus(204);
// });

// app.get("/api/courses/:id", (req, res) => {
//   const { id } = req.params;
//   const course = Database.courses.find((c) => c._id === id);
//   if (!course) {
//     res.status(404).send("Course not found");
//     return;
//   }
//   res.send(course);
// });

// app.post("/api/courses", (req, res) => {
//   const course = { ...req.body, _id: new Date().getTime().toString() };
//   Database.courses.push(course);
//   res.send(course);
// });

// app.get("/api/courses", (req, res) => {
//   const courses = Database.courses;
//   res.send(courses);
// });
// }

import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  const deleteCourse = async (req, res) => {
    console.log(req.params.courseId);
    const status = await dao.deleteCourse(req.params.courseId);
    res.json(status);
  };

  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.updateCourse(courseId, req.body);
    const currentCourse = await dao.findCourseById(courseId);
    res.json(status);
  };

  const getCourseById = async (req, res) => {
    const course = await dao.findCourseById(req.params.courseId);
    res.json(course);
  };

  const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  };

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    // console.log(courses);
    res.json(courses);
  };

  app.get("/api/courses", findAllCourses);
  app.post("/api/courses", createCourse);
  app.get("/api/courses/:id", getCourseById);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
}
