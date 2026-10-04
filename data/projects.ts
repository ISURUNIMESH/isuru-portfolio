import type { Project } from "@/lib/projects/project-schema";
import { defaultProjectImagePaths } from "@/lib/projects/project-images";

/**
 * SINGLE SOURCE OF TRUTH
 * Add a new project here (and optional images in public/projects/<slug>/).
 * Every section, chart, filter, and /projects/[slug] page updates automatically.
 */
export const projectRecords: Project[] = [
  {
    id: "gridguard-ai",
    slug: "gridguard-ai",
    title: "GridGuard AI",
    shortDescription:
      "Transformer health monitoring with fault detection, remaining useful life, and SHAP explainability.",
    category: ["AI", "Machine Learning", "Data Science", "XAI"],
    technologies: [
      "Python",
      "Scikit-learn",
      "SHAP",
      "Pandas",
      "Next.js",
      "Machine Learning",
    ],
    featured: true,
    year: 2026,
    problem:
      "Power utilities discover transformer failures too late. Inspection data is fragmented, risk is hard to quantify, and operators cannot see why a model flagged an asset.",
    approach:
      "Built an end-to-end predictive maintenance pipeline: fault classification, remaining useful life estimation, anomaly detection, risk scoring, and SHAP explanations surfaced in an operations dashboard.",
    outcome:
      "A deployable monitoring system that turns sensor and inspection signals into ranked risk, predicted lifespan, and human-readable model explanations.",
    githubUrl: "https://github.com/ISURUNIMESH/GridGuard-AI",
    liveUrl: "https://grid-guard-ai-ten.vercel.app",
    ...defaultProjectImagePaths("gridguard-ai"),
    color: "#3ee0c5",
    accent: "#0b3d38",
    status: "completed",
    mlDetails: {
      dataset:
        "Transformer sensor and inspection records used to monitor asset health.",
      preprocessing: [
        "Unify fragmented inspection and sensor streams",
        "Prepare records for classification, remaining-useful-life, and anomaly views",
      ],
      models: [
        "Fault classification",
        "Remaining useful life estimation",
        "Anomaly detection",
      ],
      result:
        "A monitoring system that ranks transformer risk, estimates remaining life, and explains why an asset was flagged.",
    },
  },
  {
    id: "ai-startup-cofounder",
    slug: "ai-startup-cofounder",
    title: "AI Startup Cofounder",
    shortDescription:
      "Multi-agent startup validation platform using LangGraph, RAG, and live market research.",
    category: ["AI", "Web"],
    technologies: [
      "Python",
      "LangGraph",
      "RAG",
      "ChromaDB",
      "Streamlit",
      "Groq",
    ],
    featured: true,
    year: 2026,
    problem:
      "Founders spend weeks validating ideas with scattered research, weak competitor analysis, and no structured way to stress-test a business thesis.",
    approach:
      "Designed a multi-agent workflow where specialized agents research the market, retrieve context with RAG over ChromaDB, and synthesize a validation report inside a Streamlit workspace.",
    outcome:
      "A cofounder-style AI system that compresses idea validation into a guided, evidence-backed conversation rather than a static checklist.",
    githubUrl: "https://github.com/ISURUNIMESH/ai-startup-cofounder",
    liveUrl: "",
    ...defaultProjectImagePaths("ai-startup-cofounder"),
    color: "#8b7cff",
    accent: "#241b4d",
    status: "completed",
    mlDetails: {
      dataset:
        "Market research context retrieved into a ChromaDB store for agent use.",
      preprocessing: [
        "Retrieve relevant market evidence with RAG before synthesis",
      ],
      models: ["LangGraph multi-agent workflow", "RAG over ChromaDB"],
      result:
        "A guided validation workspace that compresses idea research into an evidence-backed conversation.",
    },
  },
  {
    id: "retailsense-ai",
    slug: "retailsense-ai",
    title: "RetailSense AI",
    shortDescription:
      "Retail sales forecasting and inventory optimization built for demand uncertainty.",
    category: ["AI", "Machine Learning", "Data Science"],
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Jupyter",
      "Forecasting",
      "Machine Learning",
    ],
    featured: true,
    year: 2026,
    problem:
      "Retail teams overstock slow movers and stock out of high-demand SKUs because forecasts ignore seasonality, promotions, and store-level variation.",
    approach:
      "Modeled demand with statistical and ML forecasting, then translated predictions into inventory recommendations that balance service level against holding cost.",
    outcome:
      "A forecasting and optimization workflow that turns historical sales into forward-looking stock decisions instead of spreadsheet guesswork.",
    githubUrl: "https://github.com/ISURUNIMESH/RetailSense_AI_project",
    liveUrl: "",
    ...defaultProjectImagePaths("retailsense-ai"),
    color: "#f0b429",
    accent: "#3d2c08",
    status: "completed",
    mlDetails: {
      dataset:
        "Historical retail sales shaped by seasonality, promotions, and store-level variation.",
      preprocessing: [
        "Prepare demand histories for statistical and ML forecasting",
      ],
      models: ["Statistical forecasting", "ML forecasting"],
      result:
        "A forecasting workflow that turns historical sales into inventory recommendations instead of spreadsheet guesswork.",
    },
  },
  {
    id: "fraud-detection-system",
    slug: "fraud-detection-system",
    title: "Fraud Detection System",
    shortDescription:
      "Transaction risk scoring that surfaces suspicious patterns before losses compound.",
    category: ["AI", "Machine Learning", "Data Science"],
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Machine Learning"],
    featured: true,
    year: 2026,
    problem:
      "Fraud is rare, noisy, and expensive. Naive classifiers miss minority-class events or flood analysts with false positives.",
    approach:
      "Trained imbalance-aware models on transactional features, evaluated precision/recall trade-offs, and packaged scoring into a reviewable detection pipeline.",
    outcome:
      "A practical fraud scoring system that ranks high-risk transactions for investigation instead of treating detection as a binary afterthought.",
    githubUrl: "https://github.com/ISURUNIMESH/fraud_detection_system",
    liveUrl: "",
    ...defaultProjectImagePaths("fraud-detection-system"),
    color: "#ff6b6b",
    accent: "#3d1218",
    status: "completed",
    mlDetails: {
      dataset: "Transactional records with a rare fraud class.",
      preprocessing: [
        "Account for class imbalance before training and scoring",
      ],
      features: ["Transactional risk features"],
      models: ["Imbalance-aware classifiers"],
      result:
        "A scoring pipeline that ranks high-risk transactions for review instead of treating detection as a binary afterthought.",
    },
  },
  {
    id: "stress-prediction-xai",
    slug: "stress-prediction-xai",
    title: "Stress Prediction XAI",
    shortDescription:
      "Explainable stress-level prediction that shows which signals drive each outcome.",
    category: ["AI", "Machine Learning", "Data Science", "XAI"],
    technologies: ["Python", "SHAP", "Scikit-learn", "Pandas", "Machine Learning"],
    featured: false,
    year: 2026,
    problem:
      "Wellness models that only output a label are hard to trust. Practitioners need to know which lifestyle and physiological features actually moved the prediction.",
    approach:
      "Trained a stress classification model and layered SHAP explanations so every prediction can be inspected feature by feature.",
    outcome:
      "An XAI-backed predictor that makes model behavior inspectable, not just accurate on a holdout set.",
    githubUrl: "https://github.com/ISURUNIMESH/stress-prediction-xai",
    liveUrl: "",
    ...defaultProjectImagePaths("stress-prediction-xai"),
    color: "#5ad0ff",
    accent: "#0a3140",
    status: "completed",
    mlDetails: {
      dataset:
        "Lifestyle and physiological signals used for stress-level classification.",
      models: ["Stress classification model"],
      result:
        "An explainable predictor that shows which signals moved each outcome, using SHAP rather than a black-box label.",
    },
  },
  {
    id: "predictive-analytics-suite",
    slug: "predictive-analytics-suite",
    title: "Predictive Analytics Suite",
    shortDescription:
      "Interactive ML workbench for exploration, training, evaluation, and live prediction.",
    category: ["AI", "Machine Learning", "Data Visualization"],
    technologies: [
      "Python",
      "Streamlit",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Data Visualization",
      "Machine Learning",
    ],
    featured: false,
    year: 2026,
    problem:
      "Machine learning experiments often stay trapped in notebooks. Non-technical users cannot explore data, compare models, or run predictions without a developer in the loop.",
    approach:
      "Wrapped the full ML workflow — summaries, feature plots, Random Forest training, metrics, and live inference — inside a Streamlit application.",
    outcome:
      "A usable analytics surface that turns a model pipeline into something people can actually click through.",
    githubUrl: "https://github.com/ISURUNIMESH/predictive-analytics-ai-suite",
    liveUrl: "",
    ...defaultProjectImagePaths("predictive-analytics-suite"),
    color: "#7cf29a",
    accent: "#12301c",
    status: "completed",
    mlDetails: {
      dataset:
        "User-loaded tabular datasets explored inside the Streamlit workbench.",
      preprocessing: [
        "Summaries and feature plots before training",
      ],
      models: ["Random Forest"],
      result:
        "A clickable ML workflow covering exploration, training, evaluation, and live inference.",
    },
  },
  {
    id: "buildmate-supplier-service",
    slug: "buildmate-supplier-service",
    title: "BuildMate Supplier Service",
    shortDescription:
      "Java backend for construction supplier operations, catalog flow, and order handling.",
    category: ["Web"],
    technologies: ["Java", "Spring Boot", "REST API", "MySQL"],
    featured: false,
    year: 2026,
    problem:
      "Supplier operations in construction still rely on brittle, tightly coupled services that are hard to scale or integrate with other product modules.",
    approach:
      "Implemented a dedicated supplier microservice with structured APIs for catalog, orders, and operational data so the rest of the platform can compose against a stable contract.",
    outcome:
      "A service-oriented supplier module that isolates domain logic and makes the broader BuildMate system easier to extend.",
    githubUrl: "https://github.com/ISURUNIMESH/buildmate-supplier-service",
    liveUrl: "",
    ...defaultProjectImagePaths("buildmate-supplier-service"),
    color: "#d4a373",
    accent: "#2c1d12",
    status: "in-progress",
  },
  {
    id: "fuel-qr-website",
    slug: "fuel-qr-website",
    title: "Fuel QR Code Website",
    shortDescription:
      "Web interface for fuel-station QR workflows, verification, and station-facing records.",
    category: ["Web"],
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false,
    year: 2026,
    problem:
      "Fuel distribution workflows still depend on manual slips and slow verification, which creates queues and weak audit trails.",
    approach:
      "Designed a browser-based QR flow so station staff can generate, scan, and verify fuel-related records without a heavyweight native app.",
    outcome:
      "A lightweight operational website that makes QR-based fuel verification usable at the counter.",
    githubUrl: "https://github.com/ISURUNIMESH/fuel_QR_code_website",
    liveUrl: "",
    ...defaultProjectImagePaths("fuel-qr-website"),
    color: "#ffa94d",
    accent: "#3b2208",
    status: "completed",
  },
  {
    id: "student-performance-ml",
    slug: "student-performance-ml",
    title: "Student Performance Predictor",
    shortDescription:
      "Linear regression model that estimates final scores from study, attendance, and sleep.",
    category: ["AI", "Machine Learning", "Data Science"],
    technologies: [
      "Python",
      "Streamlit",
      "Scikit-learn",
      "Pandas",
      "Machine Learning",
    ],
    featured: false,
    year: 2026,
    problem:
      "Academic support teams see outcomes too late. They need an early, interpretable signal from study hours, attendance, prior grades, and sleep.",
    approach:
      "Trained a linear regression model on academic and lifestyle features and exposed real-time predictions through a Streamlit app.",
    outcome:
      "A transparent predictor that makes score estimates interactive instead of burying them in a notebook.",
    githubUrl: "https://github.com/ISURUNIMESH/student-performance-ml",
    liveUrl: "",
    ...defaultProjectImagePaths("student-performance-ml"),
    color: "#74c0fc",
    accent: "#0c2a44",
    status: "completed",
    mlDetails: {
      dataset:
        "Academic and lifestyle records used to estimate final scores.",
      features: ["Study hours", "Attendance", "Prior grades", "Sleep"],
      models: ["Linear regression"],
      result:
        "An interactive predictor that exposes score estimates through Streamlit instead of a static notebook.",
    },
  },
  {
    id: "hospital-management",
    slug: "hospital-management",
    title: "Hospital Management",
    shortDescription:
      "Front-end hospital operations system for patients, appointments, and staff records.",
    category: ["Web"],
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false,
    year: 2026,
    problem:
      "Small clinics still track patients and appointments across disconnected pages and paper files, which makes daily operations error-prone.",
    approach:
      "Built a structured hospital management interface covering patient records, scheduling, and staff-facing views in a single web application.",
    outcome:
      "A clearer operational surface for clinic workflows that can later sit on top of a real persistence layer.",
    githubUrl: "https://github.com/ISURUNIMESH/hospital-management",
    liveUrl: "",
    ...defaultProjectImagePaths("hospital-management"),
    color: "#63e6be",
    accent: "#0d3329",
    status: "completed",
  },
  {
    id: "ipl-match-prediction",
    slug: "ipl-match-prediction",
    title: "IPL Match Prediction",
    shortDescription:
      "Match-outcome modeling on historical IPL data with feature engineering and evaluation.",
    category: ["AI", "Machine Learning", "Data Science"],
    technologies: ["Python", "Jupyter", "Pandas", "Scikit-learn", "Machine Learning"],
    featured: false,
    year: 2026,
    problem:
      "Cricket match outcomes look noisy until you encode team form, venue effects, and historical head-to-head patterns into a model-ready dataset.",
    approach:
      "Engineered features from IPL history, trained classification models, and evaluated whether the encoded context actually lifts prediction quality.",
    outcome:
      "A sports-analytics notebook pipeline that treats match prediction as a feature problem, not a vibe.",
    githubUrl: "https://github.com/ISURUNIMESH/IPL-match-prediction",
    liveUrl: "",
    ...defaultProjectImagePaths("ipl-match-prediction"),
    color: "#ff922b",
    accent: "#3b1d06",
    status: "experimental",
    mlDetails: {
      dataset: "Historical IPL match records.",
      preprocessing: [
        "Encode team form, venue, and head-to-head patterns into model-ready features",
      ],
      features: ["Team form", "Venue effects", "Head-to-head history"],
      models: ["Classification models"],
      result:
        "A notebook pipeline that treats match prediction as a feature-engineering problem rather than a guess.",
    },
  },
];

export const projects = projectRecords;
