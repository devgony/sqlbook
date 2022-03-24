/*
* TB_SQL_HIST
SNAP_ID                    | decimal(10,0) | NO   
BEGIN_INTERVAL_TIME        | timestamp     | NO   
END_INTERVAL_TIME          | timestamp     | NO   
DBID                       | decimal(10,0) | NO   
INSTANCE_NUMBER            | decimal(10,0) | NO   
SQL_ID                     | varchar(20)   | NO   
PLAN_HASH_VALUE            | decimal(10,0) | NO   
VERSION_COUNT              | decimal(10,0) | YES  
MODULE                     | varchar(64)   | YES  
FETCHES_TOTAL              | decimal(10,0) | YES  
FETCHES_DELTA              | decimal(10,0) | YES  
END_OF_FETCH_COUNT_TOTAL   | decimal(10,0) | YES  
END_OF_FETCH_COUNT_DELTA   | decimal(10,0) | YES  
SORTS_TOTAL                | decimal(10,0) | YES  
SORTS_DELTA                | decimal(10,0) | YES  
EXECUTIONS_TOTAL           | decimal(10,0) | YES  
EXECUTIONS_DELTA           | decimal(10,0) | YES  
LOADS_TOTAL                | decimal(10,0) | YES  
LOADS_DELTA                | decimal(10,0) | YES  
PARSE_CALLS_TOTAL          | decimal(10,0) | YES  
PARSE_CALLS_DELTA          | decimal(10,0) | YES  
DISK_READS_TOTAL           | decimal(10,0) | YES  
DISK_READS_DELTA           | decimal(10,0) | YES  
BUFFER_GETS_TOTAL          | decimal(10,0) | YES  
BUFFER_GETS_DELTA          | decimal(10,0) | YES  
ROWS_PROCESSED_TOTAL       | decimal(10,0) | YES  
ROWS_PROCESSED_DELTA       | decimal(10,0) | YES  
CPU_TIME_TOTAL             | decimal(10,0) | YES  
CPU_TIME_DELTA             | decimal(10,0) | YES  
ELAPSED_TIME_TOTAL         | decimal(10,0) | YES  
ELAPSED_TIME_DELTA         | decimal(10,0) | YES  
DIRECT_WRITES_TOTAL        | decimal(10,0) | YES  
DIRECT_WRITES_DELTA        | decimal(10,0) | YES  
PHYSICAL_READ_BYTES_TOTAL  | decimal(10,0) | YES  
PHYSICAL_READ_BYTES_DELTA  | decimal(10,0) | YES  
PHYSICAL_WRITE_BYTES_TOTAL | decimal(10,0) | YES  
PHYSICAL_WRITE_BYTES_DELTA | decimal(10,0) | YES  
 

 

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
*/

// TB_SQL_HIST
export const sqlHist = `SELECT
H.SNAP_ID, BEGIN_INTERVAL_TIME,END_INTERVAL_TIME,H.DBID,H.INSTANCE_NUMBER,SQL_ID,
PLAN_HASH_VALUE, VERSION_COUNT,MODULE, FETCHES_TOTAL,FETCHES_DELTA, END_OF_FETCH_COUNT_TOTAL,
END_OF_FETCH_COUNT_DELTA, SORTS_TOTAL, SORTS_DELTA,  EXECUTIONS_TOTAL, EXECUTIONS_DELTA,
LOADS_TOTAL,LOADS_DELTA,PARSE_CALLS_TOTAL,PARSE_CALLS_DELTA,  DISK_READS_TOTAL,DISK_READS_DELTA,
BUFFER_GETS_TOTAL, BUFFER_GETS_DELTA,   CPU_TIME_TOTAL, CPU_TIME_DELTA, DIRECT_WRITES_TOTAL,  DIRECT_WRITES_DELTA,
PHYSICAL_READ_BYTES_TOTAL, PHYSICAL_READ_BYTES_DELTA, PHYSICAL_WRITE_BYTES_TOTAL, PHYSICAL_WRITE_BYTES_DELTA
FROM dba_hist_sqlstat H, dba_hist_snapshot T
WHERE H.SNAP_ID >= (SELECT MAX(snap_id) from dba_hist_snapshot)
AND H.SNAP_ID=T.SNAP_ID
AND H.DBID=T.DBID`;

// TB_SQL_TEXT

export const sqlText = `SELECT DBID, SQL_ID, SQL_TEXT
FROM DBA_HIST_SQLTEXT S
WHERE S.SQL_ID NOT EXISTS
( SELECT 1 FROM TB_SQL T WHERE S.SQL_ID=T.SQL_ID AND S.DBID=T.DBID WHERE ROWNUM = 1 )`;
