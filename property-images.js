/* =========================================================
   MREO CANONICAL PROPERTY IMAGES

   Purpose:
   The image shown on Browse Properties becomes the
   authoritative image for that fictional property.

   property.html and visual.html can then request that same
   image instead of maintaining separate image URLs.
   ========================================================= */

(() => {
  "use strict";


  /* =======================================================
     STORAGE
     ======================================================= */

  const STORAGE_KEY =
    "mreo-canonical-property-images-v1";


  let imageCache =
    loadStoredImages();


  let primePromise =
    null;


  /* =======================================================
     NORMALIZE PROPERTY ID
     ======================================================= */

  function normalizePropertyId(
    propertyId
  ) {

    if (
      propertyId === null ||
      propertyId === undefined
    ) {

      return "";

    }


    return String(propertyId)
      .trim()
      .toUpperCase();

  }


  /* =======================================================
     NORMALIZE IMAGE URL
     ======================================================= */

  function normalizeImageUrl(
    imageUrl,
    baseUrl = document.baseURI
  ) {

    if (
      !imageUrl ||
      typeof imageUrl !== "string"
    ) {

      return null;

    }


    const trimmed =
      imageUrl.trim();


    if (!trimmed) {
      return null;
    }


    try {

      return new URL(
        trimmed,
        baseUrl
      ).href;

    } catch (error) {

      console.warn(
        "Could not normalize property image URL:",
        trimmed,
        error
      );


      return trimmed;

    }

  }


  /* =======================================================
     LOAD SAVED IMAGE MAP
     ======================================================= */

  function loadStoredImages() {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );


      if (!saved) {
        return {};
      }


      const parsed =
        JSON.parse(saved);


      if (
        !parsed ||
        typeof parsed !== "object" ||
        Array.isArray(parsed)
      ) {

        return {};

      }


      return parsed;

    } catch (error) {

      console.warn(
        "Could not restore canonical property images:",
        error
      );


      return {};

    }

  }


  /* =======================================================
     SAVE IMAGE MAP
     ======================================================= */

  function saveImages() {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          imageCache
        )
      );

    } catch (error) {

      console.warn(
        "Could not save canonical property images:",
        error
      );

    }

  }


  /* =======================================================
     REMEMBER ONE PROPERTY IMAGE
     ======================================================= */

  function remember(
    propertyId,
    imageUrl,
    options = {}
  ) {

    const id =
      normalizePropertyId(
        propertyId
      );


    if (!id) {
      return null;
    }


    const normalizedUrl =
      normalizeImageUrl(
        imageUrl,
        options.baseUrl
      );


    if (!normalizedUrl) {
      return null;
    }


    /*
      Browse Properties is the authority.

      overwrite defaults to true because if the Browse page
      is later changed to a new picture, that new picture
      should replace the older cached version.
    */

    const overwrite =
      options.overwrite !== false;


    if (
      !imageCache[id] ||
      overwrite
    ) {

      imageCache[id] =
        normalizedUrl;


      saveImages();

    }


    return imageCache[id];

  }


  /* =======================================================
     GET CACHED IMAGE SYNCHRONOUSLY
     ======================================================= */

  function getSync(
    propertyId
  ) {

    const id =
      normalizePropertyId(
        propertyId
      );


    if (!id) {
      return null;
    }


    return (
      imageCache[id] ||
      null
    );

  }


  /* =======================================================
     EXTRACT PROPERTY ID FROM LINK
     ======================================================= */

  function getPropertyIdFromHref(
    href,
    baseUrl = document.baseURI
  ) {

    if (!href) {
      return null;
    }


    try {

      const url =
        new URL(
          href,
          baseUrl
        );


      return normalizePropertyId(
        url.searchParams.get(
          "id"
        )
      );

    } catch (error) {

      return null;

    }

  }


  /* =======================================================
     SCAN A DOCUMENT FOR PROPERTY CARDS
     ======================================================= */

  function captureImagesFromDocument(
    sourceDocument,
    baseUrl = document.baseURI
  ) {

    if (!sourceDocument) {
      return 0;
    }


    let captured =
      0;


    /*
      First look for normal property-card structures.
    */

    const propertyCards =
      sourceDocument.querySelectorAll(
        ".property-card"
      );


    propertyCards.forEach(
      card => {

        let propertyLink =
          null;


        /*
          The card itself may be the link.
        */

        if (
          card.matches &&
          card.matches(
            "a[href]"
          )
        ) {

          propertyLink =
            card;

        } else {

          propertyLink =
            card.querySelector(
              'a[href*="property.html"]'
            );

        }


        if (!propertyLink) {

          /*
            Some card structures may have the link outside
            or nested differently.
          */

          const parentLink =
            card.closest &&
            card.closest(
              'a[href*="property.html"]'
            );


          if (parentLink) {

            propertyLink =
              parentLink;

          }

        }


        if (!propertyLink) {
          return;
        }


        const propertyId =
          getPropertyIdFromHref(
            propertyLink.getAttribute(
              "href"
            ),
            baseUrl
          );


        if (!propertyId) {
          return;
        }


        let image =
          card.querySelector(
            "img"
          );


        if (
          !image &&
          propertyLink.querySelector
        ) {

          image =
            propertyLink.querySelector(
              "img"
            );

        }


        if (!image) {
          return;
        }


        const imageSource =
          image.getAttribute(
            "src"
          ) ||
          image.getAttribute(
            "data-src"
          );


        if (!imageSource) {
          return;
        }


        remember(
          propertyId,
          imageSource,
          {
            baseUrl,
            overwrite: true
          }
        );


        captured += 1;

      }
    );


    /*
      Secondary pass.

      This handles links that contain an image but do not
      use the .property-card class.
    */

    const propertyLinks =
      sourceDocument.querySelectorAll(
        'a[href*="property.html"]'
      );


    propertyLinks.forEach(
      link => {

        const propertyId =
          getPropertyIdFromHref(
            link.getAttribute(
              "href"
            ),
            baseUrl
          );


        if (!propertyId) {
          return;
        }


        /*
          Don't recapture an ID we already found unless
          this link actually contains an image.
        */

        let image =
          link.querySelector(
            "img"
          );


        if (!image) {

          const possibleCard =
            link.closest(
              ".property-card"
            );


          if (possibleCard) {

            image =
              possibleCard.querySelector(
                "img"
              );

          }

        }


        if (!image) {
          return;
        }


        const imageSource =
          image.getAttribute(
            "src"
          ) ||
          image.getAttribute(
            "data-src"
          );


        if (!imageSource) {
          return;
        }


        remember(
          propertyId,
          imageSource,
          {
            baseUrl,
            overwrite: true
          }
        );

      }
    );


    return captured;

  }


  /* =======================================================
     FETCH ONE BROWSE PAGE
     ======================================================= */

  async function captureImagesFromPage(
    pageUrl
  ) {

    const absolutePageUrl =
      new URL(
        pageUrl,
        document.baseURI
      ).href;


    const response =
      await fetch(
        absolutePageUrl,
        {
          method: "GET",

          /*
            We want the currently deployed Browse page rather
            than depending on an older browser cache.
          */

          cache: "no-store",

          headers: {
            "Accept": "text/html"
          }
        }
      );


    if (!response.ok) {

      throw new Error(
        `Could not read ${pageUrl}: HTTP ${response.status}`
      );

    }


    const html =
      await response.text();


    const parser =
      new DOMParser();


    const parsedDocument =
      parser.parseFromString(
        html,
        "text/html"
      );


    return captureImagesFromDocument(
      parsedDocument,
      absolutePageUrl
    );

  }


  /* =======================================================
     PRIME IMAGE MAP FROM BOTH BROWSE PAGES
     ======================================================= */

  async function prime() {

    if (primePromise) {
      return primePromise;
    }


    primePromise =
      (async () => {

        /*
          If this script happens to be loaded on a Browse
          Properties page, capture those visible images first.
        */

        captureImagesFromDocument(
          document,
          document.baseURI
        );


        const results =
          await Promise.allSettled([
            captureImagesFromPage(
              "properties.html"
            ),

            captureImagesFromPage(
              "properties-more.html"
            )
          ]);


        results.forEach(
          result => {

            if (
              result.status ===
              "rejected"
            ) {

              console.warn(
                "Could not refresh one Browse Properties image source:",
                result.reason
              );

            }

          }
        );


        saveImages();


        return {
          ...imageCache
        };

      })();


    try {

      return await primePromise;

    } finally {

      /*
        Allow a later refresh if the function is deliberately
        called again after page content changes.
      */

      primePromise =
        null;

    }

  }


  /* =======================================================
     GET CANONICAL IMAGE
     ======================================================= */

  async function get(
    propertyId,
    fallbackImage = null
  ) {

    const id =
      normalizePropertyId(
        propertyId
      );


    if (!id) {

      return normalizeImageUrl(
        fallbackImage
      );

    }


    /*
      First use the locally remembered Browse image.
    */

    const cached =
      getSync(id);


    if (cached) {
      return cached;
    }


    /*
      If this is a direct property URL and the user has never
      visited Browse Properties, fetch the two Browse pages
      automatically and discover the authoritative image.
    */

    try {

      await prime();

    } catch (error) {

      console.warn(
        "Could not prime canonical property images:",
        error
      );

    }


    const discovered =
      getSync(id);


    if (discovered) {
      return discovered;
    }


    /*
      Only use the detail-page fallback if for some reason
      neither Browse Properties page contains the ID.

      We intentionally DO NOT save this fallback as canonical,
      because Browse Properties remains the source of truth.
    */

    return normalizeImageUrl(
      fallbackImage
    );

  }


  /* =======================================================
     APPLY IMAGE DIRECTLY TO AN IMG ELEMENT
     ======================================================= */

  async function apply(
    imageElement,
    propertyId,
    fallbackImage = null
  ) {

    if (!imageElement) {
      return null;
    }


    const canonicalImage =
      await get(
        propertyId,
        fallbackImage
      );


    if (!canonicalImage) {
      return null;
    }


    imageElement.src =
      canonicalImage;


    imageElement.dataset.mreoPropertyId =
      normalizePropertyId(
        propertyId
      );


    imageElement.dataset.mreoCanonicalImage =
      "true";


    return canonicalImage;

  }


  /* =======================================================
     REFRESH

     Useful if Browse Properties images are changed later.
     ======================================================= */

  async function refresh() {

    imageCache =
      {};


    try {

      localStorage.removeItem(
        STORAGE_KEY
      );

    } catch (error) {

      console.warn(
        "Could not clear old canonical images:",
        error
      );

    }


    return prime();

  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.MREO_IMAGES = {

    get,

    getSync,

    apply,

    remember,

    prime,

    refresh,

    captureImagesFromDocument,

    getPropertyIdFromHref

  };


  /* =======================================================
     AUTOMATIC CAPTURE

     If this script is ever included on properties.html or
     properties-more.html, it automatically records every
     image shown there.
     ======================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      () => {

        captureImagesFromDocument(
          document,
          document.baseURI
        );

      }
    );

  } else {

    captureImagesFromDocument(
      document,
      document.baseURI
    );

  }

})();
