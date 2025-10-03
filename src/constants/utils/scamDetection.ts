// src/utils/scamDetection.ts

interface ScamPattern {
  pattern: RegExp;
  weight: number;
  description: string;
  category: string;
}

interface ScamResult {
  isScam: boolean;
  confidence: number;
  flags: string[];
  category?: string;
  recommendations: string[];
}

// Comprehensive scam detection patterns
const SCAM_PATTERNS: ScamPattern[] = [
  // Financial scams
  {
    pattern: /\b(won|win|winning|prize|lottery|jackpot)\b.*\b(₹|rupees?|rs\.?|dollars?|\$|amount)\s*\d+/i,
    weight: 85,
    description: 'Lottery/Prize winning claim',
    category: 'Financial Fraud'
  },
  {
    pattern: /\b(KBC|kaun banega crorepati).*\b(won|winner|prize|lottery)/i,
    weight: 90,
    description: 'KBC lottery scam',
    category: 'Financial Fraud'
  },
  {
    pattern: /\b(refund|cashback|credited).*\b(link|click|verify|update)/i,
    weight: 75,
    description: 'Fake refund/cashback message',
    category: 'Financial Fraud'
  },
  
  // Urgent action required
  {
    pattern: /\b(urgent|immediately|expire|suspended|blocked|deactivate|action required)\b/i,
    weight: 60,
    description: 'Urgency pressure tactics',
    category: 'Phishing'
  },
  {
    pattern: /\b(account|card|bank).*\b(suspended|blocked|locked|frozen|deactivated)/i,
    weight: 80,
    description: 'Account suspension threat',
    category: 'Phishing'
  },
  
  // Personal information requests
  {
    pattern: /\b(verify|confirm|update|provide|share).*\b(pan|aadhar|aadhaar|card number|cvv|otp|pin|password)/i,
    weight: 95,
    description: 'Requesting sensitive personal information',
    category: 'Identity Theft'
  },
  {
    pattern: /\b(otp|one time password|verification code).*\b(share|send|provide|give)/i,
    weight: 90,
    description: 'OTP sharing request',
    category: 'Identity Theft'
  },
  
  // Suspicious links
  {
    pattern: /\b(click|tap|visit).*\b(link|url|here|below)/i,
    weight: 50,
    description: 'Suspicious link request',
    category: 'Phishing'
  },
  {
    pattern: /(bit\.ly|tinyurl|goo\.gl|t\.co)\/[a-zA-Z0-9]+/i,
    weight: 55,
    description: 'Shortened URL detected',
    category: 'Phishing'
  },
  
  // Impersonation
  {
    pattern: /\b(we are|this is|calling from).*\b(bank|credit card|income tax|government|police|court)/i,
    weight: 70,
    description: 'Organization impersonation',
    category: 'Impersonation'
  },
  {
    pattern: /\b(income tax|IT department|GST|customs).*\b(notice|penalty|case|arrest|warrant)/i,
    weight: 85,
    description: 'Government agency impersonation',
    category: 'Impersonation'
  },
  
  // Investment scams
  {
    pattern: /\b(investment|invest|trading|crypto|bitcoin|forex).*\b(guaranteed|assured|risk-free|profit|returns)/i,
    weight: 80,
    description: 'Guaranteed investment returns',
    category: 'Investment Fraud'
  },
  {
    pattern: /\b(earn|make).*\b(₹|rs\.?|rupees)\s*\d+.*\b(daily|per day|from home|easy)/i,
    weight: 75,
    description: 'Get rich quick scheme',
    category: 'Investment Fraud'
  },
  
  // Job scams
  {
    pattern: /\b(job|work|employment).*\b(home|part time|part-time).*\b(earn|salary|payment)/i,
    weight: 65,
    description: 'Work from home scam',
    category: 'Employment Fraud'
  },
  {
    pattern: /\b(registration fee|security deposit|training fee).*\b(job|position|employment)/i,
    weight: 85,
    description: 'Job with upfront payment requirement',
    category: 'Employment Fraud'
  },
  
  // Romance/Relationship scams
  {
    pattern: /\b(love|relationship|marry|marriage).*\b(money|help|send|transfer|urgent)/i,
    weight: 70,
    description: 'Romance scam indicators',
    category: 'Romance Fraud'
  },
  
  // Package/Delivery scams
  {
    pattern: /\b(package|parcel|delivery|courier).*\b(pending|held|customs|clearance|fee)/i,
    weight: 75,
    description: 'Fake delivery notification',
    category: 'Delivery Fraud'
  },
  
  // Tech support scams
  {
    pattern: /\b(virus|malware|infected|hacked|security alert).*\b(call|contact|click|download)/i,
    weight: 80,
    description: 'Fake tech support alert',
    category: 'Tech Support Fraud'
  },
  
  // Charity scams
  {
    pattern: /\b(donate|donation|charity|help|contribute).*\b(urgent|immediately|now)/i,
    weight: 60,
    description: 'Suspicious charity request',
    category: 'Charity Fraud'
  }
];

// Suspicious keywords that add to score
const SUSPICIOUS_KEYWORDS = [
  'congratulations', 'selected', 'lucky', 'exclusive', 'limited time',
  'act now', 'don\'t miss', 'once in lifetime', 'free gift',
  'no risk', '100% guaranteed', 'call now', 'whatsapp', 'telegram'
];

