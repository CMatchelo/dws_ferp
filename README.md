# Blog DWS Test
This project is a responsive blog built with React.

The main goal is to demonstrate **state management**, **component structure**, **responsiveness**, and **best practices in modern React**.

## Features

- Responsive layout
- Filter posts by:
  - Author
  - Category
- Sort posts by:
  - Newest first
  - Oldest first
- Search posts by 
    - Title

## Stacks

- React
- TypeScript
- CSS Modules
- React Hooks

## Filtering and Sorting

- Filters and sorting are computed using `useMemo` to avoid unnecessary recalculations.
- Filtering logic supports:
  - Multiple authors
  - Multiple categories
  - Search by post title
- Sorting supports:
  - By Newest
  - By Oldest

## Observations & Design Decisions

### Fixed dimensions (PX)

Some of the fixed pixel dimensions defined in the original layout in the PDF file specification were intentionally adjusted to better support different screen sizes and resolutions.

This decision was made to:
- Better responsiveness
- Avoid layout breaking on different screens
- Enhance usability

> In a professional environment, any changes in the original design would be discussed and validated with the designers and stakeholders before implementation.

### Sorting by date limitation

The sorting feature is fully implemented and working as expected.

However, as all posts currently share the **same `createdAt`** value, which means that the sorting logic runs correctly, but no visible difference occurs in the UI

## Possible Improvements

- Add real pagination or infinite scrolling
- Improve accessibility (ARIA attributes, keyboard navigation)

## 📦 Installation & Running Locally

```bash
npm install
npm run dev

Then open:
http://localhost:3000
