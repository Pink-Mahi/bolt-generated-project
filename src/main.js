import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'

const supabase = createClient(
  'https://supabase.pinkmahi.com',
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTczMTc2MzUwMCwiZXhwIjo0ODg3NDM3MTAwLCJyb2xlIjoiYW5vbiJ9.FnNEgtoljoOZn9NvMzgDjAEB3bJ4uYG5t1cliliohB4'
)

// Auth elements
const authElement = document.getElementById('auth')
const dashboardElement = document.getElementById('dashboard')

// Initialize auth state
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    showDashboard()
    fetchDevices()
  } else {
    showAuth()
  }
})

window.signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
}

window.signInWithApple = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'apple'
  })
}

window.signOut = async () => {
  await supabase.auth.signOut()
}

function showAuth() {
  authElement.classList.remove('hidden')
  dashboardElement.classList.add('hidden')
}

function showDashboard() {
  authElement.classList.add('hidden')
  dashboardElement.classList.remove('hidden')
}

async function fetchDevices(filter = {}) {
  let query = supabase.from('devices').select('*')

  if (filter.created_after) {
    query = query.gte('created_at', filter.created_after)
  }

  if (filter.device_id) {
    query = query.eq('device_id', filter.device_id)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching devices:', error)
    return
  }

  displayDevices(data)
}

function displayDevices(devices) {
  const devicesListElement = document.getElementById('devices-list')
  devicesListElement.innerHTML = devices.map(device => `
    <div class="device-card">
      <strong>Device ID:</strong> ${device.device_id}<br>
      <strong>Created:</strong> ${format(new Date(device.created_at), 'PPpp')}
    </div>
  `).join('')
}

window.searchDevice = () => {
  const deviceId = document.getElementById('device-search').value.trim()
  if (deviceId) {
    fetchDevices({ device_id: deviceId })
  } else {
    fetchDevices()
  }
}

window.filterByDate = () => {
  const dateFilter = document.getElementById('date-filter').value
  if (dateFilter) {
    fetchDevices({ created_after: dateFilter })
  } else {
    fetchDevices()
  }
}
