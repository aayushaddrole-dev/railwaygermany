# 🇵🇭 PhilippinesJobsHub — 10 Lakh (1,000,000) Job Portal

A full job portal with **1,000,000 individual job pages** targeting Philippines — remote & on-site jobs across 100+ top international companies.

## Features

- ✅ **1,000,000 unique job pages** (`/jobs/1` → `/jobs/1000000`)
- ✅ **Philippines JSON-LD schema** on every single job page (SEO-ready)
- ✅ **applicantLocationRequirements** set to Philippines on every job
- ✅ **100+ companies** × 1,000 jobs each = 1,000,000 total
- ✅ Long, keyword-rich job titles (Netflix, Delta, Google, Tesla, etc.)
- ✅ Philippine cities (Manila, Cebu, Davao, Quezon City, Makati...)
- ✅ Salary in PHP (₱25,000 – ₱300,000/month)
- ✅ Company pages (`/company/Netflix`, `/company/Google`, etc.)
- ✅ XML Sitemaps (1,000 sitemap files, 1,000 URLs each)
- ✅ robots.txt
- ✅ Pagination (20 jobs/page)
- ✅ Apply Now modal form
- ✅ REST API (`/api/jobs`, `/api/jobs/:id`)
- ✅ Zero database needed — all data generated deterministically
- ✅ Gzip compression — fast on Railway free tier

## Companies Included (100+)

Netflix, Delta Airlines, Southwest Airlines, American Airlines, Tesla, Apple, Amazon, Google, Disney, United Airlines, Wayfair, Starbucks, Walmart, American Express, Walgreens, CostCo, Wells Fargo, Aetna, Twitter, PepsiCo, Spirit Airlines, CVS, Hobby Lobby, Home Depot, Target, Yelp, Crocs, Xbox, Dell, Anthem, Sam's Club, LabCorp, TTEC, Polaris, UCHealth, Smith and Wesson, Hulu, NDT, CrunchyRoll, Eddie Bauer, USPC, JetBlue Airlines, UPS, Chewy, Alaska Airlines, Allegiant Air, Avelo Airlines, Breeze Airways, Eastern Airlines, Frontier Airlines, Hawaiian Airlines, Sun Country Airlines + 50 more.

## JSON-LD Schema (Philippines)

Every job page includes:

```json
{
  "@context": "https://schema.org/",
  "@type": "JobPosting",
  "title": "Netflix Remote Jobs (Work From Home) 25,000 To 35,000",
  "applicantLocationRequirements": [
    {
      "@type": "Country",
      "name": "Philippines",
      "sameAs": "https://en.wikipedia.org/wiki/Philippines"
    }
  ],
  "jobLocation": {
    "@type": "Place",
    "address": { "addressCountry": "PH" }
  },
  "jobLocationType": "TELECOMMUTE",
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "PHP",
    "value": { "minValue": 25000, "maxValue": 35000, "unitText": "MONTH" }
  }
}
```

## Deploy to Railway

### Option 1: GitHub (Recommended)

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app)
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. Railway auto-detects Node.js and deploys!
6. Go to **Settings** → **Domains** → Generate domain

### Option 2: Railway CLI

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Local Development

```bash
npm install
npm start
# Open http://localhost:3000
```

## URL Structure

| URL | Description |
|-----|-------------|
| `/` | Home page with featured jobs |
| `/jobs` | All jobs (paginated, 20/page) |
| `/jobs?type=remote` | Remote jobs only |
| `/jobs?type=onsite` | On-site jobs only |
| `/jobs/:id` | Individual job page (1–1,000,000) |
| `/company/:name` | All jobs from one company |
| `/companies` | All 100+ companies |
| `/api/jobs` | JSON API |
| `/api/jobs/:id` | Single job + schema |
| `/sitemap.xml` | Sitemap index |
| `/sitemap-1.xml` | Jobs 1–1,000 |
| `/robots.txt` | robots.txt |

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Data**: Deterministic generation (no database, no storage)
- **Deploy**: Railway (free tier works!)
- **Memory**: ~50MB RAM
