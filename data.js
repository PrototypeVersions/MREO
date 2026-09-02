/* ============================================================
   MREO DEMONSTRATION DATA
   ------------------------------------------------------------
   All properties, people, companies, bids, transactions,
   valuations, reconstruction records, and operating records
   in this file are fictional demonstration data.

   This file is intended for the MREO GitHub Pages prototype.
   ============================================================ */

(() => {
  "use strict";


  /* ============================================================
     SHARED DEMONSTRATION PROFESSIONALS
     ============================================================ */

  const professionals = {

    cedarlineConstruction: {
      name: "Cedarline Construction",
      category: "General Contractor",
      status: "Demo Verified"
    },

    northTexasInspection: {
      name: "North Texas Property Inspection",
      category: "Inspection",
      status: "Demo Verified"
    },

    meridianTitle: {
      name: "Meridian Title Services",
      category: "Title and Settlement",
      status: "Demo Verified"
    },

    localOperations: {
      name: "MREO Local Operations",
      category: "Property Operations",
      status: "Demonstration Participant"
    },

    fieldNetworkDallas: {
      name: "MREO Field Network — Dallas",
      category: "Field Verification",
      status: "Demonstration Participant"
    },

    realtorPartner: {
      name: "Demonstration Realty Partner",
      category: "Real Estate Services",
      status: "Demonstration Participant"
    },

    reconstructionCapital: {
      name: "MREO Reconstruction Capital Partner",
      category: "Reconstruction Capital",
      status: "Demonstration Participant"
    },

    propertyRisk: {
      name: "Property Risk Services",
      category: "Property Risk Review",
      status: "Demonstration Participant"
    }

  };


  /* ============================================================
     PROPERTIES
     ============================================================ */

  const properties = [

    /* ==========================================================
       MREO-0001
       ========================================================== */

    {
      id: "MREO-0001",

      addressLine1: "4218 Maple Ridge Drive",
      city: "Dallas",
      state: "TX",
      zip: "75229",
      location: "Dallas, Texas",

      price: 385000,
      estimatedValue: 398000,
      arv: 438000,

      beds: 3,
      baths: 2,
      sqft: 1940,

      propertyType: "Single-Family Home",
      condition: "Move-In Ready",

      readiness: 91,

      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=82",

      valuation: {
        currentPrice: 385000,
        estimatedValue: 398000,
        arv: 438000,

        sources: {
          currentPrice:
            "MREO demonstration distribution record",

          estimatedValue:
            "Demonstration automated valuation",

          arv:
            "MREO reconstruction model"
        }
      },

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 96,
        exceptions: [],
        source: "Demonstration title record"
      },

      visual: {
        status: "Current",
        lastVerification: "2026-08-20",
        recordType: "Photo Record",
        verifiedBy: "MREO Field Network — Dallas",
        evidence: [
          "Exterior Photos",
          "Interior Photos",
          "Location Verification"
        ]
      },

      transaction: {
        stage: "Active Sealed Bidding",
        qualifiedBuyers: 14,
        offersReceived: 3,

        bids: [

          {
            id: "A",
            price: 405000,
            funding: "Financing Pending",
            closingDays: 45,
            executionScore: 68,
            selected: false,
            status: "Active",

            inspection:
              "Inspection requested",

            concessions:
              "Standard financing concessions",

            deposit:
              8000
          },

          {
            id: "B",
            price: 397000,
            funding: "Confirmed Cash",
            closingDays: 14,
            executionScore: 94,
            selected: true,
            status: "Selected",

            inspection:
              "Limited inspection",

            concessions:
              "None",

            deposit:
              15000
          },

          {
            id: "C",
            price: 402000,
            funding: "Partial Confirmation",
            closingDays: 30,
            executionScore: 79,
            selected: false,
            status: "Active",

            inspection:
              "Standard inspection",

            concessions:
              "Limited",

            deposit:
              10000
          }

        ],

        selectionNote:
          "Buyer B was selected because the offer had the strongest overall execution profile, despite not having the highest purchase price.",

        backupBuyer: {
          selectedBuyer: "B",
          backupBuyer: "C",
          status: "Standby"
        }
      },

      reconstruction: {
        status: "No Active Reconstruction",
        budget: null,
        committed: null,
        scopeStatus: "No Active Scope",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Not Yet Operating",
        occupancy: "Not recorded",
        monthlyRent: null,
        netMonthlyIncome: null,
        equity: null,
        resaleReadiness: 91,
        disposition: "Active Sale"
      }
    },


    /* ==========================================================
       MREO-0002
       ========================================================== */

    {
      id: "MREO-0002",

      addressLine1: "7812 Oak Hollow Lane",
      city: "Fort Worth",
      state: "TX",
      zip: "76137",
      location: "Fort Worth, Texas",

      price: 319000,
      estimatedValue: 332000,
      arv: 425000,

      beds: 4,
      baths: 2,
      sqft: 2210,

      propertyType: "Single-Family Home",
      condition: "Reconstruction Candidate",

      readiness: 72,

      image:
        "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Seller Value Recovery",

      valuation: {
        currentPrice: 319000,
        estimatedValue: 332000,
        arv: 425000,

        sources: {
          currentPrice:
            "MREO demonstration seller record",

          estimatedValue:
            "Demonstration automated valuation",

          arv:
            "MREO reconstruction-supported valuation model"
        }
      },

      title: {
        status: "Review Complete",
        sellerAuthority: "Confirmed",
        readiness: 89,
        exceptions: [],
        source: "Demonstration title record"
      },

      reconstruction: {
        status: "Planned",
        budget: 64000,
        committed: 0,

        scopeStatus: "Planned",

        scope: [
          "Roof repairs",
          "Interior paint and finish work",
          "Flooring replacement",
          "Kitchen updates",
          "Bathroom repairs"
        ],

        milestones: [
          {
            name: "Scope Approval",
            status: "Complete"
          },
          {
            name: "Contractor Selection",
            status: "In Progress"
          },
          {
            name: "Reconstruction Start",
            status: "Next"
          },
          {
            name: "Final Turnover",
            status: "Pending"
          }
        ],

        team: [
          {
            name: professionals.cedarlineConstruction.name,
            role: "General Contractor",
            status: "Demonstration Participant"
          },
          {
            name: professionals.northTexasInspection.name,
            role: "Property Inspection",
            status: "Demonstration Participant"
          },
          {
            name: professionals.reconstructionCapital.name,
            role: "Reconstruction Capital",
            status: "Demonstration Participant"
          }
        ]
      },

      transaction: {
        stage: "Seller Value Recovery",
        qualifiedBuyers: 0,
        offersReceived: 0,
        bids: []
      },

      operations: {
        status: "Pre-Operation",
        occupancy: "Vacant",
        disposition: "Reconstruction-Supported Sale"
      }
    },


    /* ==========================================================
       MREO-0003
       ========================================================== */

    {
      id: "MREO-0003",

      addressLine1: "2605 Preston Meadow Court",
      city: "Plano",
      state: "TX",
      zip: "75093",
      location: "Plano, Texas",

      price: 548000,

      beds: 4,
      baths: 3,
      sqft: 2840,

      propertyType: "Single-Family Home",
      condition: "Market Ready",

      readiness: 97,

      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Rapid Execution",

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 98,
        exceptions: []
      },

      transaction: {
        stage: "Active Bidding",
        qualifiedBuyers: 19,
        offersReceived: 5,
        bids: []
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Not Yet Operating",
        occupancy: "Vacant",
        resaleReadiness: 97,
        disposition: "Active Sale"
      }
    },


    /* ==========================================================
       MREO-0004
       ========================================================== */

    {
      id: "MREO-0004",

      addressLine1: "1147 Riverside Terrace",
      city: "Irving",
      state: "TX",
      zip: "75062",
      location: "Irving, Texas",

      price: 429000,

      beds: 3,
      baths: 2,
      sqft: 2075,

      propertyType: "Single-Family Rental",
      condition: "Operating",

      image:
        "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Operating Rental",

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 94,
        exceptions: []
      },

      transaction: {
        stage: "Operating Asset",
        qualifiedBuyers: 0,
        offersReceived: 0,
        bids: []
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Operating Rental",
        occupancy: "Tenant Occupied",

        monthlyRent: 3350,
        netMonthlyIncome: 2140,

        equity: 161000,
        resaleReadiness: 82,
        disposition: "Hold / Operating Rental",

        maintenance: [
          {
            issue: "Water Line Repair",
            status: "Service Scheduled",
            provider: "MREO Local Operations"
          },
          {
            issue: "Post-Repair Inspection",
            status: "Pending",
            provider: "Property Risk Services"
          }
        ],

        insurance: {
          coverageStatus: "Coverage Active",
          policyStatus: "Current",

          riskIssue: {
            name: "Water Damage Event",
            status: "Repair Coordination Active",
            description:
              "A storm-related water-line event is associated with the property record. Local repair activity is being coordinated and documented."
          }
        }
      }
    },


    /* ==========================================================
       MREO-0005
       ========================================================== */

    {
      id: "MREO-0005",

      addressLine1: "3319 Meadowcrest Avenue",
      city: "Garland",
      state: "TX",
      zip: "75043",
      location: "Garland, Texas",

      price: 274000,

      beds: 3,
      baths: 2,
      sqft: 1780,

      propertyType: "Single-Family Home",
      condition: "Heavy Reconstruction",

      readiness: 54,

      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=82",

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 88,
        exceptions: []
      },

      transaction: {
        stage: "Reconstruction",
        qualifiedBuyers: 0,
        offersReceived: 0,
        bids: []
      },

      reconstruction: {
        status: "Active Reconstruction",

        budget: 93000,
        committed: 46500,

        scopeStatus: "Active",

        scope: [
          "Plumbing replacement",
          "Electrical repairs",
          "Kitchen reconstruction",
          "Bathroom reconstruction",
          "Flooring replacement",
          "Interior wall and finish repairs"
        ],

        changeOrders: [
          {
            name: "Plumbing Change Order",
            amount: 6800,
            status: "Approved"
          }
        ],

        milestones: [
          {
            name: "Property Assessment",
            status: "Complete"
          },
          {
            name: "Scope Approval",
            status: "Complete"
          },
          {
            name: "Plumbing Replacement",
            status: "In Progress"
          },
          {
            name: "Kitchen and Bath Reconstruction",
            status: "Next"
          },
          {
            name: "Interior Finish Work",
            status: "Pending"
          },
          {
            name: "Final Inspection and Turnover",
            status: "Pending"
          }
        ],

        team: [
          {
            name: professionals.cedarlineConstruction.name,
            role: "General Contractor",
            status: "Demonstration Participant"
          },
          {
            name: professionals.northTexasInspection.name,
            role: "Inspection and Progress Review",
            status: "Demonstration Participant"
          },
          {
            name: professionals.reconstructionCapital.name,
            role: "Project Capital Coordination",
            status: "Demonstration Participant"
          },
          {
            name: professionals.localOperations.name,
            role: "Local Project Coordination",
            status: "Demonstration Participant"
          }
        ]
      },

      operations: {
        status: "Not Yet Operating",
        occupancy: "Vacant",
        disposition: "Reconstruction"
      }
    },


    /* ==========================================================
       MREO-0006
       ========================================================== */

    {
      id: "MREO-0006",

      addressLine1: "9014 Silver Creek Way",
      city: "Frisco",
      state: "TX",
      zip: "75035",
      location: "Frisco, Texas",

      price: 689000,

      beds: 4,
      baths: 3,
      sqft: 3215,

      propertyType: "Single-Family Home",
      condition: "Market Ready",

      readiness: 94,

      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Global Qualified Distribution",

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 96,
        exceptions: []
      },

      visual: {
        status: "Current",
        lastVerification: "2026-08-18",
        recordType: "Remote Distribution Package",
        verifiedBy: "MREO Field Network — Dallas",
        evidence: [
          "Exterior Photos",
          "Interior Photos",
          "Walkthrough Video",
          "Location Verification"
        ]
      },

      transaction: {
        stage: "Global Qualified Distribution",
        qualifiedBuyers: 31,
        offersReceived: 6,
        bids: []
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Not Yet Operating",
        occupancy: "Vacant",
        resaleReadiness: 94,
        disposition: "Active Sale"
      }
    },


    /* ==========================================================
       MREO-0007
       ========================================================== */

    {
      id: "MREO-0007",

      addressLine1: "1420 Northgate Row",
      city: "Richardson",
      state: "TX",
      zip: "75080",
      location: "Richardson, Texas",

      price: 374000,

      beds: 3,
      baths: 2.5,
      sqft: 1845,

      propertyType: "Townhouse",
      condition: "Market Ready",

      readiness: 88,

      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=82",

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 90,

        exceptions: [
          "Assignment rights require explicit transaction disclosure."
        ]
      },

      transaction: {
        stage: "Offer Review",
        qualifiedBuyers: 11,
        offersReceived: 2,
        bids: [],

        assignmentRights:
          "Assignment terms must be disclosed before selection."
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Not Yet Operating",
        occupancy: "Vacant",
        disposition: "Active Sale"
      }
    },


    /* ==========================================================
       MREO-0008
       ========================================================== */

    {
      id: "MREO-0008",

      addressLine1: "6104 Parkstone Drive",
      city: "Arlington",
      state: "TX",
      zip: "76017",
      location: "Arlington, Texas",

      price: 362000,

      beds: 3,
      baths: 2,
      sqft: 1980,

      propertyType: "Single-Family Home",
      condition: "Transaction Blocked",

      readiness: 61,

      image:
        "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Title Intervention",

      title: {
        status: "Intervention Required",
        sellerAuthority: "Confirmed",
        readiness: 52,

        exceptions: [
          "Prior lien appears unreleased in the demonstration title record."
        ],

        source:
          "Demonstration title review"
      },

      transaction: {
        stage: "Blocked — Title Intervention",
        qualifiedBuyers: 8,
        offersReceived: 1,
        bids: []
      },

      settlement: {
        stage: "Title Resolution Required",

        titleRequirement:
          "Release of prior lien",

        titleStatus:
          "Intervention Required",

        responsibleParty:
          "Meridian Title Services",

        requiredAction:
          "Confirm satisfaction and record the appropriate lien release before settlement can proceed."
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Not Yet Operating",
        occupancy: "Vacant",
        disposition: "Transaction Hold"
      }
    },


    /* ==========================================================
       MREO-0009
       ========================================================== */

    {
      id: "MREO-0009",

      addressLine1: "7214 Willow Bend Court",
      city: "McKinney",
      state: "TX",
      zip: "75071",
      location: "McKinney, Texas",

      price: 625000,

      beds: 4,
      baths: 3,
      sqft: 3025,

      propertyType: "Single-Family Home",
      condition: "Market Ready",

      readiness: 93,

      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Executable Bid Analysis",

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 95,
        exceptions: []
      },

      transaction: {
        stage: "Bid Selection",
        qualifiedBuyers: 22,
        offersReceived: 4,

        bids: [
          {
            id: "A",
            price: 648000,
            funding: "Financing Pending",
            closingDays: 45,
            executionScore: 68,
            selected: false
          },
          {
            id: "B",
            price: 636000,
            funding: "Confirmed Cash",
            closingDays: 14,
            executionScore: 94,
            selected: true
          },
          {
            id: "C",
            price: 643000,
            funding: "Partial Confirmation",
            closingDays: 30,
            executionScore: 79,
            selected: false
          },
          {
            id: "D",
            price: 632000,
            funding: "Confirmed Financing",
            closingDays: 21,
            executionScore: 88,
            selected: false
          }
        ],

        selectionNote:
          "Buyer B was selected because execution certainty outweighed the higher nominal price offered by Buyer A.",

        backupBuyer: {
          selectedBuyer: "B",
          backupBuyer: "D",
          status: "Standby"
        }
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Not Yet Operating",
        occupancy: "Vacant",
        disposition: "Under Contract"
      }
    },


    /* ==========================================================
       MREO-0010
       ========================================================== */

    {
      id: "MREO-0010",

      addressLine1: "1827 Creekside Circle",
      city: "Mesquite",
      state: "TX",
      zip: "75149",
      location: "Mesquite, Texas",

      price: 289000,

      beds: 3,
      baths: 2,
      sqft: 1650,

      propertyType: "Single-Family Home",
      condition: "As-Is",

      readiness: 84,

      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Expedited As-Is Sale",

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 91,
        exceptions: []
      },

      transaction: {
        stage: "Expedited As-Is Bidding",
        qualifiedBuyers: 17,
        offersReceived: 4,
        bids: []
      },

      reconstruction: {
        status: "No Seller Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Not Yet Operating",
        occupancy: "Vacant",
        disposition: "Expedited Sale"
      }
    },


    /* ==========================================================
       MREO-0011
       ========================================================== */

    {
      id: "MREO-0011",

      addressLine1: "3042 Stonebrook Lane",
      city: "Carrollton",
      state: "TX",
      zip: "75007",
      location: "Carrollton, Texas",

      price: 447000,

      beds: 4,
      baths: 2.5,
      sqft: 2390,

      propertyType: "Single-Family Home",
      condition: "Market Ready",

      readiness: 90,

      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Backup Bidder Activated",

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 93,
        exceptions: []
      },

      transaction: {
        stage: "Backup Buyer Activated",
        qualifiedBuyers: 16,
        offersReceived: 4,

        selectedBuyer:
          "Original Buyer",

        backupBuyer: {
          selectedBuyer:
            "Original Buyer",

          backupBuyer:
            "Backup Buyer 1",

          status:
            "Activated",

          reason:
            "Original selected buyer missed the required deposit deadline."
        }
      },

      settlement: {
        stage: "Backup Buyer Activation",

        deadlines: [
          {
            name: "Selected Buyer Deposit",
            date: "2026-08-28",
            status: "Missed"
          },
          {
            name: "Backup Buyer Activation",
            date: "2026-09-01",
            status: "Complete"
          }
        ]
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Not Yet Operating",
        occupancy: "Vacant",
        disposition: "Under Contract"
      }
    },


    /* ==========================================================
       MREO-0012
       ========================================================== */

    {
      id: "MREO-0012",

      addressLine1: "1850 Cedar Ridge Boulevard",
      city: "Southlake",
      state: "TX",
      zip: "76092",
      location: "Southlake, Texas",

      price: 1125000,

      beds: 5,
      baths: 4.5,
      sqft: 4820,

      propertyType: "Single-Family Home",
      condition: "Market Ready",

      readiness: 96,

      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "International Qualified Buyer",

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 97,
        exceptions: []
      },

      visual: {
        status: "Current",
        lastVerification: "2026-08-25",
        recordType: "Remote Verification Package",
        verifiedBy: "MREO Field Network — Dallas",

        evidence: [
          "Current Exterior Photos",
          "Current Interior Photos",
          "Geotagged Video",
          "Authorized Walkthrough",
          "Location Verification"
        ]
      },

      transaction: {
        stage: "Global Qualified Distribution",
        qualifiedBuyers: 38,
        offersReceived: 7,
        bids: []
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Not Yet Operating",
        occupancy: "Vacant",
        resaleReadiness: 96,
        disposition: "Active Sale"
      }
    },


    /* ==========================================================
       MREO-0013
       ========================================================== */

    {
      id: "MREO-0013",

      addressLine1: "940 Hickory Grove Road",
      city: "Denton",
      state: "TX",
      zip: "76209",
      location: "Denton, Texas",

      price: 342000,

      beds: 3,
      baths: 2,
      sqft: 1885,

      propertyType: "Single-Family Home",
      condition: "Institutional REO",

      readiness: 78,

      image:
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Institutional REO",

      institutional: {
        ownerType:
          "Institutional Owner",

        portfolio:
          "Southwest Residential Portfolio",

        portfolioId:
          "PORT-SW-001"
      },

      title: {
        status: "Institutional Review",
        sellerAuthority: "Confirmed",
        readiness: 83,
        exceptions: []
      },

      transaction: {
        stage: "Institutional Distribution",
        qualifiedBuyers: 24,
        offersReceived: 3,
        bids: []
      },

      reconstruction: {
        status: "Assessment",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Institutional Inventory",
        occupancy: "Vacant",
        disposition: "Distribution"
      }
    },


    /* ==========================================================
       MREO-0014
       ========================================================== */

    {
      id: "MREO-0014",

      addressLine1: "5016 Meridian Place",
      city: "Addison",
      state: "TX",
      zip: "75001",
      location: "Addison, Texas",

      price: 412000,

      beds: 3,
      baths: 2.5,
      sqft: 1760,

      propertyType: "Townhouse",
      condition: "Digital-First Transaction",

      readiness: 95,

      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Digital-First Transaction",

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 96,
        exceptions: []
      },

      visual: {
        status: "Current",
        lastVerification: "2026-08-24",
        recordType: "Digital Property Record",
        verifiedBy: "MREO Field Network — Dallas"
      },

      transaction: {
        stage: "Digital-First Transaction",
        qualifiedBuyers: 15,
        offersReceived: 3,
        bids: []
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Not Yet Operating",
        occupancy: "Vacant",
        resaleReadiness: 95,
        disposition: "Active Sale"
      }
    },


    /* ==========================================================
       MREO-0015
       ========================================================== */

    {
      id: "MREO-0015",

      addressLine1: "2317 Lakeview Terrace",
      city: "Lewisville",
      state: "TX",
      zip: "75067",
      location: "Lewisville, Texas",

      price: 468000,

      beds: 4,
      baths: 3,
      sqft: 2575,

      propertyType: "Single-Family Home",
      condition: "Remote Owner",

      readiness: 87,

      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Remote Owner",

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 92,
        exceptions: []
      },

      visual: {
        status: "Current",
        lastVerification: "2026-08-27",
        recordType: "Remote Field Verification",
        verifiedBy: "MREO Field Network — Dallas",

        evidence: [
          "Geotagged Exterior Video",
          "Authorized Walkthrough",
          "Current Exterior Photos",
          "Location Verification"
        ]
      },

      transaction: {
        stage: "Owner Review",
        qualifiedBuyers: 0,
        offersReceived: 0,
        bids: []
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Remote Ownership",
        occupancy: "Not recorded",

        insurance: {
          coverageStatus: "Coverage Active",
          policyStatus: "Current",

          riskIssue: {
            name: "Remote Property Verification",
            status: "Monitoring",
            description:
              "The remote owner has requested current field verification so property condition information remains current for ongoing ownership decisions."
          }
        },

        disposition: "Hold"
      }
    },


    /* ==========================================================
       MREO-0016
       ========================================================== */

    {
      id: "MREO-0016",

      addressLine1: "805 Vineyard Crossing",
      city: "Grapevine",
      state: "TX",
      zip: "76051",
      location: "Grapevine, Texas",

      price: 515000,

      beds: 4,
      baths: 3,
      sqft: 2680,

      propertyType: "Single-Family Home",
      condition: "Under Contract",

      readiness: 92,

      image:
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Active Settlement",

      title: {
        status: "Conditional",
        sellerAuthority: "Confirmed",
        readiness: 85,

        exceptions: [
          "Lien resolution remains open before closing."
        ]
      },

      transaction: {
        stage: "Active Settlement",
        qualifiedBuyers: 18,
        offersReceived: 4,

        selectedBuyer:
          "Buyer B",

        bids: [
          {
            id: "B",
            price: 521000,
            funding: "Confirmed",
            closingDays: 24,
            executionScore: 92,
            selected: true
          }
        ]
      },

      settlement: {
        stage: "Active Settlement",
        targetClosing: "2026-09-28",
        progress: 58,

        earnestMoney: 25000,
        purchaserFunding:
          "Proof-of-Funds Refresh Required",

        fundsRequired:
          "Updated purchaser funding verification",

        fundsStatus:
          "Not Yet Ready",

        titleRequirement:
          "Lien resolution",

        titleStatus:
          "Pending",

        responsibleParty:
          "Meridian Title Services",

        requiredAction:
          "Resolve the outstanding lien item before closing.",

        requirements: [
          "Lien resolution",
          "Proof-of-funds refresh",
          "Final condition acknowledgment"
        ],

        documents: [
          {
            name: "Purchase Agreement",
            status: "Complete",
            responsibleParty: "Buyer and Seller"
          },
          {
            name: "Title Commitment",
            status: "Complete",
            responsibleParty: "Meridian Title Services"
          },
          {
            name: "Lien Resolution Record",
            status: "Pending",
            responsibleParty: "Meridian Title Services"
          },
          {
            name: "Proof-of-Funds Refresh",
            status: "Pending",
            responsibleParty: "Buyer"
          },
          {
            name: "Final Condition Acknowledgment",
            status: "Pending",
            responsibleParty: "Buyer"
          }
        ],

        deadlines: [
          {
            name: "Proof-of-Funds Refresh",
            date: "2026-09-08",
            status: "Upcoming"
          },
          {
            name: "Lien Resolution",
            date: "2026-09-15",
            status: "Upcoming"
          },
          {
            name: "Final Condition Acknowledgment",
            date: "2026-09-24",
            status: "Upcoming"
          },
          {
            name: "Closing",
            date: "2026-09-28",
            status: "Upcoming"
          }
        ]
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Pending Settlement",
        occupancy: "Vacant",
        disposition: "Under Contract"
      }
    },


    /* ==========================================================
       MREO-0017
       ========================================================== */

    {
      id: "MREO-0017",

      addressLine1: "3921 Travis Street Unit 204",
      city: "Dallas",
      state: "TX",
      zip: "75204",
      location: "Dallas, Texas",

      price: 349000,

      beds: 2,
      baths: 2,
      sqft: 1280,

      propertyType: "Condominium",
      condition: "Market Ready",

      readiness: 81,

      image:
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=82",

      title: {
        status: "Additional Document Required",
        sellerAuthority: "Confirmed",
        readiness: 78,

        exceptions: [
          "HOA resale certificate required."
        ]
      },

      transaction: {
        stage: "Document Readiness",
        qualifiedBuyers: 9,
        offersReceived: 1,
        bids: []
      },

      settlement: {
        stage: "Pre-Settlement",
        requirements: [
          "HOA resale certificate"
        ]
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Not Yet Operating",
        occupancy: "Vacant",
        disposition: "Active Sale"
      }
    },


    /* ==========================================================
       MREO-0018
       ========================================================== */

    {
      id: "MREO-0018",

      addressLine1: "1709 Brookfield Drive",
      city: "Allen",
      state: "TX",
      zip: "75002",
      location: "Allen, Texas",

      price: 456000,

      beds: 4,
      baths: 3,
      sqft: 2495,

      propertyType: "Single-Family Home",
      condition: "Owner Retention",

      readiness: 76,

      image:
        "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Owner Retention",

      ownerObjective:
        "Keep Property",

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 91,
        exceptions: []
      },

      transaction: {
        stage: "Owner Retention",
        qualifiedBuyers: 0,
        offersReceived: 0,
        bids: []
      },

      reconstruction: {
        status: "No Active Reconstruction",
        scope: [],
        milestones: [],
        team: []
      },

      operations: {
        status: "Owner Retention",
        occupancy: "Owner Occupied",

        monthlyRent: null,
        netMonthlyIncome: null,

        equity: null,
        resaleReadiness: null,

        disposition:
          "Owner Retention"
      }
    },


    /* ==========================================================
       MREO-0019
       ========================================================== */

    {
      id: "MREO-0019",

      addressLine1: "6408 Heritage Oaks Drive",
      city: "Colleyville",
      state: "TX",
      zip: "76034",
      location: "Colleyville, Texas",

      price: 795000,

      beds: 5,
      baths: 4,
      sqft: 4060,

      propertyType: "Single-Family Home",
      condition: "Portfolio Reconstruction",

      readiness: 66,

      image:
        "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Portfolio Reconstruction",

      institutional: {
        ownerType:
          "Investment Fund",

        portfolio:
          "Southwest Residential Portfolio",

        portfolioId:
          "PORT-SW-001"
      },

      title: {
        status: "Ready",
        sellerAuthority: "Confirmed",
        readiness: 90,
        exceptions: []
      },

      transaction: {
        stage: "Portfolio Reconstruction",
        qualifiedBuyers: 0,
        offersReceived: 0,
        bids: []
      },

      reconstruction: {
        status: "Portfolio Reconstruction",

        budget: 118000,
        committed: 72000,

        scopeStatus: "Active",

        scope: [
          "Roof and exterior repairs",
          "HVAC replacement",
          "Kitchen rehabilitation",
          "Bathroom rehabilitation",
          "Flooring and interior finishes",
          "Exterior cleanup and landscaping"
        ],

        changeOrders: [
          {
            name: "HVAC Scope Adjustment",
            amount: 9400,
            status: "Under Review"
          }
        ],

        milestones: [
          {
            name: "Portfolio Scope Approval",
            status: "Complete"
          },
          {
            name: "Contractor Mobilization",
            status: "Complete"
          },
          {
            name: "HVAC and Exterior Work",
            status: "In Progress"
          },
          {
            name: "Interior Rehabilitation",
            status: "Next"
          },
          {
            name: "Property Turnover",
            status: "Pending"
          }
        ],

        team: [
          {
            name: professionals.cedarlineConstruction.name,
            role: "Portfolio Contractor",
            status: "Demonstration Participant"
          },
          {
            name: professionals.northTexasInspection.name,
            role: "Inspection and Quality Review",
            status: "Demonstration Participant"
          },
          {
            name: professionals.reconstructionCapital.name,
            role: "Portfolio Reconstruction Capital",
            status: "Demonstration Participant"
          },
          {
            name: professionals.localOperations.name,
            role: "Property Coordination",
            status: "Demonstration Participant"
          }
        ]
      },

      operations: {
        status: "Pre-Operation",
        occupancy: "Vacant",
        disposition: "Reconstruction"
      }
    },


    /* ==========================================================
       MREO-0020
       ========================================================== */

    {
      id: "MREO-0020",

      addressLine1: "2906 Prairie Creek Road",
      city: "Grand Prairie",
      state: "TX",
      zip: "75052",
      location: "Grand Prairie, Texas",

      price: 398000,

      beds: 3,
      baths: 2,
      sqft: 2010,

      propertyType: "Single-Family Rental",
      condition: "Rehabilitated / Operating",

      readiness: 98,

      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=82",

      pathway:
        "Complete MREO Lifecycle",

      title: {
        status: "Complete",
        sellerAuthority: "Confirmed",
        readiness: 100,
        exceptions: []
      },

      transaction: {
        stage: "Closed",
        qualifiedBuyers: 13,
        offersReceived: 3,
        bids: []
      },

      settlement: {
        stage: "Closed",
        targetClosing: "2026-04-14",
        closingDate: "2026-04-14",
        progress: 100,

        earnestMoney: 18500,
        purchaserFunding: "Confirmed",
        fundsRequired: "Complete",
        fundsStatus: "Ready",

        titleRequirement: "Complete",
        titleStatus: "Resolved",
        responsibleParty: "Meridian Title Services",
        requiredAction: "No remaining title action.",

        requirements: [],

        documents: [
          {
            name: "Purchase Agreement",
            status: "Complete",
            responsibleParty: "Buyer and Seller"
          },
          {
            name: "Title Documents",
            status: "Complete",
            responsibleParty: "Meridian Title Services"
          },
          {
            name: "Funding Confirmation",
            status: "Complete",
            responsibleParty: "Buyer"
          },
          {
            name: "Final Condition Record",
            status: "Complete",
            responsibleParty: "MREO Local Operations"
          }
        ],

        deadlines: [
          {
            name: "Funding Confirmation",
            date: "2026-04-08",
            status: "Complete"
          },
          {
            name: "Final Documents",
            date: "2026-04-13",
            status: "Complete"
          },
          {
            name: "Closing",
            date: "2026-04-14",
            status: "Complete"
          }
        ]
      },

      reconstruction: {
        status: "Complete",

        budget: 76000,
        committed: 76000,

        scopeStatus: "Complete",

        scope: [
          "Interior rehabilitation",
          "Kitchen improvements",
          "Bathroom improvements",
          "Mechanical repairs",
          "Final cleaning and turnover"
        ],

        changeOrders: [],

        milestones: [
          {
            name: "Property Assessment",
            status: "Complete"
          },
          {
            name: "Scope Approval",
            status: "Complete"
          },
          {
            name: "Reconstruction",
            status: "Complete"
          },
          {
            name: "Final Inspection",
            status: "Complete"
          },
          {
            name: "Turnover to Operations",
            status: "Complete"
          }
        ],

        team: [
          {
            name: professionals.cedarlineConstruction.name,
            role: "Reconstruction Contractor",
            status: "Project Complete"
          },
          {
            name: professionals.northTexasInspection.name,
            role: "Final Property Review",
            status: "Project Complete"
          },
          {
            name: professionals.localOperations.name,
            role: "Turnover to Operations",
            status: "Project Complete"
          }
        ]
      },

      operations: {
        status: "Operating",
        occupancy: "Tenant Occupied",

        monthlyRent: 2850,
        netMonthlyIncome: 1840,

        equity: 128000,
        resaleReadiness: 98,

        disposition:
          "Hold / Resale Ready",

        maintenance: [
          {
            issue: "Routine HVAC Service",
            status: "Complete",
            provider: "MREO Local Operations"
          },
          {
            issue: "Turnover Cleaning",
            status: "Complete",
            provider: "MREO Local Operations"
          }
        ],

        insurance: {
          coverageStatus: "Coverage Active",
          policyStatus: "Current",
          riskIssue: null
        }
      }
    }

  ];


  /* ============================================================
     INSTITUTIONAL DEMONSTRATION PORTFOLIO
     ============================================================ */

  const institutionalPortfolio = {

    id:
      "PORT-SW-001",

    name:
      "Southwest Residential Portfolio",

    propertyCount:
      2716,

    projectedValue:
      184600000,

    readiness:
      78,

    qualifiedPurchasers:
      612,

    activeBids:
      1843,

    reconstructionBudget:
      34800000,

    closingsYTD:
      927,

    backupActivationsYTD:
      73,

    pipeline: {

      intakeDocumentation:
        489,

      marketBidding:
        872,

      underContract:
        314,

      reconstruction:
        442,

      operatingResale:
        599

    },

    alerts: {

      titleIntervention:
        66,

      staleFieldVerification:
        41,

      missedBuyerActivationDeadlines:
        17,

      immediateBackupBuyers:
        15

    }

  };


  /* ============================================================
     HELPERS
     ============================================================ */

  function getProperty(id) {

    if (!id) {
      return null;
    }


    const normalizedId =
      String(id)
        .trim()
        .toUpperCase();


    return (
      properties.find(
        property =>
          property.id.toUpperCase() ===
          normalizedId
      ) ||
      null
    );

  }


  function getAllProperties() {

    return properties.slice();

  }


  function getPropertiesByCity(city) {

    if (!city) {
      return [];
    }


    const normalizedCity =
      String(city)
        .trim()
        .toLowerCase();


    return properties.filter(
      property =>
        String(property.city)
          .toLowerCase() ===
        normalizedCity
    );

  }


  function getPropertiesByPathway(pathway) {

    if (!pathway) {
      return [];
    }


    const search =
      String(pathway)
        .trim()
        .toLowerCase();


    return properties.filter(
      property =>
        String(property.pathway || "")
          .toLowerCase()
          .includes(search)
    );

  }


  /* ============================================================
     COMPATIBILITY ALIASES
     ------------------------------------------------------------
     Some of the prototype pages may look for information at
     slightly different levels. These aliases keep those pages
     working without duplicating the underlying fictional records.
     ============================================================ */

  properties.forEach(
    property => {

      if (
        property.transaction &&
        Array.isArray(property.transaction.bids)
      ) {

        property.bids =
          property.transaction.bids;

      }


      if (property.transaction) {

        property.transactionStage =
          property.transaction.stage;


        property.qualifiedBuyers =
          property.transaction.qualifiedBuyers;


        property.offersReceived =
          property.transaction.offersReceived;

      }


      if (property.valuation) {

        property.currentPrice =
          property.valuation.currentPrice ??
          property.price;


        property.estimate =
          property.valuation.estimatedValue ??
          property.estimatedValue;


        property.projectedRepairedValue =
          property.valuation.arv ??
          property.arv;

      }


      if (property.title) {

        property.titleStatus =
          property.title.status;


        property.sellerAuthority =
          property.title.sellerAuthority;


        property.titleReadiness =
          property.title.readiness;


        property.titleExceptions =
          property.title.exceptions;

      }


      if (property.visual) {

        property.visualStatus =
          property.visual.status;


        property.lastVerification =
          property.visual.lastVerification;


        property.visualRecordType =
          property.visual.recordType;

      }


      if (property.operations) {

        property.occupancy =
          property.operations.occupancy;


        property.monthlyRent =
          property.operations.monthlyRent ??
          null;


        property.netMonthlyIncome =
          property.operations.netMonthlyIncome ??
          null;


        property.estimatedEquity =
          property.operations.equity ??
          null;


        property.resaleReadiness =
          property.operations.resaleReadiness ??
          property.resaleReadiness ??
          null;

      }

    }
  );


  /* ============================================================
     PUBLIC API
     ============================================================ */

  window.MREO_DATA = {

    properties,

    professionals,

    institutionalPortfolio,

    getProperty,

    getAllProperties,

    getPropertiesByCity,

    getPropertiesByPathway

  };

})();
