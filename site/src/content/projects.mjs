// Project records. Pending items are retained for future content updates.
export const projects = [
  {
    "slug": "adaptive-lidar",
    "title": "Adaptive LiDAR Mapping",
    "fullTitle": "FOVEA-NET · Adaptive Variable Resolution 2.5D LiDAR Mapping for Dynamic Environment Perception",
    "category": "Autonomous systems",
    "featured": true,
    "visual": "lidar",
    "year": "2026",
    "status": "College-level selection winner",
    "role": "Team Gol D · Team lead & animated prototype developer",
    "summary": "An animated prototype of FOVEA-NET, a proposed risk-aware LiDAR perception system that concentrates mapping detail on critical obstacles and the predicted vehicle path while retaining terrain elevation.",
    "stack": [
      "JavaScript",
      "Three.js",
      "2.5D elevation mapping"
    ],
    "repository": null,
    "demo": "https://youtu.be/WWgDjudSdd4",
    "demoLabel": "Watch prototype",
    "sections": [
      {
        "title": "Detail where it matters",
        "body": [
          "FOVEA-NET proposes intelligent, variable-resolution 2.5D LiDAR mapping for dynamic environment perception. Inspired by human foveal vision, it allocates more detail to critical risks and the predicted vehicle path rather than relying on fixed distance rings.",
          "A 2.5D elevation map retains height information within a two-dimensional grid. The aim is to preserve useful terrain and obstacle information while reducing the computational and memory demands of uniformly dense mapping."
        ]
      },
      {
        "title": "My contribution and the prototype",
        "body": [
          "I led Team Gol D and personally developed the animated prototype demonstrating adaptive-resolution mapping, terrain analysis, and static and dynamic obstacle perception. The supplied screenshots show the FOVEA-NET driving visualisation, including route guidance, light-beam and grid views, and different camera perspectives.",
          "This is a visual demonstration using simulated geometry, not a physical LiDAR measurement system or validation of the complete proposed AI pipeline. The proposal identifies JavaScript and Three.js for its interactive visualisation."
        ]
      },
      {
        "title": "The proposed perception pipeline",
        "body": [
          "The report proposes acquiring and filtering LiDAR point clouds with Open3D and NumPy, followed by PointNet++ semantic segmentation in PyTorch. Terrain and obstacle classification would use PointNet++ and sparse convolutional networks.",
          "A risk and attention stage would consider the predicted vehicle path, object risk, and uncertainty. Its output would guide a variable-resolution 2.5D elevation grid, using Morton (Z-order) coding for spatial organisation and LiDAR object tracking for temporal memory.",
          "The planned workflow progresses through data ingestion and setup, perception AI, core mapping, and interactive visualisation. These components describe the proposed architecture, rather than a claim that every component is implemented in the animated prototype."
        ]
      },
      {
        "title": "Safety, feasibility and fallback paths",
        "body": [
          "The proposal builds on established tools, pretrained models, and a modular architecture. Adaptive resolution is intended to manage computational load; camera–LiDAR fusion is proposed to address sparse long-range observations.",
          "Morton-coded sparse grids are intended to preserve spatial and height information across resolution boundaries. To mitigate AI uncertainty, the report specifies a fixed 10-metre safety zone with a minimum nearby resolution. This is a proposal requirement, not a measured safety guarantee.",
          "If the deep-learning pipeline is not ready, the proposed fallback combines RANSAC ground-plane extraction with DBSCAN object clustering."
        ]
      },
      {
        "title": "Planned evaluation and research foundations",
        "body": [
          "CARLA is proposed for simulated LiDAR testing, with SemanticKITTI and nuScenes-LiDARseg identified as training and evaluation datasets. The report does not provide measured accuracy, latency, memory savings, or comparative benchmark results.",
          "The cited foundations include PointNet++ (Qi and colleagues), Robot-Centric Elevation Mapping with Uncertainty Estimates (Fankhauser and Hutter), SemanticKITTI (Behley and colleagues), and nuScenes (Caesar and colleagues). Full references are included in the attached report."
        ]
      },
      {
        "title": "Intended impact and future scope",
        "body": [
          "The intended benefits are more focused perception of pedestrians, cyclists, potholes, obstacles, and terrain, with lower computation and memory requirements. These are expected benefits of the proposed system, not experimentally established outcomes.",
          "Future directions include real LiDAR integration, vehicle-to-everything communication, and fleet integration."
        ]
      },
      {
        "title": "The challenge and current status",
        "body": [
          "Prepared for Smart India Hackathon 2026, problem statement SIH26053: Adaptive Variable Resolution 2.5D Lidar Mapping for Dynamic Environment Perception, under the Smart Vehicles theme and Software category. The proposal identifies Team Gol D, team ID 143452.",
          "Our team won the college-level selection and submitted the project to the next stage. Next-stage results are awaited. The original Gol D proposal is available through Read technical report, and the prototype video is linked above."
        ]
      }
    ],
    "pending": [
      "Prototype implementation stack and next-stage selection result."
    ],
    "document": "/documents/fovea-net-gol-d.pdf",
    "teammates": [
      {
        "name": "Donamol Joseph",
        "url": "https://www.linkedin.com/in/donamoljoseph/"
      },
      {
        "name": "Karthik Raj",
        "url": "https://www.linkedin.com/in/karthik-rajj/"
      },
      {
        "name": "Junia Alex",
        "url": "https://www.linkedin.com/in/juniaalex/"
      },
      {
        "name": "Layel K Manoj",
        "url": "https://www.linkedin.com/in/layelkmanoj/"
      },
      {
        "name": "Jinsa Mariam Thomas",
        "url": "https://www.linkedin.com/in/jinsamariamthomas/"
      }
    ],
    "images": [
      {
        "src": "/assets/projects/adaptive-lidar/main.png",
        "alt": "FOVEA-NET prototype ready to begin a route to the research campus.",
        "width": 1535,
        "height": 863
      },
      {
        "src": "/assets/projects/adaptive-lidar/light-beam.png",
        "alt": "FOVEA-NET light-beam perception view during a simulated journey.",
        "width": 1535,
        "height": 863
      },
      {
        "src": "/assets/projects/adaptive-lidar/orbit-grid.png",
        "alt": "Orbit view of the adaptive grid and pedestrian priority lines.",
        "width": 1535,
        "height": 863
      },
      {
        "src": "/assets/projects/adaptive-lidar/city-grid.png",
        "alt": "Free-camera view of the simulated city route and perception grid.",
        "width": 1535,
        "height": 863
      },
      {
        "src": "/assets/projects/adaptive-lidar/mountain-grid.png",
        "alt": "Perception grid following the mountain switchback route.",
        "width": 1535,
        "height": 863
      },
      {
        "src": "/assets/projects/adaptive-lidar/mountain-route.png",
        "alt": "Simulated mountain route with the perception overlay switched off.",
        "width": 1535,
        "height": 863
      }
    ],
    "homeImage": {
      "src": "/assets/projects/adaptive-lidar/main.png",
      "alt": "FOVEA-NET prototype ready to begin a route to the research campus.",
      "width": 1535,
      "height": 863
    },
    "previewImage": {
      "src": "/assets/projects/adaptive-lidar/main.png",
      "alt": "FOVEA-NET prototype ready to begin a route to the research campus.",
      "width": 1535,
      "height": 863
    }
  },
  {
    "slug": "technoblade-quiz",
    "title": "Technoblade Trivia Quiz",
    "fullTitle": "A Console-Based Python Tribute to Technoblade",
    "category": "Python",
    "featured": true,
    "year": null,
    "status": "A tribute to the legend.",
    "role": "Independent developer",
    "summary": "A Python console quiz celebrating Technoblade’s achievements, memorable moments, and iconic quotes, with shuffled multiple-choice questions, instant feedback, and personalised score messages.",
    "stack": [
      "Python 3.7+"
    ],
    "repository": "https://github.com/edwingeorgeshaji/TECHNOBLADE",
    "demo": null,
    "sections": [
      {
        "title": "A tribute through trivia",
        "body": [
          "I independently developed this console-based game to celebrate Technoblade’s legacy. Players test their knowledge of his achievements, funny moments, and iconic quotes through a straightforward multiple-choice quiz."
        ]
      },
      {
        "title": "How the game works",
        "body": [
          "Questions are shuffled each time you play. Each question offers four answers: type A, B, C, or D and press Enter to submit your choice.",
          "The game immediately reports whether an answer is correct and reveals the correct option when it is wrong. It tracks correct answers and finishes with a final score and a personalised celebratory message based on the result."
        ]
      },
      {
        "title": "Running the quiz",
        "body": [
          "Install Python 3.7 or newer, then clone the TECHNOBLADE repository using the source-code link above. Open the repository’s Ding directory and run python HeWhoNeverDies.py in your terminal.",
          "HeWhoNeverDies.py is the main game script. The preview shows an example two-question session, including immediate feedback and the final score; it does not represent the full question bank."
        ]
      },
      {
        "title": "Ideas for future versions",
        "body": [
          "Planned additions include a high-score leaderboard, an external JSON question bank for easier updates, and a hints system that eliminates incorrect options. These are future features, not part of the functionality described above."
        ]
      },
      {
        "title": "Open source",
        "body": [
          "The project is released under the Apache-2.0 licence. Contributions are welcome through repository forks and pull requests."
        ]
      }
    ],
    "pending": [
      "Development dates."
    ],
    "images": [
      {
        "src": "/assets/projects/technoblade-quiz/technoblade.jpg",
        "alt": "Technoblade’s crowned Minecraft character in a red cape, sitting in a grassy landscape at sunset.",
        "width": 736,
        "height": 414
      },
      {
        "src": "/assets/projects/technoblade-quiz/quiz-preview.png",
        "alt": "Example Technoblade Trivia Quiz terminal session showing two multiple-choice questions, answer feedback, and a final score.",
        "width": 1516,
        "height": 858
      }
    ],
    "previewImage": {
      "src": "/assets/projects/technoblade-quiz/technoblade.jpg",
      "alt": "Technoblade’s crowned Minecraft character in a red cape, sitting in a grassy landscape at sunset.",
      "width": 736,
      "height": 414
    },
    "homeImage": {
      "src": "/assets/projects/technoblade-quiz/technoblade.jpg",
      "alt": "Technoblade’s crowned Minecraft character in a red cape, sitting in a grassy landscape at sunset.",
      "width": 736,
      "height": 414
    }
  },
  {
    "slug": "q-site",
    "title": "Q-Site",
    "fullTitle": "Hybrid Quantum Resource Allocation for AI-Loaded Microgrids",
    "category": "Quantum computing",
    "featured": true,
    "visual": "quantum",
    "year": "2026",
    "status": "Global Industry Challenge finalist",
    "role": "Point of Contact · Qiskit integration & QAOA execution",
    "summary": "A six-qubit hybrid quantum optimisation study selecting two battery-storage sites for an IEEE 14-bus grid with a synthetic AI data-centre load, validated against AC power-flow simulations.",
    "stack": [
      "Python",
      "Qiskit",
      "QAOA",
      "IBM Quantum",
      "qBraid",
      "pandapower",
      "NetworkX",
      "NumPy",
      "SciPy"
    ],
    "repository": "https://github.com/edwingeorgeshaji/Q-Site",
    "demo": null,
    "sections": [
      {
        "title": "The planning problem",
        "body": [
          "Q-Site studies where to install two battery energy storage systems on the IEEE 14-bus test grid after adding a synthetic 80 MW / 25 MVAr AI data-centre load at Bus 9. The aim is to reduce unsafe-voltage incidents during individual transmission-line outages.",
          "The study evaluates 15 N-1 line-outage scenarios using pandapower AC power flow. Six candidate buses - 9, 10, 5, 8, 11 and 13 - are encoded as binary storage-placement decisions."
        ]
      },
      {
        "title": "A hybrid quantum approach",
        "body": [
          "A six-variable QUBO combines under-voltage vulnerability, an exactly-two-batteries budget penalty and a small adjacency penalty. It is converted to an Ising Hamiltonian and solved with depth-2 QAOA, using Qiskit and the classical COBYLA optimiser. Exhaustive enumeration of all 15 valid pairs provides the exact classical baseline.",
          "The simulator used 100 optimiser iterations and 4,096 final shots. The report records real-hardware execution on IBM Quantum ibm_kingston through qBraid, with 11 completed hardware evaluations and 2,048 final shots. Classical search, simulation and the hardware run all selected Buses 9 and 10, at a QUBO cost of -20.1027. This small-instance agreement is not evidence of quantum advantage."
        ]
      },
      {
        "title": "My contribution",
        "body": [
          "As Point of Contact, I was responsible for Qiskit integration and QAOA execution. The project connects quantum optimisation with a classical grid model and independently checks the proposed siting using AC power-flow calculations."
        ]
      },
      {
        "title": "Results and validation",
        "body": [
          "The selected sites were evaluated with 15 MVAr reactive-power support at each of Buses 9 and 10. Across the 13 converged scenarios within the 15-scenario test set, unsafe-voltage bus incidents fell from 30 to 27, a 10% reduction.",
          "The outage of line 5-10 improved from four to two unsafe buses; line 9-10 improved from four to three. The two non-convergent collapse scenarios, involving lines 0-1 and 8-9, were not resolved. The 10% improvement comes from AC power-flow simulation, not an independent physical-grid or quantum-hardware voltage measurement."
        ],
        "metric": {
          "value": "30 → 27",
          "label": "Unsafe-voltage incidents across converged scenarios",
          "note": "13 converged scenarios out of 15; two collapse scenarios remain unresolved."
        }
      },
      {
        "title": "Scope and limitations",
        "body": [
          "This is a planning prototype with reactive-power support only: no real-power discharge, state-of-charge dynamics or time-series dispatch. Voltage safety is defined as 0.94-1.06 per unit, and outages are evaluated independently, without cascading or N-2 analysis.",
          "The objective scores under-voltage only because the modelled inverter support raises local voltage. The report does not establish the same outcome at larger grid sizes or under different storage-control strategies."
        ]
      },
      {
        "title": "The challenge",
        "body": [
          "Developed for the Global Industry Challenge 2026, U.S. DOE Office of Technology Commercialization, Energy Infrastructure track. The project reached Phase 3, the final stage, and finished as a finalist. The complete submitted technical report is available above."
        ]
      }
    ],
    "pending": [],
    "document": "/documents/q-site-phase-3.pdf",
    "images": [
      {
        "src": "/assets/projects/q-site/battery-siting.png",
        "alt": "IEEE 14-bus topology: AI load at Bus 9; battery sites selected at Buses 9 and 10.",
        "width": 1777,
        "height": 1379
      },
      {
        "src": "/assets/projects/q-site/contingency-results.png",
        "alt": "Unsafe-voltage counts before and after battery siting across 15 line-outage scenarios. Two collapse scenarios remain unresolved.",
        "width": 1971,
        "height": 618
      },
      {
        "src": "/assets/projects/q-site/qubo-comparison.png",
        "alt": "QUBO costs for all 15 valid battery-site pairs. Buses 9 and 10 match the classical optimum.",
        "width": 1980,
        "height": 978
      }
    ],
    "teammates": [
      {
        "name": "Jinsa Mariam Thomas",
        "url": "https://www.linkedin.com/in/jinsamariamthomas/"
      },
      {
        "name": "Mariam Skaria",
        "url": "https://www.linkedin.com/in/mariam-skaria/"
      },
      {
        "name": "Malavika Krishnan",
        "url": "https://www.linkedin.com/in/malavikakrishnan30/"
      }
    ],
    "homeImage": {
      "src": "/assets/projects/q-site/qubo-comparison.png",
      "alt": "QUBO costs for all 15 valid battery-site pairs. Buses 9 and 10 match the classical optimum.",
      "width": 1980,
      "height": 978
    },
    "previewImage": {
      "src": "/assets/projects/q-site/qubo-comparison.png",
      "alt": "QUBO costs for all 15 valid battery-site pairs. Buses 9 and 10 match the classical optimum.",
      "width": 1980,
      "height": 978
    }
  },
  {
    "slug": "meetlite",
    "title": "MeetLite",
    "fullTitle": "Lightweight Multi-Party Desktop Video Conferencing",
    "category": "Networking",
    "featured": false,
    "visual": "code",
    "year": null,
    "status": "Desktop video conferencing application",
    "role": "Project developer",
    "summary": "A lightweight Python desktop conferencing application with custom TCP room signalling and UDP video and audio relay, supporting meetings over a LAN or the internet.",
    "stack": [
      "Python 3.10+",
      "Sockets",
      "TCP",
      "UDP",
      "JSON"
    ],
    "repository": "https://github.com/edwingeorgeshaji/meetlite",
    "demo": null,
    "sections": [
      {
        "title": "Meetings built from the network up",
        "body": [
          "MeetLite is a lightweight, multi-party desktop video conferencing application built from scratch using Python’s standard socket module. Users can create a meeting protected by a six-character meeting code and a four-digit PIN, or join an existing meeting across a LAN or the internet."
        ]
      },
      {
        "title": "Signalling and real-time media",
        "body": [
          "Room signalling uses a custom length-prefixed JSON protocol over TCP. Real-time video and audio relay use UDP with a custom RTP-like binary header. These separate channels handle meeting coordination and media transport."
        ]
      },
      {
        "title": "Designed for available hardware",
        "body": [
          "A webcam and microphone are optional. When hardware is unavailable, MeetLite falls back to avatars and silent mode so users can still join a meeting."
        ]
      },
      {
        "title": "Getting started",
        "body": [
          "MeetLite requires Python 3.10 or newer on Windows, macOS, or Linux. Get the project from the source-code link above and install the client dependencies by running pip install -r requirements.txt in the project directory."
        ]
      }
    ],
    "pending": [],
    "images": [
      {
        "src": "/assets/projects/meetlite/home.png",
        "alt": "MeetLite home screen with name and server fields, and create or join meeting options.",
        "width": 1534,
        "height": 863
      },
      {
        "src": "/assets/projects/meetlite/video-off.png",
        "alt": "MeetLite meeting with video off, participant avatars, and microphone, video and leave controls.",
        "width": 1534,
        "height": 862
      },
      {
        "src": "/assets/projects/meetlite/video-on.png",
        "alt": "MeetLite meeting with two active video feeds and call controls.",
        "width": 1534,
        "height": 863
      }
    ],
    "previewImage": {
      "src": "/assets/projects/meetlite/home.png",
      "alt": "MeetLite home screen with name and server fields, and create or join meeting options.",
      "width": 1534,
      "height": 863
    },
    "homeImage": {
      "src": "/assets/projects/meetlite/home.png",
      "alt": "MeetLite home screen with name and server fields, and create or join meeting options.",
      "width": 1534,
      "height": 863
    }
  },
  {
    "slug": "paperiq",
    "title": "PaperIQ",
    "fullTitle": "AI-Powered Research Assistant",
    "category": "Artificial intelligence",
    "featured": true,
    "visual": "research",
    "year": "2025",
    "status": "Completed web application",
    "role": "Team Techies · Team contributor",
    "summary": "A browser-based assistant for discovering papers, comparing research, and finding useful insights with AI.",
    "stack": [
      "HTML5",
      "Tailwind CSS",
      "JavaScript",
      "OpenAlex API",
      "Gemini AI",
      "Chart.js",
      "LocalStorage"
    ],
    "repository": "https://github.com/Infosys-PaperIQ-Team-Techies/Infosys-PaperIQ-AI-Research-Assistant",
    "demo": null,
    "sections": [
      {
        "title": "Research, brought together",
        "body": [
          "Academic research often involves moving between discovery tools, documents, and notes. PaperIQ brings paper discovery, comparison, and document analysis into one web application."
        ]
      },
      {
        "title": "What we built",
        "body": [
          "Working with Team Techies during Infosys Springboard Virtual Internship 6.0, I contributed to a working research assistant featuring academic paper discovery, AI-powered comparisons, document uploads, analysis, and generated insights."
        ]
      },
      {
        "title": "How it works",
        "body": [
          "The application combines the OpenAlex API for academic discovery with Gemini AI for analysis. Its browser interface uses HTML, Tailwind CSS, and JavaScript, with Chart.js for visualisation and LocalStorage for browser persistence."
        ]
      }
    ],
    "pending": [
      "Exact development dates and individual feature-level contributions."
    ],
    "teammates": [
      {
        "name": "Naveen Jayaraj"
      },
      {
        "name": "Chetana Sri Chandana Motamarri"
      }
    ],
    "teamSource": "https://github.com/Infosys-PaperIQ-Team-Techies/Infosys-PaperIQ-AI-Research-Assistant#authors",
    "images": [
      {
        "src": "/assets/projects/paperiq/profiles.png",
        "alt": "PaperIQ profile selection with Student, Researcher, Faculty and custom workspaces.",
        "width": 1535,
        "height": 863
      },
      {
        "src": "/assets/projects/paperiq/research-search.png",
        "alt": "PaperIQ academic research search for black holes, showing paper selection and comparison controls.",
        "width": 1535,
        "height": 863
      }
    ],
    "homeImage": {
      "src": "/assets/projects/paperiq/profiles.png",
      "alt": "PaperIQ profile selection with Student, Researcher, Faculty and custom workspaces.",
      "width": 1535,
      "height": 863
    }
  },
  {
    "slug": "inflation-analyzer",
    "title": "Inflation Analyzer",
    "fullTitle": "Cost of Living Analytics – AI-Powered Forecast Platform",
    "category": "Machine learning",
    "featured": false,
    "year": null,
    "status": "Completed · Infosys Springboard Milestone 1",
    "role": "Forecasting, preprocessing & dashboard development",
    "summary": "An end-to-end TensorFlow and Streamlit application for exploring India’s rural and urban Consumer Price Index, generating on-demand predictions, and comparing historical trends with model forecasts.",
    "stack": [
      "Python",
      "TensorFlow",
      "Keras",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Streamlit",
      "Plotly",
      "Jupyter"
    ],
    "repository": "https://github.com/edwingeorgeshaji/Inflation-Analyzer",
    "demo": null,
    "sections": [
      {
        "title": "From historical data to an interactive dashboard",
        "body": [
          "Developed for Milestone 1 of Infosys Springboard Virtual Internship 6.0, Cost of Living Analytics connects a neural-network regression model with a Streamlit dashboard for India’s rural and urban Consumer Price Index (CPI). I developed the forecasting model, preprocessing pipeline, and dashboard.",
          "Users select a year and month to generate separate rural and urban General Index predictions. The application uses a static historical dataset; on-demand inference does not mean it receives live economic data."
        ]
      },
      {
        "title": "Exploring predictions and trends",
        "body": [
          "The Key Predictions tab presents rural and urban forecasts as Plotly gauges. Trend Analysis distinguishes historical observations with solid lines and model-generated predictions with dotted lines.",
          "Summary Statistics provides filterable minimum and maximum values for selected data series. Expandable explanations introduce the indices and forecasting methodology, while light and dark themes provide alternative views of the dashboard."
        ]
      },
      {
        "title": "The offline training pipeline",
        "body": [
          "The Jupyter Notebook pipeline ingests All_India_Index_july2019_20Aug2020.csv, handles missing values, maps month names to numbers, and one-hot encodes the rural and urban sectors. Inputs are Year, Month_Num, Rural, and Urban; the prediction target is the General index.",
          "The documentation describes an 80:20 training/test split. StandardScaler is fitted on training features and then applied to both partitions. A TensorFlow–Keras Sequential network uses Dense layers with 64 and 32 ReLU units followed by a single regression output.",
          "Training uses Adam, mean squared error loss, and 300 epochs. ModelCheckpoint selects the model based on validation loss; cost_of_living_model.keras and the fitted scaler connect the training pipeline to the application."
        ]
      },
      {
        "title": "Serving predictions efficiently",
        "body": [
          "The Streamlit application caches the model, scaler, and dataset using st.cache_resource and st.cache_data. Selected dates are converted into sector-specific inputs, scaled, and passed to the trained model.",
          "For future trend displays, the application batches intermediate dates into a vectorized prediction call. Forecasts are combined with historical records and labelled as real or predicted for the charts and summary cards."
        ]
      },
      {
        "title": "Reported evaluation",
        "body": [
          "The supplied documentation reports a test-set mean squared error of 2.90 and mean absolute error of 1.26 CPI index points. These are results of the documented evaluation, rather than a new independent reproduction.",
          "The reported 80:20 split is not described as a chronological forecasting backtest. These metrics should therefore be read as test-set regression performance, rather than a guarantee of accuracy for future economic conditions."
        ],
        "metric": {
          "value": "1.26",
          "label": "Reported test MAE · CPI index points",
          "note": "MSE: 2.90. Results reported in the supplied project documentation."
        }
      },
      {
        "title": "Tools and implementation",
        "body": [
          "The documented environment uses Python 3.11+, TensorFlow 2.20.0, Keras 3.11.3, Pandas 2.3.3, NumPy 2.3.4, Scikit-learn 1.7.2, Plotly 6.3.1, and Streamlit 1.50.0. Jupyter supports exploration and model training.",
          "The dashboard combines custom CSS, a glass-card aesthetic, and interactive Plotly visualisations. The original technical documentation and source repository are linked above."
        ]
      },
      {
        "title": "Future development",
        "body": [
          "Planned enhancements include automated CPI data ingestion, additional macroeconomic features, experiments with LSTM and GRU models, database-backed prediction logs, and user accounts with saved forecasts and notifications. These are future directions rather than current features."
        ]
      }
    ],
    "pending": [
      "Development dates."
    ],
    "document": "/documents/inflation-analyzer-documentation.pdf",
    "images": [
      {
        "src": "/assets/projects/inflation-analyzer/predictions-light.png",
        "alt": "Light-theme dashboard with rural and urban CPI prediction gauges.",
        "width": 1535,
        "height": 810
      },
      {
        "src": "/assets/projects/inflation-analyzer/trends-light.png",
        "alt": "Light-theme historical and predicted trend charts.",
        "width": 1535,
        "height": 818
      },
      {
        "src": "/assets/projects/inflation-analyzer/predictions-dark.png",
        "alt": "Dark-theme dashboard with rural and urban CPI prediction gauges.",
        "width": 1535,
        "height": 820
      },
      {
        "src": "/assets/projects/inflation-analyzer/trends-dark.png",
        "alt": "Dark-theme trend analysis with historical and predicted data.",
        "width": 1535,
        "height": 808
      },
      {
        "src": "/assets/projects/inflation-analyzer/statistics-dark.png",
        "alt": "Filterable summary statistics showing minimum and maximum values.",
        "width": 1535,
        "height": 801
      }
    ],
    "previewImage": {
      "src": "/assets/projects/inflation-analyzer/predictions-light.png",
      "alt": "Light-theme dashboard with rural and urban CPI prediction gauges.",
      "width": 1535,
      "height": 810
    },
    "homeImage": {
      "src": "/assets/projects/inflation-analyzer/predictions-light.png",
      "alt": "Light-theme dashboard with rural and urban CPI prediction gauges.",
      "width": 1535,
      "height": 810
    }
  }
];
