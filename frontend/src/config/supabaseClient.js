
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://tyuppgllgjtbnunqrxgq.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5dXBwZ2xsZ2p0Ym51bnFyeGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MjEwMjQsImV4cCI6MTk5NTQ5NzAyNH0.69hUs2lA0fTTDNP8iYGO4SdM9U8P_--WILQSkzyIscI"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase