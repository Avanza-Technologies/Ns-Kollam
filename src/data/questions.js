import CryptoJS from 'crypto-js';

const SECRET_KEY = 'avanza-secure-exam-2026-key-salt';

// Decryption helper function
export function decryptCorrectIndex(encryptedStr) {
  const bytes = CryptoJS.AES.decrypt(encryptedStr, SECRET_KEY);
  return parseInt(bytes.toString(CryptoJS.enc.Utf8), 10);
}

export const questions = [
  {
    "id": 1,
    "question": "UI stands for",
    "options": [
      "User Integration",
      "User Interface",
      "Universal Interface",
      "User Internet"
    ],
    "category": "General IT",
    "correctEncrypted": "U2FsdGVkX1+vHnOOPf+orGHW/xcwsLz0hghqqwOtVcg="
  },
  {
    "id": 2,
    "question": "Which cybersecurity principle ensures data is unchanged?",
    "options": [
      "Availability",
      "Integrity",
      "Confidentiality",
      "Authentication"
    ],
    "category": "Cybersecurity",
    "correctEncrypted": "U2FsdGVkX19Wt9u08/gf6+wjMxbl4bQ9Bk9wGL7D+5M="
  },
  {
    "id": 3,
    "question": "In Digital Marketing, which strategy improves organic search rankings?",
    "options": [
      "PPC",
      "SEO",
      "Email Marketing",
      "Display Ads"
    ],
    "category": "Digital Marketing",
    "correctEncrypted": "U2FsdGVkX1+k2RmiBB+V21elF1XVbcEfceg38vDqT7k="
  },
  {
    "id": 4,
    "question": "Which device connects multiple computers in a LAN?",
    "options": [
      "Router",
      "Switch",
      "Firewall",
      "Modem"
    ],
    "category": "Networking",
    "correctEncrypted": "U2FsdGVkX1+DekXXzseWYzuRAkBWI+yCI//YO14qUz4="
  },
  {
    "id": 5,
    "question": "Which of the following is a database?",
    "options": [
      "MySQL",
      "Java",
      "Python",
      "React"
    ],
    "category": "Databases",
    "correctEncrypted": "U2FsdGVkX19hmohCB0SlftlqRgKArE8zeATl5DDfrHk="
  },
  {
    "id": 6,
    "question": "Which C++ concept allows multiple functions with the same name?",
    "options": [
      "Overloading",
      "Overriding",
      "Inheritance",
      "Encapsulation"
    ],
    "category": "Programming",
    "correctEncrypted": "U2FsdGVkX1/YULc1Le/UUi4kSE21xF9KWpt7q1JWJoA="
  },
  {
    "id": 7,
    "question": "Which HTML element is used for forms?",
    "options": [
      "form",
      "table",
      "div",
      "span"
    ],
    "category": "Web Development",
    "correctEncrypted": "U2FsdGVkX187oDcMBE8PEPbCrIB/kjI1xxKsm6XAUKM="
  },
  {
    "id": 8,
    "question": "Which OSI layer is responsible for routing?",
    "options": [
      "Data Link",
      "Network",
      "Transport",
      "Session"
    ],
    "category": "Networking",
    "correctEncrypted": "U2FsdGVkX1+upuMPyNPu4M5f7zycXv6EhcabFA0SoDQ="
  },
  {
    "id": 9,
    "question": "Which metric measures classification accuracy?",
    "options": [
      "RMSE",
      "Precision",
      "MAE",
      "Variance"
    ],
    "category": "AI/ML",
    "correctEncrypted": "U2FsdGVkX1+6v+v0OhVU61hxJBDdMG7DKnUj3hX4e18="
  },
  {
    "id": 10,
    "question": "Which Python keyword defines a function?",
    "options": [
      "function",
      "define",
      "def",
      "func"
    ],
    "category": "Programming",
    "correctEncrypted": "U2FsdGVkX19TALuvasXLkFidPDmlI+B315b2FbW/rpw="
  },
  {
    "id": 11,
    "question": "Which digital marketing metric measures ad clicks?",
    "options": [
      "ROI",
      "CTR",
      "SEO",
      "Bounce Rate"
    ],
    "category": "Digital Marketing",
    "correctEncrypted": "U2FsdGVkX1+NbRgsp5X/bpCLvaDSElrlt+LM/eBAGQA="
  },
  {
    "id": 12,
    "question": "Which port does HTTPS use?",
    "options": [
      "20",
      "22",
      "80",
      "443"
    ],
    "category": "Networking",
    "correctEncrypted": "U2FsdGVkX1+qYoXB1EEt32dSblhgTKCOcEK36JpeScE="
  },
  {
    "id": 13,
    "question": "Which attack attempts to overload a server?",
    "options": [
      "SQL Injection",
      "DDoS",
      "Phishing",
      "Brute Force"
    ],
    "category": "Cybersecurity",
    "correctEncrypted": "U2FsdGVkX1/T9JNa0pQCZhOqtmwYBvrtDKxPc2q4YeE="
  },
  {
    "id": 14,
    "question": "Which Linux command changes file permissions?",
    "options": [
      "chmod",
      "chown",
      "mkdir",
      "grep"
    ],
    "category": "Linux",
    "correctEncrypted": "U2FsdGVkX18ssuv5sX+4WOAKfbO1CxtrvYLu5av4qh8="
  },
  {
    "id": 15,
    "question": "Which Linux command continuously monitors log files?",
    "options": [
      "cat",
      "tail -f",
      "head",
      "grep"
    ],
    "category": "Linux",
    "correctEncrypted": "U2FsdGVkX1+79YSZXtxSnISYXYirWWTuEm8smirLQ8o="
  },
  {
    "id": 16,
    "question": "In Java, which collection prevents duplicate elements?",
    "options": [
      "List",
      "Queue",
      "Set",
      "ArrayList"
    ],
    "category": "Programming",
    "correctEncrypted": "U2FsdGVkX1+DZEC6z7OCjCSPY5177QvBAdzBYqz1q9k="
  },
  {
    "id": 17,
    "question": "Which programming language is widely used for data analysis?",
    "options": [
      "HTML",
      "CSS",
      "Python",
      "XML"
    ],
    "category": "Programming",
    "correctEncrypted": "U2FsdGVkX1+m7Mrph1v0wrC0kBWA+ZhLVkUVUoYfang="
  },
  {
    "id": 18,
    "question": "Which cloud model offers maximum control?",
    "options": [
      "SaaS",
      "PaaS",
      "IaaS",
      "FaaS"
    ],
    "category": "Cloud",
    "correctEncrypted": "U2FsdGVkX1/NItvEwgHind30YyH2pQfDurj/u/egHss="
  },
  {
    "id": 19,
    "question": "Which Git command uploads commits?",
    "options": [
      "git clone",
      "git push",
      "git pull",
      "git fetch"
    ],
    "category": "Development Tools",
    "correctEncrypted": "U2FsdGVkX1+KpRkW4duG2ld4Co6ysQxXEIemhZOgDVg="
  },
  {
    "id": 20,
    "question": "Which protocol resolves domain names?",
    "options": [
      "DHCP",
      "DNS",
      "FTP",
      "SMTP"
    ],
    "category": "Networking",
    "correctEncrypted": "U2FsdGVkX19sCf4OvMcxDBl1YrV1/IC0B9U4tUJOBoE="
  },
  {
    "id": 21,
    "question": "Which Linux command searches for text?",
    "options": [
      "cat",
      "grep",
      "cp",
      "mv"
    ],
    "category": "Linux",
    "correctEncrypted": "U2FsdGVkX18s+lZ0lUtcuVIzPi7F8kmTrLz+IC85Vms="
  },
  {
    "id": 22,
    "question": "What does HTTP stand for?",
    "options": [
      "Hyper Text Transfer Protocol",
      "Hyper Terminal Transfer Protocol",
      "High Transfer Text Protocol",
      "Hyper Text Transmission Process"
    ],
    "category": "Networking",
    "correctEncrypted": "U2FsdGVkX19jIShK+nFVDLRAXcWyoR2tHw4s46+stT0="
  },
  {
    "id": 23,
    "question": "Which AWS service provides virtual servers?",
    "options": [
      "S3",
      "EC2",
      "Lambda",
      "IAM"
    ],
    "category": "Cloud",
    "correctEncrypted": "U2FsdGVkX19G4MAp2Y7yu2tRDxqcCzmBPRds4asNYAM="
  },
  {
    "id": 24,
    "question": "Java is a",
    "options": [
      "Database",
      "Programming Language",
      "Browser",
      "Operating System"
    ],
    "category": "Programming",
    "correctEncrypted": "U2FsdGVkX1/1JimQyf78Ov/mhOJ4IvhXrG+vXaWO05M="
  },
  {
    "id": 25,
    "question": "Which HTML tag creates a hyperlink?",
    "options": [
      "<img>",
      "<link>",
      "<a>",
      "<href>"
    ],
    "category": "Web Development",
    "correctEncrypted": "U2FsdGVkX19Uw4jY4hEmbeyZAvYRu9qQRT59lSm/jZY="
  },
  {
    "id": 26,
    "question": "UX mainly focuses on",
    "options": [
      "Coding",
      "User Experience",
      "Database",
      "Networking"
    ],
    "category": "UI/UX",
    "correctEncrypted": "U2FsdGVkX18swdt0U3tNVBcZI9gBtwUHho3FYhsDR40="
  },
  {
    "id": 27,
    "question": "Which HTTP status code means Not Found?",
    "options": [
      "200",
      "301",
      "404",
      "500"
    ],
    "category": "Web Development",
    "correctEncrypted": "U2FsdGVkX1+Il8rAeM26Pbkt9pKcJB/Pmb14oOBlytM="
  },
  {
    "id": 28,
    "question": "Which IP address belongs to Class C?",
    "options": [
      "10.0.0.1",
      "172.16.0.1",
      "192.168.1.1",
      "224.0.0.1"
    ],
    "category": "Networking",
    "correctEncrypted": "U2FsdGVkX1+MdZke6mz3DTFH33jD6mJspol4sMJ/4qg="
  },
  {
    "id": 29,
    "question": "Which AWS service provides serverless computing?",
    "options": [
      "EC2",
      "Lambda",
      "RDS",
      "ECS"
    ],
    "category": "Cloud",
    "correctEncrypted": "U2FsdGVkX187EiQdxPlTiwKbN7hQZVq5vJ6deKg3gfk="
  },
  {
    "id": 30,
    "question": "Which AI model generates human-like text?",
    "options": [
      "CNN",
      "GPT",
      "SVM",
      "KNN"
    ],
    "category": "AI/ML",
    "correctEncrypted": "U2FsdGVkX19qyUZMrDxznPm7RhWYVfTheiiuwrJ5LJY="
  },
  {
    "id": 31,
    "question": "Which Java keyword is used for inheritance?",
    "options": [
      "implement",
      "extends",
      "inherits",
      "super"
    ],
    "category": "Programming",
    "correctEncrypted": "U2FsdGVkX1+AJ/96Ol/jKivl1mqJHCEoEDWWhgVDTDY="
  },
  {
    "id": 32,
    "question": "Which protocol is used to securely browse websites?",
    "options": [
      "FTP",
      "HTTP",
      "HTTPS",
      "SMTP"
    ],
    "category": "Networking",
    "correctEncrypted": "U2FsdGVkX18Rwf57GRCyXpUAe67RmK+EhuIptPFON4o="
  },
  {
    "id": 33,
    "question": "JavaScript runs primarily on",
    "options": [
      "Database",
      "Browser",
      "Switch",
      "Router"
    ],
    "category": "Web Development",
    "correctEncrypted": "U2FsdGVkX1+7DtGhkxXeA2GRtEvvDil8Z1O4eMdxQ4c="
  },
  {
    "id": 34,
    "question": "SQL Injection mainly targets",
    "options": [
      "Browser",
      "Database",
      "Firewall",
      "Router"
    ],
    "category": "Cybersecurity",
    "correctEncrypted": "U2FsdGVkX1+m/hkxCzF5vWkhwxGXLt45r3sD0zxc5vY="
  },
  {
    "id": 35,
    "question": "Which UI/UX principle reduces user cognitive load?",
    "options": [
      "Consistency",
      "Random Layout",
      "More Animations",
      "More Colors"
    ],
    "category": "UI/UX",
    "correctEncrypted": "U2FsdGVkX18cFtYElR53Y4kNNBNRpFk6Wd5gbjfwaNA="
  },
  {
    "id": 36,
    "question": "Which Python data structure stores unique values?",
    "options": [
      "List",
      "Tuple",
      "Set",
      "Dictionary"
    ],
    "category": "Programming",
    "correctEncrypted": "U2FsdGVkX1+CuWQw3yg2vCPPKBbio5qUtEyOTCfWkrU="
  },
  {
    "id": 37,
    "question": "Which Linux command shows the current working directory?",
    "options": [
      "pwd",
      "ls",
      "cd",
      "mkdir"
    ],
    "category": "Linux",
    "correctEncrypted": "U2FsdGVkX1+4cwWzJ1tsqZly26rz25depiX2T/Mrpi4="
  },
  {
    "id": 38,
    "question": "Which protocol automatically assigns IP addresses?",
    "options": [
      "DNS",
      "DHCP",
      "FTP",
      "SNMP"
    ],
    "category": "Networking",
    "correctEncrypted": "U2FsdGVkX1+ii2Y83uF2IrJnN/Gmfnya+ErQChgUKOY="
  },
  {
    "id": 39,
    "question": "Which command displays network configuration in Windows?",
    "options": [
      "ping",
      "ipconfig",
      "route",
      "netstat"
    ],
    "category": "Networking",
    "correctEncrypted": "U2FsdGVkX187sLHx8NEjzhCaRIZf3CIbxrwVf3evFUQ="
  },
  {
    "id": 40,
    "question": "In Python, what does __name__ == '__main__' indicate?",
    "options": [
      "Package",
      "Main execution block",
      "Function",
      "Class"
    ],
    "category": "Programming",
    "correctEncrypted": "U2FsdGVkX181P7N5SCAMsKFTSD2eqThnWpo/45sVgGE="
  },
  {
    "id": 41,
    "question": "SQL is mainly used for",
    "options": [
      "Designing websites",
      "Managing databases",
      "Image editing",
      "Networking"
    ],
    "category": "Databases",
    "correctEncrypted": "U2FsdGVkX1+HnakLRalYFSjDjBPlJxsgPSVLs61bK7U="
  },
  {
    "id": 42,
    "question": "Which language is commonly used for Android development?",
    "options": [
      "Java",
      "PHP",
      "SQL",
      "CSS"
    ],
    "category": "Programming",
    "correctEncrypted": "U2FsdGVkX1/w0zeh7ti9IaQ4ZbS4Qdi8BLe3814uaI8="
  },
  {
    "id": 43,
    "question": "Which device filters network traffic?",
    "options": [
      "Hub",
      "Firewall",
      "Switch",
      "NIC"
    ],
    "category": "Networking",
    "correctEncrypted": "U2FsdGVkX1/Iz/0dnNgE/9CEUFqzNiBRE+8L06cEQzM="
  },
  {
    "id": 44,
    "question": "Which network attack exploits the ARP protocol?",
    "options": [
      "SQL Injection",
      "ARP Spoofing",
      "XSS",
      "CSRF"
    ],
    "category": "Cybersecurity",
    "correctEncrypted": "U2FsdGVkX1/acqP1Lg8r0Sv05MnVjFRHk9Po/hnoYAI="
  },
  {
    "id": 45,
    "question": "Which AWS service stores objects?",
    "options": [
      "EC2",
      "Lambda",
      "S3",
      "IAM"
    ],
    "category": "Cloud",
    "correctEncrypted": "U2FsdGVkX1/L/jWACLJUCPIFWDsTnCDeYPIoxreawj8="
  },
  {
    "id": 46,
    "question": "CSS is mainly used for",
    "options": [
      "Database",
      "Styling webpages",
      "Backend",
      "Networking"
    ],
    "category": "Web Development",
    "correctEncrypted": "U2FsdGVkX1/6oLD5OFhnAScogLz5qIVR4YAMfH5RKm4="
  },
  {
    "id": 47,
    "question": "Which machine learning algorithm is supervised?",
    "options": [
      "K-Means",
      "Decision Tree",
      "PCA",
      "Apriori"
    ],
    "category": "AI/ML",
    "correctEncrypted": "U2FsdGVkX18QZ1LCAZPHZw8TUmRX4NSGfX7Jz537RuI="
  },
  {
    "id": 48,
    "question": "What is the default SSH port?",
    "options": [
      "20",
      "21",
      "22",
      "23"
    ],
    "category": "Networking",
    "correctEncrypted": "U2FsdGVkX1/wwMafeOkebfCgJUvu4vtLEHlU3dDXJbE="
  },
  {
    "id": 49,
    "question": "What does CPU stand for?",
    "options": [
      "Central Process Unit",
      "Central Processing Unit",
      "Computer Processing Unit",
      "Core Processing Unit"
    ],
    "category": "Hardware",
    "correctEncrypted": "U2FsdGVkX19mTYpCMSeY96V1sSk5o5z5IyMjQdFv0pU="
  },
  {
    "id": 50,
    "question": "Which SQL statement retrieves records?",
    "options": [
      "INSERT",
      "UPDATE",
      "SELECT",
      "DELETE"
    ],
    "category": "Databases",
    "correctEncrypted": "U2FsdGVkX1/XhUMQowZsA5IHpUH1c9rF+RaHW5JY2uU="
  }
];
