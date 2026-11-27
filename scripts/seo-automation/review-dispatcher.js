/**
 * Automated WhatsApp Review Request Funnel Generator
 * Khandeshwar Suryavanshi — Portfolio & Services
 * 
 * Generates personalized, high-conversion WhatsApp review request sequences
 * with direct Google Business Profile links.
 */

const DEFAULT_REVIEW_LINK = "https://g.page/r/your-google-review-link"; // User replaces with their GBP review link

function generateReviewFunnel(clientName = "Client", projectName = "Website & System", phone = "") {
  const initialMsg = `Hi ${clientName}, hope you're having a productive week! It was a pleasure building the ${projectName} for you. If you're happy with how smoothly and fast everything launched, could you take 30 seconds to drop an honest 5-star review on my Google profile? It helps an independent developer in Mumbai tremendously: 👉 ${DEFAULT_REVIEW_LINK} Thank you so much for your support!`;

  const followUpDay3 = `Hi ${clientName}! Just checking in to see how the ${projectName} has been performing this week. Everything running seamlessly? Also, no pressure at all, but here’s that quick Google review link whenever you have a minute: 👉 ${DEFAULT_REVIEW_LINK} Have a great day!`;

  const followUpDay7 = `Hey ${clientName}, hope your weekend was great! If you have just 20 seconds today, leaving a quick review on Google really helps local businesses find my development services: 👉 ${DEFAULT_REVIEW_LINK} Thanks again for your trust and collaboration!`;

  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const initialUrl = cleanPhone 
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(initialMsg)}`
    : `https://wa.me/?text=${encodeURIComponent(initialMsg)}`;

  const day3Url = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(followUpDay3)}`
    : `https://wa.me/?text=${encodeURIComponent(followUpDay3)}`;

  return {
    clientName,
    projectName,
    initialMsg,
    followUpDay3,
    followUpDay7,
    initialUrl,
    day3Url
  };
}

function displayFunnel(funnel) {
  console.log('====================================================');
  console.log(`💬 AUTOMATED WHATSAPP REVIEW FUNNEL: [${funnel.clientName} - ${funnel.projectName}]`);
  console.log('====================================================\n');

  console.log('📌 1. IMMEDIATE DELIVERY MESSAGE (Day 0 - Post Launch):');
  console.log('----------------------------------------------------');
  console.log(funnel.initialMsg);
  console.log('\n📲 One-Click WhatsApp Link:');
  console.log(funnel.initialUrl);
  console.log('\n----------------------------------------------------');

  console.log('\n📌 2. GENTLE FOLLOW-UP MESSAGE (Day 3):');
  console.log('----------------------------------------------------');
  console.log(funnel.followUpDay3);
  console.log('\n📲 One-Click WhatsApp Link:');
  console.log(funnel.day3Url);

  console.log('\n====================================================');
  console.log('💡 Tip: Just click the One-Click WhatsApp link to open WhatsApp with the message pre-typed!');
  console.log('====================================================\n');
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const clientName = args[0] || "Client";
  const projectName = args[1] || "Custom Web Application";
  const phone = args[2] || "";

  const funnel = generateReviewFunnel(clientName, projectName, phone);
  displayFunnel(funnel);
}

module.exports = { generateReviewFunnel, displayFunnel };
