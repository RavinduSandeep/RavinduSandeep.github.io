/*
 * ============================================================================
 *  PORTFOLIO CONTENT — single source of truth
 * ----------------------------------------------------------------------------
 *  Ravindu Madanayaka — Engineering Portfolio
 *
 *  Edit this file to update the site. Nothing here requires touching layout,
 *  CSS or the render logic. To add a project, copy an object inside
 *  `projects[]` and fill in the fields. Fields marked  // VERIFY  hold
 *  information that should be confirmed before publishing.
 *
 *  This file is loaded before main.js and exposes a global `PORTFOLIO`.
 * ============================================================================
 */

const PORTFOLIO = {
  /* ---------------------------------------------------------------- profile */
  profile: {
    name: "Ravindu Madanayaka",
    monogram: "RAVINDU.",
    // Headline positioning — the first thing a visitor reads.
    headline: "Engineering intelligent systems, from hardware to software.",
    // One supporting sentence. Evidence-based, no filler.
    subline:
      "Electrical & Electronic Engineer working across industrial automation, embedded electronics, PCB design and supervisory software — building complete systems, not isolated parts.",
    location: "Sri Lanka",
    // Public links only. Leave a value empty ("") to hide the related button.
    email: "ravindumsandeep@gmail.com",
    github: "https://github.com/RavinduSandeep",
    linkedin: "https://www.linkedin.com/in/ravindu-sandeep/",
    scholar: "https://scholar.google.com/citations?user=dVNjvdkAAAAJ&hl=en",
    // Path to your CV. Replace assets/docs/Ravindu-Madanayaka-CV.pdf with the
    // real file (a placeholder is committed so the link never 404s).
    resume: "assets/docs/Ravindu-Madanayaka-CV.pdf",
    // Short roles shown as rotating / listed descriptors in the hero.
    roles: [
      "Automation Engineer",
      "Embedded & Electronics Engineer",
      "Industrial Automation",
      "IoT Developer",
      "PCB / Hardware Design",
      "R&D Engineer",
    ],
  },

  /* -------------------------------------------------- engineering profile */
  // The "full stack" of engineering — presented visually, not as a paragraph.
  stack: [
    {
      layer: "Hardware",
      note: "PCB design, sensors, load cells, motor drivers, power systems",
    },
    {
      layer: "Embedded",
      note: "Microcontrollers, firmware, real-time control, embedded ML",
    },
    {
      layer: "Automation",
      note: "PLC programming, HMI/SCADA, servo & VFD integration",
    },
    {
      layer: "Edge / Compute",
      note: "Raspberry Pi supervisory control, vision, data pipelines",
    },
    {
      layer: "Digital Interface",
      note: "Web HMI, dashboards, Power Platform digitalization",
    },
  ],

  /* ------------------------------------------------------- hero dataflow */
  // Nodes for the animated hero system diagram.
  dataflow: ["Sensor", "MCU", "Control", "Edge Compute", "Web HMI"],

  /* ------------------------------------------------------------ projects */
  /*
   * Each project renders as a case-study card; the strongest ones open a
   * detailed modal. Keep claims verifiable — do not invent metrics.
   *
   *  featured : true  -> larger card + opens full case study
   *  images   : first image is the card cover; all show in the gallery
   *  links    : { github, demo, caseStudy } — omit or "" to hide a button
   */
  projects: [
    {
      id: "tea-blending",
      title: "Automated Tea Blending Machine",
      category: "Industrial Automation",
      featured: true,
      year: "2025 – Present",
      cover: "assets/images/tea-blending-cover.svg", // branded schematic — replace with a real photo when cleared for publication
      coverFit: "cover",
      problem:
        "Produce consistent, repeatable custom tea blends with supervisory control and remote oversight across distributed teams.",
      challenge:
        "A custom blending machine had to combine precise mechanical dispensing, firmware-level actuator control and a supervisory layer — developed collaboratively with teams in London and Cyprus, so the control architecture and documentation had to be clear across sites.",
      solution:
        "A layered control architecture: firmware handles the real-time actuator and dispensing hardware, while a Raspberry Pi 5 acts as the supervisory controller coordinating recipes and system state. Mechanical assemblies were designed and modelled in SolidWorks, then fabricated and integrated.",
      contribution: [
        "3D design & modelling of mechanical assemblies (SolidWorks)",
        "Fabrication and hardware integration",
        "Firmware development for actuator / dispensing control",
        "Supervisory-level control on Raspberry Pi 5",
        "Parallel work on an AI-integrated, remotely controllable teleconferencing robot",
      ],
      architecture: [
        "Sensors & Actuators",
        "Firmware (MCU)",
        "Raspberry Pi 5 (Supervisory)",
        "Recipe / State Control",
      ],
      tech: [
        "Raspberry Pi 5",
        "SolidWorks",
        "Firmware",
        "Embedded Control",
        "Industrial Integration",
      ],
      result:
        "An integrated blending system spanning mechanical design, firmware and supervisory software, developed with international teams. Detailed performance figures are confidential to the employer and are intentionally not published here.",
      links: {},
      confidential: true,
    },
    {
      id: "uav-crop",
      title: "UAV-Based Remote Sensing for Crop Management",
      category: "R&D / Machine Learning",
      featured: true,
      year: "2024",
      cover: "assets/images/project-1.jpg",
      problem:
        "Detect paddy crop disease early and affordably, without specialised multispectral hardware.",
      challenge:
        "Multispectral crop-sensing rigs are expensive. The goal was early paddy-disease detection using only low-cost RGB imagery from a custom UAV, then making the results usable by non-technical growers.",
      solution:
        "A custom quadcopter carrying an STM32-based flight/sensor payload captured RGB imagery, which was processed by a machine-learning pipeline (Random Forest with OpenCV feature extraction) to classify disease indicators. Results were surfaced through a web application for accessibility.",
      contribution: [
        "Component selection & system design",
        "Circuit and PCB design + manual PCB printing",
        "STM32 firmware and sensor integration (IMU, barometer, magnetometer, GPS)",
        "3D modelling and airframe build",
        "Machine-learning disease-detection model",
        "Documentation",
      ],
      architecture: [
        "UAV RGB Camera",
        "STM32 Payload",
        "Image Capture",
        "ML Classifier (Random Forest / OpenCV)",
        "Web Application",
      ],
      tech: [
        "STM32F411",
        "Raspberry Pi Camera",
        "MPU6050",
        "BMP280",
        "GY-271",
        "NEO-6M GPS",
        "Python",
        "OpenCV",
        "Random Forest",
        "PCB",
      ],
      result:
        "1st Runner-Up, Research & Innovation Exhibition — 8th Annual Research Symposium, Faculty of Technology, University of Colombo, 2024. The work led to two peer-reviewed publications (see Publications).",
      links: { caseStudy: "https://scholar.google.com/citations?user=dVNjvdkAAAAJ&hl=en" },
    },
    {
      id: "stretching-machine",
      title: "Garment Tube Stretching Machine",
      category: "Industrial Automation",
      featured: true,
      year: "2025",
      cover: "assets/images/project-6.png",
      coverFit: "contain",
      problem:
        "Eliminate crush marks on an 18,000-pc Lululemon order while removing manual tube stretching by team members.",
      challenge:
        "Garment tubes developed crush marks and were stretched manually by a minimum of four workers per cycle — poor for ergonomics, safety and consistency, with no repeatable stretch length. The line needed an automated machine an operator could load and let run.",
      solution:
        "A full machine designed and fabricated in SolidWorks, driven by a Xinje XC-series PLC with NEMA 34 stepper motors and a KINCO HMI for precise, repeatable stretching. The operator loads tubes and the machine completes the sequence autonomously — up to four tubes per cycle.",
      contribution: [
        "SolidWorks mechanical design & fabrication",
        "Complete machine wiring and panel board",
        "PLC programming (Xinje XC series) and HMI-controlled sequence",
        "Delta servo encoder interfacing with the PLC",
        "VFD configuration for dye-machine integration",
        "PT100 & level sensor installation and full machine testing",
      ],
      architecture: [
        "Operator Load (≤4 tubes)",
        "Sensors (PT100 / Level)",
        "Xinje XC PLC",
        "Stepper / Servo Drive",
        "KINCO HMI",
      ],
      tech: [
        "Xinje XC3-14RT PLC",
        "NEMA 34 Stepper",
        "Delta Servo",
        "KINCO HMI",
        "VFD",
        "SolidWorks",
        "PT100",
      ],
      result:
        "Delivered an automated stretching machine that cut labour from 4 workers to 1 operator, processes up to 4 tubes per cycle, and lets operators do parallel tasks during operation — improving productivity, consistency and safety. Completed; started 23 Apr 2025 (Industrial Engineering).",
      links: {},
    },
    {
      id: "fabric-inspection",
      title: "Fabric Inspection Digitalization",
      category: "Digitalization",
      featured: true,
      year: "2025",
      cover: "assets/images/fabric-inspection.png",
      coverFit: "contain",
      problem:
        "Transform a manual, A4 paper-based fabric inspection process into a real-time digital system.",
      challenge:
        "Inspectors recorded results on A4 sheets, so FTT (First-Time-Through) and defect rates were calculated by hand, multiple inspectors couldn't work without conflict, and visibility for team leaders was delayed.",
      solution:
        "A Power Apps application (Fabric Inspection & Operations Tracker) used by team members on tablets. The flow runs Batch In → Admin Panel → Fabric Inspection → Live Dashboard, with appraisals raised, DE/FC notified, defects reviewed, and reports auto-generated. FTT and defect summaries are calculated automatically and exported as PDF/Word.",
      contribution: [
        "Power Apps app: login, batch details, approval, inspected-batch reports, member assignment, admin panel",
        "Real-time batch & member tracking supporting multiple inspectors without conflict",
        "Automatic FTT and defect-rate calculation, reducing manual errors",
        "Task allocation via notifications & live dashboards",
        "Auto-generated FTT/defect reports exported to PDF/Word (Power Automate)",
      ],
      architecture: [
        "Batch In",
        "Admin Panel",
        "Fabric Inspection (Power Apps)",
        "Live Dashboard",
        "Report Generation (PDF/Word)",
      ],
      tech: [
        "Power Apps",
        "Power Automate",
        "Power BI",
        "SharePoint",
        "Copilot Studio",
        "SQL",
      ],
      result:
        "Eliminated A4 paper records, enabled real-time batch and member tracking across inspectors, and auto-generated FTT and defect reports — improving data visibility and decision-making. Completed; started 23 Apr 2025 (Product Development).",
      links: {},
    },
    {
      id: "scada-room",
      title: "SCADA Smart Room Control System",
      category: "Automation",
      featured: false,
      year: "2024",
      cover: "assets/images/project-2.png",
      problem:
        "Monitor and control room environment (temperature, humidity) from a supervisory interface.",
      challenge:
        "Build a supervisory control interface that reads live sensor data and drives control modes from a single dashboard.",
      solution:
        "A SCADA-style control panel with live temperature/humidity plotting and manual/auto control modes, backed by a Python-driven data and plotting layer.",
      contribution: [
        "Control interface design",
        "Live data acquisition & plotting",
        "Manual / automatic control logic",
      ],
      architecture: [
        "Sensors",
        "Controller",
        "Python Data Layer",
        "SCADA Dashboard",
      ],
      tech: ["SCADA", "Python", "Sensors", "HMI", "Control Systems"],
      result:
        "A working supervisory dashboard with live environmental monitoring and dual control modes.",
      links: {},
    },
    {
      id: "pick-place",
      title: "Automated Pick-and-Place System",
      category: "Automation",
      featured: false,
      year: "2023",
      cover: "assets/images/project-4.png", // VERIFY: reuse of conveyor image — replace if a dedicated photo exists
      problem:
        "Improve precision and repeatability in automated material handling.",
      challenge:
        "Prototype a robotic pick-and-place cell coordinating pneumatics, sensing and motion for reliable placement.",
      solution:
        "An S7-200 PLC coordinates pneumatic cylinders, proximity sensors and servo/stepper motion with vacuum grippers, supervised through HMI/SCADA.",
      contribution: [
        "PLC control logic (S7-200)",
        "Pneumatic & motion integration",
        "Sensor and gripper integration",
        "HMI / SCADA supervision",
      ],
      architecture: [
        "Proximity Sensors",
        "S7-200 PLC",
        "Pneumatics + Servo/Stepper",
        "Vacuum Gripper",
        "HMI / SCADA",
      ],
      tech: [
        "S7-200 PLC",
        "Pneumatics",
        "Servo / Stepper",
        "Vacuum Gripper",
        "HMI",
        "SCADA",
      ],
      result:
        "A functional prototype demonstrating precise, repeatable automated placement.",
      links: {},
    },
    {
      id: "rfid-lock",
      title: "Smart RFID Door Lock System",
      category: "IoT / Embedded",
      featured: false,
      year: "2023",
      cover: "assets/images/project-3.jpg",
      problem:
        "Grant door access only to authorised individuals, managed from a phone.",
      challenge:
        "Combine RFID authentication with a mobile-controlled locking mechanism.",
      solution:
        "An RFID-based access controller that grants entry to authorised tags, with control exposed through a mobile application.",
      contribution: [
        "RFID access-control electronics",
        "Locking mechanism integration",
        "Mobile app control",
      ],
      architecture: [
        "RFID Reader",
        "Microcontroller",
        "Lock Actuator",
        "Mobile App",
      ],
      tech: ["RFID", "Embedded", "Microcontroller", "Mobile App", "IoT"],
      result:
        "Presented at the University Annual Research Symposium 2023 Exhibition.",
      links: {},
    },
    {
      id: "panel-wiring",
      title: "Dip-Dye Machine Panel Wiring",
      category: "Industrial Automation",
      featured: false,
      year: "2025",
      cover: "assets/images/project-7.png",
      problem:
        "Wire and integrate the control panel for a dip-dye machine.",
      challenge:
        "Deliver clean, correct panel board wiring and field-sensor integration for a production dye machine.",
      solution:
        "Complete control-panel wiring with VFD configuration, PT100 and level-sensor installation, and full machine testing.",
      contribution: [
        "Panel board wiring",
        "VFD configuration",
        "PT100 & level sensor installation",
        "Machine commissioning & testing",
      ],
      architecture: ["Field Sensors", "Control Panel", "VFD", "Machine"],
      tech: ["Panel Wiring", "VFD", "PT100", "Industrial Control"],
      result:
        "Delivered a wired, configured and tested control panel for the dye machine.",
      links: {},
    },
    {
      id: "conveyor",
      title: "Conveyor Belt Automation",
      category: "Automation",
      featured: false,
      year: "2023",
      cover: "assets/images/project-4.png",
      problem: "Automate material transport with sequenced control.",
      challenge:
        "Implement sensor-driven conveyor sequencing as a controls exercise.",
      solution:
        "A PLC-controlled conveyor with sensor-driven sequencing and actuator control.",
      contribution: ["PLC control logic", "Sensor & actuator integration"],
      architecture: ["Sensors", "PLC", "Motor / Actuators", "Conveyor"],
      tech: ["PLC", "Sensors", "Motor Control", "Automation"],
      result: "A working sensor-driven conveyor automation demonstrator.",
      links: {},
    },
  ],

  /* -------------------------------------------------------- capabilities */
  // Grouped by discipline — no meaningless percentage bars.
  capabilities: [
    {
      group: "Industrial Automation",
      items: [
        "PLC programming (Xinje XC, Siemens S7-200)",
        "HMI development (KINCO)",
        "SCADA systems",
        "Servo & VFD integration",
        "Sensors & instrumentation (PT100, level, proximity)",
        "Pneumatic & hydraulic systems",
        "Machine wiring & panel building",
      ],
    },
    {
      group: "Embedded & Electronics",
      items: [
        "Microcontrollers (STM32, ESP32, Arduino)",
        "Raspberry Pi supervisory control",
        "PCB design & manual fabrication",
        "Sensor & load-cell interfacing",
        "Motor drivers (stepper / DC / servo)",
        "Embedded machine learning",
        "IoT connectivity",
      ],
    },
    {
      group: "Software",
      items: [
        "Python",
        "C / C++",
        "Java",
        "C#",
        "Flask / web applications",
        "Ladder logic",
        "SQL / databases",
      ],
    },
    {
      group: "Digitalization",
      items: [
        "Power Apps",
        "Power Automate",
        "Power BI",
        "SharePoint",
        "Copilot Studio",
        "Workflow automation",
      ],
    },
    {
      group: "Design & Prototyping",
      items: [
        "SolidWorks (3D modelling & fabrication)",
        "AutoCAD",
        "Electrical & circuit design",
        "PCB prototyping",
        "Electronics assembly & soldering",
      ],
    },
    {
      group: "AI / Data",
      items: [
        "Machine learning",
        "Computer vision (OpenCV)",
        "Data analysis",
        "Random Forest / classical ML",
      ],
    },
  ],

  /* ---------------------------------------------------------- experience */
  experience: [
    {
      company: "Richard Pieris & Company PLC (ARPICO)",
      role: "Engineer — Electrical & Electronic",
      period: "Nov 2025 – Present",
      location: "Mattegoda, Sri Lanka",
      summary:
        "Developing a fully automated custom tea blending machine with teams in London and Cyprus — from mechanical design and firmware to supervisory control.",
      points: [
        "3D design/modelling (SolidWorks), fabrication, firmware and Raspberry Pi 5 supervisory control for a custom tea blending machine",
        "Contributed to an off-grid LiFePO4 battery pack with BMS",
        "Parallel development of an AI-integrated, fully remote-controllable teleconferencing robot",
      ],
      tech: ["Raspberry Pi 5", "SolidWorks", "Firmware", "BMS / LiFePO4", "AI"],
    },
    {
      company: "MAS Active — Linea Intimo",
      role: "Intern — Autonomation Engineer",
      period: "Jan 2025 – Oct 2025",
      location: "Biyagama, Sri Lanka",
      summary:
        "Designed, fabricated and automated a garment stretching machine, and digitalized shopfloor processes on the Microsoft Power Platform.",
      points: [
        "Full stretching machine: SolidWorks design, wiring and Xinje XC-series PLC programming",
        "Delta servo encoder interfacing, VFD configuration for dye-machine integration, panel wiring, PT100/level sensors and machine testing",
        "Digitalized fabric inspection with Power Apps, Power Automate and Power BI",
        "Applied 5S, Kaizen, KPI tracking and TPM practices",
      ],
      tech: ["Xinje PLC", "Delta Servo", "VFD", "Power Platform", "SolidWorks"],
    },
    {
      company: "D Samson Industries (Pvt) Ltd",
      role: "Intern — Research & Development Engineer",
      period: "Aug 2023 – Jan 2024",
      location: "Galle, Sri Lanka",
      summary:
        "R&D across custom industrial machines — RFID systems, printing, drilling and CNC marking/cutting.",
      points: [
        "Led development of an RFID Vehicle Management System, Heat Transfer Sticker Printing Machine, Automatic Slipper Drilling Machine and CNC Elastic Marking & Cutting Machine",
        "3D-modelled a Screen-Printing Machine upgrade in SolidWorks",
        "Programmed microcontrollers, integrated pneumatic/hydraulic systems and performed welding to H&S standards",
      ],
      tech: ["RFID", "Microcontrollers", "SolidWorks", "CNC", "Pneumatics"],
    },
  ],

  /* ------------------------------------------------------------- research */
  research: [
    {
      title: "UAV-Based Remote Sensing for Field-Based Crop Management",
      venue:
        "8th Annual Research Symposium, Faculty of Technology, University of Colombo",
      year: "2024",
      award: "1st Runner-Up — Research & Innovation Exhibition",
      problem:
        "Early paddy-disease detection without expensive multispectral hardware.",
      approach:
        "Custom UAV capturing low-cost RGB imagery; a Random Forest / OpenCV pipeline classifies disease indicators; results surfaced through a web application.",
      outcome:
        "Demonstrated affordable disease detection from RGB imagery, recognised at the university research exhibition.",
    },
    {
      title: "Smart RFID Door Lock System",
      venue: "University Annual Research Symposium — Exhibition",
      year: "2023",
      award: "Exhibited",
      problem: "Authorised, phone-managed door access.",
      approach: "RFID authentication with a mobile-controlled lock mechanism.",
      outcome: "Working access-control prototype presented at the exhibition.",
    },
  ],

  /* -------------------------------------------------------- publications */
  // Peer-reviewed publications. Source: Google Scholar (profile in `profile.scholar`).
  publications: [
    {
      title:
        "Unmanned Aerial Vehicle-Based Large Area Disease Detection of Paddy Fields using Machine Learning",
      authors: "R.S.W. Madanayaka, C.V. Kumarasiri, C.S. Silva",
      venue: "KDU Journal of Multidisciplinary Studies, Vol. 8, No. 1",
      year: "2026",
      type: "Journal",
      link: "https://scholar.google.com/citations?user=dVNjvdkAAAAJ&hl=en",
    },
    {
      title:
        "Design and Development of Cost-Effective Unmanned Aerial Vehicle for Crop Field Monitoring",
      authors: "R.S.W. Madanayaka, C.V. Kumarasiri, C.S. Silva",
      venue:
        "2025 IEEE 19th International Conference on Industrial and Information Systems (ICIIS)",
      year: "2025",
      type: "Conference",
      link: "https://scholar.google.com/citations?user=dVNjvdkAAAAJ&hl=en",
    },
  ],

  /* ------------------------------------------------------------ education */
  education: [
    {
      school: "University of Colombo",
      qualification:
        "Bachelor of Engineering Technology in Instrumentation and Automation (Hons)",
      period: "Feb 2020 – Dec 2024",
      detail: "GPA 3.26 / 4.00. Research project, PLCs, microcontrollers, FPGA, sensors & transducers, industrial automation.",
      primary: true,
    },
    {
      school: "University of Colombo",
      qualification: "Diploma in Information & Communication Technology",
      period: "Jan 2022 – Jan 2023",
      detail: "",
      primary: false,
    },
    {
      school: "Sri Lanka Institute of Robotics",
      qualification:
        "Advanced Certificate in PLC Programming & Automation",
      period: "Dec 2022 – Jul 2023",
      detail: "Siemens S7-200, ladder logic, motor drivers, sensor modules.",
      primary: false,
    },
    {
      school: "ESOFT Metro Campus",
      qualification: "Diploma in Software Engineering",
      period: "Jan 2019 – Jul 2020",
      detail: "C#, Java, UI/UX, project-based software development.",
      primary: false,
    },
  ],
};

// Expose for main.js (and guard for module contexts).
if (typeof window !== "undefined") window.PORTFOLIO = PORTFOLIO;
