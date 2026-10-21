/**
 * Build route manifest for sitemap generation.
 * Reads src/data/proyectos.js and generates routes:
 * - "/" (static)
 * - "/videos/:id" for projects with tipo === "Video"
 * - "/demo/:id" for projects with imgDemo
 */
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load proyectos data from src/data/proyectos.js
 * @returns {Promise<Array>} Array of project objects
 */
async function loadProyectos() {
  const proyectosPath = resolve(__dirname, "..", "src", "data", "proyectos.js");
  const proyectosUrl = pathToFileURL(proyectosPath).href;
  const { proyectos } = await import(proyectosUrl);
  return proyectos;
}

/**
 * Build route manifest from proyectos data
 * @returns {Promise<Array<{route: string, lastmod: string}>>} Array of route objects with route and lastmod
 */
export async function buildRouteManifest() {
  const proyectos = await loadProyectos();
  const routes = [];

  // Static root route
  routes.push({
    route: "/",
    lastmod: new Date().toISOString().split("T")[0], // Today's date in ISO format (YYYY-MM-DD)
  });

  // Video routes: projects with tipo === "Video"
  const videoProjects = proyectos.filter((p) => p.tipo === "Video");
  for (const project of videoProjects) {
    routes.push({
      route: `/videos/${project.id}`,
      lastmod: project.year ? `${project.year}-01-01` : new Date().toISOString().split("T")[0],
    });
  }

  // Demo routes: projects with imgDemo
  const demoProjects = proyectos.filter((p) => p.imgDemo && p.imgDemo.img && p.imgDemo.img.length > 0);
  for (const project of demoProjects) {
    routes.push({
      route: `/demo/${project.id}`,
      lastmod: project.year ? `${project.year}-01-01` : new Date().toISOString().split("T")[0],
    });
  }

  return routes;
}