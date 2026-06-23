
// Load environment variables
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Connecting to Supabase...');
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchStudents() {
  try {
    console.log('Fetching all students...');
    const { data, error } = await supabase
      .from('students')
      .select('full_name, degree_level');

    if (error) {
      console.error('Error fetching students:', error);
      return;
    }

    console.log('\n=== STUDENT DATA ===');
    console.log('Total students:', data.length);
    console.log('\nFull student list (name → degree_level):');
    data.forEach((student, index) => {
      console.log(`${index + 1}. ${student.full_name} → ${JSON.stringify(student.degree_level)}`);
    });
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

fetchStudents();
