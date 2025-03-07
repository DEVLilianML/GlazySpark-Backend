const express = require("express");
const app = express();
const blogs = require("./BlogData"); // Now it works because BlogData is in the backend
const router = express.Router();

 
//  Keep your frontend (Vercel) for public blog links
const FRONTEND_URL = "https://glazyspark-creations.vercel.app"; 

router.get("/sitemap.xml", (req, res) => {
  const currentDate = new Date().toISOString().split("T")[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://glazyspark-creations.vercel.app/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
      <lastmod>${currentDate}</lastmod>
    </url>
    <url>
      <loc>https://glazyspark-creations.vercel.app/blog</loc>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
      <lastmod>${currentDate}</lastmod>
    </url>`;

  blogs.forEach((blog) => {
    sitemap += `
    <url>
      <loc>https://glazyspark-creations.vercel.app/blog/${blog.slug}</loc>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
      <lastmod>${currentDate}</lastmod>
    </url>`;
  });

  sitemap += `</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

module.exports = router;
