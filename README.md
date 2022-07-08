# SQLBook

## The Top SQL list and tuning history management service

## Todo

### client

- [x] add PLAN_HASH_VALUE to top-sql
- [x] get SQL_ID, PLAN_HASH_VALUE from selected
- [x] insert selected to tuning-history
- [x] findTunings to render
- [x] make tunings::{ASSIGNEE, COMPLETED, COMMENT} editable, modify cache
- [ ] should get whether already in tuning-history or not
- [ ] mark unable to select

### server

- [x] alter Tuning.COMPLETED to varchar(1) {Y,N}
- [ ] alter Tuning add primary key {SQL_ID, PLAN_HASH_VALUE}
