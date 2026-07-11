const fs = require('fs');
const path = require('path');

const dirs = [
  { name: 'accessories', badWord: 'type' },
  { name: 'repairs', badWord: 'deviceType' },
  { name: 'glass', badWord: 'warranty' },
  { name: 'printing', badWord: 'paperSize' },
];

for (const dir of dirs) {
  const targetDir = path.join(__dirname, 'src', 'app', dir.name);
  
  const files = [
    path.join(targetDir, 'add', 'page.tsx'),
    path.join(targetDir, '[id]', 'edit', 'page.tsx')
  ];

  for (const file of files) {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      // Fix imports
      content = content.replace(`from "firebase/${dir.badWord}";`, `from "firebase/storage";`);
      content = content.replace(`{ db, ${dir.badWord} } from "@/lib/firebase";`, `{ db, storage } from "@/lib/firebase";`);
      
      // Fix ref usage
      content = content.replace(`ref(${dir.badWord},`, `ref(storage,`);
      
      // Fix storageRef variable name (if it was modified)
      // e.g. const deviceTypeRef = ref(storage, ...) -> const storageRef = ref(storage, ...)
      content = content.replace(`const ${dir.badWord}Ref`, `const storageRef`);
      
      // Fix imageFile.name bug from repairs (where it became imageFile.title)
      content = content.replace('imageFile.title', 'imageFile.name');
      content = content.replace('imageFile.phoneModel', 'imageFile.name');
      content = content.replace('imageFile.serviceName', 'imageFile.name');
      
      fs.writeFileSync(file, content);
      console.log(`Fixed ${file}`);
    }
  }
}
