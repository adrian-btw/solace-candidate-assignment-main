Further TODOs:

Backend:

- Make the DB query accept filter parameters so that filtering can be truly server-side.
- Support more granularity of search criteria. E.g., location should probably be a dropdown that I choose from, I shouldn't have to type "New York".
- Similarly, have checkboxes for specialties instead of doing text-based search. These specialties look like they're a finite set of enums, so the schema should probably normalize some enum value <-> string relation for faster lookup

Frontend:

- Add debouncing on the text box when hooking up to this server-side filtering API
- Have the UI highlight parts of the text that match the filter criteria, and/or highlight the specialty badges in a different color if they match.
- Give the specialty badges tooltips when they're truncated, and the "+ N more" badges should have the option to show all.
- Maybe combine the first name / last name / degree columns into a single column that is more aesthetically pleasing.