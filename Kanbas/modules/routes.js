// import db from "../Database/index.js";
// function ModuleRoutes(app) {
//   app.post("/api/courses/:cid/modules", (req, res) => {
//     const { cid } = req.params;
//     const newModule = {
//       ...req.body,
//       course: cid,
//       _id: new Date().getTime().toString(),
//     };
//     db.modules.push(newModule);
//     res.send(newModule);
//   });

//   app.delete("/api/modules/:mid", (req, res) => {
//     const { mid } = req.params;
//     db.modules = db.modules.filter((m) => m._id !== mid);
//     res.sendStatus(200);
//   });

//   app.put("/api/modules/:mid", (req, res) => {
//     const { mid } = req.params;
//     const moduleIndex = db.modules.findIndex((m) => m._id === mid);
//     db.modules[moduleIndex] = {
//       ...db.modules[moduleIndex],
//       ...req.body,
//     };
//     res.sendStatus(204);
//   });

//   app.get("/api/courses/:cid/modules", (req, res) => {
//     const { cid } = req.params;
//     const modules = db.modules.filter((m) => m.course === cid);
//     res.send(modules);
//   });
// }
// export default ModuleRoutes;

import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  const deleteModule = async (req, res) => {
    const mid = req.params.mid;
    const status = await dao.deleteModule(mid);
    res.json(status);
  };

  const updateModule = async (req, res) => {
    const moduleId = req.params.mid;
    const status = await dao.updateModule(moduleId, req.body);
    const currentModule = await dao.findModuleById(moduleId);
    res.json(status);
  };

  const getModuleById = async (req, res) => {
    const module = await dao.findModuleById(req.params.cid);
    res.json(module);
  };

  const createModule = async (req, res) => {
    const cid = req.params.cid;
    const newModule = {
      ...req.body,
      course: cid,
    };
    const module = await dao.createModule(newModule);
    res.json(module);
  };

  const findAllModules = async (req, res) => {
    const modules = await dao.findAllModules();
    res.json(modules);
  };

  app.post("/api/courses/:cid/modules", createModule);
  app.delete("/api/modules/:mid", deleteModule);
  app.put("/api/modules/:mid", updateModule);
  app.get("/api/courses/:cid/modules", getModuleById);
}
