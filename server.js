// ============================================================
//  Germany Remote Jobs Portal — Express Server
//  10 Lakh (1,000,000) Job Pages | JSON-LD Schema | Sitemaps
// ============================================================

const express = require("express");
const compression = require("compression");
const { TOTAL_JOBS, COMPANIES, JOBS_PER_COMPANY, COUNTRY, getJob } = require("./jobData");

const app = express();
const PORT = process.env.PORT || 3000;
const JOBS_PER_PAGE = 20;
const SITEMAP_CHUNK = 1000;
const TOTAL_SITEMAPS = Math.ceil(TOTAL_JOBS / SITEMAP_CHUNK);
const SITE_NAME = "GermanyJobsHub.de";
const BASE_URL = process.env.BASE_URL || "https://germanyremotejobs-production.up.railway.app";

app.use(compression());
app.use(express.static("public"));

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  const featuredJobs = [];
  for (let i = 1; i <= 12; i++) {
    featuredJobs.push(getJob(i * 83));
  }

  const cards = featuredJobs
    .map(
      (j) => `
    <div class="job-card">
      <div class="company-tag">${j.company}</div>
      <h3><a href="/jobs/${j.id}">${j.title}</a></h3>
      <div class="meta">
        <span class="${j.isRemote ? "remote-badge" : "onsite-badge"}">${j.isRemote ? "🏠 Remote" : "🏢 On-Site"}</span>
        <span class="salary">💰 ${j.salary}</span>
        <span class="location">📍 ${j.city}, DE</span>
      </div>
    </div>`
    )
    .join("");

  const companyLinks = COMPANIES.slice(0, 30)
    .map((c) => `<a href="/company/${encodeURIComponent(c)}" class="company-chip">${c}</a>`)
    .join("");

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="google-site-verification" content="wSin18Y1jaEyj1vhiTPr159TKThSrMp6vyaA9K-ojOU" />
  <meta name="yandex-verification" content="5dc49383f889928c" />
  <title>${SITE_NAME} — Work From Home Jobs Germany 2025 | ${TOTAL_JOBS.toLocaleString()} Jobs</title>
  <meta name="description" content="Find ${TOTAL_JOBS.toLocaleString()} remote and work-from-home jobs in the Germany. Top companies hiring now — Netflix, Amazon, Google, Apple, Delta Airlines and more!"/>
  <meta name="robots" content="index,follow"/>
  <link rel="canonical" href="${BASE_URL}/"/>
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description: `${TOTAL_JOBS.toLocaleString()} Work From Home Jobs in Germany`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/jobs?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  })}</script>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',Arial,sans-serif;background:#f0f4f8;color:#222}
    header{background:linear-gradient(135deg,#000000,#dd0000);color:#fff;padding:40px 20px;text-align:center}
    header h1{font-size:2.2rem;margin-bottom:10px}
    header p{font-size:1.1rem;opacity:.9}
    .stats-bar{background:#fff;display:flex;justify-content:center;gap:40px;padding:18px;border-bottom:2px solid #e8ecf0;flex-wrap:wrap}
    .stat{text-align:center}.stat b{display:block;font-size:1.5rem;color:#dd0000}
    .stat span{font-size:.85rem;color:#666}
    nav{background:#000000;padding:10px 20px;display:flex;gap:15px;flex-wrap:wrap}
    nav a{color:#fff;text-decoration:none;font-size:.95rem;padding:5px 12px;border-radius:4px;transition:background .2s}
    nav a:hover{background:rgba(255,255,255,.2)}
    .container{max-width:1200px;margin:30px auto;padding:0 15px}
    h2{font-size:1.4rem;margin-bottom:20px;color:#dd0000;border-left:4px solid #ffce00;padding-left:12px}
    .jobs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:18px;margin-bottom:40px}
    .job-card{background:#fff;border-radius:10px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,.08);transition:transform .2s,box-shadow .2s;border-top:3px solid #dd0000}
    .job-card:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,0,0,.13)}
    .company-tag{font-size:.78rem;background:#e8f0fe;color:#dd0000;padding:3px 10px;border-radius:20px;display:inline-block;margin-bottom:10px;font-weight:600}
    .job-card h3{font-size:1rem;margin-bottom:12px;line-height:1.4}
    .job-card h3 a{color:#1a1a2e;text-decoration:none}
    .job-card h3 a:hover{color:#dd0000}
    .meta{display:flex;flex-wrap:wrap;gap:8px;font-size:.82rem}
    .remote-badge{background:#d4edda;color:#155724;padding:2px 8px;border-radius:12px}
    .onsite-badge{background:#d1ecf1;color:#0c5460;padding:2px 8px;border-radius:12px}
    .salary{color:#28a745;font-weight:600}
    .location{color:#666}
    .company-cloud{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:40px}
    .company-chip{background:#fff;border:1px solid #000000;color:#dd0000;padding:6px 14px;border-radius:20px;text-decoration:none;font-size:.88rem;transition:all .2s}
    .company-chip:hover{background:#000000;color:#fff}
    .view-all{text-align:center;margin:20px 0 40px}
    .btn{background:#dd0000;color:#fff;padding:12px 30px;border-radius:6px;text-decoration:none;font-size:1rem;font-weight:600;display:inline-block;transition:background .2s}
    .btn:hover{background:#a50e1e}
    .btn-blue{background:#000000}.btn-blue:hover{background:#002d8a}
    footer{background:#1a1a2e;color:#aaa;text-align:center;padding:30px;margin-top:40px}
    footer a{color:#7ba7f7}
    @media(max-width:600px){header h1{font-size:1.5rem}.stats-bar{gap:20px}}
  </style>
</head>
<body>
<header>
  <h1>🇩🇪 Germany Work From Home Jobs</h1>
  <p>${TOTAL_JOBS.toLocaleString()} Remote & Online Jobs | Top International Companies Hiring Now</p>
</header>
<div class="stats-bar">
  <div class="stat"><b>${TOTAL_JOBS.toLocaleString()}</b><span>Total Jobs</span></div>
  <div class="stat"><b>${COMPANIES.length}</b><span>Companies</span></div>
  <div class="stat"><b>100%</b><span>Germany</span></div>
  <div class="stat"><b>€25K–€300K</b><span>Salary Range/mo</span></div>
</div>
<nav>
  <a href="/">🏠 Home</a>
  <a href="/jobs">All Jobs</a>
  <a href="/jobs?type=remote">🏠 Remote Jobs</a>
  <a href="/jobs?type=onsite">🏢 On-Site Jobs</a>
  <a href="/companies">Companies</a>
</nav>
<div class="container">
  <h2>🔥 Featured Jobs</h2>
  <div class="jobs-grid">${cards}</div>
  <div class="view-all"><a href="/jobs" class="btn">View All ${TOTAL_JOBS.toLocaleString()} Jobs →</a></div>

  <h2>🏢 Top Hiring Companies</h2>
  <div class="company-cloud">${companyLinks}</div>
  <div class="view-all"><a href="/companies" class="btn btn-blue">View All ${COMPANIES.length} Companies →</a></div>
</div>
<footer>
  <p>© 2025 ${SITE_NAME} | <a href="/sitemap.xml">Sitemap</a> | <a href="/robots.txt">robots.txt</a></p>
  <p style="margin-top:8px;font-size:.85rem">Work From Home Jobs Germany | Remote Jobs DE | Online Jobs Germany</p>
</footer>
</body>
</html>`);
});

// ─── JOB LISTING PAGE ────────────────────────────────────────────────────────
app.get("/jobs", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const typeFilter = req.query.type; // "remote" | "onsite"
  const start = (page - 1) * JOBS_PER_PAGE + 1;
  const end = Math.min(start + JOBS_PER_PAGE - 1, TOTAL_JOBS);
  const totalPages = Math.ceil(TOTAL_JOBS / JOBS_PER_PAGE);

  const jobs = [];
  for (let i = start; i <= end; i++) {
    const j = getJob(i);
    if (typeFilter === "remote" && !j.isRemote) continue;
    if (typeFilter === "onsite" && j.isRemote) continue;
    jobs.push(j);
  }

  const rows = jobs
    .map(
      (j) => `
    <div class="job-card">
      <div class="company-tag">${j.company}</div>
      <h3><a href="/jobs/${j.id}">${j.title}</a></h3>
      <div class="meta">
        <span class="${j.isRemote ? "remote-badge" : "onsite-badge"}">${j.isRemote ? "🏠 Remote" : "🏢 On-Site"}</span>
        <span class="salary">💰 ${j.salary}</span>
        <span class="location">📍 ${j.city}, Germany</span>
        <span style="color:#888">📅 ${j.datePosted}</span>
      </div>
    </div>`
    )
    .join("");

  const prevLink =
    page > 1 ? `<a href="/jobs?page=${page - 1}${typeFilter ? "&type=" + typeFilter : ""}" class="btn btn-blue">← Prev</a>` : "";
  const nextLink =
    page < totalPages ? `<a href="/jobs?page=${page + 1}${typeFilter ? "&type=" + typeFilter : ""}" class="btn">Next →</a>` : "";

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Work From Home Jobs Germany Page ${page} | ${SITE_NAME}</title>
  <meta name="description" content="Browse ${TOTAL_JOBS.toLocaleString()} work from home and remote jobs in Germany. Page ${page} of ${totalPages}."/>
  <meta name="robots" content="index,follow"/>
  <link rel="canonical" href="${BASE_URL}/jobs?page=${page}"/>
  ${page > 1 ? `<link rel="prev" href="${BASE_URL}/jobs?page=${page - 1}"/>` : ""}
  ${page < totalPages ? `<link rel="next" href="${BASE_URL}/jobs?page=${page + 1}"/>` : ""}
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',Arial,sans-serif;background:#f0f4f8;color:#222}
    header{background:linear-gradient(135deg,#000000,#dd0000);color:#fff;padding:25px 20px;text-align:center}
    header h1{font-size:1.8rem}
    nav{background:#000000;padding:10px 20px;display:flex;gap:15px;flex-wrap:wrap}
    nav a{color:#fff;text-decoration:none;font-size:.95rem;padding:5px 12px;border-radius:4px}
    nav a:hover{background:rgba(255,255,255,.2)}
    .container{max-width:1200px;margin:30px auto;padding:0 15px}
    .filter-bar{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px}
    .filter-bar a{padding:7px 18px;border-radius:20px;text-decoration:none;font-size:.9rem;border:1px solid #000000;color:#dd0000;background:#fff}
    .filter-bar a.active,.filter-bar a:hover{background:#000000;color:#fff}
    .page-info{color:#555;margin-bottom:15px;font-size:.95rem}
    .jobs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:18px;margin-bottom:30px}
    .job-card{background:#fff;border-radius:10px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,.08);border-top:3px solid #dd0000}
    .job-card:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.12);transition:.2s}
    .company-tag{font-size:.78rem;background:#e8f0fe;color:#dd0000;padding:3px 10px;border-radius:20px;display:inline-block;margin-bottom:10px;font-weight:600}
    .job-card h3{font-size:1rem;margin-bottom:12px;line-height:1.4}
    .job-card h3 a{color:#1a1a2e;text-decoration:none}
    .job-card h3 a:hover{color:#dd0000}
    .meta{display:flex;flex-wrap:wrap;gap:8px;font-size:.82rem}
    .remote-badge{background:#d4edda;color:#155724;padding:2px 8px;border-radius:12px}
    .onsite-badge{background:#d1ecf1;color:#0c5460;padding:2px 8px;border-radius:12px}
    .salary{color:#28a745;font-weight:600}
    .pagination{display:flex;justify-content:center;gap:15px;padding:20px 0}
    .btn{background:#dd0000;color:#fff;padding:10px 22px;border-radius:6px;text-decoration:none;font-size:.95rem;font-weight:600}
    .btn-blue{background:#000000}.btn:hover{opacity:.9}
    footer{background:#1a1a2e;color:#aaa;text-align:center;padding:25px}
    footer a{color:#7ba7f7}
  </style>
</head>
<body>
<header><h1>🇩🇪 Germany Remote Jobs — All Listings</h1></header>
<nav>
  <a href="/">🏠 Home</a>
  <a href="/jobs">All Jobs</a>
  <a href="/jobs?type=remote">🏠 Remote</a>
  <a href="/jobs?type=onsite">🏢 On-Site</a>
  <a href="/companies">Companies</a>
</nav>
<div class="container">
  <div class="filter-bar">
    <a href="/jobs" class="${!typeFilter ? "active" : ""}">All Jobs</a>
    <a href="/jobs?type=remote" class="${typeFilter === "remote" ? "active" : ""}">🏠 Remote Only</a>
    <a href="/jobs?type=onsite" class="${typeFilter === "onsite" ? "active" : ""}">🏢 On-Site Only</a>
  </div>
  <p class="page-info">Showing jobs ${start.toLocaleString()} – ${end.toLocaleString()} of <strong>${TOTAL_JOBS.toLocaleString()}</strong> | Page <strong>${page}</strong> of <strong>${totalPages.toLocaleString()}</strong></p>
  <div class="jobs-grid">${rows}</div>
  <div class="pagination">${prevLink}${nextLink}</div>
</div>
<footer><p>© 2025 ${SITE_NAME} | <a href="/sitemap.xml">Sitemap</a></p></footer>
</body>
</html>`);
});

// ─── SINGLE JOB PAGE ─────────────────────────────────────────────────────────
app.get("/jobs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const job = getJob(id);
  if (!job) return res.status(404).send("<h1>Job Not Found</h1>");

  const descHtml = job.description
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${job.title} | ${SITE_NAME}</title>
  <meta name="description" content="Apply now: ${job.title} at ${job.company}. Salary: ${job.salary}. Location: ${job.location}. Work from home job in the Germany."/>
  <meta name="robots" content="index,follow"/>
  <link rel="canonical" href="${BASE_URL}/jobs/${id}"/>
  <meta property="og:title" content="${job.title}"/>
  <meta property="og:description" content="Apply for ${job.title} at ${job.company}. ${job.salary}. Germany remote job."/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="${BASE_URL}/jobs/${id}"/>
  <script type="application/ld+json">${JSON.stringify(job.schema, null, 2)}</script>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',Arial,sans-serif;background:#f0f4f8;color:#222}
    header{background:linear-gradient(135deg,#000000,#dd0000);color:#fff;padding:20px;text-align:center}
    header a{color:#fff;text-decoration:none;font-size:.9rem;opacity:.85}
    nav{background:#000000;padding:10px 20px;display:flex;gap:15px;flex-wrap:wrap}
    nav a{color:#fff;text-decoration:none;font-size:.95rem;padding:5px 12px;border-radius:4px}
    nav a:hover{background:rgba(255,255,255,.2)}
    .container{max-width:900px;margin:30px auto;padding:0 15px}
    .job-header{background:#fff;border-radius:12px;padding:30px;box-shadow:0 2px 12px rgba(0,0,0,.09);margin-bottom:25px;border-top:4px solid #000000}
    .company-tag{font-size:.85rem;background:#e8f0fe;color:#dd0000;padding:5px 15px;border-radius:20px;display:inline-block;margin-bottom:15px;font-weight:700}
    .job-header h1{font-size:1.5rem;line-height:1.3;margin-bottom:15px;color:#1a1a2e}
    .badges{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:20px}
    .badge{padding:5px 14px;border-radius:20px;font-size:.88rem;font-weight:600}
    .badge-remote{background:#d4edda;color:#155724}
    .badge-onsite{background:#d1ecf1;color:#0c5460}
    .badge-salary{background:#fff3cd;color:#856404}
    .badge-type{background:#f3e8ff;color:#5b21b6}
    .badge-ph{background:#fde8e8;color:#dd0000}
    .info-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:15px;margin-bottom:20px}
    .info-item{background:#f8f9fa;padding:12px;border-radius:8px}
    .info-item label{font-size:.78rem;color:#666;display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px}
    .info-item span{font-weight:600;color:#1a1a2e}
    .apply-box{background:linear-gradient(135deg,#000000,#dd0000);border-radius:10px;padding:25px;text-align:center;margin-bottom:25px}
    .apply-box h3{color:#fff;font-size:1.2rem;margin-bottom:5px}
    .apply-box p{color:rgba(255,255,255,.85);margin-bottom:20px;font-size:.95rem}
    .btn-apply{background:#fff;color:#dd0000;padding:14px 40px;border-radius:8px;text-decoration:none;font-size:1rem;font-weight:700;display:inline-block;cursor:pointer;border:none;transition:.2s}
    .btn-apply:hover{background:#f0f4f8;transform:scale(1.03)}
    .job-desc{background:#fff;border-radius:12px;padding:30px;box-shadow:0 2px 12px rgba(0,0,0,.09);margin-bottom:25px;line-height:1.7}
    .job-desc h2{font-size:1.2rem;margin-bottom:20px;color:#dd0000;border-bottom:2px solid #e8f0fe;padding-bottom:10px}

    .nav-jobs{display:flex;justify-content:space-between;margin-bottom:30px}
    .btn-nav{background:#000000;color:#fff;padding:8px 20px;border-radius:6px;text-decoration:none;font-size:.9rem}
    .btn-nav:hover{background:#002d8a}
    footer{background:#1a1a2e;color:#aaa;text-align:center;padding:25px}
    footer a{color:#7ba7f7}

  </style>
</head>
<body>
<header><a href="/">← Back to ${SITE_NAME}</a></header>
<nav>
  <a href="/">🏠 Home</a>
  <a href="/jobs">All Jobs</a>
  <a href="/jobs?type=remote">🏠 Remote</a>
  <a href="/company/${encodeURIComponent(job.company)}">${job.company} Jobs</a>
</nav>
<div class="container">
  <div class="job-header">
    <div class="company-tag">🏢 ${job.company}</div>
    <h1>${job.title}</h1>
    <div class="badges">
      <span class="badge ${job.isRemote ? "badge-remote" : "badge-onsite"}">${job.isRemote ? "🏠 Work From Home" : "🏢 On-Site"}</span>
      <span class="badge badge-salary">💰 ${job.salary}</span>
      <span class="badge badge-type">⏰ ${job.jobType.replace("_", " ")}</span>
      <span class="badge badge-ph">🇩🇪 Germany</span>
    </div>
    <div class="info-grid">
      <div class="info-item"><label>Company</label><span>${job.company}</span></div>
      <div class="info-item"><label>Location</label><span>${job.location}</span></div>
      <div class="info-item"><label>Salary</label><span>${job.salary}</span></div>
      <div class="info-item"><label>Date Posted</label><span>${job.datePosted}</span></div>
      <div class="info-item"><label>Valid Through</label><span>${job.validThrough}</span></div>
      <div class="info-item"><label>Job Type</label><span>${job.jobType.replace("_", " ")}</span></div>
    </div>
  </div>

  <div class="apply-box">
    <h3>🚀 Ready to Apply?</h3>
    <p>Join ${job.company} and start your remote career in the Germany today!</p>
    <a class="btn-apply" href="https://remotejob09.job4intern.com/pages/job-application" target="_blank" rel="noopener">✅ Apply Now — It's Free</a>
  </div>

  <div class="job-desc">
    <h2>📋 Job Description</h2>
    <div>${descHtml}</div>
  </div>

  <div class="nav-jobs">
    ${id > 1 ? `<a href="/jobs/${id - 1}" class="btn-nav">← Previous Job</a>` : "<span></span>"}
    ${id < TOTAL_JOBS ? `<a href="/jobs/${id + 1}" class="btn-nav">Next Job →</a>` : "<span></span>"}
  </div>
</div>



<footer><p>© 2025 ${SITE_NAME} | <a href="/sitemap.xml">Sitemap</a> | <a href="/robots.txt">robots.txt</a></p></footer>

</body>
</html>`);
});

// ─── COMPANY PAGE ─────────────────────────────────────────────────────────────
app.get("/company/:name", (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const { COMPANIES } = require("./jobData");
  const compIdx = COMPANIES.findIndex((c) => c.toLowerCase() === name.toLowerCase());
  if (compIdx === -1) return res.status(404).send("<h1>Company Not Found</h1>");

  const company = COMPANIES[compIdx];
  const start = compIdx * JOBS_PER_COMPANY + 1;
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const pageStart = start + (page - 1) * JOBS_PER_PAGE;
  const pageEnd = Math.min(pageStart + JOBS_PER_PAGE - 1, start + JOBS_PER_COMPANY - 1);
  const totalPages = Math.ceil(JOBS_PER_COMPANY / JOBS_PER_PAGE);

  const jobs = [];
  for (let i = pageStart; i <= pageEnd; i++) {
    jobs.push(getJob(i));
  }

  const rows = jobs
    .map(
      (j) => `
    <div class="job-card">
      <h3><a href="/jobs/${j.id}">${j.title}</a></h3>
      <div class="meta">
        <span class="${j.isRemote ? "remote-badge" : "onsite-badge"}">${j.isRemote ? "🏠 Remote" : "🏢 On-Site"}</span>
        <span class="salary">💰 ${j.salary}</span>
        <span>📍 ${j.city}, DE</span>
      </div>
    </div>`
    )
    .join("");

  const prevLink = page > 1 ? `<a href="/company/${encodeURIComponent(company)}?page=${page - 1}" class="btn btn-blue">← Prev</a>` : "";
  const nextLink =
    page < totalPages ? `<a href="/company/${encodeURIComponent(company)}?page=${page + 1}" class="btn">Next →</a>` : "";

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${company} Work From Home Jobs Germany 2025 | ${SITE_NAME}</title>
  <meta name="description" content="Browse ${JOBS_PER_COMPANY.toLocaleString()} remote jobs at ${company} for Germany applicants. Work from home, competitive salary, apply now!"/>
  <meta name="robots" content="index,follow"/>
  <link rel="canonical" href="${BASE_URL}/company/${encodeURIComponent(company)}"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',Arial,sans-serif;background:#f0f4f8;color:#222}
    header{background:linear-gradient(135deg,#000000,#dd0000);color:#fff;padding:30px 20px;text-align:center}
    nav{background:#000000;padding:10px 20px;display:flex;gap:15px;flex-wrap:wrap}
    nav a{color:#fff;text-decoration:none;font-size:.95rem;padding:5px 12px;border-radius:4px}
    nav a:hover{background:rgba(255,255,255,.2)}
    .container{max-width:1100px;margin:30px auto;padding:0 15px}
    .page-info{margin-bottom:15px;color:#555}
    .jobs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;margin-bottom:25px}
    .job-card{background:#fff;border-radius:10px;padding:18px;box-shadow:0 2px 8px rgba(0,0,0,.08);border-top:3px solid #dd0000}
    .job-card h3{font-size:.98rem;margin-bottom:10px;line-height:1.4}
    .job-card h3 a{color:#1a1a2e;text-decoration:none}.job-card h3 a:hover{color:#dd0000}
    .meta{display:flex;flex-wrap:wrap;gap:8px;font-size:.82rem}
    .remote-badge{background:#d4edda;color:#155724;padding:2px 8px;border-radius:12px}
    .onsite-badge{background:#d1ecf1;color:#0c5460;padding:2px 8px;border-radius:12px}
    .salary{color:#28a745;font-weight:600}
    .pagination{display:flex;justify-content:center;gap:15px;padding:20px 0}
    .btn{background:#dd0000;color:#fff;padding:10px 22px;border-radius:6px;text-decoration:none;font-size:.95rem;font-weight:600}
    .btn-blue{background:#000000}.btn:hover{opacity:.9}
    footer{background:#1a1a2e;color:#aaa;text-align:center;padding:25px}
    footer a{color:#7ba7f7}
  </style>
</head>
<body>
<header>
  <h1>🇩🇪 ${company} — Germany Work From Home Jobs</h1>
  <p>${JOBS_PER_COMPANY.toLocaleString()} Jobs Available | Apply Today</p>
</header>
<nav>
  <a href="/">🏠 Home</a>
  <a href="/jobs">All Jobs</a>
  <a href="/companies">All Companies</a>
</nav>
<div class="container">
  <p class="page-info">Page <strong>${page}</strong> of <strong>${totalPages}</strong> — Showing ${JOBS_PER_COMPANY.toLocaleString()} ${company} jobs for Germany</p>
  <div class="jobs-grid">${rows}</div>
  <div class="pagination">${prevLink}${nextLink}</div>
</div>
<footer><p>© 2025 ${SITE_NAME}</p></footer>
</body>
</html>`);
});

// ─── ALL COMPANIES PAGE ───────────────────────────────────────────────────────
app.get("/companies", (req, res) => {
  const { COMPANIES } = require("./jobData");
  const companyCards = COMPANIES.map(
    (c) => `<a href="/company/${encodeURIComponent(c)}" class="company-card">
    <div class="cname">${c}</div>
    <div class="cjobs">1,000 Jobs</div>
  </a>`
  ).join("");

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>All Companies Hiring in Germany | ${SITE_NAME}</title>
  <meta name="description" content="${COMPANIES.length} top international companies hiring remote workers from Germany. Browse ${TOTAL_JOBS.toLocaleString()} jobs."/>
  <meta name="robots" content="index,follow"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',Arial,sans-serif;background:#f0f4f8;color:#222}
    header{background:linear-gradient(135deg,#000000,#dd0000);color:#fff;padding:30px;text-align:center}
    nav{background:#000000;padding:10px 20px;display:flex;gap:15px;flex-wrap:wrap}
    nav a{color:#fff;text-decoration:none;font-size:.95rem;padding:5px 12px;border-radius:4px}
    nav a:hover{background:rgba(255,255,255,.2)}
    .container{max-width:1200px;margin:30px auto;padding:0 15px}
    .companies-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}
    .company-card{background:#fff;border-radius:10px;padding:18px;box-shadow:0 2px 8px rgba(0,0,0,.08);text-decoration:none;border-top:3px solid #dd0000;transition:.2s;display:block}
    .company-card:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.13)}
    .cname{font-weight:700;color:#1a1a2e;margin-bottom:5px}
    .cjobs{color:#dd0000;font-size:.85rem;font-weight:600}
    h2{font-size:1.3rem;margin-bottom:20px;color:#dd0000;border-left:4px solid #ffce00;padding-left:12px}
    footer{background:#1a1a2e;color:#aaa;text-align:center;padding:25px;margin-top:40px}
    footer a{color:#7ba7f7}
  </style>
</head>
<body>
<header>
  <h1>🇩🇪 All Companies Hiring in Germany</h1>
  <p>${COMPANIES.length} Companies | ${TOTAL_JOBS.toLocaleString()} Total Jobs</p>
</header>
<nav>
  <a href="/">🏠 Home</a>
  <a href="/jobs">All Jobs</a>
</nav>
<div class="container">
  <h2>Top International Companies Hiring Germans (Work From Home)</h2>
  <div class="companies-grid">${companyCards}</div>
</div>
<footer><p>© 2025 ${SITE_NAME} | <a href="/sitemap.xml">Sitemap</a></p></footer>
</body>
</html>`);
});

// ─── API ENDPOINTS ────────────────────────────────────────────────────────────
app.get("/api/jobs", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 20);
  const start = (page - 1) * limit + 1;
  const end = Math.min(start + limit - 1, TOTAL_JOBS);
  const jobs = [];
  for (let i = start; i <= end; i++) {
    const j = getJob(i);
    jobs.push({ id: j.id, title: j.title, company: j.company, salary: j.salary, location: j.location, isRemote: j.isRemote, datePosted: j.datePosted });
  }
  res.json({ total: TOTAL_JOBS, page, limit, count: jobs.length, jobs });
});

app.get("/api/jobs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const job = getJob(id);
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json({ ...job });
});

// ─── ROBOTS.TXT ──────────────────────────────────────────────────────────────
app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(`User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap-companies.xml
`);
});

// ─── SITEMAP INDEX ────────────────────────────────────────────────────────────
app.get("/sitemap.xml", (req, res) => {
  const sitemaps = [];
  for (let i = 1; i <= TOTAL_SITEMAPS; i++) {
    sitemaps.push(`  <sitemap>
    <loc>${BASE_URL}/sitemap-${i}.xml</loc>
    <lastmod>2025-06-01</lastmod>
  </sitemap>`);
  }
  res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.join("\n")}
  <sitemap>
    <loc>${BASE_URL}/sitemap-companies.xml</loc>
    <lastmod>2025-06-01</lastmod>
  </sitemap>
</sitemapindex>`);
});

// ─── SITEMAP CHUNKS ───────────────────────────────────────────────────────────
app.get("/sitemap-:num.xml", (req, res) => {
  const num = parseInt(req.params.num);
  if (isNaN(num) || num < 1 || num > TOTAL_SITEMAPS) return res.status(404).send("Not found");
  const start = (num - 1) * SITEMAP_CHUNK + 1;
  const end = Math.min(start + SITEMAP_CHUNK - 1, TOTAL_JOBS);
  const urls = [];
  for (let i = start; i <= end; i++) {
    urls.push(`  <url>
    <loc>${BASE_URL}/jobs/${i}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }
  res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`);
});

// ─── COMPANIES SITEMAP ────────────────────────────────────────────────────────
app.get("/sitemap-companies.xml", (req, res) => {
  const { COMPANIES } = require("./jobData");
  const urls = COMPANIES.map(
    (c) => `  <url>
    <loc>${BASE_URL}/company/${encodeURIComponent(c)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join("\n");
  res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE_URL}/</loc><priority>1.0</priority></url>
  <url><loc>${BASE_URL}/jobs</loc><priority>0.9</priority></url>
  <url><loc>${BASE_URL}/companies</loc><priority>0.9</priority></url>
${urls}
</urlset>`);
});

// ─── START ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🇩🇪 Germany Remote Jobs Portal running on http://localhost:${PORT}`);
  console.log(`📊 Total Jobs: ${TOTAL_JOBS.toLocaleString()}`);
  console.log(`🏢 Companies: ${COMPANIES.length}`);
  console.log(`📄 Sitemaps: ${TOTAL_SITEMAPS}`);
});
