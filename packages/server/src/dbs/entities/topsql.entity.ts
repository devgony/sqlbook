import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ViewColumn, ViewEntity } from 'typeorm';
import { SqlStat } from './sqlStat.entity';

@InputType('TopSqlEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@ViewEntity({
  name: `VW_TOP_SQL`,
  expression: `WITH DBA_WITH_SNAPSHOT
  AS (
      SELECT MIN(SNAP_ID) AS BEGIN_SNAP_ID, MAX(SNAP_ID) AS END_SNAP_ID
      FROM DBA_HIST_SNAPSHOT
      WHERE INSTANCE_NUMBER = 1
      -- AND END_INTERVAL_TIME >= TO_DATE('2022/03/01 00:00:00', 'YYYY/MM/DD HH24:MI:SS')
      -- AND BEGIN_INTERVAL_TIME <= TO_DATE('2022/04/04 23:59:59', 'YYYY/MM/DD HH24:MI:SS')
  )
  , DBA_WITH_SQLSTAT
  AS (
      SELECT /*+ INLINE PARALLEL(1) */
      A.*
      FROM DBA_HIST_SQLSTAT A
      , DBA_WITH_SNAPSHOT X
      WHERE 1 = 1
      AND A.SNAP_ID >= X.BEGIN_SNAP_ID
      AND A.SNAP_ID <= X.END_SNAP_ID
      -- AND a.parsing_schema_name NOT IN ('EDWUSR','OGG','META','LOGADMIN')
      AND A.MODULE NOT LIKE 'BT%'
      AND A.INSTANCE_NUMBER = 1
      -- AND A.PARSING_SCHEMA_NAME IN ('PBAT' , 'PONL')
      -- AND A.SQL_ID = 'gwq78agmyw3bj'
      -- AND UPPER(A.MODULE) LIKE '%' || UPPER('JDBC Thin Client') || '%' /* <== 여기에 모듈명을 입력할 것 */
      -- AND (
      -- INSTR(UPPER(A.MODULE), 'BAT01') > 0
      -- OR INSTR(UPPER(A.MODULE), 'BAT02') > 0
      --  )
  )
  SELECT *
  FROM (
      SELECT * FROM (
          SELECT * FROM (
              SELECT /*+ LEADING(C, A, B) USE_HASH(A, B) FULL(B) NO_MERGE(C) NO_MERGE(A) NO_MERGE(B) */
                A.DBID
              , A.INSTANCE_NUMBER
              , A.SQL_ID
              , A.PLAN_HASH_VALUE 
              , A.PARSING_SCHEMA_NAME
              , A.MODULE
              , SUBSTR(A.MODULE, INSTR(A.MODULE, '[') + 1, 13) AS JOB_NAME
              , B.SQL_TEXT
              , A.EXECUTIONS -- AS "총수행횟수"
              , A.BUFFER_GETS_TOTAL
              , A.ROWS_PROCESSED -- AS "총로우수"
              , ROUND(A.ELAPSED_TIME / 60, 6) AS TOTAL_ELAPSED_MIN -- "총수행시간(분)"
              , ROUND(A.ROWS_PROCESSED / (CASE WHEN EXECUTIONS = 0 THEN 1 ELSE A.EXECUTIONS END), 0) AS AVG_ROWS -- "평균로우수"
              , ROUND(A.ELAPSED_TIME / (CASE WHEN EXECUTIONS = 0 THEN 1 ELSE A.EXECUTIONS END), 6) AS AVG_ELAPSED_SEC -- "평균수행시간(초)"
              , ROUND(A.BUFFER_GETS / (CASE WHEN EXECUTIONS = 0 THEN 1 ELSE A.EXECUTIONS END), 0) AS AVG_BUFFER_GETS -- "평균블록I/O(개수)"
              , ROUND(A.DISK_READS / (CASE WHEN EXECUTIONS = 0 THEN 1 ELSE A.EXECUTIONS END), 1) AS AVG_DISK_READS -- "평균DISK_READS"
              , ROUND(A.CPU_TIME / 60, 6) AS TOTAL_CPU_MIN -- "총CPU시간(분)"
              , ROUND(A.IOWAIT / 60, 6) AS TOTAL_IOWAIT_MIN -- "총IOWAIT(분)"
              , ROUND(A.CLWAIT / 60, 6) AS TOTAL_CLWAIT_MIN -- "총CLWAIT(분)"
              , ROUND(A.APWAIT / 60, 6) AS TOTAL_APWAIT_MIN -- "총APWAIT(분)"
              , ROUND(A.CCWAIT / 60, 6) AS TOTAL_CCWAIT_MIN -- "총CCWAIT(분)"
              , ROUND(A.CPU_TIME / (CASE WHEN EXECUTIONS = 0 THEN 1 ELSE A.EXECUTIONS END), 6) AS AVG_CPU_SEC -- "평균CPU시간(초)"
              , ROUND(A.IOWAIT / (CASE WHEN EXECUTIONS = 0 THEN 1 ELSE A.EXECUTIONS END), 6) AS AVG_IOWAIT_SEC -- "평균IOWAIT(초)"
              , ROUND(A.CLWAIT / (CASE WHEN EXECUTIONS = 0 THEN 1 ELSE A.EXECUTIONS END), 6) AS AVG_CLWAIT_SEC -- "평균CLWAIT(초)"
              , ROUND(A.APWAIT / (CASE WHEN EXECUTIONS = 0 THEN 1 ELSE A.EXECUTIONS END), 6) AS AVG_APWAIT_SEC -- "평균APWAIT(초)"
              , ROUND(A.CCWAIT / (CASE WHEN EXECUTIONS = 0 THEN 1 ELSE A.EXECUTIONS END), 6) AS AVG_CCWAIT_SEC -- "평균CCWAIT(초)"
              , C.LAST_EXEC_TIME
              , C.FIRST_EXEC_TIME
              FROM (
              SELECT /*+ LEADING(B, A) USE_HASH(A) FULL(B) FULL(A) NO_MERGE(B) NO_MERGE(A) */
                A.DBID
              , A.INSTANCE_NUMBER
              , A.SQL_ID
              , A.PLAN_HASH_VALUE 
              , A.PARSING_SCHEMA_NAME
              , A.MODULE
              , SUM(EXECUTIONS_DELTA) AS EXECUTIONS
              , SUM(DISK_READS_DELTA) AS DISK_READS
              , SUM(BUFFER_GETS_TOTAL) AS BUFFER_GETS_TOTAL
              , SUM(BUFFER_GETS_DELTA) AS BUFFER_GETS
              , SUM(ROWS_PROCESSED_DELTA) AS ROWS_PROCESSED
              , SUM(CPU_TIME_DELTA) / 1000000 AS CPU_TIME
              , SUM(ELAPSED_TIME_DELTA) / 1000000 AS ELAPSED_TIME
              , SUM(IOWAIT_DELTA) / 1000000 AS IOWAIT
              , SUM(CLWAIT_DELTA) / 1000000 AS CLWAIT
              , SUM(APWAIT_DELTA) / 1000000 AS APWAIT
              , SUM(CCWAIT_DELTA) / 1000000 AS CCWAIT
              FROM DBA_WITH_SQLSTAT A
              , DBA_HIST_SNAPSHOT B
              WHERE A.SNAP_ID = B.SNAP_ID
              AND A.DBID = B.DBID
              AND A.INSTANCE_NUMBER = B.INSTANCE_NUMBER
              GROUP BY
              A.DBID,
              A.INSTANCE_NUMBER,
              A.SQL_ID
              , A.PLAN_HASH_VALUE 
              , A.PARSING_SCHEMA_NAME
              , A.MODULE
              ) A
              , DBA_HIST_SQLTEXT B
              ,(
                  SELECT /*+ LEADING(A, B, C) USE_HASH(B, C) NO_MERGE(A) NO_MERGE(B) NO_MERGE(C) */
                  A.SQL_ID
                  , B.EXEC_TIME AS LAST_EXEC_TIME
                  , C.EXEC_TIME AS FIRST_EXEC_TIME
                  FROM (
                      SELECT SQL_ID
                      , MAX(SNAP_ID) AS MAX_SNAP_ID
                      , MIN(SNAP_ID) AS MIN_SNAP_ID
                      FROM DBA_HIST_SQLSTAT
                      GROUP BY
                      SQL_ID
                  ) A
                  LEFT OUTER JOIN (
                      SELECT SNAP_ID, MAX(END_INTERVAL_TIME) AS EXEC_TIME -- "실행일시"
                      FROM DBA_HIST_SNAPSHOT
                      GROUP BY
                      SNAP_ID
                  ) B ON A.MAX_SNAP_ID = B.SNAP_ID
                  LEFT OUTER JOIN (
                      SELECT SNAP_ID, MAX(END_INTERVAL_TIME) AS EXEC_TIME -- "실행일시"
                      FROM DBA_HIST_SNAPSHOT
                      GROUP BY
                      SNAP_ID
                  ) C ON A.MIN_SNAP_ID = C.SNAP_ID
              ) C
              WHERE A.SQL_ID = B.SQL_ID
              -- AND B.DBID = (SELECT DBID FROM V$DATABASE WHERE ROWNUM <= 1)
              AND A.SQL_ID = C.SQL_ID
              -- AND sql_text NOT LIKE 'begin%'
              -- AND A.MODULE = 'JDBC Thin Client'
              -- ORDER BY
              -- "총CPU시간(분)" DESC, "총수행횟수" DESC
              -- "평균수행시간(초)" DESC, "평균블록I/O(개수)" DESC
              -- "평균블록I/O(개수)" DESC, "총수행횟수" DESC
              -- "총수행횟수" DESC, "평균블록I/O(개수)" DESC
              -- "평균수행시간(초)" DESC, "총수행횟수" DESC
              -- "총수행시간(분)" DESC 
          ) SUB1
          -- WHERE AVG_ELAPSED_SEC > 3
      ) SUB2
  ) SUB3
--   ORDER BY AVG_ELAPSED_SEC DESC`,
})
export class TopSql {
  @Field(() => Number)
  @ViewColumn()
  DBID: number;
  @Field(() => Number)
  @ViewColumn()
  INSTANCE_NUMBER: number;
  @Field(() => String)
  @ViewColumn()
  SQL_ID: string;
  @Field(() => Number)
  @ViewColumn()
  PLAN_HASH_VALUE: number;
  @Field(() => String)
  @ViewColumn()
  PARSING_SCHEMA_NAME: string;
  @Field(() => String)
  @ViewColumn()
  MODULE: string;
  @Field(() => String)
  @ViewColumn()
  JOB_NAME: string;
  @Field(() => String)
  @ViewColumn()
  SQL_TEXT: string;
  @Field(() => Number)
  @ViewColumn()
  EXECUTIONS: number;
  @Field(() => Number)
  @ViewColumn()
  BUFFER_GETS_TOTAL: number;
  @Field(() => Number)
  @ViewColumn()
  ROWS_PROCESSED: number;
  @Field(() => Number)
  @ViewColumn()
  TOTAL_ELAPSED_MIN: number;
  @Field(() => Number)
  @ViewColumn()
  AVG_ROWS: number;
  @Field(() => Number)
  @ViewColumn()
  AVG_ELAPSED_SEC: number;
  @Field(() => Number)
  @ViewColumn()
  AVG_BUFFER_GETS: number;
  @Field(() => Number)
  @ViewColumn()
  AVG_DISK_READS: number;
  @Field(() => Number)
  @ViewColumn()
  TOTAL_CPU_MIN: number;
  @Field(() => Number)
  @ViewColumn()
  TOTAL_IOWAIT_MIN: number;
  @Field(() => Number)
  @ViewColumn()
  TOTAL_CLWAIT_MIN: number;
  @Field(() => Number)
  @ViewColumn()
  TOTAL_APWAIT_MIN: number;
  @Field(() => Number)
  @ViewColumn()
  TOTAL_CCWAIT_MIN: number;
  @Field(() => Number)
  @ViewColumn()
  AVG_CPU_SEC: number;
  @Field(() => Number)
  @ViewColumn()
  AVG_IOWAIT_SEC: number;
  @Field(() => Number)
  @ViewColumn()
  AVG_CLWAIT_SEC: number;
  @Field(() => Number)
  @ViewColumn()
  AVG_APWAIT_SEC: number;
  @Field(() => Number)
  @ViewColumn()
  AVG_CCWAIT_SEC: number;
  @Field(() => Date)
  @ViewColumn()
  LAST_EXEC_TIME: Date;
  @Field(() => Date)
  @ViewColumn()
  FIRST_EXEC_TIME: Date;
}