// Legitimate patterns that reduce score
const LEGITIMATE_PATTERNS = [
  /from:.*@(gmail|yahoo|outlook|hotmail)\.com/i,
  /official.*website/i,
  /customer care.*toll free/i
];

export function analyzeForScam(text: string): ScamResult {
  let totalScore = 0;
  let maxWeight = 0;
  const detectedFlags: string[] = [];
  let primaryCategory = '';

  // Check against scam patterns
  SCAM_PATTERNS.forEach(({ pattern, weight, description, category }) => {
    if (pattern.test(text)) {
      totalScore += weight;
      detectedFlags.push(description);
      if (weight > maxWeight) {
        maxWeight = weight;
        primaryCategory = category;
      }
    }
  });

  // Check for suspicious keywords
  const keywordMatches = SUSPICIOUS_KEYWORDS.filter(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (keywordMatches.length > 0) {
    const keywordScore = Math.min(keywordMatches.length * 5, 30);
    totalScore += keywordScore;
    if (keywordMatches.length >= 3) {
      detectedFlags.push(`Multiple suspicious keywords: ${keywordMatches.slice(0, 3).join(', ')}`);
    }
  }

  // Check for legitimate patterns (reduce score)
  LEGITIMATE_PATTERNS.forEach(pattern => {
    if (pattern.test(text)) {
      totalScore = Math.max(0, totalScore - 20);
    }
  });

  // Check for excessive punctuation or capital letters
  const exclamationCount = (text.match(/!/g) || []).length;
  const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
  
  if (exclamationCount > 3) {
    totalScore += 10;
    detectedFlags.push('Excessive use of exclamation marks');
  }
  
  if (capsRatio > 0.3 && text.length > 20) {
    totalScore += 15;
    detectedFlags.push('Excessive capitalization');
  }

  // Normalize confidence score to 0-100
  const confidence = Math.min(Math.round(totalScore), 100);
  const isScam = confidence >= 50;

  // Generate recommendations
  const recommendations = generateRecommendations(confidence, detectedFlags, text);

  return {
    isScam,
    confidence,
    flags: detectedFlags,
    category: primaryCategory || 'General Fraud',
    recommendations
  };
}

function generateRecommendations(confidence: number, flags: string[], text: string): string[] {
  const recommendations: string[] = [];

  if (confidence >= 80) {
    recommendations.push('⛔ CRITICAL: Do not respond to this message');
    recommendations.push('Block and delete this message immediately');
    recommendations.push('Report to cybercrime portal: cybercrime.gov.in');
  } else if (confidence >= 50) {
    recommendations.push('⚠️ Exercise extreme caution');
    recommendations.push('Do not click any links or download attachments');
    recommendations.push('Verify sender through official channels');
  } else {
    recommendations.push('✓ Appears relatively safe, but stay vigilant');
    recommendations.push('Verify sender identity if requesting any action');
  }

  // Specific recommendations based on flags
  if (flags.some(f => f.includes('OTP') || f.includes('personal information'))) {
    recommendations.push('Never share OTP, PIN, CVV, or passwords with anyone');
    recommendations.push('Banks/Govt never ask for such details via SMS/call');
  }

  if (flags.some(f => f.includes('link') || f.includes('URL'))) {
    recommendations.push('Do not click on suspicious links');
    recommendations.push('Type official website URLs manually in browser');
  }

  if (flags.some(f => f.includes('prize') || f.includes('lottery'))) {
    recommendations.push('Legitimate lotteries never ask for payment to claim prizes');
    recommendations.push('If you didn\'t enter, you didn\'t win');
  }

  if (flags.some(f => f.includes('investment') || f.includes('returns'))) {
    recommendations.push('No legitimate investment offers guaranteed returns');
    recommendations.push('Consult certified financial advisors before investing');
  }

  if (flags.some(f => f.includes('urgent') || f.includes('suspended'))) {
    recommendations.push('Scammers create false urgency - take time to verify');
    recommendations.push('Contact organization directly using official contact info');
  }

  return recommendations;
}

export function checkPhoneNumber(phoneNumber: string): boolean {
  const suspiciousCountryCodes = ['+234', '+233', '+254', '+91'];
  return suspiciousCountryCodes.some(code => phoneNumber.startsWith(code));
}

export function checkURL(url: string): { isSuspicious: boolean; reason?: string } {
  try {
    const urlObj = new URL(url);
    
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(urlObj.hostname)) {
      return { isSuspicious: true, reason: 'Uses IP address instead of domain name' };
    }
    
    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz'];
    if (suspiciousTLDs.some(tld => urlObj.hostname.endsWith(tld))) {
      return { isSuspicious: true, reason: 'Uses suspicious domain extension' };
    }
    
    const legitimateDomains = ['amazon', 'google', 'facebook', 'bank', 'paytm', 'phonepe'];
    const hostname = urlObj.hostname.toLowerCase();
    
    for (const domain of legitimateDomains) {
      if (hostname.includes(domain) && !hostname.includes(`.${domain}.`)) {
        return { isSuspicious: true, reason: 'Possible domain impersonation' };
      }
    }
    
    return { isSuspicious: false };
  } catch {
    return { isSuspicious: true, reason: 'Invalid URL format' };
  }
}