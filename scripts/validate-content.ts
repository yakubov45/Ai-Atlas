import { loadContentCollection } from "../src/lib/content/loader";
import { validateCollection, summarizeIssues } from "../src/lib/content/validate";

function run() {
  console.log("🔍 AI Atlas kontent tekshiruvi boshlandi...");
  const collection = loadContentCollection();

  const issues = [...collection.issues, ...validateCollection(collection)];
  const { errors, warnings } = summarizeIssues(issues);

  console.log(`\nYuklangan ma'lumotlar:`);
  console.log(`  - Kategoriyalar:    ${collection.categories.length}`);
  console.log(`  - Darslar:          ${collection.lessons.length}`);
  console.log(`  - Glossariy:        ${collection.glossary.length}`);
  console.log(`  - Manbalar:         ${collection.references.length}`);
  console.log(`  - Vizualizatsiyalar: ${collection.visualizations.length}`);

  if (issues.length > 0) {
    console.log(`\nNatijalar (${errors} xato, ${warnings} ogohlantirish):`);
    for (const issue of issues) {
      const prefix = issue.severity === "error" ? "❌ [XATO]" : "⚠️  [OGOHLANTIRISH]";
      console.log(`${prefix} ${issue.file}: ${issue.message} (${issue.code})`);
    }
  }

  if (errors > 0) {
    console.error("\n❌ Kontent tekshiruvida xatoliklar aniqlandi!");
    process.exit(1);
  } else {
    console.log("\n✅ Barcha kontent fayllari sxema va semantik qoidalarga to'liq mos keladi!");
  }
}

run();
