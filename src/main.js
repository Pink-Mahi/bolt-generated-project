import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'

// Use environment variables with fallback values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://supabase.pinkmahi.com'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTczMTc2MzUwMCwiZXhwIjo0ODg3NDM3MTAwLCJyb2xlIjoiYW5vbiJ9.FnNEgtoljoOZn9NvMzgDjAEB3bJ4uYG5t1cliliohB4'

const supabase = createClient(supabaseUrl, supabaseKey)

// Add error handling for client initialization
if (!supabase) {
  console.error('Failed to initialize Supabase client')
}

// Auth elements
const authElement = document.getElementById('auth')
const dashboardElement = document.getElementById('dashboard')

// Initialize auth state with error handling
supabase.auth.onAuthStateChange((event, session) => {
  try {
    if (session) {
      showDashboard()
      fetchDevices()
    } else {
      showAuth()
    }
  } catch (error) {
    console.error('Auth state change error:', error)
  }
})

// Rest of your main.js code remains the same...
