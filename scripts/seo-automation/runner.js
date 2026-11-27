/**
 * Master Autonomous Local SEO & Ranking Orchestration Engine
 * Khandeshwar Suryavanshi — AI System Developer & Website Architect
 * 
 * Usage:
 *   node scripts/seo-automation/runner.js [command]
 * 
 * Commands:
 *   audit    - Run 100-point Technical & On-Page SEO Audit
 *   post     - Generate / Schedule this week's Google Business Profile post
 *   rank     - Display the 40 Mumbai Keyword SERP & Ranking Matrix
 *   review   - Generate a one-click WhatsApp client review request link
 *   all      - Run the full suite in one command (Default)
 */

const { runAudit } = require('./audit');
const { getCurrentWeekPost, getPostByWeek, displayPost } = require('./gbp-scheduler');
const { displayRankDashboard } = require('./rank-monitor');
const { generateReviewFunnel, displayFunnel } = require('./review-dispatcher');

const command = (process.argv[2] || 'all').toLowerCase();

console.clear();
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║   ⚡ KHANDESHWAR SURYAVANSHI — AUTONOMOUS SEO RANKING ENGINE  ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

switch (command) {
  case 'audit':
    runAudit();
    break;

  case 'post': {
    const weekNum = parseInt(process.argv[3], 10);
    const post = !isNaN(weekNum) ? getPostByWeek(weekNum) : getCurrentWeekPost();
    displayPost(post);
    break;
  }

  case 'rank':
    displayRankDashboard();
    break;

  case 'review': {
    const name = process.argv[3] || 'Client';
    const project = process.argv[4] || 'Custom Web Application';
    const phone = process.argv[5] || '';
    const funnel = generateReviewFunnel(name, project, phone);
    displayFunnel(funnel);
    break;
  }

  case 'all':
  default:
    console.log('--- STEP 1/3: EXECUTING TECHNICAL SEO AUDIT ---');
    runAudit();

    console.log('\n--- STEP 2/3: THIS WEEK\'S GOOGLE BUSINESS PROFILE UPDATE ---');
    const post = getCurrentWeekPost();
    displayPost(post);

    console.log('\n--- STEP 3/3: KEYWORD RANKING & SERP TARGET MATRIX ---');
    displayRankDashboard();

    console.log('\n====================================================');
    console.log('✨ SEO AUTOMATION SUITE COMPLETED SUCCESSFULLY');
    console.log('====================================================');
    console.log('Run specific commands anytime:');
    console.log('  node scripts/seo-automation/runner.js audit');
    console.log('  node scripts/seo-automation/runner.js post [weekNum]');
    console.log('  node scripts/seo-automation/runner.js rank');
    console.log('  node scripts/seo-automation/runner.js review [ClientName] [ProjectName]\n');
    break;
}
