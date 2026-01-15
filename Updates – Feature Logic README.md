# University Updates – Feature Logic

This document explains how the **University Updates** section in my application works, including how notices are fetched, cached, displayed, and automatically updated without any manual intervention.

---

## 1. Fetching Mechanism (How new notices appear)

I use **Incremental Static Regeneration (ISR)** to fetch university notices from the official MAKAUT API.

- **Data Source (MAKAUT API)**  
  https://makaut1.ucanapply.com/smartexam/public/api/notice-data

- **Trigger**  
  Data is fetched whenever a user visits the `/updates` page.

---

### Revalidation (Cache Duration)

- The updates page is statically cached and revalidated after a fixed interval.

- The revalidation configuration is defined in:

  `src/app/updates/page.tsx`

- **Current Setting**  
  `revalidate: 86400` (1 day = 24hrs)

---

### How ISR Works in Practice

1. User A visits `/updates` → cached data is served instantly.
2. If the cache duration has expired → Next.js fetches fresh data in the background.
3. User B visits shortly after → sees the updated notices.
4. The cache timer resets after revalidation.

This approach ensures:
- Fast page loads
- Controlled API usage
- Automatic updates without server overload

---

## 2. Display Logic

The `UpdatesList` component controls how fetched notices are rendered on the UI.

---

### Pagination (View More / View Less)

To keep the page lightweight and user-friendly:

- **Initial Display**  
  Shows the **latest 6 notices**
- **Maximum Fetch Limit**  
  Fetches up to **12 notices** from the API
- **View More**  
  Expands the list to show all 12 notices
- **View Less**  
  Collapses the list back to 6 notices and smoothly scrolls to the top of the list

---

## 3. Who Updates the Card Details? (Automation Explained)

### No manual updates are required

The entire system is **fully automated**.

---

### End-to-End Flow

1. **MAKAUT Admin** uploads a new notice (PDF) on the official website.
2. **MAKAUT Backend** updates its API with the notice title, date, and file link.
3. **My Application** fetches this data using ISR.
4. **UpdatesList Component** renders the notices as UI cards.

As soon as MAKAUT publishes a notice, my site reflects it automatically after the cache expires.

---

### Data Mapping (API → UI Card)

| UI Element         | API Field      | Description                                    |
| ------------------ | -------------- | ---------------------------------------------- |
| Card Title         | `notice_title` | Notice headline (e.g., “Odd Sem Results 2025”) |
| Date Badge         | `notice_date`  | Published date                                 |
| Read Notice Button | `file_path`    | Direct link to the PDF                         |

---

## 4. Card Conditions (Visual Indicators)

Each notice card has conditional UI behavior based on its position.

| Condition     | Visual Result    | Logic                       |
| ------------- | ---------------- | --------------------------- |
| Top 3 Notices | **NEW Badge**    | `index < 3`                 |
| Hover Effect  | Border Highlight | Subtle border color change  |
| Date Display  | Outlined Badge   | Consistent visual alignment |

**Important:**  
The **NEW badge is position-based**, not date-based.  
Any notice appearing in the top 3 is treated as new.

---

## 5. Summary Flow

1. MAKAUT publishes a new notice.
2. The cache revalidation timer expires.
3. A user visits the `/updates` page.
4. Next.js fetches fresh data from the MAKAUT API.
5. The latest notice appears at the top of the list.
6. Since it is in the top 3, it automatically receives the **NEW** badge.