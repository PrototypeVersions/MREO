/*
  ============================================================
  MREO PROTOTYPE — SHARED DEMONSTRATION DATA
  ============================================================

  This file contains fictional demonstration records used by
  the MREO prototype.

  The property records, transaction information, bids,
  professionals, reconstruction figures, settlement data,
  portfolio information, and operating information shown here
  are illustrative only.

  Live property searches on seller.html will use the separate
  Cloudflare / RentCast property-data service.

  All website pages should read from window.MREO_DATA.
*/

(() => {
  "use strict";


  /*
    ============================================================
    GENERAL HELPERS
    ============================================================
  */

  const USD =
    new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }
    );


  function deepMerge(
    target,
    source
  ) {
    const output =
      Array.isArray(target)
        ? [...target]
        : { ...target };

    if (
      !source ||
      typeof source !== "object"
    ) {
      return output;
    }

    Object.keys(source).forEach(
      (key) => {
        const sourceValue =
          source[key];

        const targetValue =
          output[key];

        if (
          Array.isArray(sourceValue)
        ) {
          output[key] =
            [...sourceValue];

          return;
        }

        if (
          sourceValue &&
          typeof sourceValue === "object"
        ) {
          output[key] =
            deepMerge(
              (
                targetValue &&
                typeof targetValue === "object" &&
                !Array.isArray(targetValue)
              )
                ? targetValue
                : {},
              sourceValue
            );

          return;
        }

        output[key] =
          sourceValue;
      }
    );

    return output;
  }


  function makeSource(
    label,
    type,
    value,
    options = {}
  ) {
    return {
      label,
      type,
      value,

      provider:
        options.provider ||
        "MREO Demonstration",

      date:
        options.date ||
        "2026-09-01",

      status:
        options.status ||
        "Source recorded",

      notes:
        options.notes ||
        "",

      isLive:
        Boolean(
          options.isLive
        )
    };
  }


  /*
    ============================================================
    SHARED DEFAULT PROPERTY RECORD
    ============================================================
  */

  const defaultPropertyRecord = {
    marketStatus:
      "Available",

    scenario:
      "Standard Sale",

    propertyType:
      "Single Family",

    condition:
      "Good",

    occupancy:
      "Vacant",

    transactionReadiness:
      82,

    ownerObjective:
      "Maximize value",

    currentPathway:
      "Conventional Sale",

    institutional:
      {
        isInstitutional:
          false,

        ownerType:
          "Private Owner",

        portfolioName:
          "",

        authorityStatus:
          "Owner authority represented as confirmed for demonstration",

        dispositionStage:
          "Market Ready"
      },

    passport: {
      identity:
        "Verified",

      valuation:
        "Current",

      title:
        "Review complete",

      visual:
        "Current",

      reconstruction:
        "Not active",

      transaction:
        "Ready",

      operations:
        "Available",

      intelligence:
        "Active"
    },

    title: {
      status:
        "Clear",

      authority:
        "Seller authority represented as verified",

      liens:
        [],

      exceptions:
        [],

      readiness:
        "Ready for transaction"
    },

    visualHistory: [
      {
        date:
          "2026-08-20",

        type:
          "Exterior photographs",

        provider:
          "MREO Field Network",

        status:
          "Verified"
      },

      {
        date:
          "2026-08-20",

        type:
          "Interior walkthrough",

        provider:
          "MREO Field Network",

        status:
          "Verified"
      }
    ],

    reconstruction: {
      need:
        "Low",

      status:
        "Not started",

      budget:
        0,

      committed:
        0,

      projectedDurationDays:
        0,

      contractor:
        "",

      milestones:
        [],

      changeOrders:
        []
    },

    transaction: {
      qualifiedBuyers:
        8,

      sealedBids:
        2,

      selectedBuyer:
        "",

      backupBuyers:
        0,

      earnestMoney:
        0,

      closingTarget:
        "",

      status:
        "Open for qualified interest"
    },

    settlement: {
      status:
        "Not started",

      progress:
        0,

      titleProvider:
        "Meridian Title Services",

      escrowStatus:
        "Not funded",

      purchaseAgreement:
        "Not executed",

      titleReview:
        "Pending",

      fundsStatus:
        "Pending",

      closingDate:
        "",

      obligations:
        []
    },

    operations: {
      status:
        "Not operating",

      occupancy:
        "Vacant",

      monthlyRent:
        0,

      monthlyNet:
        0,

      estimatedEquity:
        0,

      insuranceStatus:
        "Not applicable",

      maintenanceRequests:
        0,

      resaleReadiness:
        0
    },

    professionals: [
      {
        role:
          "Inspector",

        name:
          "North Texas Property Inspection",

        verified:
          true,

        status:
          "Available"
      },

      {
        role:
          "Title / Settlement",

        name:
          "Meridian Title Services",

        verified:
          true,

        status:
          "Available"
      },

      {
        role:
          "Property Management",

        name:
          "MREO Local Operations",

        verified:
          true,

        status:
          "Available"
      }
    ],

    bids:
      [],

    risks:
      [],

    tags:
      [],

    sources:
      []
  };


  /*
    ============================================================
    PROPERTY FACTORY
    ============================================================
  */

  function makeProperty(
    core,
    overrides = {}
  ) {
    const base =
      deepMerge(
        defaultPropertyRecord,
        core
      );

    const property =
      deepMerge(
        base,
        overrides
      );

    /*
      Provide commonly used derived fields.
    */

    property.fullAddress =
      `${property.addressLine1}, ${property.city}, ${property.state} ${property.zip}`;

    property.location =
      `${property.city}, ${property.state}`;

    property.priceFormatted =
      USD.format(
        property.price
      );

    property.estimatedValueFormatted =
      USD.format(
        property.estimatedValue
      );

    property.arvFormatted =
      USD.format(
        property.arv
      );

    return property;
  }


  /*
    ============================================================
    SHARED BID TEMPLATES
    ============================================================
  */

  const bidTemplates = {
    strongCash: {
      id:
        "BID-CASH",

      buyer:
        "Verified Cash Buyer",

      buyerType:
        "Private Acquisition Group",

      offer:
        0,

      capital:
        "Confirmed cash",

      capitalStatus:
        "Confirmed",

      contingencies:
        "Limited inspection",

      closingDays:
        14,

      executionScore:
        94,

      executionLabel:
        "High",

      deposit:
        25000,

      selected:
        false
    },

    highestFinanced: {
      id:
        "BID-FIN",

      buyer:
        "Institutional Buyer",

      buyerType:
        "Institutional",

      offer:
        0,

      capital:
        "Financing pending",

      capitalStatus:
        "Pending",

      contingencies:
        "Inspection + financing",

      closingDays:
        45,

      executionScore:
        68,

      executionLabel:
        "Medium",

      deposit:
        15000,

      selected:
        false
    },

    assignmentBuyer: {
      id:
        "BID-ASN",

      buyer:
        "Acquisition Group",

      buyerType:
        "Investor",

      offer:
        0,

      capital:
        "Partially confirmed",

      capitalStatus:
        "Partial",

      contingencies:
        "Inspection + assignment",

      closingDays:
        30,

      executionScore:
        79,

      executionLabel:
        "Medium-high",

      deposit:
        20000,

      selected:
        false
    },

    ownerOccupant: {
      id:
        "BID-OWN",

      buyer:
        "Owner Occupant",

      buyerType:
        "Individual",

      offer:
        0,

      capital:
        "Pre-underwritten",

      capitalStatus:
        "Confirmed",

      contingencies:
        "Inspection",

      closingDays:
        21,

      executionScore:
        88,

      executionLabel:
        "High",

      deposit:
        12000,

      selected:
        false
    }
  };


  function createBid(
    template,
    changes
  ) {
    return deepMerge(
      template,
      changes
    );
  }


  /*
    ============================================================
    20 FICTIONAL MREO PROPERTIES
    ============================================================
  */

  const properties = [

    /*
      ----------------------------------------------------------
      MREO-0001
      STANDARD / FLAGSHIP PROPERTY
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0001",

        addressLine1:
          "4218 Maple Ridge Drive",

        city:
          "Dallas",

        state:
          "TX",

        zip:
          "75229",

        price:
          385000,

        estimatedValue:
          398000,

        estimatedValueLow:
          372000,

        estimatedValueHigh:
          421000,

        arv:
          438000,

        beds:
          3,

        baths:
          2,

        sqft:
          1940,

        lotSize:
          8260,

        yearBuilt:
          1987,

        condition:
          "Move-in ready",

        transactionReadiness:
          91,

        image:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Move-in-ready Dallas home with a highly complete MREO Property Passport and active qualified interest."
      },

      {
        scenario:
          "Standard Qualified Sale",

        tags: [
          "Passport Complete",
          "Bid Ready",
          "Low Reconstruction Need"
        ],

        transaction: {
          qualifiedBuyers:
            14,

          sealedBids:
            3,

          backupBuyers:
            2,

          status:
            "Sealed bidding active"
        },

        bids: [
          createBid(
            bidTemplates.highestFinanced,
            {
              id:
                "MREO-0001-A",

              buyer:
                "Buyer A",

              offer:
                405000
            }
          ),

          createBid(
            bidTemplates.strongCash,
            {
              id:
                "MREO-0001-B",

              buyer:
                "Buyer B",

              offer:
                397000,

              selected:
                true
            }
          ),

          createBid(
            bidTemplates.assignmentBuyer,
            {
              id:
                "MREO-0001-C",

              buyer:
                "Buyer C",

              offer:
                402000
            }
          )
        ],

        sources: [
          makeSource(
            "Automated valuation",
            "AVM",
            398000,
            {
              provider:
                "Demonstration Property Data"
            }
          ),

          makeSource(
            "Broker price opinion",
            "BPO",
            404000,
            {
              provider:
                "Demonstration Broker"
            }
          ),

          makeSource(
            "Projected repaired value",
            "Projected ARV",
            438000,
            {
              provider:
                "MREO Scenario Model"
            }
          )
        ]
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0002
      RECONSTRUCTION OPPORTUNITY
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0002",

        addressLine1:
          "7812 Oak Hollow Lane",

        city:
          "Fort Worth",

        state:
          "TX",

        zip:
          "76137",

        price:
          319000,

        estimatedValue:
          332000,

        estimatedValueLow:
          304000,

        estimatedValueHigh:
          351000,

        arv:
          425000,

        beds:
          3,

        baths:
          2,

        sqft:
          1760,

        lotSize:
          9120,

        yearBuilt:
          1984,

        condition:
          "Moderate repairs",

        transactionReadiness:
          76,

        image:
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Property with meaningful reconstruction upside and an active MREO value-recovery scenario."
      },

      {
        scenario:
          "Seller Value Recovery",

        currentPathway:
          "Reconstruction-Supported Sale",

        reconstruction: {
          need:
            "Medium",

          status:
            "Planning",

          budget:
            64000,

          committed:
            0,

          projectedDurationDays:
            75,

          contractor:
            "Cedarline Construction",

          milestones: [
            {
              name:
                "Stabilization",

              amount:
                12000,

              status:
                "Pending"
            },

            {
              name:
                "Mechanical",

              amount:
                22000,

              status:
                "Pending"
            },

            {
              name:
                "Interior",

              amount:
                23000,

              status:
                "Pending"
            },

            {
              name:
                "Final / Contingency",

              amount:
                7000,

              status:
                "Pending"
            }
          ]
        },

        tags: [
          "Value Recovery",
          "Reconstruction",
          "Owner Equity"
        ],

        sources: [
          makeSource(
            "Current automated value",
            "AVM",
            332000
          ),

          makeSource(
            "Projected repaired value",
            "Projected ARV",
            425000,
            {
              provider:
                "MREO Scenario Model"
            }
          ),

          makeSource(
            "Reconstruction estimate",
            "Contractor Proposal",
            64000,
            {
              provider:
                "Cedarline Construction"
            }
          )
        ]
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0003
      HIGH READINESS PROPERTY
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0003",

        addressLine1:
          "2605 Preston Meadow Court",

        city:
          "Plano",

        state:
          "TX",

        zip:
          "75093",

        price:
          548000,

        estimatedValue:
          561000,

        estimatedValueLow:
          530000,

        estimatedValueHigh:
          589000,

        arv:
          590000,

        beds:
          4,

        baths:
          3,

        sqft:
          2610,

        lotSize:
          9700,

        yearBuilt:
          1996,

        condition:
          "Move-in ready",

        transactionReadiness:
          97,

        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "High-readiness Plano property with verified records and rapid-closing qualified demand."
      },

      {
        scenario:
          "Rapid Execution",

        tags: [
          "97% Ready",
          "Verified Buyer Pool",
          "Fast Close"
        ],

        transaction: {
          qualifiedBuyers:
            19,

          sealedBids:
            5,

          backupBuyers:
            3,

          status:
            "Seller reviewing bids"
        }
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0004
      OCCUPIED RENTAL
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0004",

        addressLine1:
          "1147 Riverside Terrace",

        city:
          "Irving",

        state:
          "TX",

        zip:
          "75062",

        price:
          429000,

        estimatedValue:
          441000,

        estimatedValueLow:
          416000,

        estimatedValueHigh:
          465000,

        arv:
          472000,

        beds:
          3,

        baths:
          2.5,

        sqft:
          2120,

        lotSize:
          7020,

        yearBuilt:
          2004,

        condition:
          "Good",

        occupancy:
          "Tenant occupied",

        transactionReadiness:
          88,

        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Income-producing rental demonstrating MREO's post-acquisition operating and management capabilities."
      },

      {
        scenario:
          "Operating Rental",

        currentPathway:
          "Continue Ownership",

        tags: [
          "Occupied",
          "Income Producing",
          "Management Active"
        ],

        operations: {
          status:
            "Active",

          occupancy:
            "Tenant occupied",

          monthlyRent:
            3350,

          monthlyNet:
            2140,

          estimatedEquity:
            161000,

          insuranceStatus:
            "Current",

          maintenanceRequests:
            1,

          resaleReadiness:
            89
        },

        passport: {
          operations:
            "Active"
        }
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0005
      DISTRESSED / HEAVIER REHAB
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0005",

        addressLine1:
          "3319 Meadowcrest Avenue",

        city:
          "Garland",

        state:
          "TX",

        zip:
          "75043",

        price:
          274000,

        estimatedValue:
          292000,

        estimatedValueLow:
          268000,

        estimatedValueHigh:
          315000,

        arv:
          398000,

        beds:
          3,

        baths:
          2,

        sqft:
          1580,

        lotSize:
          8450,

        yearBuilt:
          1978,

        condition:
          "Heavy rehabilitation",

        transactionReadiness:
          64,

        image:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Higher-repair property showing reconstruction underwriting, field verification, and controlled draw management."
      },

      {
        scenario:
          "Heavy Reconstruction",

        currentPathway:
          "Reconstruction-Supported Sale",

        reconstruction: {
          need:
            "High",

          status:
            "Scope approved",

          budget:
            93000,

          committed:
            46500,

          projectedDurationDays:
            105,

          contractor:
            "Cedarline Construction",

          milestones: [
            {
              name:
                "Stabilization + demolition",

              amount:
                16000,

              status:
                "Complete"
            },

            {
              name:
                "Structural + mechanical",

              amount:
                31000,

              status:
                "Complete"
            },

            {
              name:
                "Interior completion",

              amount:
                34000,

              status:
                "In progress"
            },

            {
              name:
                "Final + contingency",

              amount:
                12000,

              status:
                "Pending"
            }
          ],

          changeOrders: [
            {
              id:
                "CO-03",

              description:
                "Additional galvanized plumbing replacement",

              amount:
                6800,

              status:
                "Pending approval"
            }
          ]
        },

        tags: [
          "Heavy Rehab",
          "Controlled Draws",
          "ARV Opportunity"
        ],

        risks: [
          "Reconstruction cost variability",
          "Schedule sensitivity"
        ]
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0006
      PREMIUM PROPERTY
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0006",

        addressLine1:
          "9014 Silver Creek Way",

        city:
          "Frisco",

        state:
          "TX",

        zip:
          "75035",

        price:
          689000,

        estimatedValue:
          704000,

        estimatedValueLow:
          670000,

        estimatedValueHigh:
          741000,

        arv:
          748000,

        beds:
          4,

        baths:
          3.5,

        sqft:
          3180,

        lotSize:
          10020,

        yearBuilt:
          2012,

        condition:
          "Excellent",

        transactionReadiness:
          94,

        image:
          "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Higher-value Frisco residence with a complete passport and global purchaser interest."
      },

      {
        scenario:
          "Global Qualified Distribution",

        tags: [
          "Global Interest",
          "High Readiness",
          "Premium"
        ],

        transaction: {
          qualifiedBuyers:
            31,

          sealedBids:
            6,

          backupBuyers:
            4,

          status:
            "Global qualified bidding"
        }
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0007
      TOWNHOUSE / ASSIGNMENT RIGHTS
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0007",

        addressLine1:
          "1420 Northgate Row",

        city:
          "Richardson",

        state:
          "TX",

        zip:
          "75080",

        price:
          398000,

        estimatedValue:
          405000,

        estimatedValueLow:
          385000,

        estimatedValueHigh:
          424000,

        arv:
          428000,

        beds:
          3,

        baths:
          2.5,

        sqft:
          1890,

        lotSize:
          2860,

        yearBuilt:
          2018,

        propertyType:
          "Townhouse",

        condition:
          "Excellent",

        transactionReadiness:
          86,

        image:
          "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Townhouse demonstrating transparent assignment-right records and purchaser qualification."
      },

      {
        scenario:
          "Assignment Rights",

        tags: [
          "Townhouse",
          "Assignment Permitted",
          "Qualified Buyer"
        ],

        transaction: {
          qualifiedBuyers:
            11,

          sealedBids:
            2,

          backupBuyers:
            1,

          status:
            "Assignment-right review active"
        }
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0008
      TITLE ISSUE
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0008",

        addressLine1:
          "6104 Parkstone Drive",

        city:
          "Arlington",

        state:
          "TX",

        zip:
          "76017",

        price:
          337000,

        estimatedValue:
          346000,

        estimatedValueLow:
          326000,

        estimatedValueHigh:
          365000,

        arv:
          382000,

        beds:
          4,

        baths:
          2,

        sqft:
          1985,

        lotSize:
          8650,

        yearBuilt:
          1985,

        condition:
          "Minor updates",

        transactionReadiness:
          61,

        image:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Property demonstrating how MREO surfaces title problems before they derail settlement."
      },

      {
        scenario:
          "Title Intervention",

        title: {
          status:
            "Exception identified",

          authority:
            "Seller authority verified",

          liens: [
            {
              type:
                "Prior lien",

              status:
                "Release not yet recorded"
            }
          ],

          exceptions: [
            "Unreleased prior lien"
          ],

          readiness:
            "Requires title intervention"
        },

        passport: {
          title:
            "Review required",

          transaction:
            "Blocked"
        },

        tags: [
          "Title Issue",
          "Settlement Risk",
          "Lien Review"
        ],

        risks: [
          "Unreleased prior lien could delay closing"
        ]
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0009
      HIGHEST BID NOT BEST BID
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0009",

        addressLine1:
          "7214 Willow Bend Court",

        city:
          "McKinney",

        state:
          "TX",

        zip:
          "75071",

        price:
          615000,

        estimatedValue:
          628000,

        estimatedValueLow:
          596000,

        estimatedValueHigh:
          660000,

        arv:
          672000,

        beds:
          4,

        baths:
          3,

        sqft:
          2940,

        lotSize:
          10880,

        yearBuilt:
          2008,

        condition:
          "Excellent",

        transactionReadiness:
          92,

        image:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Active sealed-bid example where the highest offer carries weaker execution characteristics."
      },

      {
        scenario:
          "Executable Bid Analysis",

        transaction: {
          qualifiedBuyers:
            22,

          sealedBids:
            4,

          selectedBuyer:
            "Buyer B",

          backupBuyers:
            2,

          status:
            "Buyer selected"
        },

        bids: [
          createBid(
            bidTemplates.highestFinanced,
            {
              id:
                "MREO-0009-A",

              buyer:
                "Buyer A",

              offer:
                648000
            }
          ),

          createBid(
            bidTemplates.strongCash,
            {
              id:
                "MREO-0009-B",

              buyer:
                "Buyer B",

              offer:
                636000,

              selected:
                true
            }
          ),

          createBid(
            bidTemplates.assignmentBuyer,
            {
              id:
                "MREO-0009-C",

              buyer:
                "Buyer C",

              offer:
                643000
            }
          ),

          createBid(
            bidTemplates.ownerOccupant,
            {
              id:
                "MREO-0009-D",

              buyer:
                "Buyer D",

              offer:
                632000
            }
          )
        ],

        tags: [
          "Executable Bid",
          "Sealed Bidding",
          "Execution Score"
        ]
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0010
      EXPEDITED AS-IS
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0010",

        addressLine1:
          "1827 Creekside Circle",

        city:
          "Mesquite",

        state:
          "TX",

        zip:
          "75149",

        price:
          248000,

        estimatedValue:
          263000,

        estimatedValueLow:
          239000,

        estimatedValueHigh:
          281000,

        arv:
          339000,

        beds:
          3,

        baths:
          2,

        sqft:
          1520,

        lotSize:
          7480,

        yearBuilt:
          1974,

        condition:
          "Moderate repairs",

        transactionReadiness:
          83,

        image:
          "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Seller prioritizes speed and certainty through the expedited as-is pathway."
      },

      {
        scenario:
          "Expedited As-Is Sale",

        ownerObjective:
          "Sell quickly",

        currentPathway:
          "Expedited As-Is Sale",

        tags: [
          "Fast Sale",
          "As-Is",
          "Seller Priority: Speed"
        ],

        transaction: {
          qualifiedBuyers:
            17,

          sealedBids:
            4,

          backupBuyers:
            3,

          status:
            "Rapid-close bidding"
        }
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0011
      FAILED BUYER / BACKUP ACTIVATION
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0011",

        addressLine1:
          "3042 Stonebrook Lane",

        city:
          "Carrollton",

        state:
          "TX",

        zip:
          "75007",

        price:
          462000,

        estimatedValue:
          471000,

        estimatedValueLow:
          450000,

        estimatedValueHigh:
          493000,

        arv:
          506000,

        beds:
          4,

        baths:
          2.5,

        sqft:
          2225,

        lotSize:
          7940,

        yearBuilt:
          1994,

        condition:
          "Good",

        transactionReadiness:
          90,

        image:
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Demonstrates MREO's backup-bidder waterfall after the initial purchaser misses an activation requirement."
      },

      {
        scenario:
          "Backup Bidder Activated",

        transaction: {
          qualifiedBuyers:
            18,

          sealedBids:
            5,

          selectedBuyer:
            "Buyer D",

          backupBuyers:
            2,

          status:
            "Backup buyer activated"
        },

        risks: [
          "Original selected buyer failed deposit deadline"
        ],

        tags: [
          "Backup Activated",
          "Failed Buyer",
          "Transaction Continuity"
        ]
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0012
      PREMIUM / INTERNATIONAL BUYER
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0012",

        addressLine1:
          "1850 Cedar Ridge Boulevard",

        city:
          "Southlake",

        state:
          "TX",

        zip:
          "76092",

        price:
          1125000,

        estimatedValue:
          1158000,

        estimatedValueLow:
          1090000,

        estimatedValueHigh:
          1215000,

        arv:
          1235000,

        beds:
          5,

        baths:
          4.5,

        sqft:
          4420,

        lotSize:
          21780,

        yearBuilt:
          2010,

        condition:
          "Excellent",

        transactionReadiness:
          93,

        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Premium property used to demonstrate international qualified distribution and remote verification."
      },

      {
        scenario:
          "International Qualified Buyer",

        tags: [
          "International Distribution",
          "Remote Verification",
          "Premium"
        ],

        transaction: {
          qualifiedBuyers:
            38,

          sealedBids:
            7,

          backupBuyers:
            4,

          status:
            "International buyer qualification"
        }
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0013
      INSTITUTIONAL REO
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0013",

        addressLine1:
          "940 Hickory Grove Road",

        city:
          "Denton",

        state:
          "TX",

        zip:
          "76209",

        price:
          355000,

        estimatedValue:
          369000,

        estimatedValueLow:
          343000,

        estimatedValueHigh:
          391000,

        arv:
          448000,

        beds:
          3,

        baths:
          2,

        sqft:
          1830,

        lotSize:
          14600,

        yearBuilt:
          1971,

        condition:
          "Moderate repairs",

        transactionReadiness:
          79,

        image:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Institutionally controlled REO asset progressing through standardized intake, reconstruction review, and distribution."
      },

      {
        scenario:
          "Institutional REO",

        institutional: {
          isInstitutional:
            true,

          ownerType:
            "Financial Institution",

          portfolioName:
            "Southwest Residential Portfolio",

          authorityStatus:
            "Institutional disposition authority verified",

          dispositionStage:
            "Ready for Distribution"
        },

        tags: [
          "REO",
          "Institutional",
          "Portfolio Asset"
        ]
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0014
      URBAN TOWNHOUSE
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0014",

        addressLine1:
          "5016 Meridian Place",

        city:
          "Addison",

        state:
          "TX",

        zip:
          "75001",

        price:
          449000,

        estimatedValue:
          456000,

        estimatedValueLow:
          438000,

        estimatedValueHigh:
          477000,

        arv:
          486000,

        beds:
          2,

        baths:
          2.5,

        sqft:
          1710,

        lotSize:
          2180,

        yearBuilt:
          2019,

        propertyType:
          "Townhouse",

        condition:
          "Excellent",

        transactionReadiness:
          95,

        image:
          "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Highly standardized urban townhouse illustrating a streamlined digital transaction."
      },

      {
        scenario:
          "Digital-First Transaction",

        tags: [
          "Townhouse",
          "95% Ready",
          "Digital Closing"
        ]
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0015
      REMOTE OWNER
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0015",

        addressLine1:
          "2317 Lakeview Terrace",

        city:
          "Lewisville",

        state:
          "TX",

        zip:
          "75067",

        price:
          415000,

        estimatedValue:
          426000,

        estimatedValueLow:
          403000,

        estimatedValueHigh:
          450000,

        arv:
          469000,

        beds:
          4,

        baths:
          2.5,

        sqft:
          2340,

        lotSize:
          8310,

        yearBuilt:
          1991,

        condition:
          "Good",

        transactionReadiness:
          84,

        image:
          "https://images.unsplash.com/photo-1600566752229-250ed79470f8?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Out-of-area owner uses MREO field verification, local service coordination, and remote transaction management."
      },

      {
        scenario:
          "Remote Owner",

        tags: [
          "Remote Owner",
          "Field Network",
          "Local Coordination"
        ],

        visualHistory: [
          {
            date:
              "2026-08-26",

            type:
              "Geotagged exterior video",

            provider:
              "MREO Field Network",

            status:
              "Verified"
          },

          {
            date:
              "2026-08-26",

            type:
              "Authorized interior walkthrough",

            provider:
              "MREO Field Network",

            status:
              "Verified"
          }
        ]
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0016
      SETTLEMENT WORKSPACE EXAMPLE
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0016",

        addressLine1:
          "805 Vineyard Crossing",

        city:
          "Grapevine",

        state:
          "TX",

        zip:
          "76051",

        price:
          579000,

        estimatedValue:
          592000,

        estimatedValueLow:
          565000,

        estimatedValueHigh:
          619000,

        arv:
          631000,

        beds:
          4,

        baths:
          3,

        sqft:
          2690,

        lotSize:
          9130,

        yearBuilt:
          2005,

        condition:
          "Move-in ready",

        transactionReadiness:
          96,

        image:
          "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Property under contract demonstrating MREO's settlement timeline, obligations, deposit status, and closing coordination."
      },

      {
        scenario:
          "Active Settlement",

        transaction: {
          qualifiedBuyers:
            16,

          sealedBids:
            4,

          selectedBuyer:
            "Buyer B",

          backupBuyers:
            2,

          earnestMoney:
            25000,

          closingTarget:
            "2026-09-28",

          status:
            "Under contract"
        },

        settlement: {
          status:
            "Active",

          progress:
            58,

          titleProvider:
            "Meridian Title Services",

          escrowStatus:
            "Earnest money confirmed",

          purchaseAgreement:
            "Executed",

          titleReview:
            "One exception under review",

          fundsStatus:
            "Refresh required before closing",

          closingDate:
            "2026-09-28",

          obligations: [
            {
              type:
                "Required",

              item:
                "Resolve unreleased lien",

              assignedTo:
                "Meridian Title Services",

              due:
                "2026-09-18",

              status:
                "Open"
            },

            {
              type:
                "Buyer",

              item:
                "Refresh proof of funds",

              assignedTo:
                "Selected Buyer",

              due:
                "2026-09-20",

              status:
                "Open"
            },

            {
              type:
                "Review",

              item:
                "Final condition acknowledgment",

              assignedTo:
                "Selected Buyer",

              due:
                "2026-09-23",

              status:
                "Open"
            }
          ]
        },

        passport: {
          transaction:
            "Under contract"
        },

        tags: [
          "Settlement Active",
          "Under Contract",
          "Closing Workspace"
        ]
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0017
      CONDOMINIUM
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0017",

        addressLine1:
          "3921 Travis Street, Unit 204",

        city:
          "Dallas",

        state:
          "TX",

        zip:
          "75204",

        price:
          399000,

        estimatedValue:
          407000,

        estimatedValueLow:
          389000,

        estimatedValueHigh:
          426000,

        arv:
          432000,

        beds:
          2,

        baths:
          2,

        sqft:
          1180,

        lotSize:
          0,

        yearBuilt:
          2016,

        propertyType:
          "Condominium",

        condition:
          "Excellent",

        transactionReadiness:
          89,

        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Urban condominium showing HOA documentation and multifaceted property-record requirements."
      },

      {
        scenario:
          "Condominium Documentation",

        tags: [
          "Condominium",
          "HOA Review",
          "Urban"
        ],

        title: {
          status:
            "Clear",

          authority:
            "Seller authority verified",

          liens:
            [],

          exceptions: [
            "HOA resale certificate required"
          ],

          readiness:
            "Ready subject to HOA documentation"
        }
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0018
      OWNER RETENTION / DO NOT SELL
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0018",

        addressLine1:
          "1709 Brookfield Drive",

        city:
          "Allen",

        state:
          "TX",

        zip:
          "75002",

        price:
          515000,

        estimatedValue:
          527000,

        estimatedValueLow:
          501000,

        estimatedValueHigh:
          551000,

        arv:
          565000,

        beds:
          4,

        baths:
          3,

        sqft:
          2475,

        lotSize:
          9020,

        yearBuilt:
          1999,

        condition:
          "Good",

        occupancy:
          "Owner occupied",

        transactionReadiness:
          55,

        image:
          "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Owner-occupied property demonstrating that MREO can recommend retention rather than assuming a sale."
      },

      {
        scenario:
          "Owner Retention",

        ownerObjective:
          "Keep property",

        currentPathway:
          "Retention / Assistance",

        tags: [
          "Owner Occupied",
          "Retention",
          "No Sale Assumed"
        ],

        transaction: {
          qualifiedBuyers:
            0,

          sealedBids:
            0,

          backupBuyers:
            0,

          status:
            "Not currently distributed"
        }
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0019
      PORTFOLIO RECONSTRUCTION
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0019",

        addressLine1:
          "6408 Heritage Oaks Drive",

        city:
          "Colleyville",

        state:
          "TX",

        zip:
          "76034",

        price:
          875000,

        estimatedValue:
          903000,

        estimatedValueLow:
          856000,

        estimatedValueHigh:
          947000,

        arv:
          1045000,

        beds:
          5,

        baths:
          4,

        sqft:
          3760,

        lotSize:
          16900,

        yearBuilt:
          2001,

        condition:
          "Reconstruction underway",

        transactionReadiness:
          70,

        image:
          "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Institutional portfolio asset undergoing reconstruction with asset-level and portfolio-level budget controls."
      },

      {
        scenario:
          "Portfolio Reconstruction",

        institutional: {
          isInstitutional:
            true,

          ownerType:
            "Investment Fund",

          portfolioName:
            "Southwest Residential Portfolio",

          authorityStatus:
            "Portfolio authority verified",

          dispositionStage:
            "Reconstruction"
        },

        reconstruction: {
          need:
            "Medium-high",

          status:
            "In progress",

          budget:
            118000,

          committed:
            72000,

          projectedDurationDays:
            90,

          contractor:
            "Cedarline Construction",

          milestones: [
            {
              name:
                "Stabilization",

              amount:
                18000,

              status:
                "Complete"
            },

            {
              name:
                "Structural / mechanical",

              amount:
                42000,

              status:
                "Complete"
            },

            {
              name:
                "Interior",

              amount:
                43000,

              status:
                "In progress"
            },

            {
              name:
                "Final",

              amount:
                15000,

              status:
                "Pending"
            }
          ]
        },

        tags: [
          "Institutional",
          "Portfolio Reconstruction",
          "Managed Capital"
        ]
      }
    ),


    /*
      ----------------------------------------------------------
      MREO-0020
      COMPLETE LIFECYCLE EXAMPLE
      ----------------------------------------------------------
    */

    makeProperty(
      {
        id:
          "MREO-0020",

        addressLine1:
          "2906 Prairie Creek Road",

        city:
          "Grand Prairie",

        state:
          "TX",

        zip:
          "75052",

        price:
          289000,

        estimatedValue:
          301000,

        estimatedValueLow:
          279000,

        estimatedValueHigh:
          322000,

        arv:
          382000,

        beds:
          3,

        baths:
          2,

        sqft:
          1645,

        lotSize:
          8810,

        yearBuilt:
          1981,

        condition:
          "Rehabilitated",

        occupancy:
          "Tenant occupied",

        transactionReadiness:
          98,

        image:
          "https://images.unsplash.com/photo-1600047508788-786f3865b4b9?auto=format&fit=crop&w=1200&q=82",

        shortDescription:
          "Full-lifecycle MREO example: acquired, reconstructed, settled, leased, managed, and now prepared for future resale."
      },

      {
        scenario:
          "Complete MREO Lifecycle",

        currentPathway:
          "Operating Property",

        tags: [
          "Full Lifecycle",
          "Reconstructed",
          "Managed",
          "Resale Ready"
        ],

        reconstruction: {
          need:
            "Completed",

          status:
            "Complete",

          budget:
            71000,

          committed:
            68750,

          projectedDurationDays:
            82,

          contractor:
            "Cedarline Construction",

          milestones: [
            {
              name:
                "Stabilization",

              amount:
                11000,

              status:
                "Complete"
            },

            {
              name:
                "Mechanical",

              amount:
                22000,

              status:
                "Complete"
            },

            {
              name:
                "Interior",

              amount:
                28000,

              status:
                "Complete"
            },

            {
              name:
                "Final",

              amount:
                7750,

              status:
                "Complete"
            }
          ]
        },

        settlement: {
          status:
            "Closed",

          progress:
            100,

          titleProvider:
            "Meridian Title Services",

          escrowStatus:
            "Completed",

          purchaseAgreement:
            "Completed",

          titleReview:
            "Completed",

          fundsStatus:
            "Completed",

          closingDate:
            "2026-04-14",

          obligations:
            []
        },

        operations: {
          status:
            "Active",

          occupancy:
            "Tenant occupied",

          monthlyRent:
            2850,

          monthlyNet:
            1840,

          estimatedEquity:
            128000,

          insuranceStatus:
            "Current",

          maintenanceRequests:
            0,

          resaleReadiness:
            98
        },

        passport: {
          reconstruction:
            "Complete",

          transaction:
            "Closed",

          operations:
            "Active"
        }
      }
    )
  ];


  /*
    ============================================================
    SHARED PROPERTY PATHWAYS
    ============================================================
  */

  const pathways = {
    asis: {
      id:
        "asis",

      title:
        "Expedited As-Is Sale",

      shortTitle:
        "Sell As Is",

      description:
        "Distribute the property in its current condition to qualified purchasers while prioritizing speed, certainty, and limited seller preparation.",

      time:
        "14–30 days",

      uncertainty:
        "Low",

      ownerCash:
        "$0 modeled upfront",

      colorKey:
        "red"
    },

    conventional: {
      id:
        "conventional",

      title:
        "Conventional Sale",

      shortTitle:
        "Market Sale",

      description:
        "Prepare and distribute the property through the conventional market with professional representation where appropriate.",

      time:
        "45–90 days",

      uncertainty:
        "Medium",

      ownerCash:
        "Varies",

      colorKey:
        "blue"
    },

    reconstruction: {
      id:
        "reconstruction",

      title:
        "Reconstruction-Supported Sale",

      shortTitle:
        "Value Recovery",

      description:
        "Coordinate reconstruction capital, contractors, milestone-controlled funding, verification, and eventual market distribution.",

      time:
        "90–150 days",

      uncertainty:
        "Medium",

      ownerCash:
        "Financing model",

      colorKey:
        "yellow"
    },

    hold: {
      id:
        "hold",

      title:
        "Improve & Operate",

      shortTitle:
        "Retain Ownership",

      description:
        "Retain the property while coordinating repair, tenant placement, rent collection, maintenance, management, and potential future liquidity.",

      time:
        "Ongoing",

      uncertainty:
        "Medium",

      ownerCash:
        "Property-specific",

      colorKey:
        "green"
    },

    retain: {
      id:
        "retain",

      title:
        "Retention / Assistance",

      shortTitle:
        "Keep Property",

      description:
        "Evaluate alternatives that may permit the owner to retain the property rather than assuming that sale is the appropriate outcome.",

      time:
        "Case-specific",

      uncertainty:
        "Case-specific",

      ownerCash:
        "Case-specific",

      colorKey:
        "green"
    }
  };


  /*
    ============================================================
    SHARED PROFESSIONAL NETWORK
    ============================================================
  */

  const professionals = [
    {
      id:
        "PRO-001",

      role:
        "General Contractor",

      name:
        "Cedarline Construction",

      initials:
        "CT",

      verified:
        true,

      performance:
        4.9,

      completedRecords:
        86,

      description:
        "Reconstruction planning, construction management, milestone documentation, and change-order coordination."
    },

    {
      id:
        "PRO-002",

      role:
        "Inspector",

      name:
        "North Texas Property Inspection",

      initials:
        "IN",

      verified:
        true,

      performance:
        4.8,

      completedRecords:
        124,

      description:
        "Property-condition review, structural observations, systems review, and inspection documentation."
    },

    {
      id:
        "PRO-003",

      role:
        "Title / Settlement",

      name:
        "Meridian Title Services",

      initials:
        "TL",

      verified:
        true,

      performance:
        4.9,

      completedRecords:
        211,

      description:
        "Title review, settlement coordination, escrow status, closing documentation, and exception management."
    },

    {
      id:
        "PRO-004",

      role:
        "Property Management",

      name:
        "MREO Local Operations",

      initials:
        "PM",

      verified:
        true,

      performance:
        4.8,

      completedRecords:
        163,

      description:
        "Tenant placement, rent collection, maintenance coordination, local property operations, and reporting."
    },

    {
      id:
        "PRO-005",

      role:
        "Field Verification",

      name:
        "MREO Field Network — Dallas",

      initials:
        "FV",

      verified:
        true,

      performance:
        4.9,

      completedRecords:
        318,

      description:
        "Authorized photography, geotagged video, field observation, live walkthrough support, and construction documentation."
    },

    {
      id:
        "PRO-006",

      role:
        "Broker",

      name:
        "Demonstration Realty Partner",

      initials:
        "BR",

      verified:
        true,

      performance:
        4.7,

      completedRecords:
        72,

      description:
        "Market representation, broker price opinions, conventional distribution, and transaction support where applicable."
    },

    {
      id:
        "PRO-007",

      role:
        "Reconstruction Finance",

      name:
        "MREO Reconstruction Capital Partner",

      initials:
        "RF",

      verified:
        true,

      performance:
        4.8,

      completedRecords:
        54,

      description:
        "Demonstration reconstruction-financing provider for approved value-recovery scenarios."
    },

    {
      id:
        "PRO-008",

      role:
        "Insurance",

      name:
        "Property Risk Services",

      initials:
        "IR",

      verified:
        true,

      performance:
        4.7,

      completedRecords:
        98,

      description:
        "Property-risk documentation and demonstration insurance coordination."
    }
  ];


  /*
    ============================================================
    INSTITUTIONAL PORTFOLIO DEMONSTRATION DATA
    ============================================================
  */

  const institutionalPortfolio = {
    id:
      "PORT-SW-001",

    name:
      "Southwest Residential Portfolio",

    ownerType:
      "Demonstration Institutional Holder",

    totalProperties:
      2716,

    projectedValue:
      184600000,

    projectedValueFormatted:
      "$184.6M",

    stages: [
      {
        key:
          "intake",

        label:
          "Intake / Documentation",

        count:
          489,

        percent:
          18
      },

      {
        key:
          "market",

        label:
          "Market / Bidding",

        count:
          872,

        percent:
          32
      },

      {
        key:
          "contract",

        label:
          "Under Contract",

        count:
          314,

        percent:
          12
      },

      {
        key:
          "reconstruction",

        label:
          "Reconstruction",

        count:
          442,

        percent:
          16
      },

      {
        key:
          "operations",

        label:
          "Operating / Resale",

        count:
          599,

        percent:
          22
      }
    ],

    alerts: [
      {
        severity:
          "high",

        count:
          66,

        label:
          "Properties require title intervention"
      },

      {
        severity:
          "medium",

        count:
          41,

        label:
          "Field verification older than 60 days"
      },

      {
        severity:
          "normal",

        count:
          17,

        label:
          "Selected buyers missed activation deadlines"
      },

      {
        severity:
          "good",

        count:
          15,

        label:
          "Backup purchasers immediately available"
      }
    ],

    metrics: {
      averageTransactionReadiness:
        78,

      qualifiedPurchasers:
        612,

      activeBids:
        1843,

      activeReconstructionBudget:
        34800000,

      completedClosingsYTD:
        927,

      backupActivationsYTD:
        73
    }
  };


  /*
    ============================================================
    MREO INTELLIGENCE DEMONSTRATION RESPONSES
    ============================================================
  */

  const intelligenceResponses = {
    risk: {
      title:
        "Closing Risk Review",

      response:
        "The principal demonstrated closing risk is an unresolved title exception. The selected buyer's capital position is strong, but proof-of-funds currency should be confirmed before closing. Reconstruction records do not currently indicate a material closing blocker.",

      action:
        "Request title-exception status from the settlement provider."
    },

    pathway: {
      title:
        "Seller Pathway Comparison",

      response:
        "The reconstruction-supported pathway produces the highest modeled recovery when projected repaired value remains supportable and reconstruction stays within the approved range. The expedited as-is pathway provides greater speed and lower execution complexity. The appropriate choice depends on the owner's actual objective.",

      action:
        "Open the detailed net-outcome comparison."
    },

    reconstruction: {
      title:
        "Reconstruction Risk Review",

      response:
        "The current demonstration budget remains manageable, but the pending plumbing change order increases cost and reduces modeled owner proceeds dollar-for-dollar unless offset elsewhere. Milestone evidence should be completed before additional controlled funds are released.",

      action:
        "Compare the change order with a competing contractor proposal."
    },

    missing: {
      title:
        "Record Completeness Review",

      response:
        "The demonstration record is substantially complete. Remaining items include updated title-exception status, refreshed purchaser proof of funds, final condition acknowledgment, and the next reconstruction milestone package.",

      action:
        "Create a prioritized missing-record checklist."
    },

    default: {
      title:
        "MREO Property Analysis",

      response:
        "This prototype agent can interpret the demonstration Property Passport, transaction status, reconstruction data, settlement obligations, operating information, and pathway assumptions. It does not replace licensed or legally authorized professional judgment.",

      action:
        "Review the Property Passport."
    }
  };


  /*
    ============================================================
    SITE-WIDE CONFIGURATION
    ============================================================
  */

  const config = {
    prototypeName:
      "MREO Property Operating Network",

    version:
      "2.0-prototype",

    livePropertyEndpoint:
      "https://mreo-property-api.blakeaustinmyers01.workers.dev",

    githubPagesOrigin:
      "https://prototypeversions.github.io",

    featuredPropertyIds: [
      "MREO-0001",
      "MREO-0005",
      "MREO-0009",
      "MREO-0013"
    ],

    defaultPropertyId:
      "MREO-0001",

    disclaimer:
      "Demonstration prototype only. Property, transaction, reconstruction, settlement, professional, portfolio, and operating records in this data file are fictional and illustrative."
  };


  /*
    ============================================================
    PUBLIC DATA API
    ============================================================

    Future pages can call:

      MREO_DATA.getProperty("MREO-0001")
      MREO_DATA.getFeaturedProperties()
      MREO_DATA.filterProperties({...})
  */

  function getProperty(
    id
  ) {
    return (
      properties.find(
        (property) =>
          property.id === id
      ) ||
      properties[0]
    );
  }


  function getFeaturedProperties() {
    return config.featuredPropertyIds
      .map(
        (id) =>
          getProperty(id)
      )
      .filter(Boolean);
  }


  function getInstitutionalProperties() {
    return properties.filter(
      (property) =>
        property
          .institutional
          .isInstitutional
    );
  }


  function getPropertiesByScenario(
    scenario
  ) {
    const query =
      String(
        scenario || ""
      )
        .trim()
        .toLowerCase();

    return properties.filter(
      (property) =>
        String(
          property.scenario || ""
        )
          .toLowerCase()
          .includes(query)
    );
  }


  function searchProperties(
    searchTerm
  ) {
    const query =
      String(
        searchTerm || ""
      )
        .trim()
        .toLowerCase();

    if (!query) {
      return [...properties];
    }

    return properties.filter(
      (property) => {
        const searchable =
          [
            property.id,
            property.addressLine1,
            property.city,
            property.state,
            property.zip,
            property.propertyType,
            property.condition,
            property.scenario,
            property.currentPathway,
            ...property.tags
          ]
            .join(" ")
            .toLowerCase();

        return searchable.includes(
          query
        );
      }
    );
  }


  function filterProperties(
    filters = {}
  ) {
    return properties.filter(
      (property) => {
        if (
          filters.minPrice &&
          property.price <
            Number(filters.minPrice)
        ) {
          return false;
        }

        if (
          filters.maxPrice &&
          property.price >
            Number(filters.maxPrice)
        ) {
          return false;
        }

        if (
          filters.minBeds &&
          property.beds <
            Number(filters.minBeds)
        ) {
          return false;
        }

        if (
          filters.propertyType &&
          filters.propertyType !== "all" &&
          property.propertyType !==
            filters.propertyType
        ) {
          return false;
        }

        if (
          filters.scenario &&
          filters.scenario !== "all" &&
          property.scenario !==
            filters.scenario
        ) {
          return false;
        }

        if (
          filters.institutional === true &&
          !property
            .institutional
            .isInstitutional
        ) {
          return false;
        }

        if (
          filters.reconstruction === true &&
          (
            property
              .reconstruction
              .need === "Low" ||
            property
              .reconstruction
              .need === "Completed"
          )
        ) {
          return false;
        }

        return true;
      }
    );
  }


  function formatCurrency(
    value
  ) {
    const number =
      Number(value);

    if (
      !Number.isFinite(number)
    ) {
      return "—";
    }

    return USD.format(number);
  }


  /*
    ============================================================
    EXPOSE THE SHARED DATA
    ============================================================
  */

  window.MREO_DATA = {
    config,

    properties,

    pathways,

    professionals,

    institutionalPortfolio,

    intelligenceResponses,

    bidTemplates,

    getProperty,

    getFeaturedProperties,

    getInstitutionalProperties,

    getPropertiesByScenario,

    searchProperties,

    filterProperties,

    formatCurrency
  };

})();
