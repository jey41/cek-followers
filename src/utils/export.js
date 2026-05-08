export const generateTxt = (users, type) => {
  const header = `Instagram ${type} Report\nGenerated on: ${new Date().toLocaleString()}\nTotal: ${users.length}\n\n`;
  const list = users.map((u, i) => `${i + 1}. ${u.username} - ${u.href}`).join('\n');
  return header + list;
};

export const generateCsv = (users) => {
  const header = "Username,Profile URL,Followed Since\n";
  const rows = users.map(u => `"${u.username}","${u.href}","${u.timestamp ? new Date(u.timestamp * 1000).toISOString() : ''}"`).join('\n');
  return header + rows;
};

export const downloadFile = (content, filename, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};
