# RFC 01 — Technical Stack Discussion for TechStore Web App

**Status:** Proposed  
**Author:** Carlos  
**Related Document:** Design Doc — TechStore (Product Requirements)  
**Purpose:** Define the technical decisions required for implementing the next phase of the project.

---

## 1. Context

The Design Doc described the functional requirements of the system without including any technical details.  
This RFC is therefore necessary to discuss and document decisions related to:

- Authentication  
- Frontend hosting  
- Backend hosting  
- Cloud database provider   

This RFC centralizes all open questions so the team can debate and make well-informed decisions.

---

## 2. Pending Decisions

Below is the list of all technical decisions that have not yet been defined.

---

### 2.1 Authentication

Which authentication method should be used in TechStore?

**Options to Evaluate**
- Auth0  
- Custom authentication (JWT)  
- Firebase Auth  
- Supabase Auth  
- Other (to be proposed by reviewers)

**Team Comments**
*(reviewers should add comments here)*

**✔️ Final Decision**
*(to be defined)*

---

### 2.2 Frontend Hosting
 
Where should the application's frontend be deployed?

**Options**
- Vercel  
- Netlify  
- GitHub Pages (static)  
- AWS S3 + CloudFront  
- Render (static services)  
- Other (to be proposed)

**Team Comments**

**✔️ Final Decision**
*(to be defined)*

---

### 2.3 Backend Hosting
 
Which platform should be used to run TechStore’s backend?

**Options**
- Render  
- Railway  
- Fly.io  
- AWS EC2 / Lambda  
- DigitalOcean App Platform  
- Other (to be proposed)

**Team Comments**

**✔️ Final Decision**
*(to be defined)*

---

### 2.4 Cloud Database Provider

Which cloud database provider will we use?

**Options**
- PlanetScale (MySQL)  
- Railway  
- Aiven  
- Other (to be proposed)

**Team Comments**

**✔️ Final Decision**
*(to be defined)*

---

## 3. Conclusion

This RFC serves as a living document throughout the technical discussion phase.  
The team must review, propose, comment, and agree on decisions before implementation begins.  
