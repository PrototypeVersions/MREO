/*
  ============================================================
  MREO PROPERTY OPERATING NETWORK
  SHARED APPLICATION LOGIC
  ============================================================

  This file powers the multi-page MREO demonstration prototype.

  Requires:
    data.js
    styles.css

  Live property-data endpoint:
    Cloudflare Worker -> RentCast

  The Worker URL is stored in:
    MREO_DATA.config.livePropertyEndpoint
*/


(() => {
  "use strict";


  /*
    ============================================================
    APPLICATION STATE
    ============================================================
  */

  const state = {
    initialized: false,

    currentProperty:
      null,

    currentLiveProperty:
      null,

    currentBid:
      null,

    marketplaceResults:
      [],

    activeModal:
      null,

    previouslyFocusedElement:
      null,

    notificationTimer:
      null
  };


  /*
    ============================================================
    START APPLICATION
    ============================================================
  */

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initialize
    );
  } else {
    initialize();
  }


  function initialize() {
    if (state.initialized) {
      return;
    }

    state.initialized = true;

    if (!window.MREO_DATA) {
      console.error(
        "MREO_DATA was not loaded. Make sure data.js appears before app.js."
      );

      return;
    }

    initializeCommonFeatures();

    /*
      Page-specific initialization.

      Each future HTML page will use one of these
      body classes.
    */

    if (
      document.body.classList.contains(
        "landing-page"
      )
    ) {
      initializeLandingPage();
    }

    if (
      document.body.classList.contains(
        "marketplace-page"
      )
    ) {
      initializeMarketplacePage();
    }

    if (
      document.body.classList.contains(
        "property-page"
      )
    ) {
      initializePropertyPage();
    }

    if (
      document.body.classList.contains(
        "seller-page"
      )
    ) {
      initializeSellerPage();
    }

    if (
      document.body.classList.contains(
        "buyer-page"
      )
    ) {
      initializeBuyerPage();
    }

    if (
      document.body.classList.contains(
        "exchange-page"
      )
    ) {
      initializeExchangePage();
    }

    if (
      document.body.classList.contains(
        "reconstruction-page"
      )
    ) {
      initializeReconstructionPage();
    }

    if (
      document.body.classList.contains(
        "settlement-page"
      )
    ) {
      initializeSettlementPage();
    }

    if (
      document.body.classList.contains(
        "operations-page"
      )
    ) {
      initializeOperationsPage();
    }

    if (
      document.body.classList.contains(
        "institutional-page"
      )
    ) {
      initializeInstitutionalPage();
    }

    if (
      document.body.classList.contains(
        "intelligence-page"
      )
    ) {
      initializeIntelligencePage();
    }
  }


  /*
    ============================================================
    COMMON FEATURES
    ============================================================
  */

  function initializeCommonFeatures() {
    updateCurrentYear();

    initializeGlobalNotifications();

    initializeModalSystem();

    initializeGenericRecordButtons();

    initializeSharedPropertyLinks();
  }


  function updateCurrentYear() {
    document
      .querySelectorAll(
        "#current-year, [data-current-year]"
      )
      .forEach(
        (element) => {
          element.textContent =
            new Date().getFullYear();
        }
      );
  }


  /*
    ============================================================
    GENERAL UTILITIES
    ============================================================
  */

  function getElement(id) {
    return document.getElementById(id);
  }


  function setText(
    id,
    value,
    fallback = "—"
  ) {
    const element =
      getElement(id);

    if (!element) {
      return;
    }

    const normalized =
      value === undefined ||
      value === null ||
      value === ""
        ? fallback
        : value;

    element.textContent =
      normalized;
  }


  function setHtml(
    id,
    html
  ) {
    const element =
      getElement(id);

    if (!element) {
      return;
    }

    element.innerHTML =
      html;
  }


  function setValue(
    id,
    value,
    options = {}
  ) {
    const field =
      getElement(id);

    if (!field) {
      return false;
    }

    const {
      overwrite = true,
      markAutofilled = false
    } = options;

    if (
      !overwrite &&
      String(
        field.value || ""
      ).trim() !== ""
    ) {
      return false;
    }

    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return false;
    }

    field.value =
      String(value);

    if (markAutofilled) {
      field.dataset.autofilled =
        "true";
    }

    field.dispatchEvent(
      new Event(
        "input",
        {
          bubbles: true
        }
      )
    );

    field.dispatchEvent(
      new Event(
        "change",
        {
          bubbles: true
        }
      )
    );

    return true;
  }


  function getValue(id) {
    const field =
      getElement(id);

    return field
      ? String(
          field.value || ""
        ).trim()
      : "";
  }


  function formatCurrency(
    value
  ) {
    return window
      .MREO_DATA
      .formatCurrency(
        value
      );
  }


  function formatNumber(
    value,
    fallback = "—"
  ) {
    const number =
      Number(value);

    if (
      !Number.isFinite(number)
    ) {
      return fallback;
    }

    return new Intl.NumberFormat(
      "en-US"
    ).format(number);
  }


  function formatPercent(
    value
  ) {
    const number =
      Number(value);

    if (
      !Number.isFinite(number)
    ) {
      return "—";
    }

    return `${Math.round(number)}%`;
  }


  function formatDate(
    value,
    options = {}
  ) {
    if (!value) {
      return "—";
    }

    const date =
      value instanceof Date
        ? value
        : new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return String(value);
    }

    return new Intl.DateTimeFormat(
      "en-US",
      {
        month:
          options.month ||
          "short",

        day:
          options.day ||
          "numeric",

        year:
          options.year ||
          "numeric"
      }
    ).format(date);
  }


  function todayLabel() {
    return formatDate(
      new Date()
    );
  }


  function cleanNumber(
    value
  ) {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return null;
    }

    if (
      typeof value === "number"
    ) {
      return Number.isFinite(value)
        ? value
        : null;
    }

    const cleaned =
      String(value)
        .replace(
          /[$,\s]/g,
          ""
        )
        .replace(
          /[^\d.-]/g,
          ""
        );

    const number =
      Number(cleaned);

    return Number.isFinite(number)
      ? number
      : null;
  }


  function clamp(
    value,
    min,
    max
  ) {
    return Math.min(
      max,
      Math.max(
        min,
        value
      )
    );
  }


  function escapeHtml(
    value
  ) {
    return String(
      value ?? ""
    )
      .replace(
        /&/g,
        "&amp;"
      )
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      )
      .replace(
        /"/g,
        "&quot;"
      )
      .replace(
        /'/g,
        "&#039;"
      );
  }


  function slugify(
    value
  ) {
    return String(
      value || ""
    )
      .trim()
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      );
  }


  function getQueryParameter(
    name
  ) {
    const parameters =
      new URLSearchParams(
        window.location.search
      );

    return parameters.get(
      name
    );
  }


  function getCurrentPropertyId() {
    return (
      getQueryParameter(
        "id"
      ) ||
      window
        .MREO_DATA
        .config
        .defaultPropertyId
    );
  }


  function getCurrentProperty() {
    const property =
      window
        .MREO_DATA
        .getProperty(
          getCurrentPropertyId()
        );

    state.currentProperty =
      property;

    return property;
  }


  function propertyUrl(
    property
  ) {
    const id =
      typeof property === "string"
        ? property
        : property?.id;

    return (
      `property.html?id=${encodeURIComponent(id)}`
    );
  }


  function buyerUrl(
    property
  ) {
    const id =
      typeof property === "string"
        ? property
        : property?.id;

    return (
      `buyer.html?id=${encodeURIComponent(id)}`
    );
  }


  function exchangeUrl(
    property
  ) {
    const id =
      typeof property === "string"
        ? property
        : property?.id;

    return (
      `exchange.html?id=${encodeURIComponent(id)}`
    );
  }


  function reconstructionUrl(
    property
  ) {
    const id =
      typeof property === "string"
        ? property
        : property?.id;

    return (
      `reconstruction.html?id=${encodeURIComponent(id)}`
    );
  }


  function settlementUrl(
    property
  ) {
    const id =
      typeof property === "string"
        ? property
        : property?.id;

    return (
      `settlement.html?id=${encodeURIComponent(id)}`
    );
  }


  function operationsUrl(
    property
  ) {
    const id =
      typeof property === "string"
        ? property
        : property?.id;

    return (
      `operations.html?id=${encodeURIComponent(id)}`
    );
  }


  function buildZillowSearchUrl(
    address
  ) {
    return (
      "https://www.zillow.com/homes/" +
      `${encodeURIComponent(address)}_rb/`
    );
  }


  function buildGoogleMapsUrl(
    address
  ) {
    return (
      "https://www.google.com/maps/search/" +
      `?api=1&query=${encodeURIComponent(address)}`
    );
  }


  function scrollToElement(
    element,
    options = {}
  ) {
    if (!element) {
      return;
    }

    element.scrollIntoView(
      {
        behavior:
          options.behavior ||
          "smooth",

        block:
          options.block ||
          "start"
      }
    );
  }


  /*
    ============================================================
    GLOBAL NOTIFICATION SYSTEM
    ============================================================
  */

  function initializeGlobalNotifications() {
    document.addEventListener(
      "click",
      (event) => {
        const button =
          event.target.closest(
            "[data-demo-notification]"
          );

        if (!button) {
          return;
        }

        const message =
          button.dataset
            .demoNotification;

        showNotification(
          "Prototype action",
          message ||
          "The demonstration action was completed."
        );
      }
    );
  }


  function showNotification(
    title,
    message,
    options = {}
  ) {
    const notification =
      getElement(
        "notification"
      );

    if (!notification) {
      return;
    }

    const titleElement =
      notification.querySelector(
        "strong"
      );

    const messageElement =
      getElement(
        "notification-message"
      ) ||
      notification.querySelector(
        "p"
      );

    const icon =
      notification.querySelector(
        ".notification-icon"
      );

    if (titleElement) {
      titleElement.textContent =
        title || "MREO";
    }

    if (messageElement) {
      messageElement.textContent =
        message ||
        "Prototype action completed.";
    }

    if (icon) {
      icon.textContent =
        options.icon ||
        "✓";
    }

    notification.hidden =
      false;

    clearTimeout(
      state.notificationTimer
    );

    state.notificationTimer =
      window.setTimeout(
        () => {
          notification.hidden =
            true;
        },
        options.duration ||
        4200
      );
  }


  /*
    ============================================================
    MODAL SYSTEM
    ============================================================
  */

  function initializeModalSystem() {
    const modal =
      getElement(
        "detail-modal"
      );

    if (!modal) {
      return;
    }

    const closeButton =
      getElement(
        "modal-close-button"
      );

    if (closeButton) {
      closeButton.addEventListener(
        "click",
        closeModal
      );
    }

    modal.addEventListener(
      "click",
      (event) => {
        if (
          event.target === modal
        ) {
          closeModal();
        }
      }
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Escape" &&
          state.activeModal
        ) {
          closeModal();
        }
      }
    );
  }


  function openModal(
    title,
    html,
    kicker = "MREO Record"
  ) {
    const modal =
      getElement(
        "detail-modal"
      );

    if (!modal) {
      return;
    }

    const titleElement =
      getElement(
        "modal-title"
      );

    const kickerElement =
      getElement(
        "modal-kicker"
      );

    const contentElement =
      getElement(
        "modal-content"
      );

    if (titleElement) {
      titleElement.textContent =
        title;
    }

    if (kickerElement) {
      kickerElement.textContent =
        kicker;
    }

    if (contentElement) {
      contentElement.innerHTML =
        html;
    }

    state.previouslyFocusedElement =
      document.activeElement;

    state.activeModal =
      modal;

    modal.hidden =
      false;

    document.body.classList.add(
      "modal-open"
    );

    const closeButton =
      getElement(
        "modal-close-button"
      );

    if (closeButton) {
      closeButton.focus();
    }
  }


  function closeModal() {
    const modal =
      state.activeModal ||
      getElement(
        "detail-modal"
      );

    if (!modal) {
      return;
    }

    modal.hidden =
      true;

    document.body.classList.remove(
      "modal-open"
    );

    state.activeModal =
      null;

    if (
      state.previouslyFocusedElement &&
      typeof state
        .previouslyFocusedElement
        .focus === "function"
    ) {
      state
        .previouslyFocusedElement
        .focus();
    }

    state.previouslyFocusedElement =
      null;
  }


  /*
    ============================================================
    GENERIC RECORD BUTTONS
    ============================================================
  */

  function initializeGenericRecordButtons() {
    document.addEventListener(
      "click",
      (event) => {
        const recordButton =
          event.target.closest(
            "[data-record-detail]"
          );

        if (!recordButton) {
          return;
        }

        const type =
          recordButton.dataset
            .recordDetail;

        const property =
          getCurrentProperty();

        openPropertyRecordModal(
          type,
          property
        );
      }
    );
  }


  function openPropertyRecordModal(
    type,
    property
  ) {
    if (!property) {
      return;
    }

    const recordHandlers = {
      identity: () => ({
        title:
          "Property Identity",

        html:
          renderIdentityRecord(
            property
          )
      }),

      valuation: () => ({
        title:
          "Valuation Sources",

        html:
          renderSourceRecord(
            property
          )
      }),

      title: () => ({
        title:
          "Title & Authority",

        html:
          renderTitleRecord(
            property
          )
      }),

      visual: () => ({
        title:
          "Visual History",

        html:
          renderVisualRecord(
            property
          )
      }),

      reconstruction: () => ({
        title:
          "Reconstruction Record",

        html:
          renderReconstructionRecord(
            property
          )
      }),

      transaction: () => ({
        title:
          "Transaction Record",

        html:
          renderTransactionRecord(
            property
          )
      }),

      operations: () => ({
        title:
          "Operating History",

        html:
          renderOperationsRecord(
            property
          )
      })
    };

    const handler =
      recordHandlers[type];

    if (!handler) {
      return;
    }

    const record =
      handler();

    openModal(
      record.title,
      record.html,
      property.id
    );
  }


  /*
    ============================================================
    SHARED PROPERTY LINKS
    ============================================================
  */

  function initializeSharedPropertyLinks() {
    document.addEventListener(
      "click",
      (event) => {
        const button =
          event.target.closest(
            "[data-open-property]"
          );

        if (!button) {
          return;
        }

        const id =
          button.dataset
            .openProperty;

        if (!id) {
          return;
        }

        window.location.href =
          propertyUrl(id);
      }
    );
  }


  /*
    ============================================================
    PROPERTY CARD RENDERING
    ============================================================
  */

  function renderPropertyCard(
    property,
    options = {}
  ) {
    const {
      featured = false,
      acquisitionMode = false
    } = options;

    const cardClass =
      featured
        ? "featured-property-card"
        : "property-card";

    const imageClass =
      featured
        ? "featured-property-image"
        : "property-card-image";

    const bodyClass =
      featured
        ? "featured-property-body"
        : "property-card-body";

    const linkClass =
      featured
        ? "featured-property-link"
        : "property-card-link";

    const actionUrl =
      acquisitionMode
        ? buyerUrl(property)
        : propertyUrl(property);

    const actionText =
      acquisitionMode
        ? "Prepare acquisition"
        : "Open Property Passport";

    const tags =
      Array.isArray(property.tags)
        ? property.tags
            .slice(0, 3)
            .map(
              (tag) =>
                `<span>${escapeHtml(tag)}</span>`
            )
            .join("")
        : "";

    return `
      <article class="${cardClass}">
        <div class="${imageClass}">
          <img
            src="${escapeHtml(property.image)}"
            alt="Demonstration property at ${escapeHtml(property.fullAddress)}"
            loading="lazy"
          >

          <span class="property-image-status">
            ${escapeHtml(property.scenario)}
          </span>

          <span class="property-image-id">
            ${escapeHtml(property.id)}
          </span>
        </div>

        <div class="${bodyClass}">
          <p class="property-card-location">
            ${escapeHtml(property.location)}
          </p>

          <h3>
            ${escapeHtml(property.addressLine1)}
          </h3>

          <div class="property-card-price">
            ${formatCurrency(property.price)}
          </div>

          <div class="property-mini-facts">
            <div>
              <span>Beds</span>
              <strong>
                ${escapeHtml(property.beds)}
              </strong>
            </div>

            <div>
              <span>Baths</span>
              <strong>
                ${escapeHtml(property.baths)}
              </strong>
            </div>

            <div>
              <span>Interior</span>
              <strong>
                ${formatNumber(property.sqft)} sq ft
              </strong>
            </div>
          </div>

          <div class="property-tags">
            ${tags}
          </div>

          <div class="property-readiness">
            <div class="property-readiness-top">
              <span>Transaction readiness</span>

              <strong>
                ${formatPercent(property.transactionReadiness)}
              </strong>
            </div>

            <div class="readiness-track">
              <span
                style="width:${clamp(
                  property.transactionReadiness,
                  0,
                  100
                )}%"
              ></span>
            </div>
          </div>

          <a
            class="${linkClass}"
            href="${actionUrl}"
          >
            <span>
              ${actionText}
            </span>

            <span aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </article>
    `;
  }


  /*
    ============================================================
    LANDING PAGE
    ============================================================
  */

  function initializeLandingPage() {
    renderFeaturedProperties();
  }


  function renderFeaturedProperties() {
    const container =
      getElement(
        "featured-properties"
      );

    if (!container) {
      return;
    }

    const properties =
      window
        .MREO_DATA
        .getFeaturedProperties();

    container.innerHTML =
      properties
        .map(
          (property) =>
            renderPropertyCard(
              property,
              {
                featured: true
              }
            )
        )
        .join("");
  }


  /*
    ============================================================
    MARKETPLACE PAGE
    ============================================================
  */

  function initializeMarketplacePage() {
    state.marketplaceResults =
      [
        ...window
          .MREO_DATA
          .properties
      ];

    populateMarketplaceFilters();

    initializeMarketplaceControls();

    renderMarketplace();
  }


  function populateMarketplaceFilters() {
    populateSelectFromValues(
      "property-type-filter",
      uniqueValues(
        window
          .MREO_DATA
          .properties
          .map(
            (property) =>
              property.propertyType
          )
      ),
      "All property types"
    );

    populateSelectFromValues(
      "scenario-filter",
      uniqueValues(
        window
          .MREO_DATA
          .properties
          .map(
            (property) =>
              property.scenario
          )
      ),
      "All MREO scenarios"
    );
  }


  function uniqueValues(
    values
  ) {
    return [
      ...new Set(
        values
          .filter(Boolean)
          .sort()
      )
    ];
  }


  function populateSelectFromValues(
    id,
    values,
    firstLabel
  ) {
    const select =
      getElement(id);

    if (!select) {
      return;
    }

    const currentValue =
      select.value;

    select.innerHTML =
      `
        <option value="all">
          ${escapeHtml(firstLabel)}
        </option>
      ` +
      values
        .map(
          (value) =>
            `
              <option value="${escapeHtml(value)}">
                ${escapeHtml(value)}
              </option>
            `
        )
        .join("");

    if (
      currentValue &&
      [
        ...select.options
      ].some(
        (option) =>
          option.value ===
          currentValue
      )
    ) {
      select.value =
        currentValue;
    }
  }


  function initializeMarketplaceControls() {
    const controls = [
      "property-search-filter",
      "property-type-filter",
      "scenario-filter",
      "min-beds-filter",
      "max-price-filter",
      "marketplace-sort"
    ];

    controls.forEach(
      (id) => {
        const control =
          getElement(id);

        if (!control) {
          return;
        }

        control.addEventListener(
          id ===
          "property-search-filter"
            ? "input"
            : "change",
          renderMarketplace
        );
      }
    );

    const resetButton =
      getElement(
        "reset-filters"
      );

    if (resetButton) {
      resetButton.addEventListener(
        "click",
        resetMarketplaceFilters
      );
    }
  }


  function resetMarketplaceFilters() {
    const defaults = {
      "property-search-filter":
        "",

      "property-type-filter":
        "all",

      "scenario-filter":
        "all",

      "min-beds-filter":
        "0",

      "max-price-filter":
        "0",

      "marketplace-sort":
        "featured"
    };

    Object.entries(
      defaults
    ).forEach(
      ([id, value]) => {
        const field =
          getElement(id);

        if (field) {
          field.value =
            value;
        }
      }
    );

    renderMarketplace();
  }


  function renderMarketplace() {
    const container =
      getElement(
        "marketplace-results"
      );

    if (!container) {
      return;
    }

    const search =
      getValue(
        "property-search-filter"
      ).toLowerCase();

    const propertyType =
      getValue(
        "property-type-filter"
      ) || "all";

    const scenario =
      getValue(
        "scenario-filter"
      ) || "all";

    const minBeds =
      cleanNumber(
        getValue(
          "min-beds-filter"
        )
      ) || 0;

    const maxPrice =
      cleanNumber(
        getValue(
          "max-price-filter"
        )
      ) || 0;

    const sort =
      getValue(
        "marketplace-sort"
      ) || "featured";

    let results =
      window
        .MREO_DATA
        .properties
        .filter(
          (property) => {
            const searchable =
              [
                property.id,
                property.addressLine1,
                property.city,
                property.state,
                property.zip,
                property.propertyType,
                property.scenario,
                property.condition,
                property.currentPathway,
                ...(property.tags || [])
              ]
                .join(" ")
                .toLowerCase();

            if (
              search &&
              !searchable.includes(
                search
              )
            ) {
              return false;
            }

            if (
              propertyType !==
                "all" &&
              property.propertyType !==
                propertyType
            ) {
              return false;
            }

            if (
              scenario !== "all" &&
              property.scenario !==
                scenario
            ) {
              return false;
            }

            if (
              minBeds > 0 &&
              Number(property.beds) <
                minBeds
            ) {
              return false;
            }

            if (
              maxPrice > 0 &&
              Number(property.price) >
                maxPrice
            ) {
              return false;
            }

            return true;
          }
        );

    results =
      sortProperties(
        results,
        sort
      );

    state.marketplaceResults =
      results;

    const count =
      getElement(
        "marketplace-result-count"
      );

    if (count) {
      count.textContent =
        String(
          results.length
        );
    }

    if (
      results.length === 0
    ) {
      container.innerHTML =
        `
          <div class="info-message">
            No demonstration properties match the current filters.
          </div>
        `;

      return;
    }

    container.innerHTML =
      results
        .map(
          (property) =>
            renderPropertyCard(
              property
            )
        )
        .join("");
  }


  function sortProperties(
    properties,
    sort
  ) {
    const results =
      [...properties];

    switch (sort) {
      case "price-low":
        results.sort(
          (a, b) =>
            a.price -
            b.price
        );

        break;

      case "price-high":
        results.sort(
          (a, b) =>
            b.price -
            a.price
        );

        break;

      case "readiness":
        results.sort(
          (a, b) =>
            b.transactionReadiness -
            a.transactionReadiness
        );

        break;

      case "arv-gap":
        results.sort(
          (a, b) =>
            (
              b.arv -
              b.price
            ) -
            (
              a.arv -
              a.price
            )
        );

        break;

      case "buyers":
        results.sort(
          (a, b) =>
            b.transaction
              .qualifiedBuyers -
            a.transaction
              .qualifiedBuyers
        );

        break;

      default:
        break;
    }

    return results;
  }


  /*
    ============================================================
    PROPERTY PASSPORT PAGE
    ============================================================
  */

  function initializePropertyPage() {
    const property =
      getCurrentProperty();

    populatePropertyPage(
      property
    );

    initializePropertyPageActions(
      property
    );
  }


  function populatePropertyPage(
    property
  ) {
    if (!property) {
      return;
    }

    document.title =
      `${property.addressLine1} | MREO Property Passport`;

    setText(
      "property-id",
      property.id
    );

    setText(
      "property-title",
      property.addressLine1
    );

    setText(
      "property-location",
      `${property.city}, ${property.state} ${property.zip}`
    );

    setText(
      "property-scenario",
      property.scenario
    );

    setText(
      "property-price",
      formatCurrency(
        property.price
      )
    );

    setText(
      "property-estimated-value",
      formatCurrency(
        property.estimatedValue
      )
    );

    setText(
      "property-arv",
      formatCurrency(
        property.arv
      )
    );

    setText(
      "property-beds",
      property.beds
    );

    setText(
      "property-baths",
      property.baths
    );

    setText(
      "property-sqft",
      `${formatNumber(property.sqft)} sq ft`
    );

    setText(
      "property-lot",
      property.lotSize
        ? `${formatNumber(property.lotSize)} sq ft`
        : "—"
    );

    setText(
      "property-year",
      property.yearBuilt
    );

    setText(
      "property-type",
      property.propertyType
    );

    setText(
      "property-condition",
      property.condition
    );

    setText(
      "property-occupancy",
      property.occupancy
    );

    setText(
      "property-readiness",
      formatPercent(
        property.transactionReadiness
      )
    );

    const readinessBar =
      getElement(
        "property-readiness-bar"
      );

    if (readinessBar) {
      readinessBar.style.width =
        `${clamp(
          property.transactionReadiness,
          0,
          100
        )}%`;
    }

    const image =
      getElement(
        "property-hero-image"
      );

    if (image) {
      image.src =
        property.image;

      image.alt =
        `Demonstration property at ${property.fullAddress}`;
    }

    setLink(
      "property-zillow-link",
      buildZillowSearchUrl(
        property.fullAddress
      )
    );

    setLink(
      "property-maps-link",
      buildGoogleMapsUrl(
        property.fullAddress
      )
    );

    setLink(
      "property-buyer-link",
      buyerUrl(
        property
      )
    );

    setLink(
      "property-exchange-link",
      exchangeUrl(
        property
      )
    );

    renderPropertyTags(
      property
    );

    renderPassportMatrix(
      property
    );

    renderPropertySources(
      property
    );

    renderPropertyBids(
      property
    );

    renderPropertyProfessionals(
      property
    );

    renderPropertyRisks(
      property
    );

    renderPropertyVisualHistory(
      property
    );

    renderPropertyReconstruction(
      property
    );

    renderPropertySettlement(
      property
    );

    renderPropertyOperations(
      property
    );

    renderPropertyPathways(
      property
    );
  }


  function setLink(
    id,
    url
  ) {
    const link =
      getElement(id);

    if (link) {
      link.href =
        url;
    }
  }


  function renderPropertyTags(
    property
  ) {
    const container =
      getElement(
        "property-tags"
      );

    if (!container) {
      return;
    }

    container.innerHTML =
      (property.tags || [])
        .map(
          (tag) =>
            `<span>${escapeHtml(tag)}</span>`
        )
        .join("");
  }


  function renderPassportMatrix(
    property
  ) {
    const container =
      getElement(
        "passport-record-matrix"
      );

    if (!container) {
      return;
    }

    const records = [
      {
        code:
          "ID",

        key:
          "identity",

        title:
          "Property Identity",

        description:
          "Address, jurisdiction, physical identity, and authority record.",

        state:
          property.passport.identity
      },

      {
        code:
          "VT",

        key:
          "valuation",

        title:
          "Valuation",

        description:
          "Multiple valuation sources with purpose and provenance preserved.",

        state:
          property.passport.valuation
      },

      {
        code:
          "TL",

        key:
          "title",

        title:
          "Title & Authority",

        description:
          "Ownership authority, liens, title exceptions, and readiness.",

        state:
          property.passport.title
      },

      {
        code:
          "PH",

        key:
          "visual",

        title:
          "Visual History",

        description:
          "Attributed photographs, field observations, and walkthrough records.",

        state:
          property.passport.visual
      },

      {
        code:
          "RC",

        key:
          "reconstruction",

        title:
          "Reconstruction",

        description:
          "Scope, budget, contractor activity, milestones, and change control.",

        state:
          property.passport.reconstruction
      },

      {
        code:
          "TX",

        key:
          "transaction",

        title:
          "Transaction",

        description:
          "Qualified purchasers, offers, deposits, deadlines, and closing state.",

        state:
          property.passport.transaction
      },

      {
        code:
          "OP",

        key:
          "operations",

        title:
          "Operations",

        description:
          "Management, rent, maintenance, insurance, equity, and future resale.",

        state:
          property.passport.operations
      },

      {
        code:
          "AI",

        key:
          "intelligence",

        title:
          "MREO Intelligence",

        description:
          "Structured interpretation, risk review, missing records, and workflow assistance.",

        state:
          property.passport.intelligence
      }
    ];

    container.innerHTML =
      records
        .map(
          (record) =>
            `
              <article class="passport-record-card">
                <span class="record-code">
                  ${record.code}
                </span>

                <h3>
                  ${escapeHtml(record.title)}
                </h3>

                <p>
                  ${escapeHtml(record.description)}
                </p>

                <div class="record-state">
                  <strong>
                    ${escapeHtml(record.state)}
                  </strong>

                  <button
                    class="record-button"
                    type="button"
                    data-record-detail="${record.key}"
                  >
                    Open
                  </button>
                </div>
              </article>
            `
        )
        .join("");
  }


  function renderPropertySources(
    property
  ) {
    const body =
      getElement(
        "source-table-body"
      );

    if (!body) {
      return;
    }

    const sources =
      property.sources || [];

    if (
      sources.length === 0
    ) {
      body.innerHTML =
        `
          <tr>
            <td colspan="6">
              No additional demonstration valuation sources are recorded.
            </td>
          </tr>
        `;

      return;
    }

    body.innerHTML =
      sources
        .map(
          (source) =>
            `
              <tr>
                <td>
                  ${escapeHtml(source.label)}
                </td>

                <td>
                  ${
                    typeof source.value === "number"
                      ? formatCurrency(source.value)
                      : escapeHtml(source.value)
                  }
                </td>

                <td>
                  ${escapeHtml(source.provider)}
                </td>

                <td>
                  ${escapeHtml(source.type)}
                </td>

                <td>
                  ${formatDate(source.date)}
                </td>

                <td>
                  ${escapeHtml(source.status)}
                </td>
              </tr>
            `
        )
        .join("");
  }


  function renderPropertyBids(
    property
  ) {
    const container =
      getElement(
        "property-bids-body"
      );

    if (!container) {
      return;
    }

    if (
      !property.bids ||
      property.bids.length === 0
    ) {
      container.innerHTML =
        `
          <tr>
            <td colspan="6">
              No sealed bids are currently recorded for this demonstration property.
            </td>
          </tr>
        `;

      return;
    }

    container.innerHTML =
      property.bids
        .map(
          (bid) =>
            `
              <tr class="${bid.selected ? "bid-row-recommended" : ""}">
                <td>
                  ${escapeHtml(bid.buyer)}
                </td>

                <td>
                  <strong>
                    ${formatCurrency(bid.offer)}
                  </strong>
                </td>

                <td>
                  ${escapeHtml(bid.capital)}
                </td>

                <td>
                  ${escapeHtml(bid.contingencies)}
                </td>

                <td>
                  ${escapeHtml(bid.closingDays)} days
                </td>

                <td>
                  <strong>
                    ${escapeHtml(bid.executionScore)}
                  </strong>
                </td>
              </tr>
            `
        )
        .join("");
  }


  function renderPropertyProfessionals(
    property
  ) {
    const container =
      getElement(
        "property-professionals"
      );

    if (!container) {
      return;
    }

    const professionals =
      property.professionals || [];

    container.innerHTML =
      professionals
        .map(
          (professional) =>
            `
              <article class="professional-card">
                <div class="professional-avatar">
                  ${escapeHtml(
                    initialsFromName(
                      professional.name
                    )
                  )}
                </div>

                <span class="professional-role">
                  ${escapeHtml(professional.role)}
                </span>

                <h3>
                  ${escapeHtml(professional.name)}
                </h3>

                <p>
                  ${escapeHtml(professional.status)}
                </p>

                <div class="professional-meta">
                  ${
                    professional.verified
                      ? "<span>✓ Verified</span>"
                      : "<span>Verification pending</span>"
                  }
                </div>
              </article>
            `
        )
        .join("");
  }


  function initialsFromName(
    value
  ) {
    return String(value || "MREO")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (word) =>
          word.charAt(0)
            .toUpperCase()
      )
      .join("");
  }


  function renderPropertyRisks(
    property
  ) {
    const container =
      getElement(
        "property-risks"
      );

    if (!container) {
      return;
    }

    const risks =
      property.risks || [];

    if (
      risks.length === 0
    ) {
      container.innerHTML =
        `
          <div class="success-message">
            No elevated demonstration risks are currently recorded.
          </div>
        `;

      return;
    }

    container.innerHTML =
      risks
        .map(
          (risk) =>
            `
              <div class="warning-message">
                ${escapeHtml(risk)}
              </div>
            `
        )
        .join("");
  }


  function renderPropertyVisualHistory(
    property
  ) {
    const container =
      getElement(
        "property-visual-history"
      );

    if (!container) {
      return;
    }

    container.innerHTML =
      (property.visualHistory || [])
        .map(
          (record) =>
            `
              <div class="timeline-item complete">
                <span class="timeline-marker">
                  ✓
                </span>

                <div>
                  <strong>
                    ${escapeHtml(record.type)}
                  </strong>

                  <small>
                    ${escapeHtml(record.provider)}
                    ·
                    ${formatDate(record.date)}
                    ·
                    ${escapeHtml(record.status)}
                  </small>
                </div>
              </div>
            `
        )
        .join("");
  }


  function renderPropertyReconstruction(
    property
  ) {
    setText(
      "property-reconstruction-need",
      property
        .reconstruction
        .need
    );

    setText(
      "property-reconstruction-status",
      property
        .reconstruction
        .status
    );

    setText(
      "property-reconstruction-budget",
      property
        .reconstruction
        .budget
        ? formatCurrency(
            property
              .reconstruction
              .budget
          )
        : "No active budget"
    );

    setLink(
      "property-reconstruction-link",
      reconstructionUrl(
        property
      )
    );
  }


  function renderPropertySettlement(
    property
  ) {
    setText(
      "property-settlement-status",
      property
        .settlement
        .status
    );

    setText(
      "property-settlement-progress",
      formatPercent(
        property
          .settlement
          .progress
      )
    );

    setText(
      "property-closing-date",
      property
        .settlement
        .closingDate
        ? formatDate(
            property
              .settlement
              .closingDate
          )
        : "Not scheduled"
    );

    setLink(
      "property-settlement-link",
      settlementUrl(
        property
      )
    );
  }


  function renderPropertyOperations(
    property
  ) {
    setText(
      "property-operations-status",
      property
        .operations
        .status
    );

    setText(
      "property-monthly-rent",
      property
        .operations
        .monthlyRent
        ? formatCurrency(
            property
              .operations
              .monthlyRent
          )
        : "—"
    );

    setText(
      "property-estimated-equity",
      property
        .operations
        .estimatedEquity
        ? formatCurrency(
            property
              .operations
              .estimatedEquity
          )
        : "—"
    );

    setLink(
      "property-operations-link",
      operationsUrl(
        property
      )
    );
  }


  function renderPropertyPathways(
    property
  ) {
    const container =
      getElement(
        "property-pathways"
      );

    if (!container) {
      return;
    }

    const model =
      createPathwayModel(
        property.estimatedValue,
        {
          repairBudget:
            property
              .reconstruction
              .budget ||
            null,

          arv:
            property.arv
        }
      );

    container.innerHTML =
      renderPathwayCards(
        model
      );
  }


  function initializePropertyPageActions(
    property
  ) {
    const shareButton =
      getElement(
        "share-property-button"
      );

    if (shareButton) {
      shareButton.addEventListener(
        "click",
        async () => {
          const shareData = {
            title:
              `${property.addressLine1} — MREO Property Passport`,

            text:
              `MREO Property Passport for ${property.fullAddress}`,

            url:
              window.location.href
          };

          if (
            navigator.share
          ) {
            try {
              await navigator.share(
                shareData
              );

              return;
            } catch (error) {
              /*
                User may have cancelled.
              */
            }
          }

          try {
            await navigator
              .clipboard
              .writeText(
                window.location.href
              );

            showNotification(
              "Property Passport",
              "The Property Passport link was copied."
            );
          } catch (error) {
            showNotification(
              "Property Passport",
              "Copy the current browser address to share this Property Passport."
            );
          }
        }
      );
    }
  }


  /*
    ============================================================
    SELLER DECISION CENTER
    ============================================================
  */

  function initializeSellerPage() {
    const form =
      getElement(
        "seller-search-form"
      );

    if (form) {
      form.addEventListener(
        "submit",
        handleSellerSearch
      );
    }

    document
      .querySelectorAll(
        "[data-demo-address]"
      )
      .forEach(
        (button) => {
          button.addEventListener(
            "click",
            () => {
              setValue(
                "seller-property-search-address",
                button.dataset
                  .demoAddress
              );
            }
          );
        }
      );

    initializeOwnerObjectiveButtons();
  }


  async function handleSellerSearch(
    event
  ) {
    event.preventDefault();

    const form =
      event.currentTarget;

    if (
      !form.reportValidity()
    ) {
      return;
    }

    const address =
      getValue(
        "seller-property-search-address"
      );

    if (!address) {
      return;
    }

    const button =
      getElement(
        "seller-search-button"
      );

    const originalText =
      button
        ? button.textContent
        : "";

    if (button) {
      button.disabled =
        true;

      button.textContent =
        "Building Passport...";
    }

    /*
      Keep Zillow as an external review step.

      Opening synchronously helps avoid popup blockers.
    */

    const zillowUrl =
      buildZillowSearchUrl(
        address
      );

    const mapsUrl =
      buildGoogleMapsUrl(
        address
      );

    const externalWindow =
      window.open(
        zillowUrl,
        "_blank",
        "noopener,noreferrer"
      );

    setLink(
      "seller-zillow-link",
      zillowUrl
    );

    setLink(
      "seller-maps-link",
      mapsUrl
    );

    showSellerSearchStatus(
      "Searching available property records and building the MREO Property Passport.",
      "working"
    );

    try {
      const result =
        await fetchLiveProperty(
          address
        );

      const liveRecord =
        buildLivePropertyRecord(
          address,
          result.property
        );

      state.currentLiveProperty =
        liveRecord;

      populateSellerLiveRecord(
        liveRecord,
        result
      );

      showSellerSearchStatus(
        "Property record created. Available RentCast data has been populated below. Review all third-party and modeled information before relying on it.",
        "success"
      );

      const resultSection =
        getElement(
          "seller-analysis-results"
        );

      if (resultSection) {
        resultSection.hidden =
          false;

        scrollToElement(
          resultSection
        );
      }

      if (!externalWindow) {
        showNotification(
          "Zillow review",
          "Your browser blocked the Zillow tab. Use the Zillow button in the property record to open it."
        );
      }
    } catch (error) {
      console.error(
        "Seller live property lookup failed:",
        error
      );

      const fallbackRecord =
        buildFallbackPropertyRecord(
          address
        );

      state.currentLiveProperty =
        fallbackRecord;

      populateSellerLiveRecord(
        fallbackRecord,
        null
      );

      showSellerSearchStatus(
        "MREO could not retrieve additional third-party property data. A provisional Property Passport was created from the entered address so the prototype workflow can continue.",
        "error"
      );

      const resultSection =
        getElement(
          "seller-analysis-results"
        );

      if (resultSection) {
        resultSection.hidden =
          false;
      }
    } finally {
      if (button) {
        button.disabled =
          false;

        button.textContent =
          originalText ||
          "Build Property Passport";
      }
    }
  }


  async function fetchLiveProperty(
    address
  ) {
    const endpoint =
      window
        .MREO_DATA
        .config
        .livePropertyEndpoint;

    const url =
      new URL(endpoint);

    url.searchParams.set(
      "address",
      address
    );

    const response =
      await fetch(
        url.toString(),
        {
          method:
            "GET",

          headers: {
            Accept:
              "application/json"
          }
        }
      );

    let data = null;

    try {
      data =
        await response.json();
    } catch (error) {
      throw new Error(
        "The property-data service returned an invalid response."
      );
    }

    if (
      !response.ok ||
      data?.ok !== true ||
      !data?.property
    ) {
      throw new Error(
        data?.error ||
        "The property-data lookup could not be completed."
      );
    }

    return data;
  }


  function showSellerSearchStatus(
    message,
    type
  ) {
    const element =
      getElement(
        "seller-search-status"
      );

    if (!element) {
      return;
    }

    element.textContent =
      message;

    element.classList.remove(
      "success-message",
      "error-message",
      "warning-message"
    );

    if (
      type === "success"
    ) {
      element.classList.add(
        "success-message"
      );
    }

    if (
      type === "error"
    ) {
      element.classList.add(
        "error-message"
      );
    }
  }


  function buildLivePropertyRecord(
    requestedAddress,
    property
  ) {
    const estimatedValue =
      cleanNumber(
        property.estimatedValue
      );

    const listingPrice =
      cleanNumber(
        property.listingPrice
      );

    const baseValue =
      estimatedValue ||
      listingPrice ||
      cleanNumber(
        property.lastSalePrice
      ) ||
      350000;

    const parsed =
      parseAddress(
        requestedAddress
      );

    const addressLine1 =
      property.addressLine1 ||
      parsed.street ||
      requestedAddress;

    const city =
      property.city ||
      parsed.city ||
      "";

    const stateCode =
      property.state ||
      parsed.state ||
      "";

    const zip =
      property.zipCode ||
      parsed.zip ||
      "";

    const lotSize =
      cleanNumber(
        property.lotSize
      ) || 0;

    const record = {
      id:
        "LIVE-MREO",

      isLive:
        true,

      addressLine1,

      city,

      state:
        stateCode,

      zip,

      fullAddress:
        [
          addressLine1,

          [
            city,
            [
              stateCode,
              zip
            ]
              .filter(Boolean)
              .join(" ")
          ]
            .filter(Boolean)
            .join(", ")
        ]
          .filter(Boolean)
          .join(", "),

      location:
        [
          city,
          stateCode
        ]
          .filter(Boolean)
          .join(", "),

      propertyType:
        property.propertyType ||
        "Property",

      beds:
        cleanNumber(
          property.bedrooms
        ),

      baths:
        cleanNumber(
          property.bathrooms
        ),

      sqft:
        cleanNumber(
          property.squareFootage
        ),

      lotSize,

      yearBuilt:
        cleanNumber(
          property.yearBuilt
        ),

      price:
        listingPrice ||
        baseValue,

      listingPrice,

      listingStatus:
        property.listingStatus ||
        "",

      estimatedValue:
        baseValue,

      estimatedValueLow:
        cleanNumber(
          property.estimatedValueLow
        ),

      estimatedValueHigh:
        cleanNumber(
          property.estimatedValueHigh
        ),

      lastSalePrice:
        cleanNumber(
          property.lastSalePrice
        ),

      lastSaleDate:
        property.lastSaleDate ||
        "",

      condition:
        "Seller review required",

      occupancy:
        "Seller review required",

      transactionReadiness:
        58,

      scenario:
        "Live Property Analysis",

      ownerObjective:
        "Maximize value",

      currentPathway:
        "Compare pathways",

      tags: [
        "Live Address",
        "RentCast Data",
        "Seller Review Required"
      ],

      sources: [
        {
          label:
            "Automated valuation",

          type:
            "AVM",

          value:
            baseValue,

          provider:
            "RentCast",

          date:
            todayLabel(),

          status:
            "Live third-party source"
        }
      ]
    };

    return record;
  }


  function buildFallbackPropertyRecord(
    requestedAddress
  ) {
    const parsed =
      parseAddress(
        requestedAddress
      );

    return {
      id:
        "LIVE-MREO",

      isLive:
        false,

      addressLine1:
        parsed.street ||
        requestedAddress,

      city:
        parsed.city,

      state:
        parsed.state,

      zip:
        parsed.zip,

      fullAddress:
        requestedAddress,

      location:
        [
          parsed.city,
          parsed.state
        ]
          .filter(Boolean)
          .join(", "),

      propertyType:
        "Property",

      beds:
        null,

      baths:
        null,

      sqft:
        null,

      lotSize:
        0,

      yearBuilt:
        null,

      price:
        350000,

      listingPrice:
        null,

      listingStatus:
        "",

      estimatedValue:
        350000,

      estimatedValueLow:
        null,

      estimatedValueHigh:
        null,

      condition:
        "Seller review required",

      occupancy:
        "Seller review required",

      transactionReadiness:
        35,

      scenario:
        "Provisional Property Analysis",

      ownerObjective:
        "Maximize value",

      currentPathway:
        "Compare pathways",

      tags: [
        "Provisional Record",
        "Seller Review Required"
      ],

      sources:
        []
    };
  }


  function parseAddress(
    address
  ) {
    const result = {
      street:
        "",

      city:
        "",

      state:
        "",

      zip:
        ""
    };

    const cleaned =
      String(address || "")
        .replace(
          /\s+/g,
          " "
        )
        .trim();

    const parts =
      cleaned
        .split(",")
        .map(
          (part) =>
            part.trim()
        )
        .filter(Boolean);

    if (
      parts.length >= 4
    ) {
      const zip =
        parts[
          parts.length - 1
        ];

      const stateCode =
        parts[
          parts.length - 2
        ];

      if (
        /^[A-Za-z]{2}$/.test(
          stateCode
        ) &&
        /^\d{5}(?:-\d{4})?$/.test(
          zip
        )
      ) {
        result.street =
          parts
            .slice(
              0,
              parts.length - 3
            )
            .join(", ");

        result.city =
          parts[
            parts.length - 3
          ];

        result.state =
          stateCode.toUpperCase();

        result.zip =
          zip;

        return result;
      }
    }

    if (
      parts.length >= 3
    ) {
      const finalPart =
        parts[
          parts.length - 1
        ];

      const match =
        finalPart.match(
          /^([A-Za-z]{2})\s+(\d{5}(?:-\d{4})?)$/
        );

      if (match) {
        result.street =
          parts
            .slice(
              0,
              parts.length - 2
            )
            .join(", ");

        result.city =
          parts[
            parts.length - 2
          ];

        result.state =
          match[1]
            .toUpperCase();

        result.zip =
          match[2];

        return result;
      }
    }

    result.street =
      cleaned;

    return result;
  }


  function populateSellerLiveRecord(
    property,
    rawResult
  ) {
    setText(
      "seller-result-address",
      property.addressLine1
    );

    setText(
      "seller-result-location",
      property.location ||
      "Location pending review"
    );

    setText(
      "seller-result-property-type",
      property.propertyType
    );

    setText(
      "seller-result-estimated-value",
      formatCurrency(
        property.estimatedValue
      )
    );

    setText(
      "seller-result-value-range",
      (
        property.estimatedValueLow &&
        property.estimatedValueHigh
      )
        ? `${
            formatCurrency(
              property.estimatedValueLow
            )
          } – ${
            formatCurrency(
              property.estimatedValueHigh
            )
          }`
        : "Range unavailable"
    );

    setText(
      "seller-result-beds",
      property.beds ??
      "—"
    );

    setText(
      "seller-result-baths",
      property.baths ??
      "—"
    );

    setText(
      "seller-result-sqft",
      property.sqft
        ? `${formatNumber(property.sqft)} sq ft`
        : "—"
    );

    setText(
      "seller-result-lot",
      property.lotSize
        ? `${formatNumber(property.lotSize)} sq ft`
        : "—"
    );

    setText(
      "seller-result-year",
      property.yearBuilt ??
      "—"
    );

    setText(
      "seller-result-listing-status",
      property.listingStatus ||
      "No active public listing returned"
    );

    setText(
      "seller-result-listing-price",
      property.listingPrice
        ? formatCurrency(
            property.listingPrice
          )
        : "—"
    );

    setText(
      "seller-result-source",
      rawResult
        ? "RentCast via MREO Property API"
        : "Provisional MREO record"
    );

    setText(
      "seller-result-updated",
      todayLabel()
    );

    setLink(
      "seller-zillow-link",
      buildZillowSearchUrl(
        property.fullAddress
      )
    );

    setLink(
      "seller-maps-link",
      buildGoogleMapsUrl(
        property.fullAddress
      )
    );

    setValue(
      "seller-address",
      property.addressLine1,
      {
        overwrite: true,
        markAutofilled: true
      }
    );

    setValue(
      "seller-city",
      property.city,
      {
        overwrite: true,
        markAutofilled: true
      }
    );

    setValue(
      "seller-state",
      property.state,
      {
        overwrite: true,
        markAutofilled: true
      }
    );

    setValue(
      "seller-zip",
      property.zip,
      {
        overwrite: true,
        markAutofilled: true
      }
    );

    setValue(
      "seller-property-type",
      normalizePropertyType(
        property.propertyType
      ),
      {
        overwrite: true,
        markAutofilled: true
      }
    );

    setValue(
      "seller-beds",
      property.beds,
      {
        overwrite: true,
        markAutofilled: true
      }
    );

    setValue(
      "seller-baths",
      property.baths,
      {
        overwrite: true,
        markAutofilled: true
      }
    );

    setValue(
      "seller-sqft",
      property.sqft,
      {
        overwrite: true,
        markAutofilled: true
      }
    );

    setValue(
      "seller-lot",
      property.lotSize,
      {
        overwrite: true,
        markAutofilled: true
      }
    );

    setValue(
      "seller-year",
      property.yearBuilt,
      {
        overwrite: true,
        markAutofilled: true
      }
    );

    renderSellerPathways(
      property
    );

    renderSellerSources(
      property
    );
  }


  function normalizePropertyType(
    type
  ) {
    const value =
      String(type || "")
        .toLowerCase();

    if (
      value.includes(
        "single"
      )
    ) {
      return "Single Family";
    }

    if (
      value.includes(
        "condo"
      )
    ) {
      return "Condominium";
    }

    if (
      value.includes(
        "town"
      )
    ) {
      return "Townhouse";
    }

    if (
      value.includes(
        "multi"
      )
    ) {
      return "Multifamily";
    }

    if (
      value.includes(
        "land"
      )
    ) {
      return "Land";
    }

    return type ||
      "Other";
  }


  function initializeOwnerObjectiveButtons() {
    document
      .querySelectorAll(
        "[data-owner-objective]"
      )
      .forEach(
        (button) => {
          button.addEventListener(
            "click",
            () => {
              document
                .querySelectorAll(
                  "[data-owner-objective]"
                )
                .forEach(
                  (other) =>
                    other.classList.remove(
                      "is-selected"
                    )
                );

              button.classList.add(
                "is-selected"
              );

              const objective =
                button.dataset
                  .ownerObjective;

              updateSellerObjective(
                objective
              );
            }
          );
        }
      );
  }


  function updateSellerObjective(
    objective
  ) {
    const labels = {
      maximize:
        "Maximize value",

      speed:
        "Sell quickly",

      retain:
        "Keep property",

      repair:
        "Improve before sale"
    };

    setText(
      "seller-selected-objective",
      labels[objective] ||
      objective
    );

    if (
      state.currentLiveProperty
    ) {
      state.currentLiveProperty
        .ownerObjective =
        labels[objective] ||
        objective;

      renderSellerPathways(
        state.currentLiveProperty,
        objective
      );
    }
  }


  function renderSellerPathways(
    property,
    objective = "maximize"
  ) {
    const container =
      getElement(
        "seller-pathway-cards"
      );

    if (!container) {
      return;
    }

    const model =
      createPathwayModel(
        property.estimatedValue,
        {
          arv:
            property.arv
        }
      );

    let recommended =
      "reconstruction";

    if (
      objective === "speed"
    ) {
      recommended =
        "asis";
    }

    if (
      objective === "retain"
    ) {
      recommended =
        "hold";
    }

    if (
      objective === "repair"
    ) {
      recommended =
        "reconstruction";
    }

    container.innerHTML =
      renderPathwayCards(
        model,
        recommended
      );
  }


  function renderSellerSources(
    property
  ) {
    const container =
      getElement(
        "seller-source-list"
      );

    if (!container) {
      return;
    }

    const sources =
      property.sources || [];

    if (
      sources.length === 0
    ) {
      container.innerHTML =
        `
          <div class="info-message">
            No third-party valuation source was available. The
            remaining pathway figures are demonstration models.
          </div>
        `;

      return;
    }

    container.innerHTML =
      sources
        .map(
          (source) =>
            `
              <div class="dashboard-card white">
                <span class="panel-eyebrow">
                  ${escapeHtml(source.type)}
                </span>

                <h3>
                  ${escapeHtml(source.label)}
                </h3>

                <strong>
                  ${
                    typeof source.value === "number"
                      ? formatCurrency(source.value)
                      : escapeHtml(source.value)
                  }
                </strong>

                <p class="card-subtitle">
                  ${escapeHtml(source.provider)}
                  ·
                  ${escapeHtml(source.date)}
                </p>
              </div>
            `
        )
        .join("");
  }


  /*
    ============================================================
    PROPERTY PATHWAY MODELS
    ============================================================
  */

  function createPathwayModel(
    value,
    options = {}
  ) {
    const baseValue =
      cleanNumber(value) ||
      350000;

    const repairBudget =
      cleanNumber(
        options.repairBudget
      ) ||
      Math.round(
        baseValue *
        0.08
      );

    const arv =
      cleanNumber(
        options.arv
      ) ||
      Math.round(
        baseValue *
        1.15
      );

    const asIsProceeds =
      Math.round(
        baseValue *
        0.78
      );

    const conventionalCosts =
      Math.round(
        baseValue *
        0.065
      );

    const conventionalProceeds =
      Math.round(
        baseValue -
        conventionalCosts
      );

    const reconstructionHolding =
      Math.round(
        arv *
        0.045
      );

    const reconstructionTransaction =
      Math.round(
        arv *
        0.035
      );

    const reconstructionFinancing =
      Math.max(
        7500,
        Math.round(
          repairBudget *
          0.12
        )
      );

    const reconstructionProceeds =
      Math.round(
        arv -
        repairBudget -
        reconstructionHolding -
        reconstructionTransaction -
        reconstructionFinancing
      );

    const modeledMonthlyRent =
      Math.round(
        baseValue *
        0.0063
      );

    const modeledMonthlyNet =
      Math.round(
        modeledMonthlyRent *
        0.62
      );

    return {
      baseValue,

      arv,

      repairBudget,

      asis: {
        title:
          "Expedited As-Is Sale",

        proceeds:
          asIsProceeds,

        time:
          "14–30 days",

        uncertainty:
          "Low",

        description:
          "Prioritize speed and transaction simplicity by distributing the property in its current condition."
      },

      conventional: {
        title:
          "Conventional Sale",

        proceeds:
          conventionalProceeds,

        time:
          "45–90 days",

        uncertainty:
          "Medium",

        description:
          "Prepare and distribute the property through the conventional market, subject to market conditions and professional representation."
      },

      reconstruction: {
        title:
          "Reconstruction-Supported Sale",

        proceeds:
          reconstructionProceeds,

        time:
          "90–150 days",

        uncertainty:
          "Medium",

        description:
          "Model reconstruction, financing, controlled execution, and a later sale intended to recover value currently constrained by condition."
      },

      hold: {
        title:
          "Improve & Operate",

        monthlyRent:
          modeledMonthlyRent,

        monthlyNet:
          modeledMonthlyNet,

        time:
          "Ongoing",

        uncertainty:
          "Medium",

        description:
          "Retain ownership and model repair, tenant placement, rent collection, maintenance, management, and future liquidity."
      },

      waterfall: {
        arv,

        repairBudget,

        holding:
          reconstructionHolding,

        transaction:
          reconstructionTransaction,

        financing:
          reconstructionFinancing,

        net:
          reconstructionProceeds
      }
    };
  }


  function renderPathwayCards(
    model,
    recommended =
      "reconstruction"
  ) {
    const cards = [
      {
        id:
          "asis",

        ...model.asis,

        amountLabel:
          "Modeled owner proceeds",

        amount:
          formatCurrency(
            model
              .asis
              .proceeds
          )
      },

      {
        id:
          "conventional",

        ...model.conventional,

        amountLabel:
          "Modeled owner proceeds",

        amount:
          formatCurrency(
            model
              .conventional
              .proceeds
          )
      },

      {
        id:
          "reconstruction",

        ...model.reconstruction,

        amountLabel:
          "Modeled owner proceeds",

        amount:
          formatCurrency(
            model
              .reconstruction
              .proceeds
          )
      },

      {
        id:
          "hold",

        ...model.hold,

        amountLabel:
          "Modeled monthly net",

        amount:
          `${formatCurrency(
            model
              .hold
              .monthlyNet
          )}/mo`
      }
    ];

    return cards
      .map(
        (card) =>
          `
            <article
              class="dashboard-card white ${
                card.id === recommended
                  ? "pathway-recommended"
                  : ""
              }"
            >
              <div class="card-header">
                <div>
                  <span class="panel-eyebrow">
                    ${
                      card.id === recommended
                        ? "Suggested for review"
                        : "Property pathway"
                    }
                  </span>

                  <h3>
                    ${escapeHtml(card.title)}
                  </h3>
                </div>
              </div>

              <p>
                ${escapeHtml(card.description)}
              </p>

              <div class="stat-grid">
                <div class="stat-item">
                  <span>
                    ${escapeHtml(card.amountLabel)}
                  </span>

                  <strong>
                    ${escapeHtml(card.amount)}
                  </strong>
                </div>

                <div class="stat-item">
                  <span>Time</span>

                  <strong>
                    ${escapeHtml(card.time)}
                  </strong>
                </div>

                <div class="stat-item">
                  <span>Uncertainty</span>

                  <strong>
                    ${escapeHtml(card.uncertainty)}
                  </strong>
                </div>

                <div class="stat-item">
                  <span>Model</span>

                  <strong>
                    Illustrative
                  </strong>
                </div>
              </div>
            </article>
          `
      )
      .join("");
  }


  /*
    ============================================================
    BUYER ACQUISITION CENTER
    ============================================================
  */

  function initializeBuyerPage() {
    const property =
      getCurrentProperty();

    renderBuyerSelectedProperty(
      property
    );

    renderBuyerMarketplace();

    initializeBuyerQualification();

    initializeBuyerOfferForm(
      property
    );
  }


  function renderBuyerSelectedProperty(
    property
  ) {
    setText(
      "buyer-property-id",
      property.id
    );

    setText(
      "buyer-property-address",
      property.addressLine1
    );

    setText(
      "buyer-property-location",
      `${property.city}, ${property.state}`
    );

    setText(
      "buyer-property-price",
      formatCurrency(
        property.price
      )
    );

    setText(
      "buyer-property-readiness",
      formatPercent(
        property.transactionReadiness
      )
    );

    setText(
      "buyer-qualified-count",
      property
        .transaction
        .qualifiedBuyers
    );

    setText(
      "buyer-bid-count",
      property
        .transaction
        .sealedBids
    );

    setText(
      "buyer-property-condition",
      property.condition
    );

    setLink(
      "buyer-passport-link",
      propertyUrl(
        property
      )
    );

    setLink(
      "buyer-exchange-link",
      exchangeUrl(
        property
      )
    );

    setValue(
      "buyer-offer-property",
      property.id
    );

    setValue(
      "buyer-offer-amount",
      property.price
    );
  }


  function renderBuyerMarketplace() {
    const container =
      getElement(
        "buyer-property-grid"
      );

    if (!container) {
      return;
    }

    container.innerHTML =
      window
        .MREO_DATA
        .properties
        .slice(0, 6)
        .map(
          (property) =>
            renderPropertyCard(
              property,
              {
                acquisitionMode:
                  true
              }
            )
        )
        .join("");
  }


  function initializeBuyerQualification() {
    const form =
      getElement(
        "buyer-qualification-form"
      );

    if (!form) {
      return;
    }

    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        if (
          !form.reportValidity()
        ) {
          return;
        }

        const result =
          getElement(
            "buyer-qualification-result"
          );

        if (result) {
          result.hidden =
            false;

          result.innerHTML =
            `
              <div class="success-message">
                Demonstration qualification complete. Identity,
                capital status, purchase structure, and transaction
                requirements would now be associated with the
                purchaser's reusable MREO account.
              </div>
            `;
        }

        showNotification(
          "Purchaser qualification",
          "The demonstration purchaser profile is now marked qualified."
        );
      }
    );
  }


  function initializeBuyerOfferForm(
    property
  ) {
    const form =
      getElement(
        "buyer-offer-form"
      );

    if (!form) {
      return;
    }

    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        if (
          !form.reportValidity()
        ) {
          return;
        }

        const amount =
          cleanNumber(
            getValue(
              "buyer-offer-amount"
            )
          );

        const closingDays =
          getValue(
            "buyer-closing-days"
          );

        const capital =
          getValue(
            "buyer-capital-status"
          );

        const result =
          getElement(
            "buyer-offer-result"
          );

        if (result) {
          result.hidden =
            false;

          result.innerHTML =
            `
              <div class="success-message">
                Sealed demonstration offer prepared for
                <strong>${escapeHtml(property.addressLine1)}</strong>:
                ${formatCurrency(amount)}
                ${
                  closingDays
                    ? ` with a ${escapeHtml(closingDays)}-day target close`
                    : ""
                }.
                Capital status: ${escapeHtml(capital || "Not specified")}.
                This prototype does not transmit a binding real-estate offer.
              </div>
            `;
        }

        showNotification(
          "Sealed offer prepared",
          "The demonstration offer has been added to the Buyer Acquisition workspace."
        );
      }
    );
  }


  /*
    ============================================================
    QUALIFIED PROPERTY EXCHANGE
    ============================================================
  */

  function initializeExchangePage() {
    const property =
      getCurrentProperty();

    populateExchangePropertySelector(
      property
    );

    renderExchangeProperty(
      property
    );

    const select =
      getElement(
        "exchange-property-select"
      );

    if (select) {
      select.addEventListener(
        "change",
        () => {
          const nextProperty =
            window
              .MREO_DATA
              .getProperty(
                select.value
              );

          state.currentProperty =
            nextProperty;

          renderExchangeProperty(
            nextProperty
          );
        }
      );
    }

    document.addEventListener(
      "click",
      handleBidSelection
    );
  }


  function populateExchangePropertySelector(
    current
  ) {
    const select =
      getElement(
        "exchange-property-select"
      );

    if (!select) {
      return;
    }

    select.innerHTML =
      window
        .MREO_DATA
        .properties
        .map(
          (property) =>
            `
              <option
                value="${escapeHtml(property.id)}"
                ${
                  property.id === current.id
                    ? "selected"
                    : ""
                }
              >
                ${escapeHtml(property.id)}
                —
                ${escapeHtml(property.addressLine1)}
              </option>
            `
        )
        .join("");
  }


  function renderExchangeProperty(
    property
  ) {
    const bids =
      getPropertyBidsForExchange(
        property
      );

    setText(
      "exchange-property-address",
      property.addressLine1
    );

    setText(
      "exchange-property-location",
      property.location
    );

    setText(
      "exchange-qualified-buyers",
      property
        .transaction
        .qualifiedBuyers
    );

    setText(
      "exchange-sealed-bids",
      bids.length
    );

    setText(
      "exchange-confirmed-capital",
      bids.filter(
        (bid) =>
          bid.capitalStatus ===
          "Confirmed"
      ).length
    );

    setText(
      "exchange-backup-count",
      property
        .transaction
        .backupBuyers
    );

    const tableBody =
      getElement(
        "exchange-bid-table-body"
      );

    if (tableBody) {
      tableBody.innerHTML =
        bids
          .map(
            (bid) =>
              renderExchangeBidRow(
                bid
              )
          )
          .join("");
    }

    const selected =
      bids.find(
        (bid) =>
          bid.selected
      ) ||
      bids
        .slice()
        .sort(
          (a, b) =>
            b.executionScore -
            a.executionScore
        )[0];

    if (selected) {
      state.currentBid =
        selected;

      renderSelectedBid(
        selected
      );

      renderBackupWaterfall(
        bids,
        selected
      );
    }
  }


  function getPropertyBidsForExchange(
    property
  ) {
    if (
      property.bids &&
      property.bids.length > 0
    ) {
      return property.bids;
    }

    const base =
      property.price;

    return [
      {
        id:
          `${property.id}-A`,

        buyer:
          "Buyer A",

        buyerType:
          "Institutional",

        offer:
          Math.round(
            base *
            1.035
          ),

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

        selected:
          false
      },

      {
        id:
          `${property.id}-B`,

        buyer:
          "Buyer B",

        buyerType:
          "Verified Cash",

        offer:
          Math.round(
            base *
            1.01
          ),

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

        selected:
          true
      },

      {
        id:
          `${property.id}-C`,

        buyer:
          "Buyer C",

        buyerType:
          "Acquisition Group",

        offer:
          Math.round(
            base *
            1.025
          ),

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

        selected:
          false
      },

      {
        id:
          `${property.id}-D`,

        buyer:
          "Buyer D",

        buyerType:
          "Owner Occupant",

        offer:
          Math.round(
            base *
            0.998
          ),

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

        selected:
          false
      }
    ];
  }


  function renderExchangeBidRow(
    bid
  ) {
    const capitalClass =
      bid.capitalStatus ===
      "Confirmed"
        ? "confirmed"
        : bid.capitalStatus ===
          "Pending"
          ? "pending"
          : "partial";

    return `
      <tr
        class="${
          bid.selected
            ? "bid-row-recommended"
            : ""
        }"
        data-bid-row="${escapeHtml(bid.id)}"
      >
        <td>
          <strong>
            ${escapeHtml(bid.buyer)}
          </strong>

          <br>

          <small>
            ${escapeHtml(bid.buyerType)}
          </small>
        </td>

        <td>
          <strong>
            ${formatCurrency(bid.offer)}
          </strong>
        </td>

        <td>
          <span class="capital-state ${capitalClass}">
            ${escapeHtml(bid.capital)}
          </span>
        </td>

        <td>
          ${escapeHtml(bid.contingencies)}
        </td>

        <td>
          ${escapeHtml(bid.closingDays)} days
        </td>

        <td>
          <div class="execution-score">
            <strong>
              ${escapeHtml(bid.executionScore)}
            </strong>

            <span>
              ${escapeHtml(bid.executionLabel)}
            </span>
          </div>
        </td>

        <td>
          <button
            class="table-action-button"
            type="button"
            data-select-bid="${escapeHtml(bid.id)}"
          >
            Review
          </button>
        </td>
      </tr>
    `;
  }


  function handleBidSelection(
    event
  ) {
    const button =
      event.target.closest(
        "[data-select-bid]"
      );

    if (!button) {
      return;
    }

    const property =
      state.currentProperty ||
      getCurrentProperty();

    const bids =
      getPropertyBidsForExchange(
        property
      );

    const selected =
      bids.find(
        (bid) =>
          bid.id ===
          button.dataset
            .selectBid
      );

    if (!selected) {
      return;
    }

    state.currentBid =
      selected;

    renderSelectedBid(
      selected
    );

    renderBackupWaterfall(
      bids,
      selected
    );

    document
      .querySelectorAll(
        "[data-bid-row]"
      )
      .forEach(
        (row) =>
          row.classList.remove(
            "bid-row-recommended"
          )
      );

    const selectedRow =
      document.querySelector(
        `[data-bid-row="${CSS.escape(selected.id)}"]`
      );

    if (selectedRow) {
      selectedRow.classList.add(
        "bid-row-recommended"
      );
    }
  }


  function renderSelectedBid(
    bid
  ) {
    setText(
      "selected-bid-buyer",
      bid.buyer
    );

    setText(
      "selected-bid-type",
      bid.buyerType
    );

    setText(
      "selected-bid-offer",
      formatCurrency(
        bid.offer
      )
    );

    setText(
      "selected-bid-capital",
      bid.capital
    );

    setText(
      "selected-bid-contingencies",
      bid.contingencies
    );

    setText(
      "selected-bid-close",
      `${bid.closingDays} days`
    );

    setText(
      "selected-bid-score",
      `${bid.executionScore} / 100`
    );

    const bar =
      getElement(
        "selected-bid-score-bar"
      );

    if (bar) {
      bar.style.width =
        `${clamp(
          bid.executionScore,
          0,
          100
        )}%`;
    }

    const selectButton =
      getElement(
        "select-current-bid-button"
      );

    if (selectButton) {
      selectButton.textContent =
        `Select ${bid.buyer}`;

      selectButton.onclick =
        () => {
          showNotification(
            "Buyer selected",
            `${bid.buyer} has been selected in the demonstration exchange. Backup purchasers remain available.`
          );
        };
    }
  }


  function renderBackupWaterfall(
    bids,
    selected
  ) {
    const container =
      getElement(
        "backup-waterfall-steps"
      );

    if (!container) {
      return;
    }

    const backups =
      bids
        .filter(
          (bid) =>
            bid.id !==
            selected.id
        )
        .sort(
          (a, b) =>
            b.executionScore -
            a.executionScore
        )
        .slice(0, 2);

    const waterfall = [
      {
        ...selected,
        position:
          "Selected"
      },

      ...backups.map(
        (bid, index) => ({
          ...bid,

          position:
            `Backup ${index + 1}`
        })
      )
    ];

    container.innerHTML =
      waterfall
        .map(
          (bid, index) =>
            `
              ${
                index > 0
                  ? `
                    <div class="waterfall-arrow">
                      →
                    </div>
                  `
                  : ""
              }

              <div class="waterfall-step ${
                index === 0
                  ? "selected"
                  : ""
              }">
                <span class="waterfall-position">
                  ${escapeHtml(bid.position)}
                </span>

                <strong>
                  ${escapeHtml(bid.buyer)}
                </strong>

                <small>
                  ${formatCurrency(bid.offer)}
                  ·
                  ${escapeHtml(bid.executionScore)}
                  execution score
                </small>
              </div>
            `
        )
        .join("");
  }


  /*
    ============================================================
    RECONSTRUCTION CENTER
    ============================================================
  */

  function initializeReconstructionPage() {
    const initialProperty =
      chooseInitialReconstructionProperty();

    populateReconstructionSelector(
      initialProperty
    );

    renderReconstructionPage(
      initialProperty
    );

    const selector =
      getElement(
        "reconstruction-property-select"
      );

    if (selector) {
      selector.addEventListener(
        "change",
        () => {
          const property =
            window
              .MREO_DATA
              .getProperty(
                selector.value
              );

          renderReconstructionPage(
            property
          );
        }
      );
    }
  }


  function chooseInitialReconstructionProperty() {
    const requested =
      getQueryParameter(
        "id"
      );

    if (requested) {
      const property =
        window
          .MREO_DATA
          .getProperty(
            requested
          );

      if (
        property
          .reconstruction
          .budget > 0
      ) {
        return property;
      }
    }

    return (
      window
        .MREO_DATA
        .properties
        .find(
          (property) =>
            property.id ===
            "MREO-0005"
        ) ||
      window
        .MREO_DATA
        .properties
        .find(
          (property) =>
            property
              .reconstruction
              .budget > 0
        )
    );
  }


  function populateReconstructionSelector(
    current
  ) {
    const selector =
      getElement(
        "reconstruction-property-select"
      );

    if (!selector) {
      return;
    }

    const properties =
      window
        .MREO_DATA
        .properties
        .filter(
          (property) =>
            property
              .reconstruction
              .budget > 0
        );

    selector.innerHTML =
      properties
        .map(
          (property) =>
            `
              <option
                value="${escapeHtml(property.id)}"
                ${
                  property.id === current.id
                    ? "selected"
                    : ""
                }
              >
                ${escapeHtml(property.id)}
                —
                ${escapeHtml(property.addressLine1)}
              </option>
            `
        )
        .join("");
  }


  function renderReconstructionPage(
    property
  ) {
    state.currentProperty =
      property;

    const reconstruction =
      property.reconstruction;

    setText(
      "reconstruction-property-address",
      property.addressLine1
    );

    setText(
      "reconstruction-property-location",
      property.location
    );

    setText(
      "reconstruction-status",
      reconstruction.status
    );

    setText(
      "reconstruction-need",
      reconstruction.need
    );

    setText(
      "reconstruction-budget",
      formatCurrency(
        reconstruction.budget
      )
    );

    setText(
      "reconstruction-committed",
      formatCurrency(
        reconstruction.committed
      )
    );

    setText(
      "reconstruction-duration",
      reconstruction
        .projectedDurationDays
        ? `${reconstruction.projectedDurationDays} days`
        : "—"
    );

    setText(
      "reconstruction-contractor",
      reconstruction.contractor ||
      "Not assigned"
    );

    const percentUsed =
      reconstruction.budget
        ? clamp(
            (
              reconstruction.committed /
              reconstruction.budget
            ) *
            100,
            0,
            100
          )
        : 0;

    setText(
      "reconstruction-percent",
      formatPercent(
        percentUsed
      )
    );

    const bar =
      getElement(
        "reconstruction-budget-bar"
      );

    if (bar) {
      bar.style.width =
        `${percentUsed}%`;
    }

    renderReconstructionMilestones(
      reconstruction
    );

    renderChangeOrders(
      reconstruction
    );

    renderSharedProfessionalNetwork(
      "reconstruction-professionals"
    );
  }


  function renderReconstructionMilestones(
    reconstruction
  ) {
    const container =
      getElement(
        "reconstruction-milestones"
      );

    if (!container) {
      return;
    }

    if (
      !reconstruction.milestones ||
      reconstruction.milestones.length === 0
    ) {
      container.innerHTML =
        `
          <div class="info-message">
            No reconstruction milestones are currently active.
          </div>
        `;

      return;
    }

    container.innerHTML =
      reconstruction
        .milestones
        .map(
          (milestone, index) => {
            const statusClass =
              milestone.status ===
              "Complete"
                ? "complete"
                : milestone.status ===
                  "In progress"
                  ? "active"
                  : "";

            return `
              <button
                class="milestone-item ${statusClass}"
                type="button"
                data-demo-notification="Milestone ${index + 1}: ${escapeHtml(milestone.name)} — ${escapeHtml(milestone.status)}."
              >
                <span class="milestone-check">
                  ${
                    milestone.status ===
                    "Complete"
                      ? "✓"
                      : index + 1
                  }
                </span>

                <div>
                  <strong>
                    ${escapeHtml(milestone.name)}
                  </strong>

                  <small>
                    ${formatCurrency(milestone.amount)}
                  </small>
                </div>

                <span class="milestone-state">
                  ${escapeHtml(milestone.status)}
                </span>
              </button>
            `;
          }
        )
        .join("");
  }


  function renderChangeOrders(
    reconstruction
  ) {
    const container =
      getElement(
        "reconstruction-change-orders"
      );

    if (!container) {
      return;
    }

    if (
      !reconstruction.changeOrders ||
      reconstruction.changeOrders.length === 0
    ) {
      container.innerHTML =
        `
          <div class="success-message">
            No pending reconstruction change orders.
          </div>
        `;

      return;
    }

    container.innerHTML =
      reconstruction
        .changeOrders
        .map(
          (order) =>
            `
              <article class="change-order">
                <span class="panel-eyebrow">
                  ${escapeHtml(order.id)}
                </span>

                <h3>
                  Change Order
                </h3>

                <p>
                  ${escapeHtml(order.description)}
                </p>

                <div class="change-order-value">
                  +${formatCurrency(order.amount)}
                </div>

                <p>
                  Status:
                  <strong>
                    ${escapeHtml(order.status)}
                  </strong>
                </p>

                <div class="form-actions">
                  <button
                    class="primary-button"
                    type="button"
                    data-demo-notification="The change order was approved in the demonstration workspace."
                  >
                    Approve
                  </button>

                  <button
                    class="secondary-button"
                    type="button"
                    data-demo-notification="A competing contractor bid was requested in the demonstration workspace."
                  >
                    Request Competing Bid
                  </button>
                </div>
              </article>
            `
        )
        .join("");
  }


  function renderSharedProfessionalNetwork(
    id
  ) {
    const container =
      getElement(id);

    if (!container) {
      return;
    }

    container.innerHTML =
      window
        .MREO_DATA
        .professionals
        .slice(0, 8)
        .map(
          (professional) =>
            `
              <article class="professional-card">
                <div class="professional-avatar">
                  ${escapeHtml(professional.initials)}
                </div>

                <span class="professional-role">
                  ${escapeHtml(professional.role)}
                </span>

                <h3>
                  ${escapeHtml(professional.name)}
                </h3>

                <p>
                  ${escapeHtml(professional.description)}
                </p>

                <div class="professional-meta">
                  ${
                    professional.verified
                      ? "<span>✓ Verified</span>"
                      : ""
                  }

                  <span>
                    ${escapeHtml(professional.performance)}
                    performance
                  </span>

                  <span>
                    ${formatNumber(professional.completedRecords)}
                    records
                  </span>
                </div>
              </article>
            `
        )
        .join("");
  }


  /*
    ============================================================
    SETTLEMENT WORKSPACE
    ============================================================
  */

  function initializeSettlementPage() {
    const initial =
      chooseInitialSettlementProperty();

    populateSettlementSelector(
      initial
    );

    renderSettlementPage(
      initial
    );

    const selector =
      getElement(
        "settlement-property-select"
      );

    if (selector) {
      selector.addEventListener(
        "change",
        () => {
          renderSettlementPage(
            window
              .MREO_DATA
              .getProperty(
                selector.value
              )
          );
        }
      );
    }
  }


  function chooseInitialSettlementProperty() {
    const requested =
      getQueryParameter(
        "id"
      );

    if (requested) {
      const property =
        window
          .MREO_DATA
          .getProperty(
            requested
          );

      if (
        property
          .settlement
          .status !==
        "Not started"
      ) {
        return property;
      }
    }

    return (
      window
        .MREO_DATA
        .properties
        .find(
          (property) =>
            property.id ===
            "MREO-0016"
        ) ||
      window
        .MREO_DATA
        .properties[0]
    );
  }


  function populateSettlementSelector(
    current
  ) {
    const selector =
      getElement(
        "settlement-property-select"
      );

    if (!selector) {
      return;
    }

    const relevant =
      window
        .MREO_DATA
        .properties
        .filter(
          (property) =>
            property
              .settlement
              .status !==
            "Not started"
        );

    selector.innerHTML =
      relevant
        .map(
          (property) =>
            `
              <option
                value="${escapeHtml(property.id)}"
                ${
                  property.id === current.id
                    ? "selected"
                    : ""
                }
              >
                ${escapeHtml(property.id)}
                —
                ${escapeHtml(property.addressLine1)}
              </option>
            `
        )
        .join("");
  }


  function renderSettlementPage(
    property
  ) {
    state.currentProperty =
      property;

    const settlement =
      property.settlement;

    setText(
      "settlement-property-address",
      property.addressLine1
    );

    setText(
      "settlement-property-location",
      property.location
    );

    setText(
      "settlement-status",
      settlement.status
    );

    setText(
      "settlement-progress",
      formatPercent(
        settlement.progress
      )
    );

    setText(
      "settlement-title-provider",
      settlement.titleProvider
    );

    setText(
      "settlement-escrow",
      settlement.escrowStatus
    );

    setText(
      "settlement-funds",
      settlement.fundsStatus
    );

    setText(
      "settlement-closing",
      settlement.closingDate
        ? formatDate(
            settlement.closingDate
          )
        : "Not scheduled"
    );

    const bar =
      getElement(
        "settlement-progress-bar"
      );

    if (bar) {
      bar.style.width =
        `${clamp(
          settlement.progress,
          0,
          100
        )}%`;
    }

    renderSettlementTimeline(
      property
    );

    renderSettlementObligations(
      settlement
    );
  }


  function renderSettlementTimeline(
    property
  ) {
    const container =
      getElement(
        "settlement-timeline"
      );

    if (!container) {
      return;
    }

    const settlement =
      property.settlement;

    const items = [
      {
        title:
          "Purchase agreement",

        detail:
          settlement.purchaseAgreement,

        complete:
          settlement.purchaseAgreement ===
          "Executed" ||
          settlement.purchaseAgreement ===
          "Completed"
      },

      {
        title:
          "Earnest money / escrow",

        detail:
          settlement.escrowStatus,

        complete:
          !String(
            settlement.escrowStatus
          )
            .toLowerCase()
            .includes(
              "not"
            )
      },

      {
        title:
          "Title review",

        detail:
          settlement.titleReview,

        complete:
          settlement.titleReview ===
          "Completed"
      },

      {
        title:
          "Funds confirmation",

        detail:
          settlement.fundsStatus,

        complete:
          settlement.fundsStatus ===
          "Completed"
      },

      {
        title:
          "Closing",

        detail:
          settlement.closingDate
            ? formatDate(
                settlement.closingDate
              )
            : "Not scheduled",

        complete:
          settlement.status ===
          "Closed"
      }
    ];

    let activeAssigned =
      false;

    container.innerHTML =
      items
        .map(
          (item, index) => {
            let active =
              false;

            if (
              !item.complete &&
              !activeAssigned
            ) {
              active =
                true;

              activeAssigned =
                true;
            }

            return `
              <div
                class="timeline-item ${
                  item.complete
                    ? "complete"
                    : active
                      ? "active"
                      : ""
                }"
              >
                <span class="timeline-marker">
                  ${
                    item.complete
                      ? "✓"
                      : index + 1
                  }
                </span>

                <div>
                  <strong>
                    ${escapeHtml(item.title)}
                  </strong>

                  <small>
                    ${escapeHtml(item.detail)}
                  </small>
                </div>
              </div>
            `;
          }
        )
        .join("");
  }


  function renderSettlementObligations(
    settlement
  ) {
    const container =
      getElement(
        "settlement-obligations"
      );

    if (!container) {
      return;
    }

    const obligations =
      settlement.obligations ||
      [];

    if (
      obligations.length === 0
    ) {
      container.innerHTML =
        `
          <div class="success-message">
            No open settlement obligations are recorded.
          </div>
        `;

      return;
    }

    container.innerHTML =
      obligations
        .map(
          (item) => {
            const priorityClass =
              item.type === "Required"
                ? "high"
                : item.type === "Buyer"
                  ? "medium"
                  : "low";

            return `
              <div class="obligation-row">
                <span class="obligation-priority ${priorityClass}">
                  ${escapeHtml(item.type)}
                </span>

                <div>
                  <strong>
                    ${escapeHtml(item.item)}
                  </strong>

                  <small>
                    Assigned:
                    ${escapeHtml(item.assignedTo)}
                  </small>
                </div>

                <span>
                  ${formatDate(item.due)}
                </span>
              </div>
            `;
          }
        )
        .join("");
  }


  /*
    ============================================================
    POST-ACQUISITION OPERATIONS
    ============================================================
  */

  function initializeOperationsPage() {
    const initial =
      chooseInitialOperatingProperty();

    populateOperationsSelector(
      initial
    );

    renderOperationsPage(
      initial
    );

    const selector =
      getElement(
        "operations-property-select"
      );

    if (selector) {
      selector.addEventListener(
        "change",
        () => {
          renderOperationsPage(
            window
              .MREO_DATA
              .getProperty(
                selector.value
              )
          );
        }
      );
    }
  }


  function chooseInitialOperatingProperty() {
    const requested =
      getQueryParameter(
        "id"
      );

    if (requested) {
      const property =
        window
          .MREO_DATA
          .getProperty(
            requested
          );

      if (
        property
          .operations
          .status ===
        "Active"
      ) {
        return property;
      }
    }

    return (
      window
        .MREO_DATA
        .properties
        .find(
          (property) =>
            property.id ===
            "MREO-0020"
        ) ||
      window
        .MREO_DATA
        .properties
        .find(
          (property) =>
            property
              .operations
              .status ===
            "Active"
        )
    );
  }


  function populateOperationsSelector(
    current
  ) {
    const selector =
      getElement(
        "operations-property-select"
      );

    if (!selector) {
      return;
    }

    const properties =
      window
        .MREO_DATA
        .properties
        .filter(
          (property) =>
            property
              .operations
              .status ===
            "Active"
        );

    selector.innerHTML =
      properties
        .map(
          (property) =>
            `
              <option
                value="${escapeHtml(property.id)}"
                ${
                  property.id === current.id
                    ? "selected"
                    : ""
                }
              >
                ${escapeHtml(property.id)}
                —
                ${escapeHtml(property.addressLine1)}
              </option>
            `
        )
        .join("");
  }


  function renderOperationsPage(
    property
  ) {
    state.currentProperty =
      property;

    const operations =
      property.operations;

    setText(
      "operations-property-address",
      property.addressLine1
    );

    setText(
      "operations-property-location",
      property.location
    );

    setText(
      "operations-status",
      operations.status
    );

    setText(
      "operations-occupancy",
      operations.occupancy
    );

    setText(
      "operations-rent",
      formatCurrency(
        operations.monthlyRent
      )
    );

    setText(
      "operations-net",
      formatCurrency(
        operations.monthlyNet
      )
    );

    setText(
      "operations-equity",
      formatCurrency(
        operations.estimatedEquity
      )
    );

    setText(
      "operations-insurance",
      operations.insuranceStatus
    );

    setText(
      "operations-maintenance",
      operations.maintenanceRequests
    );

    setText(
      "operations-resale-readiness",
      formatPercent(
        operations.resaleReadiness
      )
    );

    const grid =
      getElement(
        "operations-grid"
      );

    if (grid) {
      grid.innerHTML =
        renderOperationsCards(
          operations
        );
    }
  }


  function renderOperationsCards(
    operations
  ) {
    return `
      <article class="operation-card">
        <span class="operation-icon">
          $$
        </span>

        <h3>
          Rent Collection
        </h3>

        <strong class="operation-large-number">
          ${formatCurrency(operations.monthlyRent)}
        </strong>

        <p>
          Demonstration monthly rent collection.
        </p>

        <span class="operation-badge good">
          Current
        </span>
      </article>


      <article class="operation-card">
        <span class="operation-icon">
          NET
        </span>

        <h3>
          Operating Net
        </h3>

        <strong class="operation-large-number">
          ${formatCurrency(operations.monthlyNet)}
        </strong>

        <p>
          Demonstration monthly operating net.
        </p>

        <span class="operation-badge">
          Modeled
        </span>
      </article>


      <article class="operation-card">
        <span class="operation-icon">
          MT
        </span>

        <h3>
          Maintenance
        </h3>

        <strong class="operation-large-number">
          ${escapeHtml(operations.maintenanceRequests)}
        </strong>

        <p>
          Open maintenance requests attached to this property.
        </p>

        <button
          class="small-action-button"
          type="button"
          data-demo-notification="A local maintenance workflow was created."
        >
          Coordinate Service
        </button>
      </article>


      <article class="operation-card">
        <span class="operation-icon">
          EQ
        </span>

        <h3>
          Estimated Equity
        </h3>

        <strong class="operation-large-number">
          ${formatCurrency(operations.estimatedEquity)}
        </strong>

        <p>
          Demonstration property equity before underwriting and transaction costs.
        </p>

        <button
          class="small-action-button"
          type="button"
          data-demo-notification="The prototype opened an equity-liquidity review."
        >
          Explore Liquidity
        </button>
      </article>


      <article class="operation-card">
        <span class="operation-icon">
          IN
        </span>

        <h3>
          Insurance
        </h3>

        <strong class="operation-large-number">
          ${escapeHtml(operations.insuranceStatus)}
        </strong>

        <p>
          Property risk and insurance status remain attached to the operating record.
        </p>

        <span class="operation-badge good">
          Recorded
        </span>
      </article>


      <article class="operation-card">
        <span class="operation-icon">
          RS
        </span>

        <h3>
          Resale Readiness
        </h3>

        <strong class="operation-large-number">
          ${formatPercent(operations.resaleReadiness)}
        </strong>

        <p>
          Indicates how much of the existing MREO record is already suitable for future distribution.
        </p>

        <button
          class="small-action-button"
          type="button"
          data-demo-notification="The prototype began preparing the existing Property Passport for resale."
        >
          Prepare Resale
        </button>
      </article>
    `;
  }


  /*
    ============================================================
    INSTITUTIONAL PORTFOLIO OS
    ============================================================
  */

  function initializeInstitutionalPage() {
    renderInstitutionalPortfolio();

    renderInstitutionalPropertyTable();
  }


  function renderInstitutionalPortfolio() {
    const portfolio =
      window
        .MREO_DATA
        .institutionalPortfolio;

    setText(
      "portfolio-name",
      portfolio.name
    );

    setText(
      "portfolio-total-properties",
      formatNumber(
        portfolio.totalProperties
      )
    );

    setText(
      "portfolio-value",
      portfolio.projectedValueFormatted
    );

    setText(
      "portfolio-readiness",
      formatPercent(
        portfolio
          .metrics
          .averageTransactionReadiness
      )
    );

    setText(
      "portfolio-qualified-purchasers",
      formatNumber(
        portfolio
          .metrics
          .qualifiedPurchasers
      )
    );

    setText(
      "portfolio-active-bids",
      formatNumber(
        portfolio
          .metrics
          .activeBids
      )
    );

    setText(
      "portfolio-reconstruction-budget",
      formatCurrency(
        portfolio
          .metrics
          .activeReconstructionBudget
      )
    );

    setText(
      "portfolio-closings",
      formatNumber(
        portfolio
          .metrics
          .completedClosingsYTD
      )
    );

    const pipeline =
      getElement(
        "portfolio-pipeline"
      );

    if (pipeline) {
      pipeline.innerHTML =
        portfolio.stages
          .map(
            (stage) =>
              `
                <div>
                  <div class="pipeline-label">
                    <span>
                      ${escapeHtml(stage.label)}
                    </span>

                    <strong>
                      ${formatNumber(stage.count)}
                      ·
                      ${escapeHtml(stage.percent)}%
                    </strong>
                  </div>

                  <div class="pipeline-track">
                    <span
                      style="width:${clamp(stage.percent, 0, 100)}%"
                    ></span>
                  </div>
                </div>
              `
          )
          .join("");
    }

    const alerts =
      getElement(
        "portfolio-alerts"
      );

    if (alerts) {
      alerts.innerHTML =
        portfolio.alerts
          .map(
            (alert) =>
              `
                <div class="portfolio-alert">
                  <span class="alert-${escapeHtml(alert.severity)}">
                    ${formatNumber(alert.count)}
                  </span>

                  <p>
                    ${escapeHtml(alert.label)}
                  </p>
                </div>
              `
          )
          .join("");
    }
  }


  function renderInstitutionalPropertyTable() {
    const body =
      getElement(
        "institutional-property-body"
      );

    if (!body) {
      return;
    }

    const properties =
      window
        .MREO_DATA
        .properties
        .filter(
          (property) =>
            property
              .institutional
              .isInstitutional
        );

    body.innerHTML =
      properties
        .map(
          (property) =>
            `
              <tr>
                <td>
                  ${escapeHtml(property.id)}
                </td>

                <td>
                  <strong>
                    ${escapeHtml(property.addressLine1)}
                  </strong>

                  <br>

                  <small>
                    ${escapeHtml(property.location)}
                  </small>
                </td>

                <td>
                  ${escapeHtml(
                    property
                      .institutional
                      .ownerType
                  )}
                </td>

                <td>
                  ${escapeHtml(
                    property
                      .institutional
                      .dispositionStage
                  )}
                </td>

                <td>
                  ${formatPercent(
                    property.transactionReadiness
                  )}
                </td>

                <td>
                  ${escapeHtml(
                    property
                      .reconstruction
                      .status
                  )}
                </td>

                <td>
                  <a
                    class="table-action-button"
                    href="${propertyUrl(property)}"
                  >
                    Open
                  </a>
                </td>
              </tr>
            `
        )
        .join("");
  }


  /*
    ============================================================
    MREO INTELLIGENCE
    ============================================================
  */

  function initializeIntelligencePage() {
    const property =
      getCurrentProperty();

    state.currentProperty =
      property;

    populateIntelligencePropertySelector(
      property
    );

    renderIntelligencePropertyContext(
      property
    );

    document
      .querySelectorAll(
        "[data-ai-prompt]"
      )
      .forEach(
        (button) => {
          button.addEventListener(
            "click",
            () => {
              handleIntelligencePrompt(
                button.dataset
                  .aiPrompt
              );
            }
          );
        }
      );

    const form =
      getElement(
        "ai-form"
      );

    if (form) {
      form.addEventListener(
        "submit",
        handleIntelligenceQuestion
      );
    }

    const selector =
      getElement(
        "ai-property-select"
      );

    if (selector) {
      selector.addEventListener(
        "change",
        () => {
          const nextProperty =
            window
              .MREO_DATA
              .getProperty(
                selector.value
              );

          state.currentProperty =
            nextProperty;

          renderIntelligencePropertyContext(
            nextProperty
          );

          appendAIMessage(
            "system",
            `Property context changed to ${nextProperty.addressLine1}.`
          );
        }
      );
    }
  }


  function populateIntelligencePropertySelector(
    current
  ) {
    const select =
      getElement(
        "ai-property-select"
      );

    if (!select) {
      return;
    }

    select.innerHTML =
      window
        .MREO_DATA
        .properties
        .map(
          (property) =>
            `
              <option
                value="${escapeHtml(property.id)}"
                ${
                  property.id === current.id
                    ? "selected"
                    : ""
                }
              >
                ${escapeHtml(property.id)}
                —
                ${escapeHtml(property.addressLine1)}
              </option>
            `
        )
        .join("");
  }


  function renderIntelligencePropertyContext(
    property
  ) {
    setText(
      "ai-context-property",
      property.addressLine1
    );

    setText(
      "ai-context-id",
      property.id
    );

    setText(
      "ai-context-scenario",
      property.scenario
    );

    setText(
      "ai-context-readiness",
      formatPercent(
        property.transactionReadiness
      )
    );

    setText(
      "ai-context-title",
      property.title.status
    );

    setText(
      "ai-context-reconstruction",
      property
        .reconstruction
        .status
    );

    setText(
      "ai-context-transaction",
      property
        .transaction
        .status
    );
  }


  function handleIntelligencePrompt(
    key
  ) {
    const response =
      window
        .MREO_DATA
        .intelligenceResponses[
          key
        ] ||
      window
        .MREO_DATA
        .intelligenceResponses
        .default;

    appendAIMessage(
      "user",
      response.title
    );

    appendAIMessage(
      "assistant",
      response.response,
      response.action
    );
  }


  function handleIntelligenceQuestion(
    event
  ) {
    event.preventDefault();

    const input =
      getElement(
        "ai-input"
      );

    if (!input) {
      return;
    }

    const question =
      input.value.trim();

    if (!question) {
      return;
    }

    appendAIMessage(
      "user",
      question
    );

    input.value =
      "";

    /*
      The prototype intentionally uses transparent canned
      analysis rather than pretending a real autonomous
      system has made a legal or financial determination.
    */

    const lower =
      question.toLowerCase();

    let responseKey =
      "default";

    if (
      lower.includes(
        "risk"
      ) ||
      lower.includes(
        "delay"
      ) ||
      lower.includes(
        "closing"
      )
    ) {
      responseKey =
        "risk";
    } else if (
      lower.includes(
        "path"
      ) ||
      lower.includes(
        "sell"
      ) ||
      lower.includes(
        "option"
      )
    ) {
      responseKey =
        "pathway";
    } else if (
      lower.includes(
        "repair"
      ) ||
      lower.includes(
        "reconstruction"
      ) ||
      lower.includes(
        "contractor"
      )
    ) {
      responseKey =
        "reconstruction";
    } else if (
      lower.includes(
        "missing"
      ) ||
      lower.includes(
        "document"
      ) ||
      lower.includes(
        "record"
      )
    ) {
      responseKey =
        "missing";
    }

    const response =
      window
        .MREO_DATA
        .intelligenceResponses[
          responseKey
        ];

    window.setTimeout(
      () => {
        appendAIMessage(
          "assistant",
          response.response,
          response.action
        );
      },
      280
    );
  }


  function appendAIMessage(
    role,
    message,
    action = ""
  ) {
    const container =
      getElement(
        "ai-messages"
      );

    if (!container) {
      return;
    }

    const element =
      document.createElement(
        "div"
      );

    element.className =
      role === "user"
        ? "ai-message user"
        : "ai-message";

    element.innerHTML =
      `
        <span>
          ${
            role === "user"
              ? "You"
              : "MREO Intelligence"
          }
        </span>

        <p>
          ${escapeHtml(message)}
        </p>

        ${
          action
            ? `
              <div class="form-actions">
                <button
                  class="secondary-button"
                  type="button"
                  data-demo-notification="${escapeHtml(action)}"
                >
                  ${escapeHtml(action)}
                </button>
              </div>
            `
            : ""
        }
      `;

    container.appendChild(
      element
    );

    container.scrollTop =
      container.scrollHeight;
  }


  /*
    ============================================================
    RECORD MODAL RENDERERS
    ============================================================
  */

  function renderIdentityRecord(
    property
  ) {
    return `
      <div class="stat-grid">
        <div class="stat-item">
          <span>MREO ID</span>
          <strong>
            ${escapeHtml(property.id)}
          </strong>
        </div>

        <div class="stat-item">
          <span>Property type</span>
          <strong>
            ${escapeHtml(property.propertyType)}
          </strong>
        </div>

        <div class="stat-item">
          <span>Jurisdiction</span>
          <strong>
            ${escapeHtml(property.city)}, ${escapeHtml(property.state)}
          </strong>
        </div>

        <div class="stat-item">
          <span>Authority</span>
          <strong>
            ${escapeHtml(property.institutional?.authorityStatus || property.title?.authority || "Recorded")}
          </strong>
        </div>
      </div>

      <div class="dashboard-card white">
        <h3>
          Stable property identity
        </h3>

        <p>
          ${escapeHtml(property.fullAddress)}
        </p>

        <p>
          The MREO prototype treats the property as a persistent
          operational record rather than recreating unrelated
          records at every stage of the property lifecycle.
        </p>
      </div>
    `;
  }


  function renderSourceRecord(
    property
  ) {
    if (
      !property.sources ||
      property.sources.length === 0
    ) {
      return `
        <div class="info-message">
          No additional demonstration valuation sources are recorded.
        </div>
      `;
    }

    return `
      <div class="table-wrap">
        <table class="source-table">
          <thead>
            <tr>
              <th>Record</th>
              <th>Value</th>
              <th>Source</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            ${
              property.sources
                .map(
                  (source) =>
                    `
                      <tr>
                        <td>
                          ${escapeHtml(source.label)}
                        </td>

                        <td>
                          ${
                            typeof source.value === "number"
                              ? formatCurrency(source.value)
                              : escapeHtml(source.value)
                          }
                        </td>

                        <td>
                          ${escapeHtml(source.provider)}
                        </td>

                        <td>
                          ${escapeHtml(source.type)}
                        </td>

                        <td>
                          ${escapeHtml(source.date)}
                        </td>
                      </tr>
                    `
                )
                .join("")
            }
          </tbody>
        </table>
      </div>
    `;
  }


  function renderTitleRecord(
    property
  ) {
    return `
      <div class="stat-grid">
        <div class="stat-item">
          <span>Title status</span>
          <strong>
            ${escapeHtml(property.title.status)}
          </strong>
        </div>

        <div class="stat-item">
          <span>Transaction readiness</span>
          <strong>
            ${escapeHtml(property.title.readiness)}
          </strong>
        </div>
      </div>

      <div class="dashboard-card white">
        <h3>
          Authority
        </h3>

        <p>
          ${escapeHtml(property.title.authority)}
        </p>
      </div>

      ${
        property.title.exceptions?.length
          ? `
            <div class="warning-message">
              ${property.title.exceptions
                .map(
                  (exception) =>
                    escapeHtml(exception)
                )
                .join("<br>")}
            </div>
          `
          : `
            <div class="success-message">
              No title exceptions are recorded in this demonstration record.
            </div>
          `
      }
    `;
  }


  function renderVisualRecord(
    property
  ) {
    return `
      <div class="timeline-list">
        ${
          (property.visualHistory || [])
            .map(
              (item) =>
                `
                  <div class="timeline-item complete">
                    <span class="timeline-marker">
                      ✓
                    </span>

                    <div>
                      <strong>
                        ${escapeHtml(item.type)}
                      </strong>

                      <small>
                        ${escapeHtml(item.provider)}
                        ·
                        ${escapeHtml(item.date)}
                        ·
                        ${escapeHtml(item.status)}
                      </small>
                    </div>
                  </div>
                `
            )
            .join("")
        }
      </div>
    `;
  }


  function renderReconstructionRecord(
    property
  ) {
    const reconstruction =
      property.reconstruction;

    return `
      <div class="stat-grid">
        <div class="stat-item">
          <span>Need</span>
          <strong>
            ${escapeHtml(reconstruction.need)}
          </strong>
        </div>

        <div class="stat-item">
          <span>Status</span>
          <strong>
            ${escapeHtml(reconstruction.status)}
          </strong>
        </div>

        <div class="stat-item">
          <span>Budget</span>
          <strong>
            ${
              reconstruction.budget
                ? formatCurrency(reconstruction.budget)
                : "—"
            }
          </strong>
        </div>

        <div class="stat-item">
          <span>Committed</span>
          <strong>
            ${
              reconstruction.committed
                ? formatCurrency(reconstruction.committed)
                : "—"
            }
          </strong>
        </div>
      </div>

      <div class="form-actions">
        <a
          class="primary-button"
          href="${reconstructionUrl(property)}"
        >
          Open Reconstruction Center
        </a>
      </div>
    `;
  }


  function renderTransactionRecord(
    property
  ) {
    return `
      <div class="stat-grid">
        <div class="stat-item">
          <span>Qualified buyers</span>
          <strong>
            ${escapeHtml(property.transaction.qualifiedBuyers)}
          </strong>
        </div>

        <div class="stat-item">
          <span>Sealed bids</span>
          <strong>
            ${escapeHtml(property.transaction.sealedBids)}
          </strong>
        </div>

        <div class="stat-item">
          <span>Backup buyers</span>
          <strong>
            ${escapeHtml(property.transaction.backupBuyers)}
          </strong>
        </div>

        <div class="stat-item">
          <span>Status</span>
          <strong>
            ${escapeHtml(property.transaction.status)}
          </strong>
        </div>
      </div>

      <div class="form-actions">
        <a
          class="primary-button"
          href="${exchangeUrl(property)}"
        >
          Open Qualified Exchange
        </a>
      </div>
    `;
  }


  function renderOperationsRecord(
    property
  ) {
    const operations =
      property.operations;

    return `
      <div class="stat-grid">
        <div class="stat-item">
          <span>Status</span>
          <strong>
            ${escapeHtml(operations.status)}
          </strong>
        </div>

        <div class="stat-item">
          <span>Occupancy</span>
          <strong>
            ${escapeHtml(operations.occupancy)}
          </strong>
        </div>

        <div class="stat-item">
          <span>Monthly rent</span>
          <strong>
            ${
              operations.monthlyRent
                ? formatCurrency(operations.monthlyRent)
                : "—"
            }
          </strong>
        </div>

        <div class="stat-item">
          <span>Resale readiness</span>
          <strong>
            ${formatPercent(operations.resaleReadiness)}
          </strong>
        </div>
      </div>

      <div class="form-actions">
        <a
          class="primary-button"
          href="${operationsUrl(property)}"
        >
          Open Operations
        </a>
      </div>
    `;
  }


  /*
    ============================================================
    PUBLIC APPLICATION API
    ============================================================

    Future prototype extensions can use:

      MREO_APP.getCurrentProperty()
      MREO_APP.showNotification(...)
      MREO_APP.fetchLiveProperty(...)
      MREO_APP.createPathwayModel(...)
  */

  window.MREO_APP = {
    state,

    initialize,

    getCurrentProperty,

    getCurrentPropertyId,

    propertyUrl,

    buyerUrl,

    exchangeUrl,

    reconstructionUrl,

    settlementUrl,

    operationsUrl,

    buildZillowSearchUrl,

    buildGoogleMapsUrl,

    fetchLiveProperty,

    buildLivePropertyRecord,

    createPathwayModel,

    formatCurrency,

    formatNumber,

    formatDate,

    showNotification,

    openModal,

    closeModal,

    renderPropertyCard
  };

})();
