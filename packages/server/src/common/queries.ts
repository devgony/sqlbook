/*
* TB_SQL_HIST

Name                                      Null?    Type

----------------------------------------- -------- ----------------------------

DB_NAME                                            ??????

SNAP_ID                                   NOT NULL numeric

BEGIN_INTERVAL_TIME                       NOT NULL TIMESTAMP

END_INTERVAL_TIME                         NOT NULL TIMESTAMP

DBID                                      NOT NULL numeric

INSTANCE_NUMBER                           NOT NULL numeric

SQL_ID                                    NOT NULL VARCHAR2(13)

SQL_TEXT                                           longtext

PLAN_HASH_VALUE                           NOT NULL numeric

VERSION_COUNT                                      numeric

MODULE                                             VARCHAR2(64)

FETCHES_TOTAL                                      numeric

FETCHES_DELTA                                      numeric

END_OF_FETCH_COUNT_TOTAL                           numeric

END_OF_FETCH_COUNT_DELTA                           numeric

SORTS_TOTAL                                        numeric

SORTS_DELTA                                        numeric

EXECUTIONS_TOTAL                                   numeric

EXECUTIONS_DELTA                                   numeric

LOADS_TOTAL                                        numeric

LOADS_DELTA                                        numeric

PARSE_CALLS_TOTAL                                  numeric

PARSE_CALLS_DELTA                                  numeric

DISK_READS_TOTAL                                   numeric

DISK_READS_DELTA                                   numeric

BUFFER_GETS_TOTAL                                  numeric

BUFFER_GETS_DELTA                                  numeric

ROWS_PROCESSED_TOTAL                               numeric

ROWS_PROCESSED_DELTA                               numeric

CPU_TIME_TOTAL                                     numeric

CPU_TIME_DELTA                                     numeric

ELAPSED_TIME_TOTAL                                 numeric

ELAPSED_TIME_DELTA                                 numeric

DIRECT_WRITES_TOTAL                                numeric

DIRECT_WRITES_DELTA                                numeric

PHYSICAL_READ_BYTES_TOTAL                          numeric

PHYSICAL_READ_BYTES_DELTA                          numeric

PHYSICAL_WRITE_BYTES_TOTAL                         numeric

PHYSICAL_WRITE_BYTES_DELTA                         numeric

 

 

* TB_TUNE_INFO

Name                                      Null?    Type

----------------------------------------- -------- ----------------------------

 

DBID                                      NOT NULL numeric

INSTANCE_NUMBER                           NOT NULL numeric

SQL_ID                                    NOT NULL VARCHAR2(13)

TUNER_NAME                                NOT NULL VARCHAR2(30)

TUNE_SQL_TEXT                                      longtext

TUNE_DATE                                 NOT NULL

 TUNE_METHOD                               NOT NULL               

 

 

 

* TB_SQL_TEXT

Name                                      Null?    Type

----------------------------------------- -------- ----------------------------

DBID                                      NOT NULL NUMBER

SQL_ID                                    NOT NULL VARCHAR2(13)

SQL_TEXT                                           CLOB

 

-- TB_SQL_HIST 수집쿼리

SELECT

SNAP_ID, BEGIN_INTERVAL_TIME,END_INTERVAL_TIME,DBID,INSTANCE_NUMBER,SQL_ID,SQL_TEXT,

PLAN_HASH_VALUE, VERSION_COUNT,MODULE, FETCHES_TOTAL,FETCHES_DELTA, END_OF_FETCH_COUNT_TOTAL,

END_OF_FETCH_COUNT_DELTA, SORTS_TOTAL, SORTS_DELTA,  EXECUTIONS_TOTAL, EXECUTIONS_DELTA,

LOADS_TOTAL,LOADS_DELTA,PARSE_CALLS_TOTAL,PARSE_CALLS_DELTA,  DISK_READS_TOTAL,DISK_READS_DELTA,

BUFFER_GETS_TOTAL, BUFFER_GETS_DELTA,   CPU_TIME_TOTAL, CPU_TIME_DELTA, DIRECT_WRITES_TOTAL,  DIRECT_WRITES_DELTA,

PHYSICAL_READ_BYTES_TOTAL, PHYSICAL_READ_BYTES_DELTA, PHYSICAL_WRITE_BYTES_TOTAL, PHYSICAL_WRITE_BYTES_DELTA

FROM dba_hist_sqlstat H, dba_hist_snapshot T

WHERE H.SNAP_ID > ?

AND H.SNAP_ID=T.SNAP_ID

AND H.DB_ID=T.DB_ID

;

 

 

-- TB_SQL_TEXT 수집 쿼리

 SQL_TEXT

SELECT DBID, SQL_ID, SQL_TEXT

FROM DBA_HIST_SQLTEXT S

WHERE S.SQL_ID NOT EXISTS

( SELECT 1 FROM TB_SQL T WHERE S.SQL_ID=T.SQL_ID AND S.DBID=T.DBID WHERE ROWNUM = 1 )
*/
