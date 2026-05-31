process.env.SUPABASE_URL = 'https://yyegeaneqfacrlqvhhzr.supabase.co'
process.env.SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZWdlYW5lcWZhY3JscXZoaHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNzQzNDYsImV4cCI6MjA5NTc1MDM0Nn0.m997yZY-kqFLFmBxuJK9ZlvYgdlzpCM3QdVXb8h_SH4'

const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')

const app = express()
app.use(cors())
app.use(express.json())

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// States
app.get('/states', async (req, res) => {
  const { data, error } = await supabase.from('states').select('*')
  if (error) return res.status(500).json({ error })
  res.json(data)
})

// Districts by state
app.get('/districts/:stateCode', async (req, res) => {
  const { data, error } = await supabase
    .from('districts')
    .select('*')
    .eq('state_code', req.params.stateCode)
  if (error) return res.status(500).json({ error })
  res.json(data)
})

// Subdistricts by district
app.get('/subdistricts/:districtCode', async (req, res) => {
  const { data, error } = await supabase
    .from('subdistricts')
    .select('*')
    .eq('district_code', req.params.districtCode)
  if (error) return res.status(500).json({ error })
  res.json(data)
})

// Villages by subdistrict
app.get('/villages/:subdistrictCode', async (req, res) => {
  const { data, error } = await supabase
    .from('villages')
    .select('*')
    .eq('subdistrict_code', req.params.subdistrictCode)
  if (error) return res.status(500).json({ error })
  res.json(data)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))