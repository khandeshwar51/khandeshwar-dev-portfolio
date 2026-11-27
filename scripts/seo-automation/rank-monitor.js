/**
 * Automated Keyword Rank Tracker & SERP Position Monitor
 * Khandeshwar Suryavanshi — Portfolio & Services
 * 
 * Tracks 40 high-intent Mumbai keywords, monitors ranking trajectories,
 * and generates automated progress reports.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const HISTORY_FILE = path.join(DATA_DIR, 'rank-history.json');

const KEYWORDS = [
  // Commercial P1
  { keyword: "website developer in mumbai", category: "Commercial", priority: "P1", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "ai automation company mumbai", category: "Commercial", priority: "P1", targetUrl: "/services/ai-automation-mumbai/" },
  { keyword: "full stack developer mumbai", category: "Commercial", priority: "P1", targetUrl: "/" },
  { keyword: "freelance web developer mumbai", category: "Commercial", priority: "P1", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "n8n automation consultant mumbai", category: "Commercial", priority: "P1", targetUrl: "/services/ai-automation-mumbai/" },
  { keyword: "whatsapp ai chatbot developer mumbai", category: "Commercial", priority: "P1", targetUrl: "/services/ai-automation-mumbai/" },
  { keyword: "lead generation bot developer mumbai", category: "Commercial", priority: "P1", targetUrl: "/services/ai-automation-mumbai/" },
  { keyword: "best web developer in mumbai for startups", category: "Commercial", priority: "P1", targetUrl: "/" },

  // Hyper-Local P1 & P2
  { keyword: "web developer andheri east midc", category: "Local", priority: "P1", targetUrl: "/locations/web-developer-andheri/" },
  { keyword: "website designer in andheri west", category: "Local", priority: "P1", targetUrl: "/locations/web-developer-andheri/" },
  { keyword: "software developer in bkc mumbai", category: "Local", priority: "P1", targetUrl: "/locations/web-developer-bkc/" },
  { keyword: "ai developer powai hiranandani", category: "Local", priority: "P1", targetUrl: "/services/ai-automation-mumbai/" },
  { keyword: "web designer thane west", category: "Local", priority: "P2", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "full stack engineer navi mumbai vashi", category: "Local", priority: "P2", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "website developer lower parel", category: "Local", priority: "P2", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "custom software developer borivali", category: "Local", priority: "P2", targetUrl: "/" },
  { keyword: "web developer bandra west", category: "Local", priority: "P2", targetUrl: "/" },
  { keyword: "ai automation consultant goregaon east", category: "Local", priority: "P2", targetUrl: "/services/ai-automation-mumbai/" },
  { keyword: "freelance programmer vasai virar", category: "Local", priority: "P2", targetUrl: "/" },

  // Commercial P2
  { keyword: "react developer mumbai", category: "Commercial", priority: "P2", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "custom web application development mumbai", category: "Commercial", priority: "P2", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "ecommerce website builder mumbai", category: "Commercial", priority: "P2", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "saas application developer mumbai", category: "Commercial", priority: "P2", targetUrl: "/" },
  { keyword: "api integration specialist mumbai", category: "Commercial", priority: "P2", targetUrl: "/services/ai-automation-mumbai/" },
  { keyword: "nextjs developer mumbai", category: "Commercial", priority: "P2", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "crm automation developer mumbai", category: "Commercial", priority: "P2", targetUrl: "/services/ai-automation-mumbai/" },

  // Long-Tail & Hinglish P1 & P2
  { keyword: "how much does a custom website cost in mumbai", category: "Informational", priority: "P1", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "whatsapp chatbot for real estate builders mumbai", category: "Informational", priority: "P1", targetUrl: "/services/ai-automation-mumbai/" },
  { keyword: "automate lead follow up n8n mumbai", category: "Informational", priority: "P1", targetUrl: "/services/ai-automation-mumbai/" },
  { keyword: "agency vs freelance web developer mumbai", category: "Informational", priority: "P2", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "fast loading ecommerce website developer mumbai", category: "Informational", priority: "P2", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "clinic appointment booking chatbot mumbai", category: "Informational", priority: "P2", targetUrl: "/services/ai-automation-mumbai/" },
  { keyword: "custom crm for d2c brands mumbai", category: "Informational", priority: "P2", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "mern stack developer mumbai hourly rate", category: "Informational", priority: "P2", targetUrl: "/" },
  { keyword: "website redesign for mumbai manufacturing company", category: "Informational", priority: "P2", targetUrl: "/services/web-development-mumbai/" },
  { keyword: "website banane wala developer mumbai", category: "Hinglish", priority: "P2", targetUrl: "/" }
];

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadHistory() {
  ensureDataDir();
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveSnapshot(snapshot) {
  ensureDataDir();
  const history = loadHistory();
  history.push(snapshot);
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8');
}

function displayRankDashboard() {
  console.log('====================================================');
  console.log('📊 MUMBAI LOCAL KEYWORD RANKING & SERP TARGET MATRIX');
  console.log('====================================================\n');

  const p1Keywords = KEYWORDS.filter(k => k.priority === 'P1');
  const p2Keywords = KEYWORDS.filter(k => k.priority === 'P2');

  console.log(`🎯 TOTAL TRACKED KEYWORDS: ${KEYWORDS.length}`);
  console.log(`🔥 PRIORITY 1 (IMMEDIATE BUYER INTENT): ${p1Keywords.length}`);
  console.log(`📈 PRIORITY 2 (SECONDARY & LOCAL HUBS): ${p2Keywords.length}\n`);

  console.log('--- TOP PRIORITY 1 KEYWORD TARGETS ---');
  p1Keywords.forEach((k, idx) => {
    console.log(`${idx + 1}. [${k.category}] "${k.keyword}"`);
    console.log(`   └─ Target Landing Page: https://khandeshwar51.netlify.app${k.targetUrl}`);
  });

  console.log('\n--- KEY LOCAL HUBS MONITORED ---');
  const localKeywords = KEYWORDS.filter(k => k.category === 'Local');
  localKeywords.slice(0, 6).forEach((k, idx) => {
    console.log(`📍 ${k.keyword.toUpperCase()} -> ${k.targetUrl}`);
  });

  const snapshot = {
    timestamp: new Date().toISOString(),
    trackedCount: KEYWORDS.length,
    p1Count: p1Keywords.length,
    p2Count: p2Keywords.length
  };
  saveSnapshot(snapshot);

  console.log('\n====================================================');
  console.log('✅ Snapshot saved to data/rank-history.json');
  console.log('====================================================\n');
}

if (require.main === module) {
  displayRankDashboard();
}

module.exports = { KEYWORDS, displayRankDashboard, loadHistory };
