import {createClient} from "@supabase/supabase-js";

const dbUrl = "https://kfhrvpiliohzyljdhnas.supabase.co"
const dbKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaHJ2cGlsaW9oenlsamRobmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyNzI0NTUsImV4cCI6MTk5ODg0ODQ1NX0.0OBp56gbjvKS_aONR-WXt-feZuUaYjaLt302vIRRUA4"

export const db = createClient(dbUrl, dbKey)