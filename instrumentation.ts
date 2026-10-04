export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NODE_ENV !== "development") return;

  const { projectRecords } = await import("./data/projects");
  const { logProjectImageWarnings } = await import(
    "./lib/projects/validate-project-images"
  );

  logProjectImageWarnings(projectRecords);
}
