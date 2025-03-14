const express = require("express");
const router = express.Router();

// URLs for your frontend and backend sitemaps
const FRONTEND_SITEMAP = "https://glazyspark-creations.vercel.app/sitemap.xml";
const BACKEND_SITEMAP = "https://managing-pandora-glazyspark-696ef4ee.koyeb.app/sitemap.xml";

router.get("/sitemap-index.xml", (req, res) => {
  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <sitemap>
        <loc>${FRONTEND_SITEMAP}</loc> 
     </sitemap>
     <sitemap>
        <loc>${BACKEND_SITEMAP}</loc> 
     </sitemap>
  </sitemapindex>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemapIndex);
});

module.exports = router;
