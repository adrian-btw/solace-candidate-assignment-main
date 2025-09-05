import db from "../../../db";
import { advocates } from "../../../db/schema";
import { asc } from "drizzle-orm";
import type { Advocate as AdvocateType } from "../../types/advocate";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Accept both limit/offset and pageNum/pageSize. pageNum is 0-based.
  const pageNumParam = searchParams.get("pageNum");
  const pageSizeParam = searchParams.get("pageSize");

  const pageNum = pageNumParam ? Math.max(0, parseInt(pageNumParam, 10) || 0) : 0;
  const pageSize = pageSizeParam ? Math.max(1, parseInt(pageSizeParam, 10) || 10) : 10;

  const limit = pageSize + 1; // fetch one extra to detect hasMore
  const offset = pageNum * pageSize;

  // If the database is not configured, return an empty payload to avoid runtime errors in dev
  if (!process.env.DATABASE_URL) {
    return Response.json({
      data: [] as AdvocateType[],
      hasMore: false,
      pageNum,
      pageSize,
    });
  }

  // Base query ordered by id asc
  type DbAdvocate = typeof advocates.$inferSelect;
  const dbTyped = db as unknown as PostgresJsDatabase<typeof schema>;
  const rows: DbAdvocate[] = await dbTyped
    .select()
    .from(advocates)
    .orderBy(asc(advocates.id))
    .limit(limit)
    .offset(offset);

  let hasMore = false;
  let dataRows: DbAdvocate[] = rows;

  if (rows.length > 0 && limit !== undefined && rows.length === limit) {
    hasMore = true;
    dataRows = rows.slice(0, limit - 1);
  }

  // If page-based inputs used and pageSize is known, trim to pageSize
  if (pageSize !== undefined) {
    dataRows = dataRows.slice(0, pageSize);
  }

  const data: AdvocateType[] = dataRows.map((r) => ({
    city: r.city,
    degree: r.degree,
    firstName: r.firstName,
    lastName: r.lastName,
    phoneNumber: r.phoneNumber,
    specialties: r.specialties,
    yearsOfExperience: r.yearsOfExperience,
  }));

  return Response.json({
    data,
    hasMore,
    pageNum: pageNumParam ? pageNum : undefined,
    pageSize: pageSizeParam ? pageSize : undefined,
  });
}
