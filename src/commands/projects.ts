/**
 * Asynchronously retrieves data from a Google Sheets API.
 * @param sheetId - The ID of the Google Sheets document.
 * @param gid - The ID of the sheet within the document.
 * @returns An array of rows containing data from the specified sheet.
 * @throws Throws an error if the HTTP response is not OK.
 */
async function getGoogleSheetData(
  sheetId: string,
  gid: string,
): Promise<{ table: { rows: Array<{ c: Array<{ v: string }> }> } }> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const text = await response.text();
  const jsonData = JSON.parse(text.substr(47).slice(0, -2));
  return jsonData;
}

/**
 * Asynchronously creates a project from data retrieved from a Google Sheets API.
 * @returns An array of strings representing the HTML for each project.
 * @throws Throws an error if there is an issue fetching data from Google Sheets or if the data is invalid.
 */
async function createProject(): Promise<string[]> {
  const sheetId = '1pdEufTQxVExLAEmTc0-Zm7UKdS9PCoNvx2FfKhBvZaA';
  const gid = '0';

  const data = await getGoogleSheetData(sheetId, gid);
  if (!data || !data.table || !data.table.rows) {
    throw new Error('Error fetching data from Google Sheets');
  }

  const projects: string[] = [];
  for (let i = 2; i < data.table.rows.length; i++) {
    const row = data.table.rows[i];
    const name = row.c[0]?.v;
    const link = row.c[1]?.v;
    if (!name || !link) {
      throw new Error('Invalid data row');
    }
    const isOffline = link.toUpperCase() === 'OFFLINE';
    const linkHTML = isOffline
      ? `<span style="color: red;">${name}</span>`
      : `<a href="https://${link}" target="_blank">${name}</a>`;
    const project = `<div style="display: grid; grid-template-columns: 1fr auto; align-items: center; border: 1px solid white; padding: 10px; margin: 5px; gap: 10px;">
      <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span style="color: ${
        isOffline ? 'red' : 'inherit'
      };">${linkHTML}</span></div>
      <div><span style="color: ${isOffline ? 'red' : 'inherit'};">${link}</span></div>
    </div>`;
    projects.push(project);
  }

  projects.push(
    `<br><div style="text-align: right;">${data.table.rows.length - 2} Project(s)</div>`,
  );
  return projects;
}

let PROJECTS: string[] = [];

createProject()
  .then((projects: string[]) => {
    PROJECTS = projects;
  })
  .catch((error: Error) => {
    console.error('Error creating projects:', error);
    PROJECTS = [];
  });

export { PROJECTS };
