# ReactJs Form (Non-Redux)
### By: quangpn7
#### Date: 22 - Nov - 2022

## Overview:
- This resository contains a ReactJs App which is builed for student management.
- There are 5 component used for this app:
    - QLSV.jsx (Main component)
    - FormInput.jsx
    - TableFilter.jsx
    - Table.jsx
- There is an image that maps everything in case you want to have a broad scheme of this form app.
- This app uses data from local storage instead of calling from API *(No dummy API could match the required so far.)*
- This document will somehow describe this as project as follow:
    - I. Component
    - II. Validation
    - III. Test case
    - IV. Conclusion
---
# I. Component
## 1. QLSV (Main component)
- Main component of the App. Structuring every child component as in this repository.
- State:
### State:
```Javascript
data: [] // Use for storing data fetching from local storage (or API)
filteredData: []
searchMode: false
update: false
editSv: { id: "", fullName:"",
        phone: "", email: "",}
valid: false
```


          