const fs = require('fs');
const path = require('path');

function generateCrud(sourceDir, targetNamePlural, targetNameSingular, targetIcon, fieldMap) {
  const targetDir = path.join(__dirname, 'src', 'app', targetNamePlural.toLowerCase());
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    fs.mkdirSync(path.join(targetDir, 'add'), { recursive: true });
    fs.mkdirSync(path.join(targetDir, '[id]'), { recursive: true });
    fs.mkdirSync(path.join(targetDir, '[id]', 'edit'), { recursive: true });
  }

  const files = [
    { src: 'page.tsx', dest: 'page.tsx' },
    { src: 'add/page.tsx', dest: 'add/page.tsx' },
    { src: '[id]/edit/page.tsx', dest: '[id]/edit/page.tsx' }
  ];

  for (const file of files) {
    const srcPath = path.join(sourceDir, file.src);
    const destPath = path.join(targetDir, file.dest);
    
    let content = fs.readFileSync(srcPath, 'utf8');

    // 1. Replace collection names and variables (case sensitive)
    content = content.replace(/\bphones\b/g, targetNamePlural.toLowerCase());
    content = content.replace(/\bPhones\b/g, targetNamePlural);
    content = content.replace(/\bphone\b/g, targetNameSingular.toLowerCase());
    content = content.replace(/\bPhone\b/g, targetNameSingular);
    
    // 2. Replace icons
    content = content.replace(/<Smartphone /g, `<${targetIcon} `);
    content = content.replace(/Smartphone,/g, `${targetIcon},`);

    // 3. Replace fields based on map
    for (const [oldField, newField] of Object.entries(fieldMap)) {
      if (!newField) continue;
      
      const oldCapitalized = oldField.charAt(0).toUpperCase() + oldField.slice(1);
      const newCapitalized = newField.charAt(0).toUpperCase() + newField.slice(1);
      
      const oldRegex = new RegExp(`\\b${oldField}\\b`, 'g');
      content = content.replace(oldRegex, newField);
      
      const oldCapRegex = new RegExp(`\\b${oldCapitalized}\\b`, 'g');
      content = content.replace(oldCapRegex, newCapitalized);
    }

    fs.writeFileSync(destPath, content);
  }
  console.log(`Generated ${targetNamePlural} CRUD successfully!`);
}

const source = path.join(__dirname, 'src', 'app', 'phones');

// Repairs
generateCrud(source, 'Repairs', 'Repair', 'Wrench', {
  name: 'title',
  brand: 'description',
  storage: 'deviceType'
});

// Glass
generateCrud(source, 'Glass', 'GlassItem', 'Smartphone', {
  name: 'phoneModel',
  brand: 'glassQuality',
  storage: 'warranty'
});

// Printing
generateCrud(source, 'Printing', 'PrintJob', 'Printer', {
  name: 'serviceName',
  brand: 'description',
  storage: 'paperSize'
});
