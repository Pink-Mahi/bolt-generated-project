import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'

console.log('Application starting...');

// Use environment variables with fallback values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL available:', !!supabaseUrl);
console.log('Supabase Key available:', !!supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

// Auth elements
const authElement = document.getElementById('auth');
const dashboardElement = document.getElementById('dashboard');

if (!authElement || !dashboardElement) {
  console.error('Required DOM elements not found');
}

// Initialize auth state with error handling
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event);
  try {
    if (session) {
      console.log('User logged in:', session.user.email);
      showDashboard();
      fetchDevices();
    } else {
      console.log('No active session');
      showAuth();
    }
  } catch (error) {
    console.error('Auth state change error:', error);
  }
});

window.signInWithGoogle = async () => {
  console.log('Attempting Google sign in...');
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
    if (error) throw error;
    console.log('Google sign in successful');
  } catch (error) {
    console.error('Google sign in error:', error);
  }
};

window.signInWithApple = async () => {
  console.log('Attempting Apple sign in...');
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple'
    });
    if (error) throw error;
    console.log('Apple sign in successful');
  } catch (error) {
    console.error('Apple sign in error:', error);
  }
};

window.signOut = async () => {
  console.log('Signing out...');
  try {
    await supabase.auth.signOut();
    console.log('Sign out successful');
  } catch (error) {
    console.error('Sign out error:', error);
  }
};

function showAuth() {
  console.log('Showing auth screen');
  authElement.classList.remove('hidden');
  dashboardElement.classList.add('hidden');
}

function showDashboard() {
  console.log('Showing dashboard');
  authElement.classList.add('hidden');
  dashboardElement.classList.remove('hidden');
}

async function fetchDevices(filter = {}) {
  console.log('Fetching devices with filter:', filter);
  try {
    let query = supabase.from('devices').select('*');

    if (filter.created_after) {
      query = query.gte('created_at', filter.created_after);
    }

    if (filter.device_id) {
      query = query.eq('device_id', filter.device_id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    console.log('Devices fetched:', data?.length || 0);
    displayDevices(data || []);
  } catch (error) {
    console.error('Error fetching devices:', error);
    displayError('Failed to fetch devices');
  }
}

function displayDevices(devices) {
  console.log('Displaying devices:', devices.length);
  const devicesListElement = document.getElementById('devices-list');
  if (!devicesListElement) {
    console.error('Devices list element not found');
    return;
  }

  devicesListElement.innerHTML = devices.map(device => `
    <div class="device-card">
      <strong>Device ID:</strong> ${device.device_id}<br>
      <strong>Created:</strong> ${format(new Date(device.created_at), 'PPpp')}
    </div>
  `).join('');
}

function displayError(message) {
  const devicesListElement = document.getElementById('devices-list');
  if (devicesListElement) {
    devicesListElement.innerHTML = `<div class="error-message">${message}</div>`;
  }
}

window.searchDevice = () => {
  console.log('Searching device...');
  const deviceId = document.getElementById('device-search')?.value.trim();
  if (deviceId) {
    console.log('Searching for device:', deviceId);
    fetchDevices({ device_id: deviceId });
  } else {
    console.log('No device ID provided, fetching all');
    fetchDevices();
  }
};

window.filterByDate = () => {
  console.log('Filtering by date...');
  const dateFilter = document.getElementById('date-filter')?.value;
  if (dateFilter) {
    console.log('Filtering after date:', dateFilter);
    fetchDevices({ created_after: dateFilter });
  } else {
    console.log('No date provided, fetching all');
    fetchDevices();
  }
};

// Add initial console log to verify script loading
console.log('Script loaded successfully');

// Test database connection
async function testDatabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('devices')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Run connection test on load
testDatabaseConnection();
